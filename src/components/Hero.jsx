import "./Hero.css";

function Hero() {
    return (
        <section id="home" className="hero container">
            <div className="hero-content">
                <p className="welcome-text">Welcome to my portfolio!</p>
                <h1 className="hero-title">
                    Hello, my <br /> name's <span className="highlight">Sangamesawar.</span>
                </h1>
                <p className="hero-description">
                    I'm a Full Stack Developer <br />
                    Currently working with GrappleSoft <br />

                </p>

                <div className="hero-btns">
                    <a
                        href="/SANGAMESHWAR_KAMA.docx"
                        download="SANGAMESHWAR_KAMA_CV.docx"
                        className="btn btn-primary"
                    >
                        Download cv
                    </a>
                    <button
                        onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
                        className="btn btn-outline">See my work &rarr;</button>
                </div>


            </div>

            <div className="hero-visual">
                <div className="image-frame">
                    <img
                        src="/Snapchat-721388597.jpg"
                        alt="Profile"
                        className="profile-img"
                    />

                </div>


            </div>
        </section>
    );
}

export default Hero;
