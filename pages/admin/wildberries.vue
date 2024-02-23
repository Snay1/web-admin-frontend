<script setup>
    import { onMounted } from "vue";
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { useAccessStore, useWbProductsStore } from "~/store";

    useHead({
        title: "Admin - Wildberries"
    });

    const access = useAccessStore();
    const wbStore = useWbProductsStore();

    onMounted(async () => {   
        await access.getWbKeys();
        await wbStore.getWbItemList({
            headerApiKey: access.wbKeys.headerApiKey
        });
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Wildberries
        </AdminTitle>
        <AccessCheckHandler shopName="Wildberries" :accessExists="!!(access.wbKeys.headerApiKey)">
        </AccessCheckHandler>
    </AdminWrapper>
</template>