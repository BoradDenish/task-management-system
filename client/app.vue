<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
const colorMode = useColorMode()
console.log(colorMode.preference)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>