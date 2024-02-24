<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { AdminWrapper, AdminTitle, AccessCheckHandler, AdminInput } from '~/components/admin';
    import { OzonItem } from '~/components/ozon-components';
    import { MainGrid } from '~/components/index';
    import { useAccessStore, useOzonProductsStore } from "~/store";

    useHead({
        title: "Admin - Ozon"
    });

    const access = useAccessStore();
    const ozonStore = useOzonProductsStore();

    const searchValue = ref("");

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
            <AdminInput 
                placeholder="Поиск товара..."
                :value="searchValue"
                @input="e => searchValue = e.target.value"
                class="mb-[20px]"
            />
            <MainGrid v-if="ozonStore.itemsInfoList.length">
                <OzonItem 
                    v-for="item in ozonStore.itemsInfoList"
                    :image="item.primary_image"
                    :name="item.name"
                    :price="item.price"
                    :stocks="item.stocks"
                    :currency="item.currency_code"
                    :id="item.id"
                />
            </MainGrid>
        </AccessCheckHandler>
    </AdminWrapper>
</template>