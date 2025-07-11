<template>
  <section
    class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-10 px-4 md:px-12"
  >
    <div class="container mx-auto flex flex-col md:flex-row gap-8">
      <!-- Danh sách bài viết (70%) -->
      <div class="w-full md:w-[70%]">
        <div
          v-for="post in pagedPosts"
          :key="post.id"
          class="bg-white/5 rounded-xl shadow p-5 mb-6 flex gap-4"
        >
          <img
            :src="post.authorAvatar"
            alt="avatar"
            class="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 text-gray-400 text-xs mb-1">
              <span class="font-semibold text-yellow-400">{{ post.author }}</span>
              <span>{{ post.date }}</span>
            </div>
            <router-link
              :to="`/blog/${post.id}`"
              class="block text-lg font-bold text-white hover:text-yellow-400 mb-1"
            >
              {{ post.title }}
            </router-link>
            <div class="text-gray-300 text-sm mb-2">{{ post.summary }}</div>
            <!-- Hiển thị barge dưới nội dung -->
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="barge in post.barge"
                :key="barge"
                class="bg-yellow-900/60 text-yellow-300 px-2 py-0.5 rounded text-xs font-semibold"
              >
                {{ barge }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-gray-500 text-xs">
              <span><i class="fa fa-eye"></i> {{ post.views }}</span>
              <span><i class="fa fa-comment"></i> {{ post.comments }}</span>
              <span><i class="fa fa-bookmark"></i> {{ post.bookmarks }}</span>
            </div>
          </div>
        </div>
        <div v-if="filteredPosts.length === 0" class="text-center text-gray-400 mt-8">
          Không tìm thấy bài viết phù hợp.
        </div>
        <!-- Phân trang -->
        <div class="mt-4">
          <Pagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="(p) => (currentPage = p)"
          />
        </div>
      </div>
      <!-- Thanh tìm kiếm (30%) -->
      <div class="w-full md:w-[30%] md:pl-4">
        <div class="bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
          <h2 class="text-xl font-bold text-yellow-400 mb-4">Tìm kiếm bài viết</h2>
          <input
            v-model="keyword"
            type="text"
            placeholder="Nhập từ khóa..."
            class="w-full px-4 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none mb-2"
          />
          <button
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded mt-2 transition"
          >
            Tìm kiếm
          </button>
          <div class="text-xs text-gray-400 mt-4 text-center">
            Tìm theo tiêu đề hoặc barge công nghệ.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { posts } from "../data/BlogPosts";
import Pagination from "./Pagination.vue";

const keyword = ref("");
const currentPage = ref(1);
const pageSize = 5;

const filteredPosts = computed(() =>
  posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
      (post.barge &&
        post.barge.some((b) => b.toLowerCase().includes(keyword.value.toLowerCase())))
  )
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredPosts.value.length / pageSize))
);

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredPosts.value.slice(start, start + pageSize);
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
