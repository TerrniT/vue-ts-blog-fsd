<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Post } from '../model/types';

const props = defineProps<{
  post: Post;
}>();

const truncatedBody = computed(() => {
  return props.post.body.slice(0, 100) + (props.post.body.length > 100 ? '...' : '');
});
</script>

<template>
  <div class="post-card">
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-body">{{ truncatedBody }}</p>
    <router-link :to="`/posts/${post.id}`" class="read-more">
      Read more
      <span class="arrow">→</span>
    </router-link>
  </div>
</template>

<style scoped>
.post-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 16px;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 16px;
  color: #1a1a1a;
  text-transform: capitalize;
}

.post-body {
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: #3466F6;
  font-weight: 500;
  text-decoration: none;
}

.arrow {
  margin-left: 4px;
  transition: transform 0.2s ease;
}

.read-more:hover .arrow {
  transform: translateX(4px);
}
</style>