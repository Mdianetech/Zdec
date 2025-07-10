import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/image.png" alt="ZDEC" className="h-12" />
            </div>
            <p className="mb-6 max-w-xs text-gray-400 leading-relaxed">
              Électricien certifié IRVE à Lyon. Spécialistes en installation électrique, bornes de recharge et réseaux.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6">Nos services</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Électricité générale
                </Link>
              </li>
              <li>
                <Link to="/irve" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Bornes de recharge IRVE
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Mise aux normes
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Réseaux informatiques
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Domotique
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6">Liens rapides</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/realisations" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Nos réalisations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="rounded-lg bg-gradient-to-br from-zdec-blue to-zdec-blue-dark p-2 mt-1 shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-gray-400">Lyon, France</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="rounded-lg bg-gradient-to-br from-zdec-orange to-zdec-orange-dark p-2 mt-1 shadow-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <a href="tel:+33622802645" className="text-gray-400 hover:text-white transition-colors">
                    +33 06 22 80 26 45
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="rounded-lg bg-gradient-to-br from-zdec-blue to-zdec-orange p-2 mt-1 shadow-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <a href="mailto:contact@zdec.fr" className="text-gray-400 hover:text-white transition-colors">
                    contact@zdec.fr
                  </a>
                </div>
              </li>
              <li className="mt-6 pt-6 border-t border-gray-700">
                <Link to="/contact" className="btn btn-primary w-full justify-center text-sm">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 mb-4">&copy; {new Date().getFullYear()} ZDEC. Tous droits réservés.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <span className="hidden sm:block text-gray-600">•</span>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <span className="hidden sm:block text-gray-600">•</span>
            <span className="text-gray-400">Fait avec ❤️ à Lyon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;