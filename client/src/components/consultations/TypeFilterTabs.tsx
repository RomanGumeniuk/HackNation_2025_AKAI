interface TypeFilterTabsProps {
  typeFilter: 'krajowe' | 'samorządowe';
  onTypeChange: (type: 'krajowe' | 'samorządowe') => void;
}

export function TypeFilterTabs({ typeFilter, onTypeChange }: TypeFilterTabsProps) {
  return (
    <div className="flex gap-6 mb-4 pb-4 border-b border-gray-200">
      <button
        onClick={() => onTypeChange('krajowe')}
        className={`font-semibold text-sm transition-colors ${
          typeFilter === 'krajowe'
            ? 'text-black border-b-2 border-[#394788] pb-4 -mb-4'
            : 'text-[#C1C1C1] hover:text-gray-800'
        }`}
      >
        Prawo Krajowe
      </button>
      <button
        onClick={() => onTypeChange('samorządowe')}
        className={`font-semibold text-sm transition-colors ${
          typeFilter === 'samorządowe'
            ? 'text-black border-b-2 border-[#394788] pb-4 -mb-4'
            : 'text-[#C1C1C1] hover:text-gray-800'
        }`}
      >
        Instytucje Samorządowe
      </button>
    </div>
  );
}
