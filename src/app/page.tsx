"use client";

import React, { useState, useCallback } from "react";
import type { SectionType, BulkPolicyType, PetdaysTierType } from "../types";
import { Header } from "../components/Header";
import { PolicyOverview } from "../components/PolicyOverview";
import { PetdaysProfit } from "../components/PetdaysProfit";
import { PartnerSimulator } from "../components/PartnerSimulator";
import { BulkSimulator } from "../components/BulkSimulator";
import { Policies } from "../components/Policies";

const PetdaysDashboard: React.FC = () => {
  // Navigation state
  const [activeSection, setActiveSection] =
    useState<SectionType>("policy-overview");

  // Petdays Profit state
  const [currentPetdaysTier, setCurrentPetdaysTier] =
    useState<PetdaysTierType>("initial");

  // Partner Simulator state
  const [selectedPartnerTier, setSelectedPartnerTier] = useState<string>("ctv");
  const [selectedProduct, setSelectedProduct] = useState<string>("paw101_500");

  // Bulk Simulator state
  const [currentBulkPolicy, setCurrentBulkPolicy] =
    useState<BulkPolicyType>("stable");
  const [bulkMonth, setBulkMonth] = useState<number>(1);
  const [bulkProduct, setBulkProduct] = useState<string>("paw101_500");
  const [bulkQuantity, setBulkQuantity] = useState<number>(5);

  // Navigation handlers
  const handleSectionChange = useCallback((section: SectionType): void => {
    setActiveSection(section);
  }, []);

  // Petdays Profit handlers
  const handlePetdaysTierChange = useCallback((tier: PetdaysTierType): void => {
    setCurrentPetdaysTier(tier);
  }, []);

  // Partner Simulator handlers
  const handlePartnerTierChange = useCallback((tier: string): void => {
    setSelectedPartnerTier(tier);
  }, []);

  const handleProductChange = useCallback((product: string): void => {
    setSelectedProduct(product);
  }, []);

  // Bulk Simulator handlers
  const handleBulkPolicyChange = useCallback((policy: BulkPolicyType): void => {
    setCurrentBulkPolicy(policy);
  }, []);

  const handleBulkMonthChange = useCallback((month: number): void => {
    setBulkMonth(month);
  }, []);

  const handleBulkProductChange = useCallback((product: string): void => {
    setBulkProduct(product);
  }, []);

  const handleBulkQuantityChange = useCallback((quantity: number): void => {
    if (quantity >= 1) {
      setBulkQuantity(quantity);
    }
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "policy-overview":
        return <PolicyOverview onSectionChange={handleSectionChange} />;

      case "petdays-profit":
        return (
          <PetdaysProfit
            currentTier={currentPetdaysTier}
            onTierChange={handlePetdaysTierChange}
          />
        );

      case "partner-simulator":
        return (
          <PartnerSimulator
            selectedPartnerTier={selectedPartnerTier}
            selectedProduct={selectedProduct}
            onPartnerTierChange={handlePartnerTierChange}
            onProductChange={handleProductChange}
          />
        );

      case "bulk-simulator":
        return (
          <BulkSimulator
            currentBulkPolicy={currentBulkPolicy}
            bulkMonth={bulkMonth}
            bulkProduct={bulkProduct}
            bulkQuantity={bulkQuantity}
            onPolicyChange={handleBulkPolicyChange}
            onMonthChange={handleBulkMonthChange}
            onProductChange={handleBulkProductChange}
            onQuantityChange={handleBulkQuantityChange}
          />
        );

      case "policies":
        return <Policies />;

      default:
        return <PolicyOverview onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 antialiased font-inter">
      <Header
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default PetdaysDashboard;
