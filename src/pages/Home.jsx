import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';
import { TagIcon, TableCellsIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bonjour');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Bon après-midi');
    } else {
      setGreeting('Bonsoir');
    }
  }, []);

  const features = [
    {
      name: 'Gestion des Étiquettes',
      description: 'Créez et gérez vos étiquettes personnalisées',
      href: '/etiquettes',
      icon: TagIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Base de données',
      description: 'Accédez à la base de données des produits',
      href: 'https://1drv.ms/x/s!AlwivzqSaqfvceoyx74e8ezfVhc?e=IGCZxt',
      icon: TableCellsIcon,
      color: 'bg-green-500',
      external: true
    },
    {
      name: 'Proforma',
      description: 'Générez des documents proforma',
      href: '/proforma',
      icon: DocumentTextIcon,
      color: 'bg-purple-500'
    }
  ];

  return (
    <PageTransition>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              {greeting}, {user?.email}
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Bienvenue dans votre espace de gestion
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                feature.external ? (
                  <a
                    key={feature.name}
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group bg-white dark:bg-gray-800 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  >
                    <div>
                      <span className={`rounded-lg inline-flex p-3 ${feature.color} bg-opacity-10`}>
                        <feature.icon className="h-6 w-6 text-gray-700 dark:text-gray-200" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                    <span
                      className="absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500"
                      aria-hidden="true"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </span>
                  </a>
                ) : (
                  <Link
                    key={feature.name}
                    to={feature.href}
                    className="relative group bg-white dark:bg-gray-800 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  >
                    <div>
                      <span className={`rounded-lg inline-flex p-3 ${feature.color} bg-opacity-10`}>
                        <feature.icon className="h-6 w-6 text-gray-700 dark:text-gray-200" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                    <span
                      className="absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500"
                      aria-hidden="true"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
