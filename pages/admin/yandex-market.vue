<script setup>
    import { AdminWrapper, Title, AccessCheckHandler } from '~/components';
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
        <Title>
            Yandex Market
        </Title>
        <AccessCheckHandler shopName="Yandex Market" :accessExists="!!(access.yandexMarketKeys.client_id && access.yandexMarketKeys.client_secret)">

        </AccessCheckHandler>
    </AdminWrapper>
</template>