import PropTypes from 'prop-types';
import CutMarks from './CutMarks';

export default function LabelWrapper({ children }) {
  return (
    <div className="relative p-2 print:p-0 label-wrapper">
      <div className="relative h-full">
        {/* Repères de découpe */}
        <CutMarks position="top-left" />
        <CutMarks position="top-right" />
        <CutMarks position="bottom-left" />
        <CutMarks position="bottom-right" />
        
        {/* Contenu de l'étiquette */}
        <div className="h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

LabelWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
