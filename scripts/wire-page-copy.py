#!/usr/bin/env python3
"""
Wires a page's section headings and list content to the CMS.

Run from src/app/(frontend). For each page it:
  1. adds the CMS imports and makes the component async
  2. replaces each section's eyebrow and heading with a t(...) call that
     falls back to the wording currently in the file
  3. points the pains / benefits / consequences / steps arrays at the CMS
  4. writes the original wording out as seed data

Deliberately conservative: it only touches patterns it can match exactly,
and reports anything it couldn't, rather than guessing and breaking layout.
"""
import io, json, re, sys

# Section marker in the JSX  ->  field group in the CMS
SECTIONS = [
    ("HERO", "hero"),
    ("1 · PAIN", "pain"),
    ("2 · IMPORTANCE", "importance"),
    ("3 · BENEFITS", "benefits"),
    ("4 · CONSEQUENCES", "consequences"),
    ("5 · RESULTS", "results"),
    ("6 · HOW", "how"),
    ("CTA", "cta"),
    ("PARTNER WITH VISGROW", "cta"),
    ("BOOK A WORKSHOP", "cta"),
]

EYEBROW_RE = re.compile(
    r'(<span\s+className="[^"]*uppercase[^"]*tracking-\[2px\][^"]*">\s*\n\s*)'
    r'([^<>{}\n][^<>{}]*?)'
    r'(\s*\n\s*</span>)',
    re.S,
)
HEADING_RE = re.compile(
    r'(<h([12])\b[^>]*>\s*\n\s*)'
    r'([^<>{}\n][^<>{}]*?)'
    r'(\s*\n\s*</h\2>)',
    re.S,
)

# JSX entities we need to turn back into plain text for the CMS
ENTS = {
    "&apos;": "'", "&quot;": '"', "&amp;": "&",
    "&ldquo;": "“", "&rdquo;": "”",
    "&mdash;": "—", "&nbsp;": " ",
}


def to_plain(s):
    s = re.sub(r"\s+", " ", s).strip()
    for k, v in ENTS.items():
        s = s.replace(k, v)
    return s


def to_jsx(s):
    """Escape a plain string for use inside a JSX string literal."""
    return s.replace("\\", "\\\\").replace('"', '\\"')


def wire(path_file, url_path, title):
    s = io.open(path_file, encoding="utf8").read()
    seed = {"title": title, "path": url_path}
    notes = []

    # --- locate section boundaries
    marks = []
    for marker, key in SECTIONS:
        for m in re.finditer(re.escape("{/* ============ " + marker), s):
            marks.append((m.start(), key))
    marks.sort()
    if not marks:
        return None, ["no section markers found"]

    bounds = []
    for i, (pos, key) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(s)
        bounds.append((pos, end, key))

    # --- rewrite from the bottom up so earlier offsets stay valid
    out = s
    for start, end, key in reversed(bounds):
        chunk = out[start:end]
        grp = seed.setdefault(key, {})

        em = EYEBROW_RE.search(chunk)
        if em and "{" not in em.group(2):
            text = to_plain(em.group(2))
            if text:
                grp["eyebrow"] = text
                chunk = (chunk[:em.start()]
                         + em.group(1)
                         + '{t(copy?.%s?.eyebrow, "%s")}' % (key, to_jsx(text))
                         + em.group(3)
                         + chunk[em.end():])

        hm = HEADING_RE.search(chunk)
        if hm and "{" not in hm.group(3):
            text = to_plain(hm.group(3))
            if text:
                grp["heading"] = text
                chunk = (chunk[:hm.start()]
                         + hm.group(1)
                         + '{t(copy?.%s?.heading, "%s")}' % (key, to_jsx(text))
                         + hm.group(4)
                         + chunk[hm.end():])
        elif not hm:
            notes.append("no plain heading in section '%s'" % key)

        out = out[:start] + chunk + out[end:]

    # --- arrays
    ARRAYS = {
        "pains": ("pain", "items"),
        "painPoints": ("pain", "items"),
        "benefits": ("benefits", "items"),
        "outcomes": ("benefits", "items"),
        "consequences": ("consequences", "items"),
        "steps": ("how", "steps"),
    }
    for var, (grp, field) in ARRAYS.items():
        if re.search(r"\b%s\.map\(" % var, out):
            out = re.sub(r"\b%s\.map\(" % var, "cms_%s.map(" % var, out)
            seed.setdefault("_arrays", {})[var] = (grp, field)

    # Steps are numbered in the markup via a hard-coded `n` ("01", "02"…).
    # The CMS numbers them by position instead, so derive it from the index.
    if "cms_steps.map(" in out:
        out = re.sub(r"cms_steps\.map\(\((\w+)\) =>", r"cms_steps.map((\1, i) =>", out)
        out = re.sub(r"\{(\w+)\.n\}", '{String(i + 1).padStart(2, "0")}', out)
        out = re.sub(r"key=\{(\w+)\.n\}", r"key={\1.title}", out)

    # --- imports
    if "getPageCopy" not in out:
        m = list(re.finditer(r"^import .*?;$", out, re.M))[-1]
        out = (out[:m.end()]
               + '\nimport { getPageCopy, t, list, texts } from "@/lib/page-copy";'
               + out[m.end():])

    # --- async + fetch
    fm = re.search(r"export default (async )?function (\w+)\(\) \{\n", out)
    if not fm:
        return None, notes + ["no default export function"]
    decl = 'export default async function %s() {\n  const copy = await getPageCopy("%s");\n' % (
        fm.group(2), url_path)
    for var, (grp, field) in seed.get("_arrays", {}).items():
        if var == "consequences":
            decl += '  const cms_%s = texts(copy?.%s?.%s, %s);\n' % (var, grp, field, var)
        else:
            decl += '  const cms_%s = list(copy?.%s?.%s, %s);\n' % (var, grp, field, var)
    out = out[:fm.start()] + decl + out[fm.end():]

    io.open(path_file, "w", encoding="utf8").write(out)
    seed.pop("_arrays", None)
    return seed, notes


if __name__ == "__main__":
    pages = json.load(open(sys.argv[1]))
    seeds, all_notes = [], {}
    for p in pages:
        seed, notes = wire(p["file"], p["path"], p["title"])
        if seed:
            seeds.append(seed)
        if notes:
            all_notes[p["path"]] = notes
    json.dump(seeds, open(sys.argv[2], "w"), indent=2, ensure_ascii=False)
    print(json.dumps(all_notes, indent=1))
    print("wired %d pages" % len(seeds))
