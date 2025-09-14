"use client";

import React from "react";
import type { PetdaysTierType } from "../types";
import { PRODUCTS, PETDAYS_TIERS } from "../constants";
import { formatCurrency } from "../utils";

interface PetdaysProfitProps {
  currentTier: PetdaysTierType;
  onTierChange: (tier: PetdaysTierType) => void;
}

export const PetdaysProfit: React.FC<PetdaysProfitProps> = ({
  currentTier,
  onTierChange,
}) => {
  const tierButtons = [
    { key: "initial" as const, label: "Mức ban đầu (< 3 tấn)" },
    { key: "intermediate" as const, label: "Đạt 3 tấn" },
    { key: "advanced" as const, label: "Đạt 5 tấn" },
  ];

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">
        Phân tích Giá vốn & Lợi nhuận Petdays
      </h2>
      <p className="mt-2 text-gray-600">
        Phần này cung cấp cái nhìn tổng quan về lợi nhuận của chính Petdays.
        Bằng cách chọn các mức sản lượng bán ra (ban đầu, 3 tấn, 5 tấn), bạn có
        thể thấy chiết khấu từ nhà cung cấp thay đổi như thế nào và lợi nhuận
        gộp của Petdays trên mỗi sản phẩm tăng lên tương ứng. Đây là cơ sở để
        xây dựng các chính sách chiết khấu cho đối tác.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tierButtons.map((button) => (
          <button
            key={button.key}
            type="button"
            onClick={() => onTierChange(button.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold shadow transition-colors ${
              currentTier === button.key
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá vốn Petdays
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá bán lẻ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lợi nhuận gộp Petdays
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {PRODUCTS.map((product) => {
              const { profitMargin } = PETDAYS_TIERS[currentTier];
              return (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(product.cost)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(product.retail)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold text-right">
                    {formatCurrency(product.cost * profitMargin)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
