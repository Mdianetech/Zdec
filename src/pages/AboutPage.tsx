import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Zap, Shield, Pencil, Linkedin, X, Check } from 'lucide-react';

const AboutPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'AZZOUZ MOUFID',
      role: 'PDG & Chef Exécution',
      image: 'https://images.pexels.com/photos/18530982/pexels-photo-18530982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Expert en installations électriques avec plus de 15 ans d\'expérience dans le secteur.',
      linkedin: 'https://www.linkedin.com/in/azzouz-moufid'
    },
    {
      name: 'Rami Bouchedda',
      role: 'Gestion des Relations',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Spécialiste des relations clients et de la coordination des projets.',
      linkedin: 'https://www.linkedin.com/in/rami-bouchedda-7b03a318a/'
    }
  ]);

  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [tempMember, setTempMember] = useState({});

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleEdit = (index: number) => {
    setEditingMember(index);
    setTempMember(teamMembers[index]);
  };

  const handleSave = (index: number) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = tempMember as typeof teamMembers[0];
    setTeamMembers(updatedMembers);
    setEditingMember(null);
  };

  const handleCancel = () => {
    setEditingMember(null);
    setTempMember({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    setTempMember({
      ...tempMember,
      [e.target.name]: e.target.value
    });
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
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une équipe d&apos;experts à votre service
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-outline flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                {isEditing ? 'Terminer' : 'Éditer'}
              </button>
            </div>
            <p className="text-lg text-gray-600">
              Des professionnels qualifiés et passionnés, dédiés à la réussite de vos projets électriques.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-64">
                  {editingMember === index ? (
                    <input
                      type="text"
                      name="image"
                      value={(tempMember as any).image || member.image}
                      onChange={(e) => handleChange(e, index)}
                      className="absolute inset-0 p-2 bg-black/50 text-white"
                      placeholder="URL de l'image"
                    />
                  ) : (
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  {editingMember === index ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={(tempMember as any).name || member.name}
                        onChange={(e) => handleChange(e, index)}
                        className="input w-full"
                        placeholder="Nom"
                      />
                      <input
                        type="text"
                        name="role"
                        value={(tempMember as any).role || member.role}
                        onChange={(e) => handleChange(e, index)}
                        className="input w-full"
                        placeholder="Rôle"
                      />
                      <textarea
                        name="description"
                        value={(tempMember as any).description || member.description}
                        onChange={(e) => handleChange(e, index)}
                        className="input w-full"
                        placeholder="Description"
                        rows={3}
                      />
                      <input
                        type="text"
                        name="linkedin"
                        value={(tempMember as any).linkedin || member.linkedin}
                        onChange={(e) => handleChange(e, index)}
                        className="input w-full"
                        placeholder="URL LinkedIn"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancel}
                          className="btn btn-outline"
                        >
                          <X className="h-4 w-4" />
                          Annuler
                        </button>
                        <button
                          onClick={() => handleSave(index)}
                          className="btn btn-primary"
                        >
                          <Check className="h-4 w-4" />
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                          <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => handleEdit(index)}
                            className="btn btn-outline p-2"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{member.description}</p>
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700"
                      >
                        <Linkedin className="h-5 w-5 mr-2" />
                        Voir le profil LinkedIn
                      </a>
                    </>
                  )}
                </div>
              </div>
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
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary-600" />
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
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary-600" />
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
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary-600" />
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
    </>
  );
};

export default AboutPage;