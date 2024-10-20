<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ShieldCheck, ArrowRight } from 'lucide-vue-next'

// Define the validation schema for OTP
const formSchema = toTypedSchema(z.object({
    otp: z.string()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d+$/, 'OTP must be a number')
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('OTP Verification form submitted:', values)
    // Add your OTP verification logic here (e.g., API call to verify OTP)
})

definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full gap-7">
        <div class="space-y-3">
            <CustomLogo />
            <div class="space-y-2 text-center">
                <h1 class="text-4xl text-foreground">OTP Verification</h1>
                <p class="text-sm max-w-[340px] text-muted-foreground">Enter the 6-digit OTP sent to your email or phone
                    to verify your account.</p>
            </div>
        </div>

        <div class="w-full space-y-4">
            <form class="w-full space-y-6" @submit="onSubmit">
                <div class="space-y-2.5 w-full">
                    <!-- OTP Field -->
                    <FormField v-slot="{ componentField }" name="otp">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Enter OTP</FormLabel>
                            <div class="relative">
                                <ShieldCheck
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input type="text" placeholder="Enter your OTP" class="w-full bg-background pl-10"
                                        v-bind="componentField" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>

                <Button class="w-full">Verify OTP
                    <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
            </form>

            <p class="text-center text-muted-foreground">Didn't receive the OTP? <RouterLink to="/resend-otp"
                    class="underline text-primary">Resend OTP</RouterLink>
            </p>
        </div>
    </div>
</template>
