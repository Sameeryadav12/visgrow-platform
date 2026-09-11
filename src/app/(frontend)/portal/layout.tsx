import { redirect } from "next/navigation";
import { getCurrentStudent } from "@/lib/lms-auth";
import PortalNav from "@/components/PortalNav";

/**
 * Everything under /portal is signed-in only.
 *
 * The check lives in the layout rather than in each page, so a new page added
 * later is private by default. Forgetting to add a guard is a much easier
 * mistake to make than forgetting to remove one.
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = await getCurrentStudent();
  if (!student) redirect("/sign-in?problem=signedout");

  return (
    <div className="flex flex-1 flex-col bg-brand-lavender">
      <PortalNav name={student.name} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
