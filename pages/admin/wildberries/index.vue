<script lang="ts" setup>
    import { AdminWrapper, Title, AccessCheckHandlerWb, PaginationComponent, Input } from '~/components';
    import { WbItem, WbWarehouseSelect } from "~/components/wb-components";
    import { useWbProductsStore } from "~/store/index";

    useHead({
        title: "Admin - Wildberries"
    });

    const itemsPerPage = 12;

    const wbStore = useWbProductsStore();

    const currentPage = ref(1);

    const searchValue = ref("");

    const searchHandler = () => {
        const items = wbStore.itemsList.filter((item) => item.title.toLowerCase().indexOf(searchValue.value.toLowerCase()) !== -1);
        
        return items;
        
    }

</script>
<template>
    <AdminWrapper>
        <Title>
            Wildberries
        </Title>
        <AccessCheckHandlerWb>
            <WbWarehouseSelect class="mb-[20px]" />
            <Input 
                placeholder="Поиск товара..."
                :value="searchValue"
                @input="e => searchValue = e.target.value"
                class="mb-[20px]"
            />
            <MainGrid v-if="wbStore && wbStore.itemsList.length">
                <WbItem 
                    v-for="item in searchHandler().slice()"
                    :image="item.photos.length ? item.photos[0].big : ''"
                    :name="item.title"
                    :price="item.price"
                    :stocks="wbStore.isSellerWarehouse ? (item.stocks?.sellerWarehouse) : item.stocks?.wbWarehouse"
                    :id="item.nmID"
                />
            </MainGrid>
            <PaginationComponent 
                :items-length="searchHandler().length"
                :current-page="currentPage"
                :itemsPerPage="itemsPerPage"
                @set-page="(value) => currentPage = value"
                v-if="wbStore.itemsList.length > 12"
            />
        </AccessCheckHandlerWb>
    </AdminWrapper>
</template>