import { useEffect, useState } from "react";
import API from "../services/api";
import { FaTools } from "react-icons/fa";
import "./SkillsPage.css";

function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({ skill_name: "", percentage: 0 });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = () => {
        API.get("/skills").then(res => setSkills(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post("/skills", form).then(() => {
            fetchSkills();
            setForm({ skill_name: "", percentage: 0 });
        });
    };

    const deleteSkill = (id) => {
        API.delete(`/skills/${id}`).then(fetchSkills);
    };

    return (
        <section id="skills" className="skills-page section-padding">
            <div className="container">
                <header className="page-header">
                    <h2 className="glow-text">Technical <span className="highlight">Proficiency</span></h2>
                    <p>My core skills and their mastery levels.</p>
                </header>

                <section className="skill-form glass">
                    <h3>Add New Skill</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Skill Name (e.g. React)"
                            value={form.skill_name}
                            onChange={e => setForm({ ...form, skill_name: e.target.value })}
                            required
                        />
                        <div className="range-group">
                            <label>Mastery Level: <span>{form.percentage}%</span></label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={form.percentage}
                                onChange={e => setForm({ ...form, percentage: parseInt(e.target.value) })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Skill</button>
                    </form>
                </section>

                <section className="skills-list">
                    {skills.map(skill => (
                        <div key={skill.id} className="skill-item glass">
                            <div className="skill-info">
                                <span>{skill.skill_name}</span>
                                <span>{skill.percentage}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${skill.percentage}%` }}
                                ></div>
                            </div>
                            <button
                                onClick={() => deleteSkill(skill.id)}
                                className="delete-small"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    );
}

export default SkillsPage;
