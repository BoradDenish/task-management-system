<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Lock, ArrowRight } from 'lucide-vue-next'

// Schema for validating the reset password form
const formSchema = toTypedSchema(z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})
);


const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Reset Password form submitted:', values)
    // Add your reset password logic here (e.g., API call to reset password)
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
                <h1 class="text-4xl text-foreground">Reset Password</h1>
                <p class="text-sm max-w-[340px] text-muted-foreground">Enter a new password for your account.</p>
            </div>
        </div>

        <div class="w-full space-y-4">
            <form class="w-full space-y-6" @submit="onSubmit">
                <div class="space-y-2.5 w-full">
                    <!-- Password Field -->
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>New Password</FormLabel>
                            <div class="relative">
                                <Lock
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input type="password" placeholder="********" class="w-full bg-background pl-10"
                                        v-bind="componentField" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- Confirm Password Field -->
                    <FormField v-slot="{ componentField }" name="confirmPassword">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Confirm Password</FormLabel>
                            <div class="relative">
                                <Lock
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input type="password" placeholder="********" class="w-full bg-background pl-10"
                                        v-bind="componentField" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>

                <Button class="w-full">Reset Password
                    <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
            </form>
        </div>
    </div>
</template>
