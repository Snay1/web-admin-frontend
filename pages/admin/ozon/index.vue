<script setup lang="ts">
    import { ref } from 'vue';
    import { AdminWrapper, Title, AccessCheckHandlerOzon, Input, PaginationComponent } from '~/components';
    import { OzonItem } from '~/components/ozon-components';
    import { MainGrid } from '~/components/index';
    import { useOzonProductsStore } from "~/store";

    useHead({
        title: "Admin - Ozon"
    });
    const ozonStore = useOzonProductsStore();

    const itemsPerPage = 12;

    const searchValue = ref("");

    const currentPage = ref(1);

    const searchHandler = () => {
        const items = ozonStore.itemsInfoList.filter((item) => item.name.toLowerCase().indexOf(searchValue.value.toLowerCase()) !== -1);
        
        return items;
        
    }

</script>
<template>
    <AdminWrapper>
        <Title>
            Ozon
        </Title>
        <AccessCheckHandlerOzon>
            <Input 
                placeholder="Поиск товара..."
                :value="searchValue"
                @input="e => searchValue = e.target.value"
                class="mb-[20px]"
            />
            <MainGrid v-if="ozonStore.itemsInfoList.length">
                <OzonItem 
                    v-for="item in searchHandler().slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)"
                    :image="item.primary_image"
                    :name="item.name"
                    :price="item.price"
                    :stocks="item.stocks"
                    :currency="item.currency_code"
                    :id="item.id"
                />
            </MainGrid>
            <PaginationComponent 
                :items-length="searchHandler().length"
                :items-per-page="itemsPerPage"
                :current-page="currentPage"
                @set-page="(value) => currentPage = value"
                v-if="ozonStore.itemsInfoList.length > 12"
            />
        </AccessCheckHandlerOzon>
    </AdminWrapper>
</template>