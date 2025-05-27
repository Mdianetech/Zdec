import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BatteryCharging, 
  Check, 
  CreditCard, 
  HelpCircle, 
  Award, 
  Zap, 
  Clock, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useState } from 'react';

const IrvePage = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    },
  };

  const irveFeatures = [
    {
      icon: ShieldCheck,
      title: 'Installation certifiée',
      description: 'En tant que professionnel certifié IRVE, nous garantissons une installation conforme aux normes de sécurité.'
    },
    {
      icon: Zap,
      title: 'Solutions sur mesure',
      description: 'De la simple Wallbox domestique aux stations multiples pour entreprises, nous adaptons chaque installation.'
    },
    {
      icon: CreditCard,
      title: 'Aides financières',
      description: 'Notre certification IRVE vous permet de bénéficier de crédits d\'impôt et subventions disponibles.'
    },
    {
      icon: Clock,
      title: 'Maintenance préventive',
      description: 'Service de maintenance régulière pour assurer la durabilité et l\'efficacité de votre installation.'
    },
  ];

  const clientTypes = [
    {
      title: 'Particuliers',
      features: [
        'Installation pour maison individuelle',
        'Branchement sur tableau électrique existant',
        'Mise aux normes si nécessaire',
        'Configuration adaptée à votre véhicule',
      ],
      image: 'https://images.pexels.com/photos/5263359/pexels-photo-5263359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Professionnels',
      features: [
        'Bornes pour flotte d\'entreprise',
        'Solutions de comptage et facturation',
        'Installation sur parkings professionnels',
        'Maintenance et suivi continu',
      ],
      image: 'https://images.pexels.com/photos/4329322/pexels-photo-4329322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Syndics & Copropriétés',
      features: [
        'Installation collective en immeuble',
        'Gestion des accès et droits d\'utilisation',
        'Répartition des coûts entre copropriétaires',
        'Conformité avec les nouvelles réglementations',
      ],
      image: 'https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'Quelle est la différence entre les différentes puissances de charge ?',
      answer: 'Les bornes domestiques proposent généralement 3.7kW (charge lente) à 22kW (charge rapide). Le temps de charge varie en fonction de la puissance : une charge complète peut prendre de 1h à 8h selon la capacité de votre borne et de votre véhicule.'
    },
    {
      id: 2,
      question: 'Suis-je éligible aux aides financières pour l\'installation d\'une borne ?',
      answer: 'Oui, plusieurs aides sont disponibles : crédit d\'impôt (jusqu\'à 300€), programme ADVENIR (jusqu\'à 960€ pour les particuliers, davantage pour les professionnels), et certaines aides locales. Notre certification IRVE vous permet d\'accéder à ces subventions.'
    },
    {
      id: 3,
      question: 'L\'installation d\'une borne nécessite-t-elle des travaux importants ?',
      answer: 'Cela dépend de votre installation électrique actuelle. Dans certains cas, une simple connexion au tableau électrique suffit. Dans d\'autres situations, une mise aux normes ou un renforcement du système électrique peut être nécessaire. Nous réalisons systématiquement une visite technique pour évaluer ces besoins.'
    },
    {
      id: 4,
      question: 'Combien de temps dure l\'installation d\'une borne de recharge ?',
      answer: 'Pour une installation standard dans une maison individuelle, comptez généralement une demi-journée à une journée. Pour des installations en copropriété ou plus complexes, les délais peuvent être plus importants, notamment en raison des validations administratives nécessaires.'
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/15001445/pexels-photo-15001445.jpeg?auto=compress&cs=tinysrgb&w=1600')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="container relative py-20 md:py-28">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/20 p-1.5 rounded-full">
                <BatteryCharging className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">Installateur certifié IRVE</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Installation de bornes de recharge pour véhicules électriques
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Confiez l'installation de votre borne de recharge à un professionnel certifié IRVE pour une solution sûre, efficace et éligible aux aides financières.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 font-medium">
                Demander un devis
              </Link>
              <Link to="/contact" className="btn bg-transparent text-white hover:bg-white/10 border border-white px-6 py-3 font-medium">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 p-2 rounded-full">
                <BatteryCharging className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              L'expertise IRVE à votre service
            </h2>
            <p className="text-lg text-gray-600">
              Notre certification IRVE (Infrastructure de Recharge pour Véhicules Électriques) 
              vous garantit une installation sécurisée et aux normes, réalisée par des professionnels qualifiés.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {irveFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="card p-6 hover:shadow-elevation-3 transition-shadow"
              >
                <div className="p-3 rounded-full w-14 h-14 flex items-center justify-center bg-primary-100 text-primary-600 mb-5">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 p-2 rounded-full">
                <HelpCircle className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir sur l'installation de bornes de recharge 
              pour véhicules électriques par un professionnel certifié IRVE.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {faqItems.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-gray-500 transition-transform duration-200",
                        openFaqId === item.id && "transform rotate-180"
                      )} 
                    />
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: openFaqId === item.id ? "auto" : 0,
                      opacity: openFaqId === item.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à installer votre borne de recharge ?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite et un devis personnalisé. 
              Notre équipe certifiée IRVE est à votre disposition pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 font-medium">
                Demander un devis
              </Link>
              <Link to="/contact" className="btn bg-primary-700 hover:bg-primary-800 border border-primary-500 px-8 py-3 font-medium">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default IrvePage;