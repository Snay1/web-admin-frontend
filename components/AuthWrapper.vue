<script setup lang="ts">

    import { useUserStore } from "#imports";

    import { VFragment } from '.';

    const userStore = useUserStore();

    onMounted(async () => {
        await userStore.fetchUser();
    })


</script>
<template>
    <VFragment v-if="userStore.user">
        <slot />
    </VFragment>
    <VFragment v-else>
        <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex items-center justify-center flex-col">
            <p class="mb-[20px] text-2xl md:text-xl">
                У вас нет доступа к этой странице
            </p>
            <Button link="/">
                На главную
            </Button>
        </div>
    </VFragment>
</template>