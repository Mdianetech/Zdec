import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import BrandIconContainer from '../components/ui/BrandIconContainer';

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    details: '+33 06 22 80 26 45',
    description: 'Du lundi au vendredi, 8h-18h',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'contact@zedek.fr',
    description: 'Réponse sous 24h ouvrables',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    details: 'Lyon, France',
    description: 'Intervention sur toute la France',
  },
  {
    icon: Clock,
    title: 'Horaires',
    details: 'Lun-Ven: 8h-18h',
    description: 'Intervention d\'urgence possible',
  },
];

const serviceOptions = [
  "Installation électrique",
  "Mise aux normes",
  "Borne de recharge (IRVE)",
  "Domotique",
  "Réseaux informatiques (VDI)",
  "Dépannage",
  "Autre",
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    clientType: 'particulier',
    message: '',
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your backend
    console.log('Form submission:', formData);
    
    // Mock success feedback
    alert('Votre message a bien été envoyé. Nous vous contacterons dans les meilleurs délais.');
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Header */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-lg text-primary-100">
              Besoin d'un devis, d'une intervention ou simplement d'un conseil ?
              Notre équipe est à votre écoute pour répondre à toutes vos questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              staggerChildren: 0.1,
            }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="card p-6 text-center hover:shadow-elevation-3 transition-shadow"
                variants={fadeInUp}
              >
                <div className="mx-auto mb-4">
                  <BrandIconContainer 
                    icon={info.icon} 
                    variant={index % 2 === 0 ? "primary" : "secondary"} 
                    size="md" 
                    shape="circle"
                  />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="font-medium text-primary-700 mb-1">{info.details}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="input-label">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="input-label">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="input-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="input-label">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className="input-label">Service concerné</label>
                    <select
                      id="service"
                      name="service"
                      className="input"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Sélectionnez un service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Type de client</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="particulier"
                          name="clientType"
                          value="particulier"
                          checked={formData.clientType === 'particulier'}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor="particulier" className="ml-2 text-sm text-gray-700">
                          Particulier
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="professionnel"
                          name="clientType"
                          value="professionnel"
                          checked={formData.clientType === 'professionnel'}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor="professionnel" className="ml-2 text-sm text-gray-700">
                          Professionnel
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="input-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="input"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    J'accepte que mes données soient utilisées pour me recontacter
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Envoyer le message
                  </button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full min-h-[400px] lg:min-h-0"
            >
              <div className="h-full flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Notre zone d'intervention</h2>
                <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-white p-1">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5089646543495!2d4.886577776271791!3d45.82172577107368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea1b7c0f8dad%3A0x9d2c30590f7fd0e4!2s80%20Av.%20du%20Loup%20Pendu%2C%2069140%20Rillieux-la-Pape!5e0!3m2!1sfr!2sfr!4v1707684749101!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '0.5rem', minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte de notre zone d'intervention"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Besoin d'une intervention rapide ?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Contactez-nous directement par téléphone pour une réponse immédiate.
            </p>
            <a 
              href="tel:+33622802645" 
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium inline-flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              +33 06 22 80 26 45
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;