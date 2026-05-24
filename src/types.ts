export type LaptopCategory = "Entry Level" | "Midrange" | "Flagship";

export interface Benchmark {
  cpu: number; // score out of 100
  gpu: number; // score out of 100
  battery: number; // score out of 100
  display: number; // score out of 100
}

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  processor: string;
  gpu: string;
  ram: string; // e.g., "16GB DDR5"
  storage: string; // e.g., "512GB NVMe SSD"
  display: string; // e.g., "14\" QHD+ OLED"
  refreshRate: string; // e.g., "120Hz"
  battery: string; // e.g., "73 Wh"
  weight: string; // e.g., "1.35 kg"
  os: string; // e.g., "Windows 11 Home"
  releaseYear: number;
  price: number; // price in Indonesian Rupiah (IDR)
  category: LaptopCategory;
  pros: string[];
  cons: string[];
  bestFor: string[]; // e.g., ["Gaming", "Editing", "Programming", "Kuliah"]
  benchmark: Benchmark;
  colorHex: string; // for premium stylized UI preview cards
  imageUrl?: string;
}

export interface FilterState {
  brand: string;
  maxPrice: number;
  ram: string;
  gpuType: string; // e.g., "Nvidia RTX", "AMD Radeon", "Integrated"
  processorType: string; // e.g., "Intel Core i5/Ryzen 5", "Intel Core i7/Ryzen 7", "Intel Core i9/Ryzen 9", "Apple M-Series"
  category: string;
  searchQuery: string;
}

export interface SortingState {
  sortBy: "price_asc" | "price_desc" | "performance" | "newest";
}

export interface AIRecommendationRequest {
  needs: string[]; // e.g., ["Gaming", "Programming"]
  budget: number; // max budget in IDR
  additionalInfo?: string; // custom prompt
}
