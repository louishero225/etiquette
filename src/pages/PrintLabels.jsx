import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LabelGrosOnly from '../components/LabelGrosOnly';
import ClassicPriceLabel from '../components/ClassicPriceLabel';
import TemplateSelector from '../components/TemplateSelector';
import LabelWrapper from '../components/LabelWrapper';

export default function PrintLabels() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const [template, setTemplate] = useState('classic');
  const printRef = useRef();

  // Fonction pour imprimer les étiquettes
  const handlePrint = () => {
    window.print();
  };


  // Retourner à la page précédente
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {/* Barre d'outils (masquée à l'impression) */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b print:hidden z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Retour
            </button>

            <TemplateSelector 
              selectedTemplate={template}
              onTemplateChange={setTemplate}
            />

            <button
              onClick={handlePrint}
              className="btn-primary flex items-center gap-2"
            >
              <span>Imprimer</span>
              <span className="text-sm">
                ({selectedProducts.length} étiquette{selectedProducts.length > 1 ? 's' : ''})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Zone d'impression */}
      <div className="mt-16 print:m-0" ref={printRef}>
        <div className="print:landscape">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 print:grid-cols-3">
            {selectedProducts.map((product, index) => (
              <LabelWrapper key={`${product.id}-${index}`}>
                {template === 'gros' ? (
                  <LabelGrosOnly product={product} />
                ) : (
                  <ClassicPriceLabel product={product} />
                )}
              </LabelWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Guide d'impression (masqué à l'impression) */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg print:hidden">
        <h3 className="font-bold text-gray-800 mb-2">Guide d'impression</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Format de page : A4</li>
          <li>• Orientation : Paysage</li>
          <li>• Échelle : 100%</li>
          <li>• Marges : Aucune</li>
        </ul>
      </div>
    </div>
  );
}
