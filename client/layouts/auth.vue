<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

function preventRefresh(event) {
  event.preventDefault();
  event.returnValue = '';
}

onMounted(() => {
  window.addEventListener('beforeunload', preventRefresh);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', preventRefresh);
});
</script>

<template>
  <ScrollArea as="main">
    <div class="auth-layout">
      <div class="auth-layout-content">
        <slot />
      </div>
    </div>
  </ScrollArea>
</template>

<style scoped>
.auth-layout {
  @apply min-h-screen w-full flex items-center justify-center bg-muted dark:bg-background;
}

.auth-layout-content {
  @apply w-full h-auto max-w-sm p-4 mx-auto;
}
</style>
