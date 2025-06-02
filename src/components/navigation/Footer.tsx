import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/image.png" alt="ZDEC" className="h-10" />
            </div>
            <p className="mb-4 max-w-xs">
              Électricien certifié IRVE à Lyon. Spécialistes en installation électrique, bornes de recharge et réseaux.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Nos services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Électricité générale</Link>
              </li>
              <li>
                <Link to="/irve" className="hover:text-white hover:underline transition-colors">Bornes de recharge IRVE</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Mise aux normes</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Réseaux informatiques</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Domotique</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary-600 p-2">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span>Lyon, France</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary-600 p-2">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span>+33 06 22 80 26 45</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-primary-600 p-2">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span>contact@zdec.fr</span>
              </li>
              <li className="mt-4 pt-4 border-t border-gray-800">
                <Link to="/contact" className="btn btn-primary w-full justify-center">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ZDEC. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white hover:underline transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="hover:text-white hover:underline transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;