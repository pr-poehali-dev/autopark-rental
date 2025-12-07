import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  type: string;
  priceRange: number[];
  sortBy: string;
}

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    priceRange: [0, 20000],
    sortBy: 'price-asc'
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-card border rounded-xl p-6 shadow-lg sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="SlidersHorizontal" size={20} className="text-primary" />
        <h3 className="text-lg font-bold">Фильтры</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold mb-2 block">Тип автомобиля</label>
          <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="sedan">Седан</SelectItem>
              <SelectItem value="suv">Внедорожник</SelectItem>
              <SelectItem value="sports">Спорткар</SelectItem>
              <SelectItem value="minivan">Минивэн</SelectItem>
              <SelectItem value="economy">Эконом</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold mb-3 block">
            Цена за день: {filters.priceRange[0]}₽ - {filters.priceRange[1]}₽
          </label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            min={0}
            max={20000}
            step={500}
            className="mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">Сортировка</label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
              <SelectItem value="name-asc">Название: А-Я</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            const defaultFilters = { type: 'all', priceRange: [0, 20000], sortBy: 'price-asc' };
            setFilters(defaultFilters);
            onFilterChange(defaultFilters);
          }}
        >
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
}
