import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import './Projects.css'

function ProjectCard({ project, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <button className="project-card-header" onClick={onToggle}>
        <div>
          <h3>{project.title}</h3>
          <p className="project-tagline">{project.tagline}</p>
          <div className="project-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
            <span className={`status status-${project.status}`}>
              {project.status === 'built' ? 'Live' : 'In progress'}
            </span>
          </div>
        </div>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>&#9662;</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="project-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{project.summary}</p>
            <div className="project-links">
              {project.links.repo ? (
                <a href={project.links.repo}>View repo &rarr;</a>
              ) : (
                <span className="link-placeholder">Repo coming soon</span>
              )}
              {project.links.demo && (
                <a href={project.links.demo}>Live demo &rarr;</a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="projects" className="projects snap-page">
      <div className="snap-page-inner">
        <h2>Projects</h2>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOpen={openId === project.id}
              onToggle={() => setOpenId(openId === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
