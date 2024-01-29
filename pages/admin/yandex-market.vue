<script setup>
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { useAccessStore } from "~/store";

    useHead({
        title: "Admin - Yandex Market"
    });

    const access = useAccessStore();

    onMounted(async () => {   
        await access.getYandexMarketKeys();
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Yandex Market
        </AdminTitle>
        <AccessCheckHandler shopName="Yandex Market" :accessExists="!!(access.yandexMarketKeys.client_id && access.yandexMarketKeys.client_secret)">

        </AccessCheckHandler>
    </AdminWrapper>
</template>