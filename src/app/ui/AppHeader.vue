<script setup lang="ts">
import { ref } from 'vue';

const isScrolled = ref(false);

// Add scroll listener to change header appearance
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20;
  });
}
</script>

<template>
  <header :class="{ 'scrolled': isScrolled }">
    <div class="header-content">
      <router-link to="/" class="logo">Blog App</router-link>
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

header.scrolled {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #eaeaea;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}

@media (max-width: 767px) {
  .header-content {
    padding: 12px 16px;
  }
  
  .logo {
    font-size: 1.125rem;
  }
}
</style>