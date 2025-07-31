import { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// Témoignages statiques (remplace Supabase)
const testimonials = [
  {
    id: '1',
    userName: 'Jean Dupont',
    userImage: null,
    rating: 5,
    comment: 'Installation professionnelle de ma borne de recharge. Service rapide et efficace.',
    service: 'Installation IRVE'
  },
  {
    id: '2',
    userName: 'Marie Martin',
    userImage: null,
    rating: 5,
    comment: 'Excellent travail pour la mise aux normes de mon installation électrique.',
    service: 'Mise aux normes'
  },
  {
    id: '3',
    userName: 'Pierre Dubois',
    userImage: null,
    rating: 5,
    comment: 'Très satisfait de l\'installation domotique. Équipe compétente et à l\'écoute.',
    service: 'Domotique'
  }
];

export default function HomeTestimonials() {
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
            <Quote className="h-4 w-4 mr-2" />
            Témoignages clients
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ce que nos clients disent de nous
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les retours d'expérience de nos clients satisfaits
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <blockquote className="text-gray-600 mb-6">
                "{testimonial.comment}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                {testimonial.userImage ? (
                  <img
                    src={testimonial.userImage}
                    alt={testimonial.userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
                    {testimonial.userName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{testimonial.userName}</p>
                  <p className="text-sm text-gray-500">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}