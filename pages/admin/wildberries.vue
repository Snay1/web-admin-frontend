<script setup>
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { useAccessStore } from "~/store";

    useHead({
        title: "Admin - Wildberries"
    });

    const access = useAccessStore();

    onMounted(async () => {   
        await access.getWbKeys();
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