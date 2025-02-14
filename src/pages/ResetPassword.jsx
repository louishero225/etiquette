import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import AuthIllustration from '../components/AuthIllustration';
import PageTransition from '../components/PageTransition';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      const { error } = await resetPassword(email);
      if (error) throw error;
      setMessage('Vérifiez votre boîte mail pour les instructions de réinitialisation');
    } catch (error) {
      setError('Impossible d\'envoyer l\'email de réinitialisation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <ThemeToggle />
        
        <AuthIllustration type="reset" />

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2">
          <div className="auth-card">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Réinitialiser le mot de passe
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Entrez votre email pour recevoir les instructions
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}
              
              {message && (
                <div className="auth-success" role="status">
                  {message}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="auth-input"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="email-description"
                />
                <p id="email-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Nous vous enverrons un lien pour réinitialiser votre mot de passe
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="auth-button"
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer les instructions'
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link to="/login" className="auth-link">
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
