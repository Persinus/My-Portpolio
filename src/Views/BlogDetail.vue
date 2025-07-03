<template>
  <Header />
  <TemplateBlog
    v-if="post"
    :title="post.title"
    :cover="post.cover"
    :author="post.author"
    :authorAvatar="post.authorAvatar"
    :date="post.date"
    :toc="post.toc"
    :warning="post.warning"
    :barge="post.barge"
    :related="relatedPosts"
  >
    <!-- Thêm hiệu ứng cho tiêu đề và nội dung -->
    <div class="prose prose-invert max-w-none animate__animated animate__fadeIn">
      <div v-html="post.content"></div>
    </div>
    <div v-if="post.code && post.code.length" class="animate__animated animate__fadeInUp">
      <CodeConvert
        v-for="(item, idx) in post.code"
        :key="idx"
        :code="item.value"
        :lang="item.lang"
      />
    </div>
  </TemplateBlog>

  <div v-else class="text-center text-gray-400 py-20 animate__animated animate__fadeIn">
    Không tìm thấy bài viết.
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Header from "../components/Header.vue";
import { useRoute } from "vue-router";
import TemplateBlog from "../Service/TemplateBlog.vue";
import CodeConvert from "../Service/CodeConvert.vue";
import { posts } from "../data/BlogPosts"; // file chứa dữ liệu các bài viết
const route = useRoute();
const postId = ref(Number(route.params.id));
const post = ref(posts.find((p) => p.id === postId.value));

const relatedPosts = ref(posts.filter((p) => p.id !== postId.value).slice(0, 4));
const otherPosts = ref(
  posts.filter((p) => p.author === post.value?.author && p.id !== postId.value)
);

watch(
  () => route.params.id,
  (newId) => {
    postId.value = Number(newId);
    post.value = posts.find((p) => p.id === postId.value);
    relatedPosts.value = posts.filter((p) => p.id !== postId.value).slice(0, 4);
    otherPosts.value = posts.filter(
      (p) => p.author === post.value?.author && p.id !== postId.value
    );
  }
);
</script>

<style>
/* Custom prose styles */
.prose h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 1.5em 0 0.7em 0;
  color: #1e293b;
}
.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.2em 0 0.6em 0;
  color: #2563eb;
}
.prose ul,
.prose ol {
  margin-left: 1.5em;
  margin-bottom: 1em;
  padding-left: 1em;
}
.prose ul {
  list-style: disc inside;
}
.prose li {
  margin-bottom: 0.3em;
}
.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
  color: #22223b;
}
.prose code {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: "Courier New", Courier, monospace;
}
.prose-invert h1 {
  color: #facc15;
}
.prose-invert h2 {
  color: #60a5fa;
}
.prose-invert p,
.prose-invert li {
  color: #e5e7eb;
}
.prose-invert code {
  background-color: #1e293b;
  color: #facc15;
}
</style>
