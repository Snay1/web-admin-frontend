<script lang="ts" setup>
    import { AdminWrapper, Title, AccessCheckHandlerWb } from '~/components';
    import { WbItem, WbWarehouseSelect } from "~/components/wb-components";
    import { useWbProductsStore } from "~/store/index";

    useHead({
        title: "Admin - Wildberries"
    });

    const wbStore = useWbProductsStore();

</script>
<template>
    <AdminWrapper>
        <Title>
            Wildberries
        </Title>
        <AccessCheckHandlerWb>
            <WbWarehouseSelect class="mb-[20px]" />
            <MainGrid v-if="wbStore && wbStore.itemsList.length">
                <WbItem 
                    v-for="item in wbStore.itemsList"
                    :image="item.photos.length ? item.photos[0].big : ''"
                    :name="item.title"
                    :price="item.price"
                    :stocks="wbStore.isSellerWarehouse ? (item.stocks?.sellerWarehouse) : item.stocks?.wbWarehouse"
                    :id="item.nmID"
                />
            </MainGrid>
        </AccessCheckHandlerWb>
    </AdminWrapper>
</template>