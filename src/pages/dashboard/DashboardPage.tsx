import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ClipboardList, FileText, MessageSquare, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

// Mock data for demonstration
const projects = [
  { id: 1, title: 'Installation électrique', status: 'En cours', progress: 65, date: '15/06/2025' },
  { id: 2, title: 'Borne de recharge IRVE', status: 'En attente', progress: 25, date: '22/06/2025' },
];

const appointments = [
  { id: 1, title: 'Visite technique', date: '18/06/2025', time: '14:00 - 16:00' },
];

const quotes = [
  { id: 1, title: 'Rénovation électrique', status: 'En cours', date: '12/06/2025' },
  { id: 2, title: 'Installation bornes IRVE', status: 'Terminé', date: '05/06/2025' },
];

const DashboardPage = () => {
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  return (
    <div className="space-y-8">
      {welcomeVisible && (
        <motion.div 
          className="bg-primary-50 border border-primary-100 rounded-lg p-4 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            onClick={() => setWelcomeVisible(false)}
          >
            ×
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-primary-100 rounded-full p-3 text-primary-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bienvenue dans votre espace client</h2>
              <p className="text-gray-600">
                Votre prochaine intervention est prévue pour le 18/06/2025 à 14:00. 
                <Link to="/dashboard/appointments" className="text-primary-600 hover:text-primary-700 ml-1">
                  Voir détails
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold">Mes projets</h3>
            </div>
            <Link to="/dashboard/projects" className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </Link>
          </div>
          <div className="p-6 divide-y divide-gray-200">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{project.title}</h4>
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      project.status === 'En cours' ? "bg-primary-100 text-primary-800" : "bg-gray-100 text-gray-800"
                    )}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-500">
                      <span>Progression: {project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-500">Prochain RDV: {project.date}</div>
                      <Link to={`/dashboard/projects/${project.id}`} className="text-sm text-primary-600 hover:underline flex items-center">
                        Détails 
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Vous n'avez aucun projet en cours</p>
                <Link to="/dashboard/quotes" className="btn btn-outline">
                  Demander un devis
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quotes */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold">Mes devis</h3>
            </div>
            <Link to="/dashboard/quotes" className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </Link>
          </div>
          <div className="p-6 space-y-0 divide-y divide-gray-200">
            {quotes.map((quote) => (
              <div key={quote.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{quote.title}</h4>
                    <p className="text-sm text-gray-500">Créé le: {quote.date}</p>
                  </div>
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    quote.status === 'Terminé' ? "bg-success-100 text-success-800" : "bg-yellow-100 text-yellow-800"
                  )}>
                    {quote.status}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Link 
                to="/dashboard/quotes/new" 
                className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium p-2 border border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Demander un nouveau devis</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold">Rendez-vous</h3>
            </div>
            <Link to="/dashboard/appointments" className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </Link>
          </div>
          <div className="p-6 space-y-0 divide-y divide-gray-200">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className="min-w-10 min-h-10 rounded-md bg-primary-50 text-primary-700 flex flex-col items-center justify-center">
                      <span className="text-xs font-medium">{appointment.date.split('/')[1]}</span>
                      <span className="text-lg font-bold">{appointment.date.split('/')[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.title}</h4>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">Aucun rendez-vous à venir</p>
              </div>
            )}
            <div className="pt-4">
              <Link 
                to="/dashboard/appointments/new" 
                className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium p-2 border border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Prendre rendez-vous</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Help */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="h-5 w-5 text-primary-500" />
          <h3 className="font-semibold">Assistance et support</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <MessageSquare className="h-10 w-10 text-gray-500" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Besoin d'aide ?</h4>
              <p className="text-gray-600 text-sm mb-3">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <Link to="/dashboard/support" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                Contacter le support <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <FileText className="h-10 w-10 text-gray-500" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Ressources techniques</h4>
              <p className="text-gray-600 text-sm mb-3">
                Consultez nos guides et fiches techniques sur les installations électriques.
              </p>
              <Link to="/dashboard/resources" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                Voir les ressources <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;