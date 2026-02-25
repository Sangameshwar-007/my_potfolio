import { useEffect, useState } from "react";
import API from "../services/api";
import "./ContactPage.css";

function ContactPage() {
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        API.get("/contact").then(res => setMessages(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post("/contact", form).then(() => {
            setStatus("Message sent successfully!");
            setForm({ name: "", email: "", subject: "", message: "" });
            fetchMessages();
            setTimeout(() => setStatus(""), 3000);
        });
    };

    const deleteMessage = (id) => {
        API.delete(`/contact/${id}`).then(fetchMessages);
    };

    return (
        <section id="contact" className="contact-page section-padding">
            <div className="container">
                <header className="page-header">
                    <h2 className="glow-text">Get In <span className="highlight">Touch</span></h2>
                    <p>Have a project in mind? Let's talk.</p>
                </header>

                <div className="contact-grid">
                    <section className="contact-form-section glass">
                        <h3>Send a Message</h3>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <input
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="user1@gmail.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                placeholder="Subject"
                                value={form.subject}
                                onChange={e => setForm({ ...form, subject: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Message"
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Send Message</button>
                            {status && <p className="status-msg">{status}</p>}
                        </form>
                    </section>

                    <section className="messages-section glass">
                        <h3>Recent Messages</h3>
                        <div className="messages-list">
                            {messages.length > 0 ? messages.map(msg => (
                                <div key={msg.id} className="message-card">
                                    <div className="msg-header">
                                        <h4>{msg.name}</h4>
                                        <span>{msg.email}</span>
                                    </div>
                                    <p className="msg-subject">{msg.subject}</p>
                                    <p className="msg-body">{msg.message}</p>
                                    <button onClick={() => deleteMessage(msg.id)} className="delete-small">&times;</button>
                                </div>
                            )) : (
                                <p className="no-msgs">No messages yet.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;
