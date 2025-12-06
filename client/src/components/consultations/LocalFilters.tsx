import { Button } from '@/components/ui/button';

interface LocalFiltersProps {
  cityFilter: string;
  setCityFilter: (city: string) => void;
  institutionTypeFilter: string;
  setInstitutionTypeFilter: (type: string) => void;
  cities: string[];
}

export function LocalFilters({
  cityFilter,
  setCityFilter,
  institutionTypeFilter,
  setInstitutionTypeFilter,
  cities,
}: LocalFiltersProps) {
  return (
    <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miasto <span className="text-red-500">*</span>
          </label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394788]"
          >
            <option value="">-- Wybierz miasto --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Typ instytucji
          </label>
          <select
            value={institutionTypeFilter}
            onChange={(e) => setInstitutionTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394788]"
          >
            <option value="all">Wszystkie typy</option>
            <option value="gmina">Gmina</option>
            <option value="powiat">Powiat</option>
            <option value="województwo">Województwo</option>
            <option value="miasto na prawach powiatu">Miasto na prawach powiatu</option>
            <option value="Urząd Wojewódzki">Urząd Wojewódzki</option>
            <option value="Starostwo Powiatowe">Starostwo Powiatowe</option>
            <option value="Kuratorium Oświaty">Kuratorium Oświaty</option>
            <option value="Inspektorat">Inspektorat</option>
          </select>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setCityFilter('');
          setInstitutionTypeFilter('all');
        }}
        className="w-full text-[#394788] border-[#394788] hover:bg-[#394788]/5"
        disabled={!cityFilter}
      >
        Wyczyść filtry
      </Button>
    </div>
  );
}
