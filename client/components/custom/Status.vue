<script>
import { Flag } from 'lucide-vue-next';

export default {
    components: { Flag },
    props: {
        status: {
            type: String,
            required: true
        },
        is: {
            type: String,
        }
    }
}
</script>

<template>
    <div v-if="is">
        <div class="status bg-red-500" v-if="status == 1">
            <Flag class="w-4 h-4" />
            High
        </div>
        <div class="status  bg-orange-500" v-else-if="status == 2">
            <Flag class="w-4 h-4" />
            Medium
        </div>
        <div class="status bg-green-500" v-else-if="status == 3">
            <Flag class="w-4 h-4" />
            Low
        </div>
        <div class="status" v-else>Unknown Status</div>
    </div>
    <div v-else>
        <div v-if="status == '0'" class="status border-gray-400 bg-gray-400">
            Not Started
        </div>
        <div v-else-if="status == '1'" class="status border-green-600 bg-green-600">
            Completed
        </div>
        <div v-else-if="status == '2'" class="status border-yellow-500 bg-yellow-500">
            In Progress
        </div>
        <div v-else-if="status == '3'" class="status border-orange-500 bg-orange-500">
            On Hold
        </div>
        <div v-else class="status border-gray-300 bg-gray-300">
            Unknown Status
        </div>
    </div>
</template>

<style scoped>
.status {
    @apply rounded-md py-0.5 text-center px-2 w-fit flex items-center gap-1.5;
}
</style>
