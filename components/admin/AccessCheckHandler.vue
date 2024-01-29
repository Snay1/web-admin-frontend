<script setup lang="ts">
    import { VFragment, Button } from '~/components';

    const props = defineProps({
        accessExists: {
            type: Boolean,
            required: true,
        },
        shopName: {
            type: String,
            required: true,
        },
    });

</script>

<template>
    <VFragment v-if="accessExists">
        <slot />
    </VFragment>
    <div v-else class="flex flex-col items-center justify-center py-[10px]">
        <p class="text-center text-xl mb-[20px] max-w-[700px]">
            У вас нет доступа к данной вкладке, т.к. вы не добавили ключи для получения данных из вашего интернет магазина {{ shopName }}
        </p>
        <Button link="/admin/access-settings">
            Добавить
        </Button>
    </div>
</template>