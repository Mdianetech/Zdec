import React from 'react';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Your projects will appear here.</p>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;