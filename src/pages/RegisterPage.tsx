import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'particulier' | 'professionnel'>('particulier');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    siret: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your auth system
    console.log('Register attempt with:', { ...formData, accountType });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-gray-600 mt-2">Rejoignez Zedek pour gérer vos projets électriques</p>
      </div>
      
      <div className="flex bg-gray-100 rounded-md p-1.5 mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
            accountType === 'particulier' ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setAccountType('particulier')}
        >
          Particulier
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
            accountType === 'professionnel' ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setAccountType('professionnel')}
        >
          Professionnel
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="input-label">Prénom</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input pl-10"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="input-label">Nom</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="input"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {accountType === 'professionnel' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="input-label">
                Entreprise / Organisation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  className="input pl-10"
                  placeholder="Nom de l'entreprise"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="siret" className="input-label">
                SIRET
              </label>
              <input
                id="siret"
                name="siret"
                type="text"
                required
                className="input"
                placeholder="Numéro SIRET"
                value={formData.siret}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="input-label">
            Adresse email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input pl-10"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="input-label">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="input pl-10 pr-10"
              placeholder="Créer un mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Le mot de passe doit contenir au moins 8 caractères.
          </p>
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
            J'accepte les{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              conditions d'utilisation
            </a>{' '}
            et la{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              politique de confidentialité
            </a>
          </label>
        </div>
        
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full py-2.5"
          >
            S'inscrire
          </button>
        </div>
      </form>
      
      <div className="mt-8 text-center text-sm">
        <span className="text-gray-600">Vous avez déjà un compte ?</span>{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Se connecter
        </Link>
      </div>
    </motion.div>
  );
};

export default RegisterPage;