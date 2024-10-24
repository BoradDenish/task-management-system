<script setup>
import { GripVertical } from 'lucide-vue-next';
import draggable from 'vuedraggable';
import { ref } from 'vue';

const invoices = ref([
    { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
    { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
    { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
    { invoice: 'INV006', paymentStatus: 'Pending', totalAmount: '$200.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV007', paymentStatus: 'Unpaid', totalAmount: '$300.00', paymentMethod: 'Credit Card' },
]);
</script>

<template>
    <div class="w-full border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow class="divide-x divide-border">
                    <TableHead class="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead class="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <draggable v-model="invoices" class="w-full [&_tr:last-child]:border-0" tag="tbody" item-key="invoice">
                <template #item="{ element }">
                    <TableRow class="divide-x divide-border" :key="element.invoice">
                        <TableCell class="font-medium">
                            <div class="flex items-center gap-2">
                                <Button size="icon" variant="ghost" class="max-w-7 max-h-7">
                                    <GripVertical class="w-4 h-4" />
                                </Button>
                                {{ element.invoice }}
                            </div>
                        </TableCell>
                        <TableCell>{{ element.paymentStatus }}</TableCell>
                        <TableCell>{{ element.paymentMethod }}</TableCell>
                        <TableCell class="text-right">{{ element.totalAmount }}</TableCell>
                    </TableRow>
                </template>
            </draggable>
        </Table>
    </div>
</template>
