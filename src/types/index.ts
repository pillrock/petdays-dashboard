export interface Product {
  id: string;
  name: string;
  cost: number;
  retail: number;
  caseSize: number;
}

export interface PartnerTier {
  id: string;
  name: string;
  discount: number;
}

export interface PetdaysTier {
  name: string;
  profitMargin: number;
}

export interface BulkDiscountTier {
  cases: number;
  discount: number;
}

export interface SimulationResults {
  partnerTier: PartnerTier;
  product: Product;
  partnerCost: number;
  partnerProfit: number;
  petdaysProfit: number;
}

export interface BulkOrderResults {
  discount: number;
  calculationDetail: string;
  showNotice: boolean;
  noticeText: string;
  product: Product;
}

export type SectionType =
  | "policy-overview"
  | "petdays-profit"
  | "partner-simulator"
  | "bulk-simulator"
  | "policies";

export type BulkPolicyType = "stable" | "initial";

export type PetdaysTierType = "initial" | "intermediate" | "advanced";
