import { Metadata } from "next";
import PageContent from "@/app/(quiz)/quiz/page-content";

export const metadata: Metadata = {
  title: "Quiz | Pet Clinic",
  description: "Pet clinic online learning platform."
};

export default function Page() {
  return (
    <PageContent />
  );
}
