// stores/receipt.js
import { defineStore } from "pinia";

// 영수증 데이터 저장 및 사용자별로 정리된 영수증 추출을 담당하는 스토어
export const useReceiptStore = defineStore("receipt", {
  state: () => ({
    storeName: "오복솥뚜껑(영등포점)",
    date: "2025-02-26T20:04:18",
    totalPrice: 121000,
    // 전체 영수증 항목 목록 (공통 항목, 구매자는 각 항목 내에 존재)
    items: [
      {
        name: "플러스한판 (3-4인,800g)",
        count: 1,
        price: 44000,
        buyers: [{ user: "건호", count: 1 }],
      },
      {
        name: "공기밥",
        count: 5,
        price: 1000,
        buyers: [
          { user: "건호", count: 2 },
          { user: "상일", count: 2 },
          { user: "동현", count: 1 },
        ],
      },
      {
        name: "차돌된장찌개",
        count: 1,
        price: 5000,
        buyers: [{ user: "동현", count: 1 }],
      },
      {
        name: "삼겹살 (200g)",
        count: 2,
        price: 12000,
        buyers: [
          { user: "건호", count: 1 },
          { user: "상일", count: 1 },
        ],
      },
      {
        name: "숙성김치",
        count: 1,
        price: 1000,
        buyers: [{ user: "상일", count: 1 }],
      },
      {
        name: "계란찜",
        count: 1,
        price: 3000,
        buyers: [{ user: "동현", count: 1 }],
      },
      {
        name: "된장찌개",
        count: 1,
        price: 4000,
        buyers: [{ user: "상일", count: 1 }],
      },
      {
        name: "소주",
        count: 2,
        price: 4000,
        buyers: [
          { user: "건호", count: 1 },
          { user: "동현", count: 1 },
        ],
      },
      {
        name: "제로콜라",
        count: 1,
        price: 2000,
        buyers: [{ user: "상일", count: 1 }],
      },
      {
        name: "냉면",
        count: 1,
        price: 5000,
        buyers: [{ user: "건호", count: 1 }],
      },
      {
        name: "우삼겹 (150g)",
        count: 1,
        price: 15000,
        buyers: [{ user: "상일", count: 1 }],
      },
    ],
  }),

  getters: {
    // 사용자별 영수증 계산
    getReceiptByName: (state) => (name) => {
      const receipt = { name, total: 0, items: [] };

      for (const item of state.items) {
        for (const buyer of item.buyers) {
          if (buyer.user === name) {
            receipt.total += item.price * buyer.count;
            receipt.items.push({
              name: item.name,
              count: buyer.count,
              price: item.price,
            });
          }
        }
      }

      return receipt;
    },
  },
});
