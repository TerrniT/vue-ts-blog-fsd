<template>
  <footer>
    <div class="footer-content">
      <p>&copy; {{ new Date().getFullYear() }} Blog App. All rights reserved.</p>
      <p>Built with Vue and JSONPlaceholder API</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  padding: 32px 16px;
  margin-top: 64px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
}

p {
  margin: 8px 0;
}
</style>