import "./SocialLinks.css";

function SocialLinks() {
    return (
        <div className="social-sidebar">
            <div className="follow-text">
                <span>FOLLOW ME ON</span>
                <div className="line"></div>
            </div>
            <div className="social-icons">
                <a href="https://github.com/Sangameshwar-007" className="social-icon git">github</a>

                <a href="https://www.linkedin.com/in/sangameshwarkama/" className="social-icon linkedin">in</a>
            </div>
        </div >
    );
}

export default SocialLinks;
