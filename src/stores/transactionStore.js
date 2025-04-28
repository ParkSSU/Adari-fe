import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTransactionStore = defineStore('transaction', () => {
  const items = ref([
    {"name": "플러스한판 (3-4인,800g)", "count": 1, "price": 44000},
    {"name": "공기밥", "count": 5, "price": 1000},
    {"name": "차돌된장찌개", "count": 1, "price": 5000},
    {"name": "삼겹살 (200g)", "count": 2, "price": 12000},
    {"name": "숙성김치", "count": 1, "price": 1000}
]);
  const totalPrice = ref(0);
  const storeName = ref('');
  const date = ref('');
  const buyers = ref([]);
  
  const setTransactionData = (data) => {
    items.value = data.items;
    totalPrice.value = data.total_price;
    storeName.value = data.store;
    date.value = data.date;
  };

  const setBuyers = (newBuyers) => { buyers.value = newBuyers; };

  return { items, totalPrice, storeName, date, setTransactionData, setBuyers };
});
