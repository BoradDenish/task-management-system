<script setup>
import { GripVertical, Database } from 'lucide-vue-next';
import draggable from 'vuedraggable';
import { ref } from 'vue';

const tasks = ref([
  {
    Task_Name: "Task 1",
    Description: "Description of task 1",
    Assigned_To: [
      {
        user_name: "John Doe",
        email: "john.doe@example.com",
        profile_image: "https://example.com/images/john_doe.png"
      },
      {
        user_name: "Emily Clark",
        email: "emily.clark@example.com",
        profile_image: "https://example.com/images/emily_clark.png"
      }
    ],
    Priority: 1,
    Status: 0,  // Not Started
    Start_Date: "2024-10-01",
    Due_Date: "2024-10-05",
    Completion_Date: null,
    Estimated_Time: "5 hours",
    Actual_Time: null,
    Comments: "Initial phase",
    Last_Updated_On: "2024-10-01",
    Created_On: "2024-09-30",
    Created_By: {
      name: "Manager A",
      email: "managerA@example.com",
      profile_image: "https://example.com/images/manager_a.png"
    },
    Category: "Project"
  },
  {
    Task_Name: "Task 2",
    Description: "Description of task 2",
    Assigned_To: [
      {
        user_name: "Jane Smith",
        email: "jane.smith@example.com",
        profile_image: "https://example.com/images/jane_smith.png"
      }
    ],
    Priority: 2,
    Status: 2,  // In Progress
    Start_Date: "2024-10-02",
    Due_Date: "2024-10-07",
    Completion_Date: null,
    Estimated_Time: "8 hours",
    Actual_Time: "4 hours",
    Comments: "Halfway through",
    Last_Updated_On: "2024-10-03",
    Created_On: "2024-10-01",
    Created_By: {
      name: "Manager B",
      email: "managerB@example.com",
      profile_image: "https://example.com/images/manager_b.png"
    },
    Category: "Personal"
  },
  {
    Task_Name: "Task 3",
    Description: "Description of task 3",
    Assigned_To: [
      {
        user_name: "Mike Johnson",
        email: "mike.johnson@example.com",
        profile_image: "https://example.com/images/mike_johnson.png"
      }
    ],
    Priority: 3,
    Status: 1,  // Completed
    Start_Date: "2024-09-28",
    Due_Date: "2024-10-03",
    Completion_Date: "2024-10-02",
    Estimated_Time: "7 hours",
    Actual_Time: "6.5 hours",
    Comments: "Completed ahead of time",
    Last_Updated_On: "2024-10-02",
    Created_On: "2024-09-25",
    Created_By: {
      name: "Manager A",
      email: "managerA@example.com",
      profile_image: "https://example.com/images/manager_a.png"
    },
    Category: "Project"
  },
  {
    Task_Name: "Task 4",
    Description: "Description of task 4",
    Assigned_To: [
      {
        user_name: "Anna Lee",
        email: "anna.lee@example.com",
        profile_image: "https://example.com/images/anna_lee.png"
      }
    ],
    Priority: 1,
    Status: 3,  // On Hold
    Start_Date: "2024-10-01",
    Due_Date: "2024-10-10",
    Completion_Date: null,
    Estimated_Time: "10 hours",
    Actual_Time: null,
    Comments: "Waiting for approval",
    Last_Updated_On: "2024-10-04",
    Created_On: "2024-09-29",
    Created_By: {
      name: "Manager C",
      email: "managerC@example.com",
      profile_image: "https://example.com/images/manager_c.png"
    },
    Category: "Personal"
  }
]);
</script>

<template>
    <div class="w-full border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow class="divide-x divide-border">
                    <TableHead class="w-[40px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>People</TableHead>
                </TableRow>
            </TableHeader>
            <draggable v-if="tasks && tasks.length > 0" v-model="tasks" class="w-full [&_tr:last-child]:border-0"
                tag="tbody" item-key="id" handle=".drag-handle">
                <template #item="{ element }">
                    <TableRow class="divide-x divide-border" :key="element.id">
                        <TableCell>
                            <Button size="icon" variant="ghost" class="max-w-7 max-h-7 drag-handle">
                                <GripVertical class="w-4 h-4" />
                            </Button>
                        </TableCell>
                        <TableCell class="font-medium">
                            <div class="flex items-center gap-2">
                                <Checkbox id="terms" />
                                {{ element.Task_Name }}
                            </div>
                        </TableCell>
                        <TableCell>{{ element.Description }}</TableCell>
                        <TableCell>{{ element.Due_Date }}</TableCell>
                        <TableCell class="text-right">
                            <CustomStatus :status="element.Status" />
                        </TableCell>
                        <TableCell>
                            <CustomStatus :status="element.Priority" :is="true" />
                        </TableCell>
                        <TableCell>
                            <div class="flex -space-x-2">
                                <HoverCard v-for="personal in element.Assigned_To" :key="personal.name">
                                    <HoverCardTrigger>
                                        <Avatar class="max-w-8 max-h-8">
                                            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="end" class="flex items-start gap-3">
                                        <Avatar class="max-w-8 max-h-8">
                                            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div class="flex flex-col gap-1">
                                            <h6 class="text-base leading-none">{{ personal.user_name }}</h6>
                                            <p class="text-xs text-muted-foreground">{{ personal.email }}</p>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </TableCell>
                    </TableRow>
                </template>
            </draggable>
            <TableBody v-else>
            <TableEmpty colspan="7">
                <div class="w-full flex items-center justify-center">
                    <div class="space-y-2">
                        <Database class=" w-12 h-12" />
                        <p>No items.</p>
                    </div>
                </div>
            </TableEmpty>
        </TableBody>
        </Table>
    </div>
</template>
