<script setup lang="ts">
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { OzonItem } from '~/components/ozon-components';
    import { useAccessStore, useOzonProductsStore } from "~/store";

    useHead({
        title: "Admin - Ozon"
    });

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
    <AdminWrapper>
        <AdminTitle>
            Ozon
        </AdminTitle>
        <AccessCheckHandler shopName="Ozon" :accessExists="!!(access.ozonKeys.apiKey && access.ozonKeys.clientId)">
            <ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[20px]" v-if="ozonStore.itemsInfoList.length">
                <OzonItem 
                    v-for="item in ozonStore.itemsInfoList"
                    :image="item.primary_image"
                    :name="item.name"
                    :price="item.price"
                    :stocks="item.stocks"
                    :currency="item.currency_code"
                    :id="item.id"
                />
            </ul>
        </AccessCheckHandler>
    </AdminWrapper>
</template>