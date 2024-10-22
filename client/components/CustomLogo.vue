<script setup>
defineProps({
    size: {
        type: Number,
        default: 14
    }
})
</script>

<template>
    <div :class="`min-w-7 min-h-7 max-w-7 max-h-7 mx-auto rounded-full grid grid-cols-2`">
        <div class="w-full h-full  bg-muted-foreground rounded-tl-3xl"></div>
        <div class="w-full h-full  bg-foreground "></div>
        <div class="w-full h-full   bg-primary "></div>
        <div class="w-full h-full  bg-background rounded-tl-3xl border border-solid border-border"></div>
    </div>
</template>