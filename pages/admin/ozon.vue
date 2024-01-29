<script setup>
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { useAccessStore } from "~/store";

    useHead({
        title: "Admin - Ozon"
    });

    const access = useAccessStore();

    onMounted(async () => {   
        await access.getOzonKeys();
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Ozon
        </AdminTitle>
        <AccessCheckHandler shopName="Ozon" :accessExists="!!(access.ozonKeys.apiKey && access.ozonKeys.clientId)">

        </AccessCheckHandler>
    </AdminWrapper>
</template>