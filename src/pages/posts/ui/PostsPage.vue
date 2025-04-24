<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { PostCard } from '@/entities/post';
import { postsApi } from '@/entities/post';
import { SearchBar } from '@/features/post-search';
import { Pagination } from '@/features/post-pagination';
import type { Post } from '@/entities/post';

// State
const posts = ref<Post[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPosts = ref(0);
const postsPerPage = 10;
const searchQuery = ref('');

// Computed
const totalPages = ref(1);

// Methods
const fetchPosts = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // If we don't already have the total count, fetch it
    if (totalPosts.value === 0) {
      totalPosts.value = await postsApi.getPostsCount();
      totalPages.value = Math.ceil(totalPosts.value / postsPerPage);
    }
    
    // Fetch posts for current page
    posts.value = await postsApi.getPosts({
      _page: currentPage.value,
      _limit: postsPerPage,
      q: searchQuery.value
    });
  } catch (err) {
    error.value = 'Failed to load posts. Please try again later.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  // Scroll to top when page changes
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1; // Reset to first page on new search
};

// Watchers
watch([currentPage, searchQuery], fetchPosts);

// Lifecycle
onMounted(fetchPosts);
</script>

<template>
  <div class="posts-page">
    <h1>Blog Posts</h1>
    
    <SearchBar @search="handleSearch" />
    
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Loading posts...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchPosts">Try Again</button>
    </div>
    
    <div v-else-if="posts.length === 0" class="no-posts">
      <p>No posts found. Try a different search term.</p>
    </div>
    
    <div v-else class="posts-list">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
      />
    </div>
    
    <Pagination
      v-if="!isLoading && !error && posts.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.posts-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.no-posts {
  text-align: center;
  padding: 48px 0;
  color: #666;
}
</style>