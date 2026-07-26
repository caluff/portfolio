const projects = [
  { title: "Orbit", description: "Un dashboard financiero para decisiones claras.", kind: "Fintech / Producto digital", color: "lime", mark: "◒" },
  { title: "Mono Studio", description: "Una identidad web para un estudio independiente.", kind: "Branding / Desarrollo web", color: "rose", mark: "✳" },
  { title: "Archivo", description: "Una biblioteca digital para historias locales.", kind: "Editorial / UX UI", color: "blue", mark: "↗" },
  { title: "Borde", description: "Comercio de objetos hechos para durar.", kind: "E-commerce / Frontend", color: "sand", mark: "□" },
];

const contactLinks = [
  ["◈", "GitHub", "#"],
  ["in", "LinkedIn", "#"],
  ["𝕏", "X / Twitter", "#"],
  ["✉", "Mail", "mailto:hola@caluff.studio"],
  ["↗", "CV", "#"],
];

export default function Home() {
  return (
    <main className="portfolio-shell" id="inicio">
      <div className="page-grid" aria-hidden="true" />
      <div className="portfolio-column">
        <header className="topbar">
          <a className="wordmark" href="#inicio">Caluff</a>
          <nav aria-label="Navegación principal">
            <a className="active" href="#inicio">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">More</a>
            <button type="button" aria-label="Cambiar tema">☼</button>
          </nav>
        </header>

        <Glitch
          className="cover-glitch"
          intensity={0.65}
          interval={5}
          duration={0.28}
          slices={15}
          shift={14}
          rgbShift={2}
          blocks={0.22}
          noise={0.18}
        >
          <section className="cover" aria-label="Portada decorativa">
            <div className="cover-sun" />
            <div className="cover-mountain mountain-one" />
            <div className="cover-mountain mountain-two" />
            <div className="cover-waterfall" />
            <div className="cover-trees trees-left" />
            <div className="cover-trees trees-right" />
            <span>CALUFF / DIGITAL GARDEN</span>
          </section>
        </Glitch>

        <section className="identity">
          <div className="avatar" aria-label="Avatar temporal"><span>CA</span></div>
          <div className="identity-copy">
            <span className="status-dot" aria-hidden="true" />
            <h1>Caluff</h1>
            <p className="role">Diseñador & desarrollador</p>
            <p className="location">Montevideo, Uruguay</p>
          </div>
          <p className="views">◉&nbsp; 0000</p>
        </section>

        <section className="content-section about" id="about">
          <h2>About</h2>
          <ul>
            <li>Diseño productos digitales en los que la estética y la utilidad tienen el mismo peso.</li>
            <li>Me gusta convertir ideas complejas en interfaces claras, rápidas y con personalidad.</li>
            <li>Trabajo con diseño, código y mucha atención a los detalles que casi nadie nota, pero todos sienten.</li>
          </ul>
        </section>

        <section className="content-section contact" id="contact">
          <h2>Contact</h2>
          <div className="contact-list">
            {contactLinks.map(([icon, label, href]) => (
              <a href={href} key={label}><span className="contact-icon">{icon}</span><strong>{label}</strong><i>↗</i></a>
            ))}
          </div>
        </section>

        <section className="content-section projects" id="projects">
          <div className="section-heading"><h2>Projects</h2><a href="#projects">View all&nbsp; ↗</a></div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className={`project-art ${project.color}`}><span>{project.mark}</span><b>{project.title}</b><i>2026</i></div>
                <div className="project-info"><h3>{project.title}</h3><a href="#contact" aria-label={`Ver ${project.title}`}>↗</a><p>{project.description}</p><small>{project.kind}</small></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
import { Glitch } from "@/components/canvasui/Glitch";
