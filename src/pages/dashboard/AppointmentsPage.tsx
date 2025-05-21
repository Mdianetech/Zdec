import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

const AppointmentsPage = () => {
  const appointments = [
    {
      id: 1,
      title: 'Installation Borne IRVE',
      date: '2024-02-20',
      time: '14:00',
      client: 'Jean Dupont',
      location: '123 Rue de Paris, Lyon',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Diagnostic Électrique',
      date: '2024-02-22',
      time: '10:00',
      client: 'Marie Martin',
      location: '45 Avenue des Fleurs, Lyon',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Mise aux Normes',
      date: '2024-02-18',
      time: '09:30',
      client: 'Pierre Durand',
      location: '78 Boulevard Central, Lyon',
      status: 'completed'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
        <button className="btn btn-primary">
          Nouveau rendez-vous
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{appointment.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'upcoming' 
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {appointment.status === 'upcoming' ? 'À venir' : 'Terminé'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>{appointment.date}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>{appointment.time}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-3" />
                  <span>{appointment.client}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{appointment.location}</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="btn btn-outline flex-1">
                  Modifier
                </button>
                <button className="btn btn-primary flex-1">
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AppointmentsPage;