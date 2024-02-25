<script lang="ts" setup>
    import { useAccessStore, useWbProductsStore } from "~/store";
    import { AccessCheckHandler } from "~/components";

    const access = useAccessStore();
    const wbStore = useWbProductsStore();

    onMounted(async () => {   

        await access.getWbKeys();

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await wbStore.getBarcodes();
        await wbStore.getWbItemList(key);
        await wbStore.getWbWarehouses(key);
        await wbStore.getWbSellerWarehouses(key);
    });

</script>
<template>
    <AccessCheckHandler shopName="Wildberries" :accessExists="!!access.wbKeys.headerApiKey">
        <slot />
    </AccessCheckHandler>
</template>