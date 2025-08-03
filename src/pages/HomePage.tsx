import { useState } from 'react';
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
  Clock,
  X,
  ZoomIn
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
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800 text-white overflow-hidden flex items-center" style={{ minHeight: '100vh' }}>
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
        
        <div className="container relative" style={{ paddingTop: 'clamp(5rem, 15vh, 10rem)', paddingBottom: 'clamp(5rem, 15vh, 10rem)' }}>
          <motion.div 
            className="max-w-4xl relative z-10 text-center mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium"
              style={{ 
                padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                marginBottom: 'clamp(1rem, 4vw, 2rem)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Zap className="mr-2" style={{ width: 'clamp(0.75rem, 2vw, 1rem)', height: 'clamp(0.75rem, 2vw, 1rem)' }} />
              Électricien certifié IRVE
            </motion.span>
            <h1 className="font-bold leading-tight text-white" style={{ 
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
              marginBottom: 'clamp(1rem, 4vw, 2rem)'
            }}>
              <span className="block">Solutions électriques</span>
              <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                professionnelles
              </span>
              <span className="block font-normal text-gray-200" style={{ 
                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                marginTop: 'clamp(0.5rem, 2vw, 1rem)'
              }}>
                à Lyon et partout en France
              </span>
            </h1>
            <p className="text-gray-200 max-w-3xl mx-auto leading-relaxed" style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              marginBottom: 'clamp(2rem, 6vw, 3rem)'
            }}>
              Installations électriques, bornes de recharge, réseaux et domotique par des experts qualifiés pour particuliers et professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Demander un devis
              </Link>
              <Link to="/services" className="btn bg-transparent text-white hover:bg-white/10 border-2 border-white/30 hover:border-white/50 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300">
                Découvrir nos services
              </Link>
            </div>
            
            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/20"
              style={{ 
                marginTop: 'clamp(2rem, 8vw, 4rem)',
                paddingTop: 'clamp(2rem, 8vw, 4rem)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>15+</div>
                <div className="text-gray-300" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>500+</div>
                <div className="text-gray-300" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>100%</div>
                <div className="text-gray-300" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Clients satisfaits</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Services section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        
        <div className="container">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 sm:px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              NOS EXPERTISES
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-900">
              Services d'électricité <span className="text-primary-600">de qualité</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Découvrez notre gamme complète de services électriques assurés par des professionnels qualifiés et certifiés.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BrandIconContainer 
                        icon={service.icon} 
                        variant="gradient" 
                        size="md" 
                      />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-900 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{service.description}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-xs sm:text-sm md:text-base text-primary-600 font-semibold hover:text-primary-700 group-hover:gap-3 transition-all duration-300"
                    >
                      En savoir plus 
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Ils nous font confiance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center opacity-60">
              <div className="flex items-center justify-center">
                <Shield className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500 text-sm sm:text-base">IRVE</span>
              </div>
              <div className="flex items-center justify-center">
                <Award className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500 text-sm sm:text-base">Qualifelec</span>
              </div>
              <div className="flex items-center justify-center">
                <ShieldCheck className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500 text-sm sm:text-base">RGE</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-gray-400" />
                <span className="ml-2 font-semibold text-gray-500 text-sm sm:text-base">24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA IRVE */}
      <section className="py-12 sm:py-16 bg-gray-50">
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
              <div className="lg:w-1/2 p-6 sm:p-8 md:p-12 text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Installation de bornes de recharge pour véhicules électriques</h2>
                <p className="mb-6 text-sm sm:text-base text-primary-100">
                  Notre équipe certifiée IRVE (Infrastructure de Recharge pour Véhicules Électriques) vous accompagne dans l'installation de bornes de recharge pour votre domicile ou votre entreprise.
                </p>
                <ul className="mb-6 sm:mb-8 space-y-2 text-sm sm:text-base">
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
                <Link to="/irve" className="btn bg-white text-primary-600 hover:bg-gray-100 text-sm sm:text-base">
                  Découvrir nos solutions IRVE
                </Link>
              </div>
              <div className="lg:w-1/2 relative">
                <img
                  src="/1fde24ca-122c-4ea9-a8e6-2783ffaf78f9.jpeg"
                  alt="Technicien travaillant sur une installation électrique"
                  className="w-full h-64 sm:h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Pourquoi choisir Zdec ?</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Notre engagement envers l'excellence et notre expertise technique font de nous votre partenaire de confiance pour tous vos projets électriques.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
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
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Add HomeTestimonials component */}
      <HomeTestimonials />

      {/* Partners Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-500 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
              Nos Partenaires de Confiance
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ils nous font confiance
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Découvrez les entreprises et organisations qui collaborent avec nous pour offrir des solutions électriques d'excellence.
            </p>
          </motion.div>

          {/* Partners logos grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-12 sm:mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { src: "/LogoWhite-Green-BG.png", alt: "Logo ZDEC" },
              { src: "/capnord-cci.jpg.jpeg", alt: "Cap Nord CCI" },
              { src: "/capnord-rillieux-la-pape-association-pepiniere-entreprises-rillieux-la-pape_1.jpg.jpeg", alt: "Cap Nord Rillieux-la-Pape" },
              { src: "/capnord-perica.jpg.jpeg", alt: "Cap Nord Perica" },
              { src: "/capnord-capservices.jpg.jpeg", alt: "Cap Nord Services" }
            ].map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedLogo(partner.src)}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm rounded-2xl"></div>
                <div className="relative bg-white m-1 rounded-xl overflow-hidden">
                  {/* Zoom indicator */}
                  <div className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>
                  
                  <img 
                    src={partner.src}
                    alt={partner.alt}
                    className="w-full h-20 sm:h-24 object-contain transition-all duration-700 group-hover:scale-110 filter brightness-100 contrast-110"
                    style={{
                      imageRendering: 'high-quality',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  />
                  
                  {/* Overlay with subtle animation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  {/* Floating elements for modern effect */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Modern caption */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              Partenaires certifiés • Solutions professionnelles • Qualité garantie
            </p>
          </motion.div>

            {/* Animated trust indicators */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { number: "7+", label: "Partenaires actifs", color: "from-primary-500 to-primary-600" },
                { number: "100%", label: "Certifiés", color: "from-accent-500 to-accent-600" },
                { number: "5★", label: "Satisfaction", color: "from-green-500 to-green-600" },
                { number: "24/7", label: "Support", color: "from-blue-500 to-blue-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${stat.color} text-white font-bold text-lg sm:text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                      {stat.number}
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-3 group-hover:text-gray-900 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Logo Zoom Modal */}
      {selectedLogo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLogo(null)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Partenaire</h3>
                  <p className="text-primary-100 text-sm sm:text-base">Logo de notre partenaire de confiance</p>
                </div>
                <button
                  onClick={() => setSelectedLogo(null)}
                  className="p-2 sm:p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
            
            {/* Image */}
            <div className="p-4 sm:p-6 bg-gray-50">
              <img 
                src={selectedLogo} 
                alt="Logo du partenaire" 
                className="w-full h-auto rounded-xl shadow-lg max-h-96 object-contain mx-auto"
                style={{ 
                  imageRendering: 'high-quality',
                  filter: 'contrast(1.05) saturate(1.1) brightness(1.02)',
                }}
              />
            </div>
            
            {/* Footer */}
            <div className="bg-white p-4 sm:p-6 border-t border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">5+</div>
                  <div className="text-sm text-gray-600">Partenaires</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Certifiés</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">5★</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container text-center">
          <motion.div 
            className="max-w-3xl mx-auto px-4 sm:px-0"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Besoin d'un électricien qualifié ?</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet ou pour une intervention rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="btn btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base"
              >
                Nous contacter
              </Link>
              <a 
                href="tel:+33428384426" 
                className="btn btn-outline px-6 sm:px-8 py-3 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                +33 04 28 38 44 26
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;