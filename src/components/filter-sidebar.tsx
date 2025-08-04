'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface FilterSidebarProps {
  filters: {
    categories: string[];
    types: string[];
  };
  selectedFilters: {
    categories: string[];
    types: string[];
  };
  onFilterChange: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function FilterSidebar({
  filters = { categories: [], types: [] },
  selectedFilters = { categories: [], types: [] },
  onFilterChange,
  isOpen,
  onClose,
  className = "",
}: FilterSidebarProps) {
  // Local state for staged filters
  const [localFilters, setLocalFilters] = useState(selectedFilters);

  // Sync local state when sidebar opens or selectedFilters change
  useEffect(() => {
    if (isOpen) setLocalFilters(selectedFilters);
  }, [isOpen, selectedFilters]);

  // Handler for changing a filter (e.g., checkbox)
  const handleChange = (type: 'categories' | 'types', value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v: string) => v !== value)
        : [...prev[type], value],
    }));
  };

  // Handler for Apply button
  const handleApply = () => {
    onFilterChange(localFilters);
    // Optionally: onClose(); // if you want to close after applying
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...localFilters.categories, category]
      : localFilters.categories.filter(c => c !== category);
    setLocalFilters({
      ...localFilters,
      categories: newCategories
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...localFilters.types, type]
      : localFilters.types.filter(t => t !== type);
    setLocalFilters({
      ...localFilters,
      types: newTypes
    });
  };

  const clearAllFilters = () => {
    setLocalFilters({
      categories: [],
      types: []
    });
  };

  const activeFiltersCount = 
    localFilters.categories.length +
    localFilters.types.length;

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">{title}</h3>
      {children}
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(localFilters.categories || []).map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {(localFilters.types || []).map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Categories */}
      <FilterSection title="Category">
        {(filters.categories || []).map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={(localFilters.categories || []).includes(category)}
              onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
            />
            <Label htmlFor={`category-${category}`} className="text-sm capitalize">
              {category}
            </Label>
          </div>
        ))}
      </FilterSection>

      <Separator />

      {/* Type */}
      <FilterSection title="Type">
        {(filters.types || []).map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={`type-${type}`}
              checked={(localFilters.types || []).includes(type)}
              onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
            />
            <Label htmlFor={`type-${type}`} className="text-sm capitalize">
              {type.replace('-', ' ')}
            </Label>
          </div>
        ))}
      </FilterSection>
      <Button onClick={handleApply} className="w-full mt-4">
        Apply
      </Button>
    </div>
  );

  return (
    <div className={className}>
      {/* Mobile Filter Button */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden w-full">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
        <FilterContent />
      </div>
    </div>
  );
} 