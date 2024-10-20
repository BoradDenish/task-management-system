<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Mail, ArrowRight } from 'lucide-vue-next'

const formSchema = toTypedSchema(z.object({
    email: z.string().email('Please enter a valid email address')
}));

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
    console.log('Forgot Password form submitted:', values);
});

definePageMeta({
    layout: 'auth'
});
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full gap-7">
        <div class="space-y-3">
            <CustomLogo />
            <div class="space-y-2 text-center">
                <h1 class="text-4xl text-foreground">Forgot Password?</h1>
                <p class="text-sm max-w-[340px] text-muted-foreground">Enter your email to reset your password.</p>
            </div>
        </div>
        <div class="w-full space-y-4">
            <form class="w-full space-y-6" @submit="onSubmit">
                <div class="space-y-2.5 w-full">
                    <!-- Email Address Field -->
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Email Address</FormLabel>
                            <div class="relative">
                                <Mail
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input placeholder="example@mail.com" class="w-full bg-background pl-10"
                                        v-bind="componentField" aria-invalid="false" />
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

            <p class="text-center text-muted-foreground">
                Remember your password?
                <RouterLink to="/signin" class="underline text-primary">Sign in here</RouterLink>
            </p>
        </div>
    </div>
</template>
