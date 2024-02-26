<script setup lang="ts">
    import { useUserStore } from "~/store";
    import { Button, Input } from '~/components';

    const router = useRouter();

    const userStore = useUserStore();

    const email = ref("");
    const password = ref("");
    const passwordAgain = ref("");

    const loginHandler = async () => {

        if (!email.value) {
            return;
        }

        if (password.value.trim().length < 8) {
            return alert("Пароль должен содержать 8 или более символов");
        }

        if (password.value !== passwordAgain.value) {
            return alert("Пароли должны совпадать");
        }

        await userStore.register(email.value, password.value);

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
    <div class="w-full h-full flex items-center justify-center">
        <form class="flex flex-col gap-4" @submit.prevent="loginHandler">
            <p class="text-center text-xl">регистрация.</p>
            <h1 class="text-center text-2xl uppercase font-bold text-slate-700">Мультиадминка</h1>
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
            <Input 
                type="password"
                :value="passwordAgain"
                placeholder="Пароль еще раз"
                @input="(e) => passwordAgain = e.target.value"
            />
            <Button type="submit">
                Зарегистрироваться
            </Button>
        </form>
    </div>
</template>