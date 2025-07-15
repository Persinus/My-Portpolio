<template>
  <header class="bg-gray-900 text-white shadow-md">
    <nav class="container mx-auto flex justify-between items-center py-4">
      <div class="text-2xl font-bold pl-8 md:pl-20">DevGame Portfolio</div>
      <ul class="flex space-x-8 pr-8 md:pr-20">
        <li>
          <router-link to="/" class="hover:text-yellow-400 transition-colors duration-200"
            >Trang chủ</router-link
          >
        </li>
        <li>
          <router-link
            to="/projects"
            class="hover:text-yellow-400 transition-colors duration-200"
            >Dự án</router-link
          >
        </li>
        <li>
          <router-link
            to="/cv"
            class="hover:text-yellow-400 transition-colors duration-200"
            >CV</router-link
          >
        </li>
        <li>
          <router-link
            to="/game"
            class="hover:text-yellow-400 transition-colors duration-200"
            >Trò chơi</router-link
          >
        </li>
        <li>
          <router-link
            to="/blog"
            class="hover:text-yellow-400 transition-colors duration-200"
            >Blog</router-link
          >
        </li>
        <li>
          <router-link
            to="/contact"
            class="ml-2 bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-500 transition"
          >
            Liên hệ
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Để trống, có thể thêm logic sau
</script>

<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
</style>
