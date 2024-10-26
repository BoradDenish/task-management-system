<script>
import { useForm } from 'vee-validate';
import { mutateGraphQL } from '~/utils/apolloHelper';
import { useUserStore } from '~/store'
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Smile, Github, ArrowRight, User, Phone, Mail, Lock, Loader } from 'lucide-vue-next';

definePageMeta({ layout: 'auth' })

export default {
    components: {
        Smile, Github, ArrowRight, User, Phone, Mail, Lock, Loader
    },
    data() {
        return {
            formSchema: toTypedSchema(z.object({
                name: z.string().min(2, 'Username is too short').max(50, 'Username is too long'),
                phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number is too long'),
                email: z.string().email('Invalid email address'),
                password: z.string().min(8, 'Password must be at least 8 characters'),
            })),
            form: null,
            loading: false,
        };
    },
    created() {
        this.form = useForm({
            validationSchema: this.formSchema,
        });
    },
    methods: {
        async onSubmit() {
            this.form.handleSubmit(async (values) => {
                this.loading = true;
                try {
                    const response = await mutateGraphQL(this.$apollo, `
                     mutation createUser($input: CreateUserInput!) {
                        createUser(input: $input) {
                            success
                            message
                            data{
                            session_token
                            }
                            }
                         }
                    `, {
                        input: values
                    });
                    if (response.createUser.success == 1) {
                        const userStore = useUserStore()
                        this.$router.push('/')
                        userStore.setUserToken(response.createUser.data.session_token)
                    }
                    else {
                        console.error(response.createUser.message)
                    }

                } catch (e) {
                    console.error('Error signing up:', e);
                } finally {
                    this.loading = false;
                }
            })();
        }
    },
};
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
                <Button variant="outline" class="w-full" :disabled="loading">
                    <Smile class="w-4 h-4 mr-2 text-muted-foreground" />Connect with Google
                </Button>
                <Button variant="outline" class="w-full" :disabled="loading">
                    <Github class="w-4 h-4 mr-2 text-muted-foreground" />Connect with Github
                </Button>
            </div>
            <Separator label="Or Sign Up with email" />
        </div>
        <div class="w-full space-y-4">
            <form class="w-full space-y-6" @submit.prevent="onSubmit">

                <div class="space-y-2.5 w-full">

                    <FormField v-slot="{ componentField }" name="name">
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

                <Button class="w-full" :disabled="loading">
                    <Loader v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                    Sign Up
                    <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
            </form>
            <p class="text-center text-muted-foreground">
                Already have an account?
                <RouterLink to="/auth/sign-in" class="underline text-primary "
                    :class="loading ? 'opacity-50 pointer-events-none' : ''">Log in here</RouterLink>
            </p>
        </div>
    </div>
</template>
