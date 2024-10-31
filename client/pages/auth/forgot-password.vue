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
                     mutation sendOtp($payload: sendOtpPayLoad!) {
                        sendOtp(payload: $payload) {
                            success
                            message
                            }
                         }
                    `, {
                        payload: values
                    });
                    if (response.sendOtp.success == 1) {
                        localStorage.setItem("temp_email", values.email);
                        this.$router.push('/auth/otp-verification')
                        toast({
                            description: response.sendOtp.message,
                        });
                    }
                    else {
                        toast({
                            description: response.sendOtp.message,
                        });
                    }

                } catch (e) {
                    console.error('Error Otp send up:', e);
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
                <h1 class="text-4xl text-foreground">Forgot Password?</h1>
                <p class="text-sm max-w-[340px] text-muted-foreground">Enter your email to reset your password.</p>
            </div>
        </div>
        <div class="w-full space-y-4">
            <form class="w-full space-y-6" @submit.prevent="onSubmit">
                <div class="space-y-2.5 w-full">
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

                <Button class="w-full" :disabled="loading">
                    <Loader v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                    Reset Password
                    <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
            </form>

            <p class="text-center text-muted-foreground">
                Remember your password?
                <RouterLink to="/auth/sign-in" class="underline text-primary">Sign in here</RouterLink>
            </p>
        </div>
    </div>
</template>
