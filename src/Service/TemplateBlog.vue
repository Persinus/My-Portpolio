<template>
  <section class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-2 md:px-6">
      <!-- Sidebar trái (avatar, vote, bookmark) -->
      <aside class="hidden md:flex flex-col items-center gap-4 pt-8 min-w-[60px]">
        <img :src="authorAvatar" alt="avatar" class="w-12 h-12 rounded-full border-2 border-gray-300" />
        <button class="text-gray-400 hover:text-yellow-500 text-2xl">▲</button>
        <span class="font-bold text-gray-500">0</span>
        <button class="text-gray-400 hover:text-yellow-500 text-2xl">▼</button>
        <button class="mt-4 text-gray-400 hover:text-blue-500">
          <i class="fa fa-bookmark"></i>
        </button>
      </aside>
      <!-- Nội dung chính -->
      <main class="flex-1 bg-white rounded-lg shadow p-4 md:p-8">
        <!-- Thông tin tác giả và ngày -->
        <div class="flex items-center gap-3 mb-4">
          <img :src="authorAvatar" alt="avatar" class="w-8 h-8 rounded-full border" />
          <span class="font-semibold text-gray-700">{{ author }}</span>
          <span class="text-gray-400 text-sm">{{ date }}</span>
        </div>
        <!-- Tiêu đề -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ title }}</h1>
        <!-- Hiển thị barge -->
        <div class="mb-6">
          <Barge :skills="barge" />
        </div>
        <!-- Ảnh đại diện -->
        <img v-if="cover" :src="cover" :alt="title" class="w-full h-56 object-cover rounded mb-6 shadow" />
        <!-- Thông báo -->
        <div v-if="warning" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <i class="fa fa-exclamation-circle mr-2"></i>{{ warning }}
        </div>
        <!-- Nội dung bài viết -->
        <article class="prose max-w-none text-gray-800">
          <slot />
        </article>
      </main>
      <!-- Mục lục bên phải -->
      <aside class="hidden lg:block w-64 pt-8">
        <div class="bg-gray-50 rounded shadow p-4">
          <h2 class="font-semibold text-gray-700 mb-2 border-b pb-1">MỤC LỤC</h2>
          <div v-if="toc && toc.length">
            <ul class="text-gray-600 text-sm space-y-1">
              <li v-for="item in toc" :key="item">
                <a :href="'#' + item.replace(/\s+/g, '-').toLowerCase()" class="hover:text-blue-500">
                  {{ item }}
                </a>
              </li>
            </ul>
          </div>
          <div v-else class="text-gray-400 text-sm">Không có mục lục</div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import Barge from '../components/Barge.vue'; // Thành phần tự quản lý kỹ năng

// Định nghĩa props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: 'Tác giả không rõ',
  },
  authorAvatar: {
    type: String,
    default: 'https://placehold.co/80x80',
  },
  date: {
    type: String,
    default: 'Ngày không xác định',
  },
  toc: {
    type: Array,
    default: () => [],
  },
  warning: {
    type: String,
    default: '',
  },
  barge: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.prose pre {
  background: #f5f5f5;
  color: #222;
  border-radius: 6px;
  padding: 1em;
  overflow-x: auto;
}
.prose code {
  background: #f5f5f5;
  color: #d6336c;
  border-radius: 4px;
  padding: 0.2em 0.4em;
}
</style>