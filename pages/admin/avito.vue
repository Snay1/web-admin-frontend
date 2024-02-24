<script setup>
    import { AdminWrapper, Title, AccessCheckHandler } from '~/components';
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
        <Title>
            Avito
        </Title>
        <AccessCheckHandler shopName="Avito" :accessExists="!!(access.avitoKeys.client_id && access.avitoKeys.client_secret)">

        </AccessCheckHandler>
    </AdminWrapper>
</template>