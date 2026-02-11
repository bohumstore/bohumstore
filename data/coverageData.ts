import { InsuranceCoverage } from '../types/insurance';

export const coverageData: InsuranceCoverage = {
  basic: {
    title: "기본계약",
    items: [
      {
        name: "5대질환관련 수술비",
        description: "5대질환으로 진단 확정 직고 치료를 직접적인 목적으로 수술 시 (1년이내 50%보장, 각 질병당 연간 1회)",
        amount: "500만원",
        details: ["5대질환: 심장질환, 뇌혈관질환, 간질환, 신부전 및 폐질환"]
      },
      {
        name: "일반상해사망",
        description: "일반 상해로 사망 시",
        amount: "2,000만원"
      }
    ]
  },
  optional: {
    title: "선택계약",
    items: [
      {
        name: "뇌출중진단비",
        description: "뇌출증으로 진단 확정 시 (최초 1회한, 1년이내 50% 보장)",
        amount: "1,000만원"
      },
      {
        name: "급성심근경색증진단비",
        description: "급성심근경색증으로 진단 확정 시 (최초 1회한, 1년이내 50% 보장)",
        amount: "1,000만원"
      },
      {
        name: "뇌혈관질환진단비",
        description: "뇌혈관질환으로 진단확정 시 (최초 1회한, 1년이내 50%보장)",
        amount: "500만원"
      }
    ]
  }
}; 