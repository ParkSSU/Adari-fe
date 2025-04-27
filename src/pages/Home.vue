<template>
  <!-- Card... -->
  <div class="container d-flex">
    <div class="card m-3 d-flex align-items-center justify-content-center" style="width: 18rem; cursor: pointer;" @click="goToUserConfig">
      <div class="card-body text-center">
        <h1>+</h1>
        <p class="card-text">Add New Receipt</p>
      </div>
    </div>
    <ReceiptCard />
    <ReceiptCard />
  </div>

  <!-- Paigination -->
</template>

<script setup>
import ReceiptCard from '@/components/ReceiptCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToUserConfig = () => {
  router.push('/config');
};
// Card 로 보관하는 영수증 목록만큼 데이터 배열 저장
// 그리고 add Card 마지막에...
</script>
