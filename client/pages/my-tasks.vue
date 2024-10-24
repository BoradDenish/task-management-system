<script>
import { ref } from 'vue'
import { useLayoutStore } from '~/store'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CirclePlus, X, Star, Plus } from 'lucide-vue-next'
import { CalendarIcon } from '@radix-icons/vue'


export default {
    components: {
        Button,
        Popover,
        PopoverContent,
        PopoverTrigger,
        Star,
        RangeCalendar,
        CirclePlus,
        CalendarIcon,
        X,
        Plus
    },
    data() {
        return {
            value: ref({
                start: new CalendarDate(2022, 1, 20),
                end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
            }),
            df: new DateFormatter('en-US', { dateStyle: 'medium' }),
            timeZone: getLocalTimeZone(),
            taskData: {
                priority: '2'
            },
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
            <Sheet>
                <SheetTrigger as-child>
                    <Button variant="secondary" @click="handleAddTask">
                        <CirclePlus class="w-4 h-4 mr-2" /> Add New Task
                    </Button>
                </SheetTrigger>
                <SheetContent class="!max-w-lg p-0">
                    <div class="w-full flex items-center justify-between py-2 px-3">
                        <Button size="icon" variant="ghost">
                            <Star class="w-4 h-4" />
                        </Button>
                        <SheetClose as-child>
                            <Button size="icon" variant="ghost">
                                <X class="w-4 h-4" />
                            </Button>
                        </SheetClose>
                    </div>
                    <div class="divide-y divide-border">
                        <div class="space-y-1.5 py-2 px-4">
                            <h4 class="text-3xl">Task 1</h4>
                            <div class="w-full flex items-center">
                                <p class="text-sm text-muted-foreground mr-3">Priority:-</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <CustomStatus :is="true" :status="taskData.priority" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent class="w-56">
                                        <DropdownMenuLabel>Priority Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup v-model="taskData.priority">
                                            <DropdownMenuRadioItem value="1">
                                                High
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="2">
                                                Medium
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="3">
                                                Low
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div class="py-3 px-4 space-y-4">
                            <div class="flex items-center gap-2">
                                <p class="text-sm text-muted-foreground label">Assignees:-</p>
                                <div class="flex flex-wrap gap-1">
                                    <Dialog>
                                        <DialogTrigger as-child>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger as-child>
                                                        <Button size="icon" variant="outline" class="max-w-8 max-h-8">
                                                            <Plus class="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Assign User</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </DialogTrigger>
                                        <DialogContent class="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div class="grid gap-4 py-4">
                                                <div class="grid grid-cols-4 items-center gap-2">
                                                    <Label for="email" class="block">
                                                        Email
                                                    </Label>
                                                    <Input id="email" type="email" placeholder="xyz@gamil.com"
                                                        class="col-span-4" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">
                                                    Send Request
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-sm text-muted-foreground label">TimeLine:-</p>
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
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-sm text-muted-foreground label">Tags:-</p>
                                <ul>
                                    <li></li>
                                </ul>
                                </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        <div class="w-full">
            <TableTaskList />
        </div>
    </section>
</template>


<style scoped>
.label {
    @apply min-w-[80px]
}
</style>