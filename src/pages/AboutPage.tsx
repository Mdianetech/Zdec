import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Zap, Shield, Linkedin, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import BrandIconContainer from '../components/ui/BrandIconContainer';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
  cropPosition: { x: number; y: number };
}

const AboutPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Données par défaut si Firebase n'est pas disponible
  const defaultTeamMembers: TeamMember[] = [
    {
      id: 'default-1',
      name: 'AZZOUZ MOUFID',
      role: 'Président',
      image: '/Photo Moufid (1).jpg',
      description: 'Expert en installations électriques avec plus de 15 ans d\'expérience dans le secteur.',
      linkedin: 'https://www.linkedin.com/company/zdec69/posts/?feedView=all',
      cropPosition: { x: 50, y: 50 }
    },
    {
      id: 'default-2',
      name: 'Rami Bouchedda',
      role: 'Directeur des Relations',
      image: '/files_2655144-1748866352955-files_2655144-1748866279307-1W9A4080.jpg',
      description: 'Spécialiste des relations clients et de la coordination des projets.',
      linkedin: 'https://www.linkedin.com/in/rami-bouchedda-7b03a318a/',
      cropPosition: { x: 50, y: 30 }
    }
  ];

  // Fonction pour récupérer les membres de l'équipe depuis Firebase
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const teamCollection = collection(db, 'team_members');
      const teamSnapshot = await getDocs(teamCollection);
      
      if (teamSnapshot.empty) {
        // Si aucun membre n'existe, créer les membres par défaut
        await initializeDefaultTeamMembers();
      } else {
        const members = teamSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          role: doc.data().role,
          description: doc.data().description,
          image: doc.data().image_url || doc.data().image,
          linkedin: doc.data().linkedin_url || doc.data().linkedin,
          cropPosition: {
            x: doc.data().crop_position_x || 50,
            y: doc.data().crop_position_y || 50
          }
        }));
        setTeamMembers(members);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des membres:', err);
      setError('Impossible de charger les membres de l\'équipe');
      setTeamMembers(defaultTeamMembers);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour initialiser les membres par défaut dans Firebase
  const initializeDefaultTeamMembers = async () => {
    try {
      const teamCollection = collection(db, 'team_members');
      
      for (const member of defaultTeamMembers) {
        await addDoc(teamCollection, {
          name: member.name,
          role: member.role,
          description: member.description,
          image_url: member.image,
          linkedin_url: member.linkedin,
          crop_position_x: member.cropPosition.x,
          crop_position_y: member.cropPosition.y,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
      
      // Recharger les données après l'initialisation
      await fetchTeamMembers();
    } catch (err) {
      console.error('Erreur lors de l\'initialisation:', err);
      setTeamMembers(defaultTeamMembers);
    }
  };

  // Charger les données au montage du composant
  useState(() => {
    fetchTeamMembers();
  });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de l'équipe...</p>
        </div>
      </div>
    );
  }

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
            {error && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-300 rounded-lg text-yellow-100 text-sm">
                {error} - Affichage des données par défaut
              </div>
            )}
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
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Professional badge */}
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {member.role}
                </div>
                
                <div 
                  className="relative h-96 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(member.image)}
                >
                  {/* Image container with advanced effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10" />
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                    style={{
                      objectPosition: `${member.cropPosition.x}% ${member.cropPosition.y}%`
                    }}
                  />
                  
                  {/* Professional overlay with company branding */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                  
                  {/* Floating action button */}
                  <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* Professional info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary-200 text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                
                <div className="relative z-10 p-8 bg-gradient-to-br from-white to-gray-50/50">
                  {/* Decorative element */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{member.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                      <p className="text-primary-600 font-semibold text-lg">{member.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-8 leading-relaxed text-base">{member.description}</p>
                  
                  {/* Professional stats or highlights */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Expert certifié</span>
                    </div>
                  </div>
                  
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>Voir le profil</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
                
                {/* Subtle border animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-500" />
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