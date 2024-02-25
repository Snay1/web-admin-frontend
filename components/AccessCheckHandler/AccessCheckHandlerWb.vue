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

        await wbStore.getWbItemList(key);
    });

</script>
<template>
    <AccessCheckHandler shopName="Wildberries" :accessExists="!!access.wbKeys.headerApiKey">
        <slot />
    </AccessCheckHandler>
</template>