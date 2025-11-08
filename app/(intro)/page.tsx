import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Clinic",
  description: "Pet clinic online learning platform."
};

export default function Home() {
  return (
    <>
      {/* Home page contents are stored in the layout so that it won't reload */}
      {/* everytime you return to the home page. */}
    </>
  )
}
