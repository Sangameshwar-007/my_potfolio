import { useEffect, useState } from "react";
import API from "../services/api";
import "./PortfolioPage.css";

function PortfolioPage() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", image_url: "" });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        API.get("/projects").then(res => setProjects(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post("/projects", form).then(() => {
            fetchProjects();
            setForm({ title: "", description: "", image_url: "" });
        });
    };

    const deleteProject = (id) => {
        API.delete(`/projects/${id}`).then(fetchProjects);
    };

    return (
        <section id="projects" className="portfolio-page section-padding">
            <div className="container">
                <header className="page-header">
                    <h2 className="glow-text">My Creative <span className="highlight">Portfolio</span></h2>
                    <p>Explore my latest works and projects.</p>
                </header>

                <section className="project-form glass">
                    <h3>Add New Project</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="Project Title"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Short Description"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Image URL"
                            value={form.image_url}
                            onChange={e => setForm({ ...form, image_url: e.target.value })}
                        />
                        <button type="submit" className="btn btn-primary">Add Project</button>
                    </form>
                </section>

                <section className="projects-grid">
                    {projects.map(p => (
                        <div key={p.id} className="project-card glass">
                            <div className="project-image">
                                <img src={p.image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} alt={p.title} />
                            </div>
                            <div className="project-info">
                                <h4>{p.title}</h4>
                                <p>{p.description}</p>
                                <div className="card-actions">
                                    <button onClick={() => deleteProject(p.id)} className="delete-btn">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    );
}

export default PortfolioPage;
