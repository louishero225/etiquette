import PropTypes from 'prop-types';

export default function CutMarks({ position }) {
  // Définir les classes pour les différentes positions des repères
  const marks = {
    'top-left': [
      'absolute -top-2 -left-2 w-2 h-2 border-t-2 border-l-2 border-gray-400 print:border-black',
    ],
    'top-right': [
      'absolute -top-2 -right-2 w-2 h-2 border-t-2 border-r-2 border-gray-400 print:border-black',
    ],
    'bottom-left': [
      'absolute -bottom-2 -left-2 w-2 h-2 border-b-2 border-l-2 border-gray-400 print:border-black',
    ],
    'bottom-right': [
      'absolute -bottom-2 -right-2 w-2 h-2 border-b-2 border-r-2 border-gray-400 print:border-black',
    ],
  };

  return <div className={marks[position].join(' ')} />;
}

CutMarks.propTypes = {
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']).isRequired,
};
