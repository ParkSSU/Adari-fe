<template>
  <!-- 상단 네비게이션 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Receipt App</a>
    </div>
  </nav>
  <!-- 페이지 본문 -->
  <main class="container my-4">
    <router-view />
  </main>
  <!-- 하단 푸터 -->
  <footer class="text-center text-muted py-3 border-top mt-5">
    &copy; 2025 Receipt App. All rights reserved.
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
