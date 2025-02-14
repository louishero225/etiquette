import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" replace />;
  }

  // Rendre le composant enfant si l'utilisateur est connecté
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};
