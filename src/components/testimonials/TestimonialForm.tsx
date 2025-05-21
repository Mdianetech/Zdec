import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Star } from 'lucide-react';

const services = [
  'Installation électrique',
  'Borne de recharge IRVE',
  'Domotique',
  'Réseaux informatiques',
  'Dépannage',
  'Autre'
];

export default function TestimonialForm() {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [service, setService] = useState(services[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      await addDoc(collection(db, 'testimonials'), {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Client',
        userImage: currentUser.photoURL,
        rating,
        comment,
        service,
        createdAt: serverTimestamp(),
        approved: false
      });

      setSuccess(true);
      setComment('');
      setRating(5);
      setService(services[0]);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du témoignage.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Partagez votre expérience</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Merci pour votre témoignage ! Il sera publié après validation.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service concerné
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="input w-full"
            required
          >
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Votre commentaire
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input w-full"
            rows={4}
            required
            minLength={10}
            maxLength={500}
            placeholder="Partagez votre expérience avec nos services..."
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le témoignage'}
        </button>
      </form>
    </div>
  );
}