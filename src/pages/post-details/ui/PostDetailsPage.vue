<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postsApi } from '@/entities/post';
import type { Post } from '@/entities/post';

const route = useRoute();
const router = useRouter();

// State
const post = ref<Post | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Get post ID from route params
const postId = computed(() => {
  const id = Number(route.params.id);
  return isNaN(id) ? null : id;
});

// Methods
const fetchPost = async () => {
  if (postId.value === null) {
    error.value = 'Invalid post ID';
    isLoading.value = false;
    return;
  }
  
  isLoading.value = true;
  error.value = null;
  
  try {
    post.value = await postsApi.getPost(postId.value);
  } catch (err) {
    error.value = 'Failed to load post. Please try again later.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.back();
};

// Lifecycle
onMounted(fetchPost);
</script>

<template>
  <div class="post-details-page">
    <button @click="goBack" class="back-button">
      ← Back to posts
    </button>
    
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Loading post...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchPost">Try Again</button>
    </div>
    
    <div v-else-if="post" class="post-content">
      <h1>{{ post.title }}</h1>
      
      <div class="post-meta">
        <span>Post #{{ post.id }}</span>
      </div>
      
      <div class="post-body">
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-details-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  color: #3466F6;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 24px;
}

.back-button:hover {
  text-decoration: underline;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3466F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  color: #e53935;
  padding: 48px 0;
}

.error-message button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #3466F6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-content {
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 16px;
  color: #1a1a1a;
  text-transform: capitalize;
}

.post-meta {
  color: #666;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.post-body {
  line-height: 1.6;
  color: #333;
}

.post-body p {
  margin-bottom: 16px;
}
</style>