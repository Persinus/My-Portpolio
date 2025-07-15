<template>
  <nav class="navbar-y8">
    <div class="navbar-brand-y8">
      <router-link to="/" class="navbar-item-y8">Y8 Game Portal</router-link>
    </div>
    <div class="navbar-menu-y8">
      <router-link to="/" class="navbar-item-y8">Trang chủ</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar-y8 {
  background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 8px #0001;
}
.navbar-brand-y8 {
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
  margin-left: 32px;
  display: inline-block;
}
.navbar-menu-y8 {
  float: right;
  margin-right: 32px;
  display: inline-block;
}
.navbar-item-y8 {
  color: #fff;
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  transition: text-shadow 0.2s;
}
.navbar-item-y8:hover {
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
}
</style>
