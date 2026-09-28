import { useEffect, useState } from "react";
import { profile, skills, projects } from "./data.js";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [active, setActive] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    // Highlight "Contact" when the page is scrolled to the very bottom
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="wrap header-in">
          <a href="#top" className="brand">
            {profile.name}
          </a>

          <nav aria-label="Sections" className="nav">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? "on" : ""}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="profile-image-button"
            onClick={() => setShowProfile(true)}
            aria-label="View profile image"
          >
            <img
              src="/Images/profile-image.jpeg"
              alt={`${profile.name} profile`}
              className="profile-image"
            />
          </button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="wrap">
          <h1 className="title">{profile.name}</h1>
          <p className="designation">{profile.role}</p>
          <p className="intro">{profile.intro}</p>
          <div className="cta">
            <a className="btn primary" href="#projects">View projects</a>
            <a className="btn" href="#contact">Contact me</a>
          </div>
        </div>
      </section>

      <main className="wrap main">
        <section id="about">
          <h2>About</h2>
          {profile.about.map((p, i) => <p key={i} className="body">{p}</p>)}
          <dl className="facts">
            {profile.facts.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          {skills.map((g) => (
            <div className="skill-row" key={g.group}>
              <h3>{g.group}</h3>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </section>

        <section id="projects">
          <h2>Projects</h2>
          {projects.map((p) => (
            <article className="project" key={p.title}>
              <div className="project-head">
                <h3>{p.title}</h3>
                <span className="year">{p.year}</span>
              </div>
              <p className="body">{p.description}</p>
              <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              {/* <div className="project-links">
                <a href={p.live} target="_blank" rel="noreferrer">View live site</a>
                <a href={p.code} target="_blank" rel="noreferrer">View source code</a>
              </div> */}
            </article>
          ))}
        </section>

        <section id="contact">
          <h2>Contact me</h2>
          <p className="body">
            I’m open to full-stack roles and interesting projects. Reach out
            through any of the channels below and I’ll get back to you soon.
          </p> 

          <div className="contact-grid">
            <ul className="contact-info">
              <li>
                <a className="contact-card" href={`mailto:${profile.email}`}>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  className="contact-card"
                  href="tel:+919610781347"
                >
                  <span className="contact-label">Mobile No.</span>
                  <span className="contact-value">+91 96107 81347</span>
                </a>
              </li>
            </ul>

            <div className="location-card">
              <span className="location-icon" aria-hidden="true"> 📍 </span>
              <div className="location-text">
                <span className="location-address">{profile.address}</span>
                <span className="location-city"> <b>City: -</b> {profile.city}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <div>
            <p className="footer-name">{profile.name}</p>
            <p className="footer-role">{profile.role}</p>
          </div>

          <div className="links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>

        <p className="wrap copy">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>

      {showProfile && (
        <div className="image-modal" onClick={() => setShowProfile(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="image-modal-close"
              onClick={() => setShowProfile(false)}
              aria-label="Close image"
            >
              ×
            </button>

            <img
              src="/Images/profile-image.jpeg"
              alt={`${profile.name} full profile`}
              className="full-profile-image"
              draggable="false"
            />
          </div>
        </div>
      )}
    </>
  );
}