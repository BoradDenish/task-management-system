<script setup>
import { ref } from 'vue';
import { dashboardLinks } from '~/utils/navigation';
import { Plus } from 'lucide-vue-next';
</script>

<template>
    <div class="side-bar-box">
        <ul>
            <li v-for="(item, i) in dashboardLinks" :key="i">
                <Button variant="ghost" class="router-link" as-child>
                    <RouterLink :to="item.path">
                        <div class="flex items-center gap-3">
                            <component :is="item.icon" class="w-4 h-4" />
                            <span>{{ item.name }}</span>
                        </div>
                    </RouterLink>
                </Button>
            </li>
        </ul>
    </div>
    <div class="side-bar-box">
        <div class="flex items-center justify-between gap-3 w-full px-4">
            <p class="text-sm text-muted-foreground">Recent Projects</p>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" class="max-w-7 max-h-7 text-muted-foreground">
                            <Plus class="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Crete new Project</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
</template>

<style scoped>
.side-bar-box {
    @apply py-3 w-full space-y-2
}

.router-link {
    @apply w-full mt-1 hover:bg-secondary justify-between gap-3 cursor-pointer text-muted-foreground rounded-none border-l-2 border-solid border-transparent hover:text-primary hover:border-primary transition-colors
}

.router-link.active {
    @apply text-primary border-primary
}
</style>