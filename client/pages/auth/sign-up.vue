<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Smile, Github, ArrowRight, User, Phone, Mail, Lock } from 'lucide-vue-next';

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2, 'Username is too short').max(50, 'Username is too long'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number is too long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
}));

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values);
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
                <h1 class="text-4xl text-foreground">Create an Account</h1>
                <p class="text-sm max-w-[340px] text-muted-foreground">Sign up to create your dashboard, set
                    preferences, and start your projects.</p>
            </div>
        </div>
        <div class="space-y-6 w-full">
            <div class="space-y-2 w-full">
                <Button variant="outline" class="w-full">
                    <Smile class="w-4 h-4 mr-2 text-muted-foreground" />Connect with Google
                </Button>
                <Button variant="outline" class="w-full">
                    <Github class="w-4 h-4 mr-2 text-muted-foreground" />Connect with Github
                </Button>
            </div>
            <Separator label="Or Sign Up with email" />
        </div>
        <div class="w-full space-y-4">
            <form class="w-full space-y-6" @submit="onSubmit">

                <div class="space-y-2.5 w-full">
                    <!-- Username Field -->
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Username</FormLabel>
                            <div class="relative">
                                <User
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input placeholder="shadcn" class="w-full bg-background pl-10"
                                        v-bind="componentField" aria-invalid="false" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- Phone Number Field -->
                    <FormField v-slot="{ componentField }" name="phone">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Phone Number</FormLabel>
                            <div class="relative">
                                <Phone
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input placeholder="1234567890" class="w-full bg-background pl-10"
                                        v-bind="componentField" aria-invalid="false" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    </FormField>

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

                    <!-- Set Password Field -->
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Set a Password</FormLabel>
                            <div class="relative">
                                <Lock
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input type="password" placeholder="********" class="w-full bg-background pl-10"
                                        v-bind="componentField" aria-invalid="false" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>

                <Button class="w-full">Sign Up
                    <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
            </form>
            <p class="text-center text-muted-foreground">
                Already have an account?
                <RouterLink to="/auth/sign-in" class="underline text-primary">Log in here</RouterLink>
            </p>
        </div>
    </div>
</template>
