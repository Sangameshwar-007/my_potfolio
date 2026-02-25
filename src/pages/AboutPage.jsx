import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import API from "../services/api";
import "./AboutPage.css";

function AboutPage() {
    const [abouts, setAbouts] = useState([]);
    const [form, setForm] = useState({ description: "", email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = () => {
        API.get("/about").then(res => {
            setAbouts(res.data);
            if (res.data.length > 0) {
                setForm(res.data[0]);
                setEditId(res.data[0].id);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            API.put(`/about/${editId}`, form).then(fetchAbout);
        } else {
            API.post("/about", form).then(fetchAbout);
        }
        setIsEditing(false);
    };

    return (
        <section id="about" className="about-page section-padding">
            <div className="container">
                <header className="page-header">
                    <h2 className="glow-text">About <span className="highlight">Me</span></h2>
                </header>

                <section className="about-content glass">
                    {abouts.length > 0 && !isEditing ? (
                        <div className="about-display">
                            <p className="description">{abouts[0].description}</p>
                            <p className="email"><span>Email:</span> {abouts[0].email}</p>
                            <button
                                className="btn btn-outline"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Bio
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="about-form">
                            <h3>{editId ? "Update Bio" : "Add Bio"}</h3>
                            <textarea
                                placeholder="Write your bio here..."
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                            />
                            <div className="form-btns">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                {editId && (
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </section>
            </div>
        </section>
    );
}

export default AboutPage;
