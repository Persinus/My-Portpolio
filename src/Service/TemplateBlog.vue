<template>
  <section class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-2 md:px-6">
      <!-- Sidebar trái (avatar, vote, bookmark) -->
      <aside class="hidden md:flex flex-col items-center gap-4 pt-8 min-w-[60px]">
        <img
          :src="authorAvatar"
          alt="avatar"
          class="w-12 h-12 rounded-full border-2 border-gray-300"
        />
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
        <img
          v-if="cover"
          :src="cover"
          :alt="title"
          class="w-full h-56 object-cover rounded mb-6 shadow"
        />
        <!-- Thông báo -->
        <div
          v-if="warning"
          class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
        >
          <i class="fa fa-exclamation-circle mr-2"></i>{{ warning }}
        </div>
        <!-- Nội dung bài viết -->
        <article>
          <!-- Xóa class prose ở đây, chỉ để <slot /> -->
          <slot />
        </article>
        <!-- Bài viết liên quan -->
        <div class="mt-8">
          <h3 class="font-bold mb-2">Bài viết liên quan</h3>
          <ul>
            <li v-for="post in related" :key="post.id" class="mb-2">
              <router-link :to="`/blog/${post.id}`" class="text-blue-600 hover:underline">
                {{ post.title }}
              </router-link>
            </li>
          </ul>
          <!-- Có thể thêm phần "Các bài khác" nếu muốn -->
        </div>
      </main>
      <!-- Mục lục bên phải -->
      <aside class="hidden lg:block w-64 pt-8">
        <div class="bg-gray-50 rounded shadow p-4">
          <h2 class="font-semibold text-gray-700 mb-2 border-b pb-1">MỤC LỤC</h2>
          <div v-if="toc && toc.length">
            <ul class="text-gray-600 text-sm space-y-1">
              <li v-for="item in toc" :key="item">
                <a
                  :href="'#' + item.replace(/\s+/g, '-').toLowerCase()"
                  class="hover:text-blue-500"
                >
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
import Barge from "../components/Barge.vue"; // Thành phần tự quản lý kỹ năng

// Định nghĩa props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "Tác giả không rõ",
  },
  authorAvatar: {
    type: String,
    default: "https://placehold.co/80x80",
  },
  date: {
    type: String,
    default: "Ngày không xác định",
  },
  toc: {
    type: Array,
    default: () => [],
  },
  warning: {
    type: String,
    default: "",
  },
  barge: {
    type: Array,
    default: () => [],
  },
  related: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
/* Layout & background */
section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Main content */
main {
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07), 0 1.5px 6px 0 rgba(0, 0, 0, 0.03);
  border-radius: 18px;
  background: #fff;
  transition: box-shadow 0.2s;
}

/* Sidebar avatar */
aside img {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  border: 2.5px solid #e2e8f0;
}

/* Author info */
.flex.items-center.gap-3.mb-4 {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.5rem;
}

/* Title */
h1 {
  letter-spacing: -0.02em;
}

/* Button hover effects */
button:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}

/* Card and section shadows */
.shadow {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  main {
    border-radius: 12px;
  }
  aside {
    display: none;
  }
}
</style>
