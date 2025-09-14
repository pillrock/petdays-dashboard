"use client";

import React from "react";
import type { SimulationResults } from "../types";
import { PRODUCTS, PARTNER_TIERS } from "../constants";
import { formatCurrency } from "../utils";
import { ProfitChart } from "./ProfitChart";

interface PartnerSimulatorProps {
  selectedPartnerTier: string;
  selectedProduct: string;
  onPartnerTierChange: (tier: string) => void;
  onProductChange: (product: string) => void;
}

export const PartnerSimulator: React.FC<PartnerSimulatorProps> = ({
  selectedPartnerTier,
  selectedProduct,
  onPartnerTierChange,
  onProductChange,
}) => {
  const getSimulationResults = (): SimulationResults => {
    const partnerTier = PARTNER_TIERS.find((t) => t.id === selectedPartnerTier);
    const product = PRODUCTS.find((p) => p.id === selectedProduct);

    if (!partnerTier || !product) {
      throw new Error("Partner tier or product not found");
    }

    const partnerCost = product.retail * (1 - partnerTier.discount);
    const partnerProfit = product.retail - partnerCost;
    const petdaysProfit = partnerCost - product.cost;

    return {
      partnerTier,
      product,
      partnerCost,
      partnerProfit,
      petdaysProfit,
    };
  };

  const results = getSimulationResults();

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">
        Mô phỏng Lợi nhuận cho Đối tác (Nhập lẻ)
      </h2>
      <p className="mt-2 text-gray-600">
        Đây là công cụ dành cho các đối tác nhập hàng với số lượng nhỏ (dưới 5
        thùng). Hãy chọn cấp bậc của bạn (Cộng tác viên, Đại lý,...) và sản phẩm
        bạn quan tâm. Hệ thống sẽ tự động tính toán mức chiết khấu, giá nhập
        cuối cùng và lợi nhuận bạn nhận được trên mỗi sản phẩm bán ra theo giá
        niêm yết.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <label
          htmlFor="partner-level"
          className="block text-sm font-medium text-gray-700"
        >
          Cấp bậc của bạn
          <select
            id="partner-level"
            value={selectedPartnerTier}
            onChange={(e) => onPartnerTierChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {PARTNER_TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="product-select"
          className="block text-sm font-medium text-gray-700"
        >
          Sản phẩm
          <select
            id="product-select"
            value={selectedProduct}
            onChange={(e) => onProductChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {PRODUCTS.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Mức chiết khấu</p>
          <p className="mt-1 text-2xl font-bold text-green-700">
            {results.partnerTier.discount * 100}%
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Giá nhập của bạn</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {formatCurrency(results.partnerCost)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-green-800">
            Lợi nhuận của bạn
          </p>
          <p className="mt-1 text-2xl font-bold text-green-800">
            {formatCurrency(results.partnerProfit)}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-yellow-800">
            Lợi nhuận Petdays
          </p>
          <p className="mt-1 text-2xl font-bold text-yellow-800">
            {formatCurrency(results.petdaysProfit)}
          </p>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-gray-500 italic">
        <p>
          Cách tính: Giá nhập = Giá bán lẻ x (1 - % Chiết khấu). Lợi nhuận = Giá
          bán lẻ - Giá nhập.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <ProfitChart
          partnerProfit={results.partnerProfit}
          petdaysProfit={results.petdaysProfit}
        />
      </div>
    </section>
  );
};
