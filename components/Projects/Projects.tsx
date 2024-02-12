'use client';

import { motion } from 'framer-motion';
import ProjectItem from './ProjectItem';
import { projects } from './constants';

export default function Projects() {
  return (
    <>
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: index / 10 }}
        >
          <ProjectItem index={index} title={project.title} url={project.url} role={project.role} />
        </motion.div>
      ))}
    </>
  );
}
