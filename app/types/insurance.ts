export interface CoverageItem {
  name: string;
  description: string;
  amount: string;
  details?: string[];
}

export interface CoverageCategory {
  title: string;
  items: CoverageItem[];
}

export interface InsuranceCoverage {
  basic: CoverageCategory;
  optional: CoverageCategory;
}