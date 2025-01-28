import { Link } from 'react-router-dom';
import { QrCodeIcon, TagIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TagIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">EtiquetteApp</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/catalogue"
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Catalogue
            </Link>
            <Link
              to="/etiquettes"
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Étiquettes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
