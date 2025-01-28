import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Logo ou titre */}
            <div className="text-xl font-bold text-gray-800">
              Gestion des étiquettes
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <NavLink
                to="/etiquettes"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                Étiquettes
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto py-6">
        <Outlet />
      </main>

      {/* Pied de page */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-500">
            {new Date().getFullYear()} Gestion des étiquettes. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
