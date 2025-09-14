import type {
  Product,
  PartnerTier,
  PetdaysTier,
  BulkDiscountTier,
} from "../types";

export const PRODUCTS: readonly Product[] = [
  {
    id: "paw101_500",
    name: "Paw101 500g",
    cost: 53622,
    retail: 99000,
    caseSize: 24,
  },
  {
    id: "paw101_1500",
    name: "Paw101 1,5kg",
    cost: 142276,
    retail: 262000,
    caseSize: 12,
  },
  {
    id: "nobi101_350",
    name: "Nobi 101 350g",
    cost: 45042,
    retail: 85000,
    caseSize: 24,
  },
  {
    id: "nobi101_1200",
    name: "Nobi 101 1,2kg",
    cost: 137272,
    retail: 255000,
    caseSize: 12,
  },
  {
    id: "nobi102_350",
    name: "Nobi 102 350g",
    cost: 49332,
    retail: 95000,
    caseSize: 24,
  },
  {
    id: "nobi102_1200",
    name: "Nobi 102 1,2kg",
    cost: 150141,
    retail: 275000,
    caseSize: 12,
  },
] as const;

export const PARTNER_TIERS: readonly PartnerTier[] = [
  { id: "ctv", name: "Cộng tác viên (CTV)", discount: 0.25 },
  { id: "agent", name: "Đại lý / Pet Shop", discount: 0.3 },
  { id: "wholesaler", name: "Tổng Sỉ / NPP Khu vực", discount: 0.34 },
] as const;

export const PETDAYS_TIERS: Readonly<Record<string, PetdaysTier>> = {
  initial: { name: "Mức ban đầu", profitMargin: 0.02 },
  intermediate: { name: "Đạt 3 tấn", profitMargin: 0.07 },
  advanced: { name: "Đạt 5 tấn", profitMargin: 0.12 },
} as const;

export const BULK_DISCOUNT_TIERS: Readonly<
  Record<number, readonly BulkDiscountTier[]>
> = {
  1: [
    { cases: 5, discount: 0.35 },
    { cases: 10, discount: 0.38 },
    { cases: 15, discount: 0.4 },
  ],
  2: [
    { cases: 10, discount: 0.37 },
    { cases: 15, discount: 0.4 },
    { cases: 20, discount: 0.43 },
  ],
  3: [
    { cases: 10, discount: 0.38 },
    { cases: 15, discount: 0.42 },
    { cases: 20, discount: 0.45 },
  ],
} as const;

export const NAVIGATION_ITEMS = [
  { id: "policy-overview" as const, label: "Tổng quan Chính sách" },
  { id: "petdays-profit" as const, label: "Phân tích Petdays" },
  { id: "partner-simulator" as const, label: "Mô phỏng Đối tác" },
  { id: "bulk-simulator" as const, label: "Mô phỏng Nhập sỉ" },
  { id: "policies" as const, label: "Quy định Chung" },
] as const;
