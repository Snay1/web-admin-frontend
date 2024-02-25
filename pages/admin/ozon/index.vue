<script setup lang="ts">
    import { ref } from 'vue';
    import { AdminWrapper, Title, AccessCheckHandlerOzon, Input } from '~/components';
    import { OzonItem } from '~/components/ozon-components';
    import { MainGrid } from '~/components/index';
    import { useOzonProductsStore } from "~/store";

    useHead({
        title: "Admin - Ozon"
    });
    const ozonStore = useOzonProductsStore();

    const searchValue = ref("");

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
                    v-for="item in ozonStore.itemsInfoList"
                    :image="item.primary_image"
                    :name="item.name"
                    :price="item.price"
                    :stocks="item.stocks"
                    :currency="item.currency_code"
                    :id="item.id"
                />
            </MainGrid>
        </AccessCheckHandlerOzon>
    </AdminWrapper>
</template>