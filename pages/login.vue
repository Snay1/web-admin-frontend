<script setup lang="ts">
    import { useUserStore } from "~/store";
    import { Button, Input, Logo } from '~/components';

    const router = useRouter();

    const userStore = useUserStore();

    const email = ref("");
    const password = ref("");

    const loginHandler = async () => {

        if (!email.value) {
            return;
        }

        if (!password.value) {
            return;
        }

        await userStore.login(email.value, password.value);

        if (!userStore.user) {
            return;
        }

        router.push("/admin");

    }

    onMounted(async () => {
        await userStore.fetchUser();

        if (userStore.user) {
            router.push("/admin");
        }

    });

</script>
<template>
    <div class="w-full h-full flex items-center justify-center flex-col">
        <NuxtLink to="/" class="flex items-center justify-center mb-[20px] text-xl hover:text-[#3FBAFF] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            На главную
        </NuxtLink>
        <form class="flex flex-col gap-4" @submit.prevent="loginHandler">
            <Logo />
            <p class="text-center text-lg">войти.</p>
            <Input 
                type="email"
                :value="email"
                placeholder="Email"
                @input="(e) => email = e.target.value"
            />
            <Input 
                type="password"
                :value="password"
                placeholder="Пароль"
                @input="(e) => password = e.target.value"
            />
            <Button type="submit" buttonClass="!bg-[#3FBAFF]">
                Войти
            </Button>
            <div>
                <p class="w-full text-center mt-[20px] mb-[10px]">Нет аккаунта?</p>
                <Button link="/register">
                    регистрация.
                </Button>
            </div>
        </form>
    </div>
</template>