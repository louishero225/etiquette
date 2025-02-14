import PropTypes from 'prop-types';

export default function TemplateSelector({ selectedTemplate, onTemplateChange }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <span className="text-gray-700 font-medium">Style d'étiquette :</span>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="template"
            value="classic"
            checked={selectedTemplate === 'classic'}
            onChange={(e) => onTemplateChange(e.target.value)}
            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
          />
          <span className="text-gray-700">Gros & Détail</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="template"
            value="gros"
            checked={selectedTemplate === 'gros'}
            onChange={(e) => onTemplateChange(e.target.value)}
            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
          />
          <span className="text-gray-700">Gros uniquement</span>
        </label>
      </div>
    </div>
  );
}

TemplateSelector.propTypes = {
  selectedTemplate: PropTypes.oneOf(['classic', 'gros']).isRequired,
  onTemplateChange: PropTypes.func.isRequired,
};
