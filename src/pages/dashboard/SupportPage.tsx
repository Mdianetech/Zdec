import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, HelpCircle } from 'lucide-react';

const SupportPage = () => {
  const faqs = [
    {
      question: 'Comment puis-je suivre l&apos;avancement de mon projet ?',
      answer: 'Vous pouvez suivre l&apos;avancement de votre projet dans la section "Mes Projets" de votre tableau de bord. Chaque étape est détaillée avec son statut actuel.'
    },
    {
      question: 'Comment modifier un rendez-vous ?',
      answer: 'Pour modifier un rendez-vous, accédez à la section "Rendez-vous" et cliquez sur le bouton "Modifier" du rendez-vous concerné. Vous pourrez alors choisir une nouvelle date.'
    },
    {
      question: 'Comment obtenir une facture ?',
      answer: 'Les factures sont disponibles dans la section "Documents" de votre espace client. Vous pouvez les télécharger au format PDF.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Support</h1>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold">Chat en direct</h3>
              <p className="text-sm text-gray-500">Réponse en quelques minutes</p>
            </div>
          </div>
          <button className="btn btn-primary w-full">
            Démarrer le chat
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Phone className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold">Téléphone</h3>
              <p className="text-sm text-gray-500">Lun-Ven, 8h-18h</p>
            </div>
          </div>
          <button className="btn btn-primary w-full">
            04 XX XX XX XX
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-500">Réponse sous 24h</p>
            </div>
          </div>
          <button className="btn btn-primary w-full">
            Envoyer un email
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold">Questions fréquentes</h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportPage;