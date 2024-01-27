<script setup>

    import { Button } from "~/components";

    import { useUserStore } from "~/store";

    const navItems = [
        {
            title: "Главная",
            href: "/admin",
        },
        {
            title: "Ozon",
            href: "/admin/ozon",
        },
        {
            title: "Wildberries",
            href: "/admin/wildberries",
        },
        {
            title: "Avito",
            href: "/admin/avito",
        },
        {
            title: "Yandex Market",
            href: "/admin/yandex-market",
        },
        {
            title: "Доступы к сервисам",
            href: "/admin/access-settings",
        },
    ];

    const userStore = useUserStore();

    const router = useRouter();

    const navActive = ref(false);

    const toggleNav = () => navActive.value = !navActive.value;

    const logout = async () => {
        const res = await userStore.logout();

        if (!res) {
            return;
        }

        router.push("/");

    }

</script>
<template>
    <div class="p-2 md:hidden fixed top-0 left-0 z-10 w-full h-[70px] bg-stone-800 flex items-center justify-between">
        <h1 class="text-xl font-bold text-white">
            Мультиадминка
        </h1>
        <button class="border-2 border-solid rounded-md border-white p-1" @click="toggleNav">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
    </div>
    <nav class="transition-all fixed top-0 z-20 md:left-0 left-[-300%] flex flex-col w-full h-[100vh] md:w-[250px] has-[active]:left-0 bg-stone-800 overflow-auto p-[20px] text-white" :class="{ 'active': navActive }">
        <div class="flex items-center justify-between">
            <h2 class="text-xl md:text-2xl font-bold">
                Мультиадминка
            </h2>
            <button class="md:hidden border-2 border-solid rounded-md border-white p-1" @click="toggleNav">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
        <ul class="flex flex-col gap-[12px] my-6">
            <li v-for="item in navItems" class="flex w-full md:text-xl transition-all hover:opacity-60">
                <NuxtLink :to="item.href" class="flex w-full">{{ item.title }}</NuxtLink>
            </li>
        </ul>
        <Button @click="logout" buttonClass="w-full mt-auto">
            Выйти
        </Button>
    </nav>
</template>
<style lang="scss" scoped>
    .active {
        left: 0;
    }
</style>