<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'search', query: string): void
}>();

const searchQuery = ref('');

const handleSearch = () => {
  emit('search', searchQuery.value);
};

// Debounce function to prevent too many searches while typing
let debounceTimeout: number | null = null;
const handleInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  
  debounceTimeout = setTimeout(() => {
    handleSearch();
  }, 300) as unknown as number;
};
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search posts..."
      @input="handleInput"
      @keyup.enter="handleSearch"
    />
    <button @click="handleSearch" class="search-button">
      Search
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  margin-bottom: 24px;
  width: 100%;
}

input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #3466F6;
}

.search-button {
  background-color: #3466F6;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  padding: 0 24px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #2950d2;
}
</style>