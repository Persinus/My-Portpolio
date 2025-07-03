<template>
  <Header />
  <AboutMe />
  <GameList />

  <ContactSection />
</template>

<script setup>
import Header from "../components/Header.vue";
import AboutMe from "../components/AboutMe.vue";
import GameList from "../components/GameList.vue";

import ContactSection from "../components/ContactSection.vue";
</script>

<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
body {
  font-family: "Arial", sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

h1 {
  color: #333;
  text-align: center;
  margin-top: 20px;
}
</style>
