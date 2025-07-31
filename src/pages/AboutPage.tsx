import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Zap, Shield, Linkedin, X } from 'lucide-react';
import BrandIconContainer from '../components/ui/BrandIconContainer';

const AboutPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [teamMembers] = useState([
    {
      name: 'AZZOUZ MOUFID',
      role: 'Président',
      image: '/Photo Moufid (1).jpg',
      description: 'Expert en installations électriques avec plus de 15 ans d\'expérience dans le secteur.',
      linkedin: 'https://www.linkedin.com/in/azzouz-moufid',
      cropPosition: { x: 50, y: 50 }
    },
    {
      name: 'Rami Bouchedda',
      role: 'Directeur des Relations',
      image: '/files_2655144-1748866352955-files_2655144-1748866279307-1W9A4080.jpg',
      description: 'Spécialiste des relations clients et de la coordination des projets.',
      linkedin: 'https://www.linkedin.com/in/rami-bouchedda-7b03a318a/',
      cropPosition: { x: 50, y: 30 }
    }
  ]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de Zdec</h1>
            <p className="text-lg text-primary-100">
              Une entreprise d&apos;électricité engagée dans l&apos;excellence et l&apos;innovation, 
              au service de vos projets électriques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Notre Mission
              </div>
              <h2 className="text-3xl font-bold">Électrifier l&apos;avenir avec expertise</h2>
              <p className="text-gray-600">
                Nous nous engageons à fournir des solutions électriques innovantes et durables, 
                en mettant l&apos;accent sur la qualité, la sécurité et la satisfaction client.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Notre Vision
              </div>
              <h2 className="text-3xl font-bold">Leader en solutions électriques</h2>
              <p className="text-gray-600">
                Devenir la référence en matière d&apos;installations électriques et de solutions IRVE, 
                en alliant expertise technique et service client d&apos;excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              Notre Équipe
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une équipe d&apos;experts à votre service
            </h2>
            <p className="text-lg text-gray-600">
              Des professionnels qualifiés et passionnés, dédiés à la réussite de vos projets électriques.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-primary-200"
              >
                <div 
                  className="relative h-80 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(member.image)}
                >
                  {/* Gradient overlay for modern effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Profile image with modern styling */}
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-105 contrast-105 saturate-110"
                    style={{
                      objectPosition: member.name === 'AZZOUZ MOUFID' 
                        ? 'center 20%' 
                        : member.name === 'Rami Bouchedda' 
                        ? 'center 15%' 
                        : `${member.cropPosition.x}% ${member.cropPosition.y}%`
                    }}
                  />
                  
                  {/* Modern decorative elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-6 h-6 border-2 border-white rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Bottom gradient for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Name overlay on hover */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-white/90 text-sm">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  {/* Decorative accent line */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{member.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <p className="text-primary-600 font-semibold text-sm uppercase tracking-wide">{member.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">{member.description}</p>
                  
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 hover:from-primary-100 hover:to-primary-200 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <Linkedin className="h-4 w-4" />
                    Voir le profil LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Nos Valeurs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Les valeurs qui nous animent
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-6">
                <BrandIconContainer 
                  icon={Shield} 
                  variant="primary" 
                  size="lg" 
                  shape="circle"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l&apos;excellence dans chaque projet, avec un souci constant de la qualité 
                et de la satisfaction client.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-6">
                <BrandIconContainer 
                  icon={Users} 
                  variant="secondary" 
                  size="lg" 
                  shape="circle"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Professionnalisme</h3>
              <p className="text-gray-600">
                Notre équipe d&apos;experts qualifiés s&apos;engage à fournir un service professionnel 
                et des solutions adaptées.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-6">
                <BrandIconContainer 
                  icon={Zap} 
                  variant="gradient" 
                  size="lg" 
                  shape="circle"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Nous restons à la pointe de la technologie pour vous offrir les solutions 
                les plus innovantes et efficaces.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img 
              src={selectedImage} 
              alt="" 
              className="w-full h-auto rounded-lg"
              style={{ maxHeight: '90vh' }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutPage;