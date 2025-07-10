import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  BatteryCharging, 
  Wrench, 
  LightbulbIcon, 
  Network, 
  Shield, 
  Home,
  Building2,
  Factory,
  ChevronRight,
  Phone,
  ShieldCheck,
  Award,
  Clock
} from 'lucide-react';
import { cn } from '../utils/cn';
import HomeTestimonials from '../components/testimonials/HomeTestimonials';

const services = [
  {
    title: 'Électricité générale',
    description: 'Installation, mise aux normes et dépannage électrique pour particuliers et professionnels',
    icon: LightbulbIcon,
    features: [
      'Diagnostic complet de l\'installation',
      'Mise aux normes NF C 15-100',
      'Installation de tableaux électriques',
      'Raccordement d\'appareils',
    ],
    image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Bornes de recharge IRVE',
    description: 'Installation certifiée de bornes de recharge pour véhicules électriques.',
    icon: BatteryCharging,
    features: [
      'Étude technique personnalisée',
      'Installation aux normes IRVE',
      'Configuration et mise en service',
      'Maintenance préventive',
    ],
    image: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Domotique',
    description: 'Solutions intelligentes pour le contrôle et l\'automatisation de votre habitat.',
    icon: Home,
    features: [
      'Éclairage intelligent',
      'Contrôle du chauffage',
      'Gestion des volets',
      'Systèmes de sécurité',
    ],
    image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Réseaux informatiques',
    description: 'Installation et configuration de réseaux VDI professionnels.',
    icon: Network,
    features: [
      'Câblage structuré',
      'Installation fibre optique',
      'Configuration réseau',
      'Tests et certification',
    ],
    image: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
];

const clientTypes = [
  {
    title: 'Particuliers',
    description: 'Solutions sur mesure pour votre maison',
    icon: Home,
    color: 'bg-primary-100 text-primary-600',
  },
  {
    title: 'Professionnels',
    description: 'Services adaptés aux entreprises',
    icon: Building2,
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    title: 'Industriels',
    description: 'Solutions pour sites industriels',
    icon: Factory,
    color: 'bg-accent-100 text-accent-600',
  },
];

const benefits = [
  {
    title: 'Expertise Certifiée',
    description: 'Plus de 15 ans d\'expérience et certifications reconnues dans le domaine électrique',
    icon: Award,
  },
  {
    title: 'Qualité Garantie',
    description: 'Installations conformes aux normes avec garantie de satisfaction client',
    icon: ShieldCheck,
  },
  {
    title: 'Service Réactif',
    description: 'Intervention rapide et support technique disponible 7j/7',
    icon: Clock,
  },
];

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

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=1600')] opacity-15 bg-cover bg-center mix-blend-overlay" />
        
        {/* Logo 360° Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pattern de logos avec rotations multiples */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png)
            `,
            backgroundSize: '120px 120px, 120px 120px, 120px 120px, 120px 120px, 120px 120px, 120px 120px, 120px 120px, 120px 120px',
            backgroundPosition: `
              0% 0%,
              25% 15%,
              50% 30%,
              75% 45%,
              100% 60%,
              20% 75%,
              60% 90%,
              90% 10%
            `,
            backgroundRepeat: 'repeat',
            opacity: 0.15,
            transform: 'rotate(0deg)',
            animation: 'logoRotate 120s linear infinite'
          }} />
          
          {/* Deuxième couche avec rotation inverse */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png),
              url(/image.png)
            `,
            backgroundSize: '80px 80px, 80px 80px, 80px 80px, 80px 80px, 80px 80px',
            backgroundPosition: `
              10% 20%,
              40% 50%,
              70% 80%,
              85% 25%,
              15% 70%
            `,
            backgroundRepeat: 'repeat',
            opacity: 0.08,
            transform: 'rotate(180deg)',
            animation: 'logoRotateReverse 180s linear infinite'
          }} />
          
          {/* Troisième couche avec rotation diagonale */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              url(/image.png),
              url(/image.png),
              url(/image.png)
            `,
            backgroundSize: '100px 100px, 100px 100px, 100px 100px',
            backgroundPosition: `
              30% 10%,
              65% 40%,
              5% 85%
            `,
            backgroundRepeat: 'repeat',
            opacity: 0.12,
            transform: 'rotate(45deg)',
            animation: 'logoRotateDiagonal 150s linear infinite'
          }} />
        </div>
        
        <div className="container relative py-20 md:py-28">
          <motion.div 
            className="max-w-2xl relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-primary-400/20 text-primary-100 text-sm font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Électricien certifié IRVE
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg [text-shadow:_2px_2px_10px_rgb(0_0_0_/_20%)]">
              Solutions électriques professionnelles à Lyon et partout en France
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              Installations électriques, bornes de recharge, réseaux et domotique par des experts qualifiés pour particuliers et professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 font-medium">
                Demander un devis
              </Link>
              <Link to="/services" className="btn bg-primary-600 text-white hover:bg-primary-700 border border-primary-500 px-6 py-3 font-medium">
                Découvrir nos services
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services section */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nos services d'électricité</h2>
            <p className="text-lg text-gray-600">
              Découvrez notre gamme complète de services électriques assurés par des professionnels qualifiés et certifiés.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="card p-6 hover:shadow-elevation-3 transition-shadow"
              >
                <div className={cn("p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5", service.color)}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA IRVE */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="bg-primary-600 rounded-xl overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Installation de bornes de recharge pour véhicules électriques</h2>
                <p className="mb-6 text-primary-100">
                  Notre équipe certifiée IRVE (Infrastructure de Recharge pour Véhicules Électriques) vous accompagne dans l'installation de bornes de recharge pour votre domicile ou votre entreprise.
                </p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">✓</span>
                    <span>Installation conforme aux normes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">✓</span>
                    <span>Certification IRVE pour accéder aux aides financières</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">✓</span>
                    <span>Solutions pour particuliers et professionnels</span>
                  </li>
                </ul>
                <Link to="/irve" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Découvrir nos solutions IRVE
                </Link>
              </div>
              <div className="lg:w-1/2 relative">
                <img
                  src="https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Borne de recharge pour véhicule électrique"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pourquoi choisir Zdec ?</h2>
            <p className="text-lg text-gray-600">
              Notre engagement envers l'excellence et notre expertise technique font de nous votre partenaire de confiance pour tous vos projets électriques.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="bg-primary-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-5">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Add HomeTestimonials component */}
      <HomeTestimonials />

      {/* Contact CTA */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin d'un électricien qualifié ?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet ou pour une intervention rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="btn btn-primary px-8 py-3 text-base"
              >
                Nous contacter
              </Link>
              <a 
                href="tel:+33622802645"
                className="btn btn-outline px-8 py-3 text-base flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                +33 06 22 80 26 45
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;