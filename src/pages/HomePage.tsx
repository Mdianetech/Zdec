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
import BrandIconContainer from '../components/ui/BrandIconContainer';

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
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800 text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=1600')] opacity-10 bg-cover bg-center" />
        
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
        
        <div className="container relative py-20 md:py-32">
          <motion.div 
            className="max-w-4xl relative z-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Électricien certifié IRVE
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white">
              <span className="block">Solutions électriques</span>
              <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                professionnelles
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-normal mt-2 text-gray-200">
                à Lyon et partout en France
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Installations électriques, bornes de recharge, réseaux et domotique par des experts qualifiés pour particuliers et professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Demander un devis
              </Link>
              <Link to="/services" className="btn bg-transparent text-white hover:bg-white/10 border-2 border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300">
                Découvrir nos services
              </Link>
            </div>
            
            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-300">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-300">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300">Clients satisfaits</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Services section */}
      <section className="py-20 md:py-32 bg-white relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        
        <div className="container">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              NOS EXPERTISES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              Services d'électricité <span className="text-primary-600">de qualité</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Découvrez notre gamme complète de services électriques assurés par des professionnels qualifiés et certifiés.
            </p>
          </motion.div>

          <div className="relative">
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
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BrandIconContainer 
                        icon={service.icon} 
                        variant="gradient" 
                        size="lg" 
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group-hover:gap-3 transition-all duration-300"
                    >
                      En savoir plus 
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Ils nous font confiance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="flex items-center justify-center">
                <Shield className="h-12 w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500">IRVE</span>
              </div>
              <div className="flex items-center justify-center">
                <Award className="h-12 w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500">Qualifelec</span>
              </div>
              <div className="flex items-center justify-center">
                <ShieldCheck className="h-12 w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500">RGE</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="h-12 w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500">24/7</span>
              </div>
            </div>
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
                <div className="mx-auto mb-5">
                  <BrandIconContainer 
                    icon={benefit.icon} 
                    variant="primary" 
                    size="lg" 
                    shape="circle"
                  />
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