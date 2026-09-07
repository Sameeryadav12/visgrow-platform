/**
 * Does this person want animation?
 *
 * CSS handles most of it, but the typewriter, the counting numbers and the
 * scroll reveals are driven by JavaScript, so they have to ask as well.
 * Reduced motion is a medical accessibility setting, not a preference —
 * for someone with a vestibular disorder, movement causes real nausea.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
