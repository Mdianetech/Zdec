import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';
import BrandIconContainer from '../components/ui/BrandIconContainer';

const services = [
  {
    title: 'Installation électrique',
    description: 'Installation complète, mise aux normes et rénovation de votre système électrique par des techniciens qualifiés.',
    icon: LightbulbIcon,
    images: [
      'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/257886/pexels-photo-257886.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-162539.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    features: [
      'Diagnostic complet de l\'installation existante',
      'Mise aux normes NF C 15-100 certifiée',
      'Installation et rénovation de tableaux électriques',
      'Raccordement sécurisé d\'appareils électriques',
    ],
  },
  {
    title: 'Bornes de recharge IRVE',
    description: 'Installation certifiée de bornes de recharge pour véhicules électriques.',
    icon: BatteryCharging,
    images: [
      '/edf61b3d-67aa-467b-86c6-4fcb836ea43c.jpeg',
      '/af7d00c0-ac68-4e24-94eb-fb3210a07c30.jpeg',
      '/83k4kH4Gyz9l7Pl-IsfmA.jpg',
      '/1IKcYkXwVoGCjDIsD5vsI.jpg'
    ],
    features: [
      'Étude technique personnalisée',
      'Installation aux normes IRVE',
      'Configuration et mise en service',
      'Maintenance préventive',
    ],
  },
  {
    title: 'Domotique',
    description: 'Solutions intelligentes pour le contrôle et l&apos;automatisation de votre habitat.',
    icon: Home,
    images: [
      'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    features: [
      'Éclairage intelligent',
      'Contrôle du chauffage',
      'Gestion des volets',
      'Systèmes de sécurité',
    ],
  },
  {
    title: 'Réseaux informatiques',
    description: 'Installation et configuration de réseaux VDI professionnels.',
    icon: Network,
    images: [
      'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    features: [
      'Câblage structuré',
      'Installation fibre optique',
      'Configuration réseau',
      'Tests et certification',
    ],
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

const certifications = [
  {
    title: 'Certification IRVE',
    description: 'Installateur agréé pour bornes de recharge',
    icon: Shield,
  },
  {
    title: 'Qualifelec',
    description: 'Certification qualité en électricité',
    icon: Shield,
  },
  {
    title: 'RGE',
    description: 'Reconnu Garant de l&apos;Environnement',
    icon: Shield,
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

const ServicesPage = () => {
  // Component pour le carrousel d'images
  const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change d'image toutes les 3 secondes

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="relative h-64 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out",
              index === currentImageIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            )}
          />
        ))}
        
        {/* Indicateurs de pagination */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentImageIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/257886/pexels-photo-257886.jpeg?auto=compress&cs=tinysrgb&w=1600')] opacity-15 bg-cover bg-center mix-blend-overlay" />
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
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-primary-100 font-medium">Services professionnels</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Solutions électriques complètes pour tous vos besoins
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              De l&apos;installation électrique à la domotique, en passant par les bornes de recharge, 
              découvrez notre gamme complète de services professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 font-medium">
                Demander un devis
              </Link>
              <Link to="/contact" className="btn bg-primary-600 text-white hover:bg-primary-700 border border-primary-500 px-6 py-3 font-medium">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nos services d&apos;électricité
            </h2>
            <p className="text-lg text-gray-600">
              Une gamme complète de services électriques assurés par des professionnels 
              qualifiés et certifiés pour répondre à tous vos besoins.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card overflow-hidden group"
              >
                <ImageCarousel images={service.images} title={service.title} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BrandIconContainer 
                      icon={service.icon} 
                      variant="gradient" 
                      size="sm" 
                    />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <ChevronRight className="h-4 w-4 text-primary-600" />
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact" 
                    className="btn btn-outline w-full justify-center"
                  >
                    En savoir plus
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Solutions adaptées à chaque client</h2>
            <p className="text-lg text-gray-600">
              Que vous soyez un particulier, une entreprise ou un site industriel, 
              nous avons les solutions adaptées à vos besoins spécifiques.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {clientTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-6 hover:shadow-elevation-3 transition-shadow"
              >
                <div className="mb-6">
                  <BrandIconContainer 
                    icon={type.icon} 
                    variant={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"} 
                    size="lg" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Nos certifications</h2>
            <p className="text-lg text-gray-600">
              Notre expertise est reconnue par les organismes de certification les plus exigeants.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="mx-auto mb-6">
                  <BrandIconContainer 
                    icon={cert.icon} 
                    variant="outline" 
                    size="lg" 
                    shape="circle"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins 
              et obtenir un devis personnalisé.
            </p>
            <Link 
              to="/contact"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
            >
              Demander un devis gratuit
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;