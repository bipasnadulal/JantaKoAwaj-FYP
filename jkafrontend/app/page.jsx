// import Image from "next/image";
import Landing from "./(public)/landing/page";
import TopFewComplaintsPage from "./(public)/topFewComplaints/page";
import ComplaintsSummary from "./(public)/complaintsSummary/page";
import AboutPage from "./(public)/about/page";
import Footer from "./components/Footer";



export default function Home() {
  return (
    <>
      <Landing />
      <TopFewComplaintsPage />
      <ComplaintsSummary />
      <AboutPage/>
      <Footer />
    </>

  );
  
}
