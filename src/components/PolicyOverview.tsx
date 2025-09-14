"use client";

import React from "react";
import type { SectionType } from "../types";

interface PolicyOverviewProps {
  onSectionChange: (section: SectionType) => void;
}

export const PolicyOverview: React.FC<PolicyOverviewProps> = ({
  onSectionChange,
}) => {
  const handleNavClick = (section: SectionType) => {
    onSectionChange(section);
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Tổng quan Hệ thống Chính sách của Petdays
        </h2>
        <p className="mt-2 text-gray-600">
          Chính sách của Petdays được xây dựng theo nhiều lớp, từ chiến lược lợi
          nhuận nội bộ cho đến các mức chiết khấu cụ thể cho từng cấp đối tác.
          Dưới đây là toàn bộ cấu trúc chi tiết.
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          1. Nền tảng: Chiến lược Giá vốn & Lợi nhuận Petdays
        </h3>
        <p className="mt-2 text-gray-600">
          Đây là cơ sở để Petdays xây dựng các chính sách khác. Lợi nhuận của
          Petdays không cố định mà tăng dần dựa trên tổng sản lượng bán ra, vì
          họ cũng nhận được chiết khấu tốt hơn từ nhà cung cấp. Bạn có thể xem
          mô phỏng chi tiết trong mục{" "}
          <button
            type="button"
            className="text-green-700 font-semibold hover:underline"
            onClick={() => handleNavClick("petdays-profit")}
          >
            Phân tích Petdays
          </button>
          .
        </p>
        <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Mức ban đầu (dưới 3 tấn):</strong> Petdays nhận chiết khấu
            45% từ nhà cung cấp và đặt mục tiêu lợi nhuận gộp là{" "}
            <strong>2%</strong> trên giá vốn.
          </li>
          <li>
            <strong>Khi đạt 3 tấn:</strong> Chiết khấu từ nhà cung cấp tăng lên
            50%, lợi nhuận gộp của Petdays tăng lên <strong>7%</strong>.
          </li>
          <li>
            <strong>Khi đạt 5 tấn:</strong> Chiết khấu từ nhà cung cấp là 55%,
            lợi nhuận gộp của Petdays đạt <strong>12%</strong>.
          </li>
        </ul>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          2. Chính sách cho Đối tác Nhập lẻ (Dưới 5 thùng)
        </h3>
        <p className="mt-2 text-gray-600">
          Chính sách này áp dụng chiết khấu cố định dựa trên cấp bậc của đối tác
          cho các đơn hàng nhỏ. Sử dụng công cụ{" "}
          <button
            type="button"
            className="text-green-700 font-semibold hover:underline"
            onClick={() => handleNavClick("partner-simulator")}
          >
            Mô phỏng Đối tác
          </button>{" "}
          để tính toán nhanh.
        </p>
        <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Cộng tác viên (CTV):</strong> Hưởng chiết khấu{" "}
            <strong>25%</strong> từ giá bán lẻ.
          </li>
          <li>
            <strong>Đại lý / Pet Shop:</strong> Hưởng chiết khấu{" "}
            <strong>30%</strong> từ giá bán lẻ.
          </li>
          <li>
            <strong>Tổng Sỉ / NPP Khu vực:</strong> Hưởng chiết khấu{" "}
            <strong>34%</strong> từ giá bán lẻ.
          </li>
        </ul>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          3. Chính sách cho Đối tác Nhập sỉ
        </h3>
        <p className="mt-2 text-gray-600">
          Đối với các đối tác nhập hàng số lượng lớn, Petdays có 2 chính sách
          riêng biệt để lựa chọn. Khám phá chi tiết trong mục{" "}
          <button
            type="button"
            className="text-green-700 font-semibold hover:underline"
            onClick={() => handleNavClick("bulk-simulator")}
          >
            Mô phỏng Nhập sỉ
          </button>
          .
        </p>
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold text-gray-700">
            A. Chính sách Giai đoạn Ban đầu
          </h4>
          <p className="mt-1 text-gray-600 text-sm">
            Chính sách khuyến khích các đối tác mới hoặc muốn thử nhập số lượng
            lớn.
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              Chiết khấu cơ bản: <strong>40%</strong>.
            </li>
            <li>
              Thưởng thêm: Cứ mỗi <strong>5 thùng</strong> nhập, được cộng thêm{" "}
              <strong>1%</strong> chiết khấu.
            </li>
            <li>
              Giới hạn: Mức chiết khấu tối đa có thể đạt được là{" "}
              <strong>45%</strong>.
            </li>
          </ul>
        </div>
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold text-gray-700">B. Chính sách Ổn định</h4>
          <p className="mt-1 text-gray-600 text-sm">
            Chính sách dài hạn, được thiết kế theo lộ trình 3 tháng để khuyến
            khích đối tác tăng sản lượng.
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong>Tháng 1:</strong> 5 thùng (35%), 10 thùng (38%), 15 thùng
              (40%).
            </li>
            <li>
              <strong>Tháng 2:</strong> 10 thùng (37%), 15 thùng (40%), 20 thùng
              (43%).
            </li>
            <li>
              <strong>Tháng 3:</strong> 10 thùng (38%), 15 thùng (42%), 20 thùng
              (45%).
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
