<script setup>
    import { onMounted } from "vue";
    import { AdminWrapper, AdminTitle, AccessCheckHandler } from '~/components/admin';
    import { WbItem } from "~/components/wb-components/index";
    import { useAccessStore, useWbProductsStore } from "~/store";

    useHead({
        title: "Admin - Wildberries"
    });

    const access = useAccessStore();
    const wbStore = useWbProductsStore();

    onMounted(async () => {   

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await access.getWbKeys();
        await wbStore.getWbItemList(key);
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Wildberries
        </AdminTitle>
        <AccessCheckHandler shopName="Wildberries" :accessExists="!!(access.wbKeys.headerApiKey)">
            <MainGrid v-if="wbStore.itemsList.length">
                <WbItem 
                    v-for="item in wbStore.itemsList"
                    :image="item.photos.length ? item.photos[0].big : ''"
                    :name="item.title"
                    :price="item.price"
                    :stocks="0"
                    :id="item.nmID"
                />
            </MainGrid>
        </AccessCheckHandler>
    </AdminWrapper>
</template>