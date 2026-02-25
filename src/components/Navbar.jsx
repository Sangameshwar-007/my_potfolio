import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar container">
            <div className="nav-logo">
                <img src="/Gemini_Generated_Image_4eoftn4eoftn4eof.png"
                    alt="Sangameshwar Logo"
                    className="logo-icon" />
                <h1 className="glow-text">Sangameshwar</h1>
            </div>

            <div className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={isOpen ? "nav-links active" : "nav-links"}>
                <li>
                    <a href="#home" onClick={closeMenu}>Home</a>
                </li>
                <li>
                    <a href="#about" onClick={closeMenu}>About</a>
                </li>
                <li>
                    <a href="#projects" onClick={closeMenu}>Projects</a>
                </li>
                <li>
                    <a href="#skills" onClick={closeMenu}>Skills</a>
                </li>
                <li>
                    <a href="#contact" onClick={closeMenu}>Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
