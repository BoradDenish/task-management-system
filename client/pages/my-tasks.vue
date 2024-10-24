<script lang="ts">
import { ref } from 'vue'
import { useLayoutStore } from '~/store'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CirclePlus } from 'lucide-vue-next'
import { CalendarIcon } from '@radix-icons/vue'

import type { DateRange } from 'radix-vue'

export default {
    components: {
        Button,
        Popover,
        PopoverContent,
        PopoverTrigger,
        RangeCalendar,
        CirclePlus,
        CalendarIcon
    },
    data() {
        return {
            value: ref({
                start: new CalendarDate(2022, 1, 20),
                end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
            }) as Ref<DateRange>,
            df: new DateFormatter('en-US', { dateStyle: 'medium' }),
            timeZone: getLocalTimeZone()
        };
    },
    created() {
        const layoutStore = useLayoutStore();
        const breadcrumbList = [{ title: "My Tasks" }];
        layoutStore.setBreadcrumb(breadcrumbList);
    },
    methods: {
        handleAddTask() {
            console.log('Selected Date Range:', this.value);
        }
    }
}
</script>

<template>
    <section class="py-6 space-y-6">
        <div class="flex flex-1 items-stretch gap-2 w-full">
            <div class="w-full">
                <CustomSearchBar />
            </div>
            <Popover>
                <PopoverTrigger as-child>
                    <Button variant="outline">
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        <template v-if="value.start">
                            <template v-if="value.end">
                                {{ df.format(value.start.toDate(timeZone)) }} -
                                {{ df.format(value.end.toDate(timeZone)) }}
                            </template>
                            <template v-else>
                                {{ df.format(value.start.toDate(timeZone)) }}
                            </template>
                        </template>
                        <template v-else>
                            Pick a date
                        </template>
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0" align="end">
                    <RangeCalendar v-model="value" initial-focus :number-of-months="2"
                        @update:start-value="(startDate) => value.start = startDate" />
                </PopoverContent>
            </Popover>
            <Button variant="secondary" @click="handleAddTask">
                <CirclePlus class="w-4 h-4 mr-2" /> Add New Task
            </Button>
        </div>
        <div class="w-full">
<TableTaskList />
        </div>
    </section>
</template>
