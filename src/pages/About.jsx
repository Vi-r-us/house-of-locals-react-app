import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutArticles from "../components/AboutArticles";
import { useState } from "react";

const About = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  return (
    <main
      className="flex flex-col gap-4"
      style={{ paddingTop: `${navbarHeight + 16}px` }}
    >
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />
      <AboutArticles />
      <Footer />
    </main>
  );
};

export default About;
