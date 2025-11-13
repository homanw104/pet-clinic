import { Metadata } from "next";
import PageContent from "@/app/(auth)/login/page-content";

export const metadata: Metadata = {
  title: "Login | Pet Clinic"
}

export default function Page() {
  return (
    <PageContent />
  )
}
