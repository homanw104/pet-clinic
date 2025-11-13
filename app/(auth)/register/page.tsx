import { Metadata } from "next";
import PageContent from "@/app/(auth)/register/page-content";

export const metadata: Metadata = {
  title: "Register | Pet Clinic"
}

export default function Page() {
  return (
    <PageContent />
  )
}
