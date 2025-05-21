import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

const ResourcesPage = () => {
  const resources = [
    {
      title: 'Guide Installation IRVE',
      description: 'Guide complet pour l&apos;installation de bornes de recharge pour véhicules électriques.',
      type: 'PDF',
      size: '2.4 MB',
      category: 'Technique'
    },
    {
      title: 'Normes Électriques 2024',
      description: 'Mise à jour des normes électriques résidentielles et commerciales.',
      type: 'PDF',
      size: '1.8 MB',
      category: 'Réglementation'
    },
    {
      title: 'Maintenance Préventive',
      description: 'Checklist pour la maintenance des installations électriques.',
      type: 'PDF',
      size: '956 KB',
      category: 'Maintenance'
    },
    {
      title: 'Économies d&apos;Énergie',
      description: 'Guide des bonnes pratiques pour réduire sa consommation électrique.',
      type: 'PDF',
      size: '1.2 MB',
      category: 'Guide'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Ressources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <FileText className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{resource.title}</h3>
                      <span className="text-sm text-gray-500">{resource.category}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600">{resource.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {resource.type}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{resource.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="btn btn-outline flex-1 flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger
                </button>
                <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Consulter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourcesPage;