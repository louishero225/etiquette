import { Link } from 'react-router-dom';
import { QrCodeIcon, TagIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Bienvenue sur EtiquetteApp
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-2xl">
        Gérez votre catalogue de produits et créez des étiquettes personnalisées en quelques clics
      </p>
      
      <div className="flex space-x-6 mt-8">
        <Link
          to="/catalogue"
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <QrCodeIcon className="h-6 w-6" />
          <span>Voir le catalogue</span>
        </Link>
        
        <Link
          to="/etiquettes"
          className="flex items-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
        >
          <TagIcon className="h-6 w-6" />
          <span>Créer des étiquettes</span>
        </Link>
      </div>
    </div>
  );
}
