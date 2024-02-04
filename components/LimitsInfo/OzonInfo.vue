<script setup lang="ts">
    import { onMounted } from "vue";
    import { useAccessStore, useOzonProductsStore } from "~/store";

    const access = useAccessStore();
    const ozonStore = useOzonProductsStore();

    onMounted(async () => {
        
        const keysObject = {
            apiKey: access.ozonKeys.apiKey,
            clientId: access.ozonKeys.clientId
        }

        await ozonStore.getOzonLimit(keysObject);

    });
</script>
<template>
    <div v-if="ozonStore.limits">
        <h5 class="font-bold">Ozon:</h5>
        <p>Кол-во созданий в день: {{ ozonStore.limits.daily_create.limit }}</p>
        <p>Кол-во обновлений в день: {{ ozonStore.limits.daily_update.limit }}</p>
    </div>
</template>