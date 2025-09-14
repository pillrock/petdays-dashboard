"use client";

import React from "react";

interface PolicyCardProps {
  icon: string;
  title: string;
  description: string;
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="ml-4 text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  );
};

export const Policies: React.FC = () => {
  const policyData = [
    {
      icon: "💲",
      title: "Quy định về Giá",
      description:
        "Tất cả các cấp đều phải bán ra với giá niêm yết. Mọi hành vi bán phá giá sẽ dẫn đến việc bị cắt hàng ngay lập tức.",
    },
    {
      icon: "📦",
      title: "Quy định về MOQ",
      description:
        "Để được hưởng mức chiết khấu của cấp nào, đối tác phải đáp ứng yêu cầu nhập hàng tối thiểu của cấp đó.",
    },
    {
      icon: "🤝",
      title: "Chính sách Hỗ trợ",
      description:
        "Petdays cung cấp đầy đủ Sales Kit, tổ chức training và hỗ trợ các chiến dịch marketing cho toàn hệ thống.",
    },
  ] as const;

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Quy định Chung</h2>
      <p className="mt-2 text-gray-600">
        Để đảm bảo một hệ thống phân phối công bằng, minh bạch và phát triển bền
        vững, Petdays đã xây dựng các quy định chung. Các chính sách về giá bán,
        số lượng nhập tối thiểu (MOQ) và các hỗ trợ đi kèm được trình bày dưới
        đây là những quy tắc cốt lõi mà mọi đối tác cần nắm rõ và tuân thủ.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policyData.map((policy, index) => (
          <PolicyCard
            key={index}
            icon={policy.icon}
            title={policy.title}
            description={policy.description}
          />
        ))}
      </div>
    </section>
  );
};
