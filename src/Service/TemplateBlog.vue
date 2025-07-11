<template>
  <div
    class="fixed top-0 left-0 w-full h-1 z-50 bg-yellow-400"
    :style="{ width: progress + '%', transition: 'width 0.2s' }"
  ></div>
  <section
    class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-10 px-4 md:px-12"
  >
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-2 md:px-6">
      <!-- Sidebar trái -->
      <aside class="hidden md:flex flex-col items-center gap-4 pt-8 min-w-[60px]">
        <img
          :src="authorAvatar"
          alt="avatar"
          class="w-12 h-12 rounded-full border-2 border-gray-700 shadow"
        />
        <button class="text-gray-400 hover:text-yellow-500 text-2xl">▲</button>
        <span class="font-bold text-gray-500">0</span>
        <button class="text-gray-400 hover:text-yellow-500 text-2xl">▼</button>
        <button class="mt-4 text-gray-400 hover:text-blue-500">
          <i class="fa fa-bookmark"></i>
        </button>
      </aside>
      <!-- Nội dung chính -->
      <main class="flex-1 bg-white/5 rounded-xl shadow p-4 md:p-8 text-white">
        <!-- Thông tin tác giả, ngày, chủ đề -->
        <div class="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
          <img
            :src="authorAvatar"
            alt="avatar"
            class="w-8 h-8 rounded-full border border-gray-700"
          />
          <span class="font-semibold text-yellow-400">{{ author }}</span>
          <span class="text-gray-400 text-sm">{{ date }}</span>
          <span
            class="ml-auto px-3 py-1 rounded bg-blue-900/60 text-blue-300 text-xs font-semibold"
            >{{ topic }}</span
          >
        </div>
        <!-- Tiêu đề -->
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ title }}</h1>
        <!-- Hiển thị barge -->
        <div class="mb-6">
          <Barge :skills="barge" />
        </div>
        <!-- Ảnh đại diện -->
        <img
          v-if="cover"
          :src="cover"
          :alt="title"
          class="w-full h-72 object-cover rounded mb-6 shadow"
        />
        <!-- Thông báo -->
        <div
          v-if="warning"
          class="bg-yellow-100/80 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
        >
          <i class="fa fa-exclamation-circle mr-2"></i>{{ warning }}
        </div>
        <!-- Nội dung bài viết -->
        <article class="prose prose-invert max-w-none">
          <slot />
        </article>
        <!-- Bài viết liên quan -->
        <div class="mt-8">
          <h3 class="font-bold mb-2 text-yellow-400">Bài viết liên quan</h3>
          <ul>
            <li v-for="post in related.slice(0, 4)" :key="post.id" class="mb-2">
              <router-link :to="`/blog/${post.id}`" class="text-blue-400 hover:underline">
                {{ post.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </main>
      <!-- Mục lục bên phải -->
      <aside class="hidden lg:block w-64 pt-8">
        <div class="bg-gray-900 rounded-xl shadow p-4">
          <h2 class="font-semibold text-yellow-400 mb-2 border-b pb-1">MỤC LỤC</h2>
          <div v-if="toc && toc.length">
            <ul class="text-gray-300 text-sm space-y-1">
              <li v-for="item in toc" :key="item">
                <a
                  href="javascript:void(0)"
                  @click="scrollToHeading(item)"
                  class="hover:text-blue-400"
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
  <ContactSection />
</template>

<script setup>
import Barge from "../components/Barge.vue";
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import ContactSection from "../components/ContactSection.vue";

const route = useRoute();

const props = defineProps({
  title: { type: String, required: true },
  cover: { type: String, default: "" },
  author: { type: String, default: "Tác giả không rõ" },
  authorAvatar: { type: String, default: "https://placehold.co/80x80" },
  date: { type: String, default: "Ngày không xác định" },
  topic: { type: String, default: "" },
  toc: { type: Array, default: () => [] },
  warning: { type: String, default: "" },
  barge: { type: Array, default: () => [] },
  related: { type: Array, default: () => [] },
});

const progress = ref(0);

function updateProgress() {
  const article = document.querySelector("article");
  if (!article) return;
  const rect = article.getBoundingClientRect();
  const winHeight = window.innerHeight;
  const total = article.scrollHeight - winHeight;
  const scrolled = window.scrollY - article.offsetTop;
  progress.value = Math.min(100, Math.max(0, (scrolled / total) * 100));
}
onMounted(() => window.addEventListener("scroll", updateProgress));
onUnmounted(() => window.removeEventListener("scroll", updateProgress));

function scrollToHeading(item) {
  const id = item.trim().toLowerCase().replace(/\s+/g, "-");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function addHeadingIds() {
  nextTick(() => {
    document.querySelectorAll("article h2, article h3, article h4").forEach((el) => {
      el.id = el.textContent.trim().toLowerCase().replace(/\s+/g, "-");
    });
  });
}

onMounted(addHeadingIds);

// Gọi lại khi route thay đổi
watch(
  () => route.fullPath,
  () => {
    addHeadingIds();
  }
);

// Nếu bạn truyền content qua prop hoặc slot, hãy watch biến đó nữa
// Ví dụ nếu dùng <slot :content="content" />, hãy watch props.content:
watch(
  () => props.title, // hoặc props.content nếu có
  () => {
    addHeadingIds();
  }
);
</script>

<style scoped>
/* Layout & background */
section {
  /* Đổi sang nền tối đồng bộ BlogList */
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
}

/* Main content */
main {
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07), 0 1.5px 6px 0 rgba(0, 0, 0, 0.03);
  border-radius: 18px;
  background: rgba(17, 24, 39, 0.7); /* Nền tối trong suốt */
  transition: box-shadow 0.2s;
}

/* Sidebar avatar */
aside img {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  border: 2.5px solid #374151;
}

/* Author info */
.flex.items-center.gap-3.mb-4 {
  border-bottom: 1px solid #374151;
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

/* Các bài viết liên quan */
.mt-8 ul li,
.mt-8 ul li .router-link {
  pointer-events: auto !important;
  z-index: 1;
  position: relative;
}

/* Prose invert cho nội dung markdown */
.prose-invert {
  --tw-prose-body: #e5e7eb;
  --tw-prose-headings: #fff;
  --tw-prose-links: #60a5fa;
  --tw-prose-bold: #facc15;
  --tw-prose-quotes: #fbbf24;
  --tw-prose-code: #f472b6;
  --tw-prose-pre-bg: #1e293b;
  --tw-prose-pre-code: #facc15;
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
