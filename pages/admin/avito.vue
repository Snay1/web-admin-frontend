<script setup>
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { useAccessStore } from "~/store";

    useHead({
        title: "Admin - Avito"
    });

    const access = useAccessStore();

    onMounted(async () => {   
        await access.getAvitoKeys();
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Avito
        </AdminTitle>
        <AccessCheckHandler shopName="Avito" :accessExists="!!(access.avitoKeys.client_id && access.avitoKeys.client_secret)">

        </AccessCheckHandler>
    </AdminWrapper>
</template>