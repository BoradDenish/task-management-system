<script>
import { useForm } from 'vee-validate';
import { mutateGraphQL } from '~/utils/apolloHelper';
import { useUserStore } from '~/store'
import { toTypedSchema } from '@vee-validate/zod';
import { useToast } from '@/components/ui/toast/use-toast'
import * as z from 'zod';
import { Smile, Github, ArrowRight, Mail, Lock, Loader } from 'lucide-vue-next';

definePageMeta({ layout: 'auth' })

const { toast } = useToast()

export default {
    components: {
        Smile, Github, ArrowRight, Mail, Lock, Loader
    },
    data() {
        return {
            formSchema: toTypedSchema(z.object({
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
                     mutation loginUser($payload: loginPayLoad!) {
                        loginUser(payload: $payload) {
                            success
                            message
                            data{
                            session_token
                            }
                            }
                         }
                    `, {
                        payload: values
                    });
                    if (response.loginUser.success == 1) {
                        const userStore = useUserStore()
                        this.$router.push('/')
                        userStore.setUserToken(response.loginUser.data.session_token)
                        toast({
                            description: response.loginUser.message,
                        });
                    }
                    else {
                        toast({
                            description: response.loginUser.message,
                        });
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
                <h1 class="text-4xl text-foreground">Welcome Back</h1>
                <p class="text-sm max-w-[340px] text-muted-foreground">Sign in to access to your dashbaord, setting and
                    project.</p>
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
            <form class="w-full space-y-6" @submit.prevent="onSubmit">

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

                    <!-- Password Field -->
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem class="w-full space-y-1">
                            <FormLabel>Password</FormLabel>
                            <div class="relative">
                                <Lock
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <FormControl>
                                    <Input type="password" placeholder="********" class="w-full bg-background pl-10"
                                        v-bind="componentField" aria-invalid="false" />
                                </FormControl>
                            </div>
                            <FormMessage />
                            <RouterLink to="/auth/forgot-password" class="underline mt-2 text-sm text-end block">Forgot
                                password?
                            </RouterLink>
                        </FormItem>
                    </FormField>
                </div>

                <Button class="w-full">Sign In
                    <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
            </form>
            <p class="text-center text-muted-foreground">
                Don't have an account?
                <RouterLink to="/auth/sign-up" class="underline text-primary">Sign up here</RouterLink>
            </p>
        </div>
    </div>
</template>
