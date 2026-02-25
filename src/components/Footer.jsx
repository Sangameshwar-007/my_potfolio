import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
    const currentYear = 2026;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">Sangameshwar</h2>
                        <p className="footer-tagline">Building digital experiences that matter.</p>
                    </div>

                    <div className="footer-social">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaGithub />

                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaLinkedin />

                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaTwitter />
                        </a>
                    </div>

                    <button className="back-to-top" onClick={scrollToTop}>
                        ↑
                    </button>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Sangameshwar Kama. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
