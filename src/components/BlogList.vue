<template>
  <section class="bg-gray-900 py-12">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Blog Chia Sẻ Game & Kiến Thức</h2>
      <div class="flex justify-end mb-6">
        <input
          v-model="keyword"
          type="text"
          placeholder="Tìm kiếm bài viết..."
          class="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col"
        >
          <img :src="post.image" :alt="post.title" class="w-full h-40 object-cover rounded mb-4" />
          <h3 class="text-xl font-semibold text-yellow-400 mb-2">{{ post.title }}</h3>
          <p class="text-gray-300 mb-4">{{ post.summary }}</p>
          <div class="flex items-center mb-4">
            <img :src="post.authorAvatar" alt="avatar" class="w-8 h-8 rounded-full mr-2" />
            <span class="text-gray-400 text-sm">{{ post.author }}</span>
          </div>
          <router-link :to="post.link" class="text-green-400 hover:underline mt-auto">Xem chi tiết</router-link>
        </div>
      </div>
      <div v-if="filteredPosts.length === 0" class="text-center text-gray-400 mt-8">
        Không tìm thấy bài viết phù hợp.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const keyword = ref('')

const posts = [
  {
    id: 1,
    title: 'Cách xây dựng gameplay hấp dẫn cho game indie',
    summary: 'Chia sẻ kinh nghiệm thiết kế gameplay cuốn hút, giữ chân người chơi lâu dài.',
    image: 'https://placehold.co/400x200?text=Gameplay',
    author: 'DevGame',
    authorAvatar: 'https://placehold.co/40x40?text=DG',
    link: '/blog/1'
  },
  {
    id: 2,
    title: 'Unity hay Godot? Chọn engine nào cho dự án đầu tay',
    summary: 'So sánh ưu nhược điểm của hai engine phổ biến nhất hiện nay cho lập trình game.',
    image: 'https://placehold.co/400x200?text=Engine',
    author: 'DevGame',
    authorAvatar: 'https://placehold.co/40x40?text=DG',
    link: '/blog/2'
  },
  {
    id: 3,
    title: 'Tối ưu hiệu năng cho game mobile',
    summary: 'Một số mẹo tối ưu hóa giúp game của bạn chạy mượt mà trên thiết bị di động.',
    image: 'https://placehold.co/400x200?text=Mobile+Game',
    author: 'DevGame',
    authorAvatar: 'https://placehold.co/40x40?text=DG',
    link: '/blog/3'
  },
  {
    id: 4,
    title: 'Thiết kế UI/UX cho game đơn giản mà hiệu quả',
    summary: 'Những nguyên tắc cơ bản giúp giao diện game thân thiện với người chơi.',
    image: 'https://placehold.co/400x200?text=UI+UX',
    author: 'DevGame',
    authorAvatar: 'https://placehold.co/40x40?text=DG',
    link: '/blog/4'
  }
]

const filteredPosts = computed(() =>
  posts.filter(
    post =>
      post.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
      post.author.toLowerCase().includes(keyword.value.toLowerCase())
  )
)
</script>

<style scoped>
/* Add any component-specific styles here */
</style>