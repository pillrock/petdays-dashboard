export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const calculateBulkDiscount = (
  quantity: number,
  policy: "stable" | "initial",
  month?: number
): { discount: number; detail: string } => {
  if (policy === "initial") {
    const baseDiscount = 0.4;
    const bonusDiscount = Math.floor(quantity / 5) * 0.01;
    const cappedBonus = Math.min(bonusDiscount, 0.05);
    const discount = baseDiscount + cappedBonus;
    const bonusCases = Math.floor(quantity / 5) * 5;

    const detail = `Cách tính: ${baseDiscount * 100}% (cơ bản) + ${
      cappedBonus * 100
    }% (thưởng cho ${bonusCases > 0 ? bonusCases : "0"} thùng) = ${(
      discount * 100
    ).toFixed(1)}%.`;

    return { discount, detail };
  }

  // Stable policy logic would go here
  return { discount: 0, detail: "" };
};

export const validateQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
