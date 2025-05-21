import { motion } from 'framer-motion';
import TestimonialForm from '../../components/testimonials/TestimonialForm';
import TestimonialList from '../../components/testimonials/TestimonialList';

export default function TestimonialsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Témoignages clients</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TestimonialForm />
        </div>
        
        <div className="lg:col-span-2">
          <TestimonialList />
        </div>
      </div>
    </motion.div>
  );
}