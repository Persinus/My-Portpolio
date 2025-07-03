<template>
  <section class="bg-gray-100 py-10 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- Search bar -->
      <div class="flex items-center gap-2 mb-6">
        <input
          v-model="keyword"
          type="text"
          placeholder="Tìm kiếm bài viết..."
          class="flex-1 px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none"
        />
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Tìm kiếm
        </button>
      </div>
      <!-- Danh sách bài viết -->
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="bg-white rounded shadow p-5 mb-6 flex gap-4"
      >
        <img
          :src="post.authorAvatar"
          alt="avatar"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div class="flex-1">
          <div class="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <span class="font-semibold text-blue-700">{{ post.author }}</span>
            <span>{{ post.date }}</span>
          </div>
          <router-link
            :to="`/blog/${post.id}`"
            class="block text-lg font-bold text-gray-900 hover:text-blue-600 mb-1"
          >
            {{ post.title }}
          </router-link>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-semibold"
            >
              {{ tag }}
            </span>
          </div>
          <div class="text-gray-600 text-sm mb-2">{{ post.summary }}</div>
          <div class="flex items-center gap-4 text-gray-400 text-xs">
            <span><i class="fa fa-eye"></i> {{ post.views }}</span>
            <span><i class="fa fa-comment"></i> {{ post.comments }}</span>
            <span><i class="fa fa-bookmark"></i> {{ post.bookmarks }}</span>
          </div>
        </div>
      </div>
      <div v-if="filteredPosts.length === 0" class="text-center text-gray-400 mt-8">
        Không tìm thấy bài viết phù hợp.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { posts } from "../data/BlogPosts"; // Đường dẫn tùy vị trí file BlogList.vue

const keyword = ref("");

const filteredPosts = computed(() =>
  posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
      post.author.toLowerCase().includes(keyword.value.toLowerCase()) ||
      (post.tags &&
        post.tags.some((tag) => tag.toLowerCase().includes(keyword.value.toLowerCase())))
  )
);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
