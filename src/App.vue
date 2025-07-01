<template>
  <router-view></router-view>
</template>

<script setup>

</script>
<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
#app {
  width: 100%; /* Chiếm toàn bộ chiều rộng */
  Height:100vh;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.default-page {
  background-color: white; /* Nền trắng cho các trang khác */
}
</style>