<script setup>
import { Search } from 'lucide-vue-next';
</script>

<template>
    <div class="border border-solid border-border bg-background flex items-center px-2 w-full h-9 rounded-lg">
        <Search class="w-4 h-4 text-muted-foreground" />
        <Input type="text" class="!border-none !outline-none focus:!outline-none focus-within:outline-none focus-visible:ring-0 text-xs" placeholder="Search Task" />
    </div>
</template>