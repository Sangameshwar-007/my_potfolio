import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "./AboutPage";
import Portfolio from "./PortfolioPage";
import Skills from "./SkillsPage";
import Contact from "./ContactPage";
import Footer from "../components/Footer";

function Home() {
    useEffect(() => {
        // Force scroll to top on refresh
        window.scrollTo(0, 0);

        // Remove hash from URL without reloading
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, []);

    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Portfolio />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
