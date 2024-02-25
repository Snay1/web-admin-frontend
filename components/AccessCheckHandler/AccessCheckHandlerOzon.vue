<script lang="ts" setup>
    import { useAccessStore, useOzonProductsStore } from "~/store";
    import { AccessCheckHandler } from "~/components";

    const access = useAccessStore();
    const ozonStore = useOzonProductsStore();

    onMounted(async () => {   

        await access.getOzonKeys();

        const keysObject = {
            apiKey: access.ozonKeys.apiKey,
            clientId: access.ozonKeys.clientId
        }

        await ozonStore.getOzonItemList(keysObject);
        await ozonStore.getOzonItemInfoList(keysObject);
    });

</script>
<template>
    <AccessCheckHandler shopName="Ozon" :accessExists="!!(access.ozonKeys.apiKey && access.ozonKeys.clientId)">
        <slot />
    </AccessCheckHandler>
</template>