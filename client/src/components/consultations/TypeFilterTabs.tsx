interface TypeFilterTabsProps {
  typeFilter: 'krajowe' | 'samorządowe';
  onTypeChange: (type: 'krajowe' | 'samorządowe') => void;
}

export function TypeFilterTabs({ typeFilter, onTypeChange }: TypeFilterTabsProps) {
  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => onTypeChange('krajowe')}
        className={`pb-3 px-4 font-semibold text-sm transition-colors ${
          typeFilter === 'krajowe'
            ? 'text-indigo-700 border-b-2 border-indigo-700'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Prawo Krajowe
      </button>
      <button
        onClick={() => onTypeChange('samorządowe')}
        className={`pb-3 px-4 font-semibold text-sm transition-colors ${
          typeFilter === 'samorządowe'
            ? 'text-indigo-700 border-b-2 border-indigo-700'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Instytucje Samorządowe
      </button>
    </div>
  );
}
