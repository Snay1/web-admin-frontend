<script setup>
    import { AdminWrapper, Title, AccessCheckHandlerWb } from '~/components';
    import { WbItem } from "~/components/wb-components/index";
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
            <MainGrid v-if="wbStore && wbStore.itemsList.length">
                <WbItem 
                    v-for="item in wbStore.itemsList"
                    :image="item.photos.length ? item.photos[0].big : ''"
                    :name="item.title"
                    :price="item.price"
                    :stocks="0"
                    :id="item.nmID"
                />
            </MainGrid>
        </AccessCheckHandlerWb>
    </AdminWrapper>
</template>