"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  maxPrice: number;
}

export function ProductFilters({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  maxPrice,
}: ProductFiltersProps) {

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'traditional', label: 'Traditional Wear' },
    { value: 'casual', label: 'Casual Wear' },
    { value: 'custom', label: 'Custom Tailoring' },
  ];

  return (
    <div className="space-y-8 sticky top-20">
      <div>
        <Label htmlFor="search" className="text-lg font-semibold mb-2 block">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <RadioGroup value={category} onValueChange={setCategory} className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-2">
              <RadioGroupItem value={cat.value} id={cat.value} />
              <Label htmlFor={cat.value}>{cat.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={maxPrice}
          step={1000}
          minStepsBetweenThumbs={1}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
