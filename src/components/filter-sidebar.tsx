'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface FilterSidebarProps {
  filters: {
    categories: string[];
    types: string[];
    sizes: string[];
    colors: string[];
    materials: string[];
    priceRange: [number, number];
  };
  selectedFilters: {
    categories: string[];
    types: string[];
    sizes: string[];
    colors: string[];
    materials: string[];
    priceRange: [number, number];
  };
  onFilterChange: (filters: any) => void;
  className?: string;
}

export function FilterSidebar({ 
  filters, 
  selectedFilters, 
  onFilterChange, 
  className = "" 
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedFilters.categories, category]
      : selectedFilters.categories.filter(c => c !== category);
    
    onFilterChange({
      ...selectedFilters,
      categories: newCategories
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...selectedFilters.types, type]
      : selectedFilters.types.filter(t => t !== type);
    
    onFilterChange({
      ...selectedFilters,
      types: newTypes
    });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...selectedFilters.sizes, size]
      : selectedFilters.sizes.filter(s => s !== size);
    
    onFilterChange({
      ...selectedFilters,
      sizes: newSizes
    });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...selectedFilters.colors, color]
      : selectedFilters.colors.filter(c => c !== color);
    
    onFilterChange({
      ...selectedFilters,
      colors: newColors
    });
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...selectedFilters.materials, material]
      : selectedFilters.materials.filter(m => m !== material);
    
    onFilterChange({
      ...selectedFilters,
      materials: newMaterials
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({
      ...selectedFilters,
      priceRange: [value[0], value[1]]
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      types: [],
      sizes: [],
      colors: [],
      materials: [],
      priceRange: [0, 1000000]
    });
  };

  const activeFiltersCount = 
    selectedFilters.categories.length +
    selectedFilters.types.length +
    selectedFilters.sizes.length +
    selectedFilters.colors.length +
    selectedFilters.materials.length +
    (selectedFilters.priceRange[0] > 0 || selectedFilters.priceRange[1] < 1000000 ? 1 : 0);

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
            {selectedFilters.categories.map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {selectedFilters.types.map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
            {/* Add more active filter badges as needed */}
          </div>
        </div>
      )}

      <Separator />

      {/* Categories */}
      <FilterSection title="Category">
        {filters.categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedFilters.categories.includes(category)}
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
        {filters.types.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={`type-${type}`}
              checked={selectedFilters.types.includes(type)}
              onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
            />
            <Label htmlFor={`type-${type}`} className="text-sm capitalize">
              {type.replace('-', ' ')}
            </Label>
          </div>
        ))}
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <Slider
            value={selectedFilters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={1000000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₦{selectedFilters.priceRange[0].toLocaleString()}</span>
            <span>₦{selectedFilters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* Sizes */}
      {filters.sizes.length > 0 && (
        <>
          <Separator />
          <FilterSection title="Size">
            {filters.sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedFilters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </Label>
              </div>
            ))}
          </FilterSection>
        </>
      )}

      {/* Colors */}
      {filters.colors.length > 0 && (
        <>
          <Separator />
          <FilterSection title="Color">
            {filters.colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedFilters.colors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <Label htmlFor={`color-${color}`} className="text-sm">
                  {color}
                </Label>
              </div>
            ))}
          </FilterSection>
        </>
      )}

      {/* Materials */}
      {filters.materials.length > 0 && (
        <>
          <Separator />
          <FilterSection title="Material">
            {filters.materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={selectedFilters.materials.includes(material)}
                  onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                />
                <Label htmlFor={`material-${material}`} className="text-sm">
                  {material}
                </Label>
              </div>
            ))}
          </FilterSection>
        </>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Mobile Filter Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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