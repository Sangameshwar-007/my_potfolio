import { useEffect, useState } from "react";
import API, { IS_LOCAL } from "../services/api";
import "./PortfolioPage.css";


function PortfolioPage() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", image_url: "", project_link: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        API.get("/projects").then(res => setProjects(res.data));
    };

    const handleEdit = (project) => {
        setForm(project);
        setEditId(project.id);
        setIsEditing(true);
        // Scroll to form
        document.getElementById('project-form-section').scrollIntoView({ behavior: 'smooth' });
    };

    const handleCancel = () => {
        setForm({ title: "", description: "", image_url: "", project_link: "" });
        setIsEditing(false);
        setEditId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            API.put(`/projects/${editId}`, form).then(() => {
                fetchProjects();
                handleCancel();
            });
        } else {
            API.post("/projects", form).then(() => {
                fetchProjects();
                handleCancel();
            });
        }
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

                {IS_LOCAL && (
                    <section id="project-form-section" className="project-form glass">
                        <h3>{isEditing ? "Edit Project" : "Add New Project"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    placeholder="Project Title"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    required
                                />
                                <input
                                    placeholder="Image URL"
                                    value={form.image_url}
                                    onChange={e => setForm({ ...form, image_url: e.target.value })}
                                />
                                <input
                                    placeholder="Project Link (Optional)"
                                    value={form.project_link}
                                    onChange={e => setForm({ ...form, project_link: e.target.value })}
                                />
                            </div>
                            <input
                                placeholder="Short Description"
                                className="full-width"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                            />
                            <div className="form-btns">
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? "Update Project" : "Add Project"}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={handleCancel} className="btn btn-outline">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>
                )}

                <section className="projects-grid">
                    {projects.map(p => (
                        <div key={p.id} className="project-card glass">
                            <div className="project-image">
                                <img src={p.image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} alt={p.title} />
                                {IS_LOCAL && (
                                    <div className="project-overlay">
                                        <div className="overlay-btns">
                                            <button onClick={() => handleEdit(p)} className="edit-btn">Edit</button>
                                            <button onClick={() => deleteProject(p.id)} className="delete-btn">Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="project-info">
                                <h4>{p.title}</h4>
                                <p>{p.description}</p>
                                <div className="card-actions">
                                    {p.project_link && (
                                        <a href={p.project_link} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-glow">
                                            Visit Project
                                        </a>
                                    )}
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
