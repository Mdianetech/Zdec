import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, FileText, Image, Layout, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('general');

  const sections = [
    { id: 'general', name: 'Paramètres généraux', icon: Settings },
    { id: 'users', name: 'Gestion des utilisateurs', icon: Users },
    { id: 'content', name: 'Contenu des pages', icon: FileText },
    { id: 'media', name: 'Médiathèque', icon: Image },
    { id: 'layout', name: 'Mise en page', icon: Layout },
    { id: 'security', name: 'Sécurité', icon: Shield },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Administration</h1>
        <div className="flex gap-4">
          <Link to="/" className="btn btn-outline">
            Voir le site
          </Link>
          <button className="btn btn-primary">
            Sauvegarder les modifications
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={`p-6 rounded-lg border transition-all ${
              selectedSection === section.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
            }`}
          >
            <section.icon className={`h-8 w-8 mb-4 ${
              selectedSection === section.id
                ? 'text-primary-500'
                : 'text-gray-400'
            }`} />
            <h3 className="font-medium">{section.name}</h3>
          </button>
        ))}
      </div>

      <div className="mt-8">
        {selectedSection === 'general' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Paramètres généraux</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du site
                </label>
                <input
                  type="text"
                  className="input w-full"
                  defaultValue="Zdec"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="input w-full"
                  rows={3}
                  defaultValue="Électricien certifié IRVE à Lyon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de contact
                </label>
                <input
                  type="email"
                  className="input w-full"
                  defaultValue="contact@zdec.fr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="input w-full"
                  defaultValue="+33 06 22 80 26 45"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;