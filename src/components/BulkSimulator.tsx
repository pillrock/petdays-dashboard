"use client";

import React from "react";
import type { BulkPolicyType, BulkOrderResults } from "../types";
import { PRODUCTS, BULK_DISCOUNT_TIERS } from "../constants";
import { formatCurrency } from "../utils";

interface BulkSimulatorProps {
  currentBulkPolicy: BulkPolicyType;
  bulkMonth: number;
  bulkProduct: string;
  bulkQuantity: number;
  onPolicyChange: (policy: BulkPolicyType) => void;
  onMonthChange: (month: number) => void;
  onProductChange: (product: string) => void;
  onQuantityChange: (quantity: number) => void;
}

export const BulkSimulator: React.FC<BulkSimulatorProps> = ({
  currentBulkPolicy,
  bulkMonth,
  bulkProduct,
  bulkQuantity,
  onPolicyChange,
  onMonthChange,
  onProductChange,
  onQuantityChange,
}) => {
  const getBulkOrderResults = (): BulkOrderResults => {
    const product = PRODUCTS.find((p) => p.id === bulkProduct);
    if (!product) {
      throw new Error("Product not found");
    }

    let discount = 0;
    let calculationDetail = "";
    let showNotice = false;
    let noticeText = "";

    if (currentBulkPolicy === "stable") {
      const tiers = BULK_DISCOUNT_TIERS[bulkMonth];
      const minCases = tiers[0].cases;

      if (bulkQuantity < minCases) {
        showNotice = true;
        noticeText = `Số lượng ${bulkQuantity} thùng chưa đạt mức tối thiểu (${minCases} thùng) của chính sách nhập sỉ. Vui lòng sử dụng "Mô phỏng Đối tác (Nhập lẻ)".`;
        return {
          discount: 0,
          calculationDetail: "",
          showNotice,
          noticeText,
          product,
        };
      }

      for (let i = tiers.length - 1; i >= 0; i--) {
        if (bulkQuantity >= tiers[i].cases) {
          discount = tiers[i].discount;
          calculationDetail = `Chiết khấu được tính dựa trên mức ${tiers[i].cases} thùng của Tháng ${bulkMonth}.`;
          break;
        }
      }
    } else {
      // Initial Policy
      const baseDiscount = 0.4;
      const bonusDiscount = Math.floor(bulkQuantity / 5) * 0.01;
      const cappedBonus = Math.min(bonusDiscount, 0.05);
      discount = baseDiscount + cappedBonus;
      const bonusCases = Math.floor(bulkQuantity / 5) * 5;
      calculationDetail = `Cách tính: ${baseDiscount * 100}% (cơ bản) + ${
        cappedBonus * 100
      }% (thưởng cho ${bonusCases > 0 ? bonusCases : "0"} thùng) = ${(
        discount * 100
      ).toFixed(1)}%.`;
    }

    return { discount, calculationDetail, showNotice, noticeText, product };
  };

  const bulkResults = getBulkOrderResults();
  const totalUnits = bulkQuantity * bulkResults.product.caseSize;
  const totalCost =
    totalUnits * bulkResults.product.retail * (1 - bulkResults.discount);
  const totalRevenue = totalUnits * bulkResults.product.retail;
  const totalProfit = totalRevenue - totalCost;
  const petdaysBaseCost = totalUnits * bulkResults.product.cost;
  const petdaysProfit = totalCost - petdaysBaseCost;
  const profitPerUnit = totalUnits > 0 ? totalProfit / totalUnits : 0;

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">
        Mô phỏng Lợi nhuận Nhập sỉ
      </h2>

      <div className="mt-4 flex items-center border border-gray-200 rounded-lg p-1 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => onPolicyChange("stable")}
          className={`policy-btn w-1/2 sm:w-auto text-sm font-medium px-4 py-2 rounded-md transition ${
            currentBulkPolicy === "stable"
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Chính sách Ổn định
        </button>
        <button
          type="button"
          onClick={() => onPolicyChange("initial")}
          className={`policy-btn w-1/2 sm:w-auto text-sm font-medium px-4 py-2 rounded-md transition ${
            currentBulkPolicy === "initial"
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Giai đoạn Ban đầu
        </button>
      </div>

      <p
        className={`mt-4 text-gray-600 ${
          currentBulkPolicy === "stable" ? "" : "hidden"
        }`}
      >
        Công cụ này mô phỏng chính sách nhập sỉ theo lộ trình ổn định 3 tháng.
        Mỗi tháng có các mức số lượng và mức chiết khấu khác nhau. Hãy chọn
        tháng, sản phẩm và nhập số lượng thùng dự kiến để xem tổng chi phí, lợi
        nhuận của bạn và so sánh với lợi nhuận của Petdays.
      </p>
      <p
        className={`mt-4 text-gray-600 ${
          currentBulkPolicy === "initial" ? "" : "hidden"
        }`}
      >
        Đây là chính sách ưu đãi dành cho giai đoạn ban đầu. Với mức chiết khấu
        khởi điểm là 40%, bạn sẽ được cộng thêm 1% cho mỗi 5 thùng nhập, cho đến
        khi đạt mức tối đa là 45%. Công cụ này giúp bạn tính toán nhanh lợi ích
        khi tham gia sớm.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={currentBulkPolicy === "stable" ? "" : "hidden"}>
          <label
            htmlFor="bulk-month"
            className="block text-sm font-medium text-gray-700"
          >
            Chọn tháng nhập hàng
            <select
              id="bulk-month"
              value={bulkMonth}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value={1}>Tháng 1</option>
              <option value={2}>Tháng 2</option>
              <option value={3}>Tháng 3</option>
            </select>
          </label>
        </div>
        <div>
          <label
            htmlFor="bulk-product"
            className="block text-sm font-medium text-gray-700"
          >
            Chọn sản phẩm
            <select
              id="bulk-product"
              value={bulkProduct}
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
        <div>
          <label
            htmlFor="bulk-quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Số lượng thùng
            <input
              type="number"
              id="bulk-quantity"
              min="1"
              value={bulkQuantity}
              onChange={(e) => onQuantityChange(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">
          Kết quả tính toán:
        </h3>
        {!bulkResults.showNotice && (
          <p className="text-sm text-gray-600 mt-2 text-center bg-green-100 p-2 rounded-md">
            {bulkResults.calculationDetail}
          </p>
        )}
        <div
          className={`mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center ${
            bulkResults.showNotice ? "hidden" : ""
          }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-500">Chiết khấu</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {(bulkResults.discount * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-500">Tổng chi phí</p>
            <p className="mt-1 text-2xl font-bold text-gray-800">
              {formatCurrency(totalCost)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-green-800">Tổng lợi nhuận</p>
            <p className="mt-1 text-2xl font-bold text-green-800">
              {formatCurrency(totalProfit)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-green-800">Lợi nhuận/túi</p>
            <p className="mt-1 text-2xl font-bold text-green-800">
              {formatCurrency(profitPerUnit)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-yellow-800">
              Lợi nhuận Petdays
            </p>
            <p className="mt-1 text-2xl font-bold text-yellow-800">
              {formatCurrency(petdaysProfit)}
            </p>
          </div>
        </div>
        {bulkResults.showNotice && (
          <div className="mt-4 text-center text-sm font-medium text-blue-800 bg-blue-100 p-3 rounded-lg">
            {bulkResults.noticeText}
          </div>
        )}
      </div>
    </section>
  );
};
