<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>();

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return;
  emit('page-change', page);
};

// Calculate pages to show (current, previous and next pages)
const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});
</script>

<template>
  <div class="pagination">
    <button 
      class="pagination-arrow" 
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Previous
    </button>
    
    <div class="pagination-numbers">
      <button
        v-if="visiblePages[0] > 1"
        class="pagination-number"
        @click="goToPage(1)"
      >
        1
      </button>
      
      <span v-if="visiblePages[0] > 2" class="pagination-ellipsis">...</span>
      
      <button
        v-for="page in visiblePages"
        :key="page"
        class="pagination-number"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      
      <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="pagination-ellipsis">...</span>
      
      <button
        v-if="visiblePages[visiblePages.length - 1] < totalPages"
        class="pagination-number"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </button>
    </div>
    
    <button 
      class="pagination-arrow" 
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
  gap: 8px;
}

.pagination-numbers {
  display: flex;
  align-items: center;
}

.pagination-number {
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-number:hover {
  background-color: #f5f5f5;
}

.pagination-number.active {
  background-color: #3466F6;
  color: white;
  border-color: #3466F6;
}

.pagination-arrow {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-arrow:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.pagination-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-ellipsis {
  margin: 0 4px;
  color: #666;
}
</style>