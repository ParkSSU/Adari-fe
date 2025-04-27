<template>
    <div class="container mt-4">
      <div class="btn-group mb-4">
        <button
          v-for="(name, index) in userNamesWithUnassigned"
          :key="index"
          class="btn btn-outline-primary"
          :class="{ active: selectedUser === name }"
          @click="selectedUser = name"
        >
          {{ name }}
        </button>
      </div>
  
      <table class="table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>총액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.count }}개</td>
            <td>{{ item.price.toLocaleString() }}원</td>
            <td>{{ (item.count * item.price).toLocaleString() }}원</td>
          </tr>
        </tbody>
      </table>
  
      <div class="mt-4">
        <h4>총 합계: {{ totalPrice.toLocaleString() }}원</h4>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useTransactionStore } from '@/stores/transactionStore';
  import { useUserStore } from '@/stores/userStore';
  
  const transactionStore = useTransactionStore();
  const userStore = useUserStore();
  
  const selectedUser = ref(''); // 처음엔 아무것도 선택 안 함
  
  // 유저 이름 + "미선택" 항목 추가
  const userNamesWithUnassigned = computed(() => [
    ...userStore.names,
    '미선택',
  ]);
  
  // 선택된 유저에 따라 필터링
  const filteredItems = computed(() => {
  return transactionStore.items.filter((_, index) => {
    const buyer = transactionStore.buyers[index];
    if (selectedUser.value === '미선택') {
      return buyer === ''; // "미선택"은 구매자가 없을 때만
    } else {
      return buyer === selectedUser.value;
    }
  });
});

  
  // 총합 계산
  const totalPrice = computed(() => {
    return filteredItems.value.reduce(
      (sum, item) => sum + (item.count * item.price),
      0
    );
  });
  </script>
  