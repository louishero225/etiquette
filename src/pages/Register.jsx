import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../components/ThemeToggle';
import AuthIllustration from '../components/AuthIllustration';
import PageTransition from '../components/PageTransition';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = [minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar]
      .filter(Boolean).length;

    return {
      isValid: strength >= 4,
      strength: strength / 5,
      requirements: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar
      }
    };
  };

  const getPasswordStrengthClass = () => {
    const strength = validatePassword(formData.password).strength;
    if (strength <= 0.3) return 'strength-weak';
    if (strength <= 0.7) return 'strength-medium';
    return 'strength-strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError('Le mot de passe ne respecte pas les critères de sécurité');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const { error } = await signUp(email, password, {
        data: {
          full_name: fullName,
          phone: phone
        }
      });
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      setError(
        error.message === 'User already registered'
          ? 'Un compte existe déjà avec cet email'
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <ThemeToggle />
        
        <AuthIllustration type="register" />

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2">
          <div className="auth-card">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Créer un compte
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ou{' '}
                <Link to="/login" className="auth-link">
                  connectez-vous à votre compte existant
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom complet
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="auth-input"
                    placeholder="Jean Dupont"
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-describedby="fullname-error"
                  />
                </div>

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
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby="email-error"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="auth-input"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-describedby="phone-error"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="auth-input pr-10"
                      placeholder="Votre mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      aria-describedby="password-requirements"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <>
                      <div className="password-strength-bar mt-2" role="progressbar" aria-label="Force du mot de passe">
                        <div className={`h-full rounded-full ${getPasswordStrengthClass()}`}></div>
                      </div>
                      <ul id="password-requirements" className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li className={validatePassword(formData.password).requirements.minLength ? 'text-green-600 dark:text-green-400' : ''}>
                          ✓ Au moins 8 caractères
                        </li>
                        <li className={validatePassword(formData.password).requirements.hasUpperCase ? 'text-green-600 dark:text-green-400' : ''}>
                          ✓ Au moins une majuscule
                        </li>
                        <li className={validatePassword(formData.password).requirements.hasLowerCase ? 'text-green-600 dark:text-green-400' : ''}>
                          ✓ Au moins une minuscule
                        </li>
                        <li className={validatePassword(formData.password).requirements.hasNumber ? 'text-green-600 dark:text-green-400' : ''}>
                          ✓ Au moins un chiffre
                        </li>
                        <li className={validatePassword(formData.password).requirements.hasSpecialChar ? 'text-green-600 dark:text-green-400' : ''}>
                          ✓ Au moins un caractère spécial
                        </li>
                      </ul>
                    </>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="auth-input pr-10"
                      placeholder="Confirmez votre mot de passe"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      aria-describedby="confirm-password-error"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

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
                    Création en cours...
                  </span>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
