<script setup lang="ts">
    import { ref } from "vue";
    import { VFragment, Button, AdminWrapper, Input, AccessCheckHandler, CardImg, CardInput } from '~/components';
    import { useAccessStore, useWbProductsStore } from "~/store";
    import type { WbProductListItemType } from "~/types/api";
    import axios from "~/axios";
    import { baseWbUrl } from "~/common";

    useHead({
        title: "Admin - Wildberries"
    });

    const route = useRoute();

    const access = useAccessStore();
    const wbStore = useWbProductsStore();

    const product = ref<WbProductListItemType | null>(null);
    const name = ref("");
    const stocks = ref(0);
    const price = ref(0);

    const loading = ref(true);
    const error = ref(false);

    const saveProduct = async () => {

        if (!product.value) {
            return;
        }

        const result = {
            price: false,
        }

        const priceUpdateHandler = async () => {
            if (!price.value || !product.value) {
                return;
            }

            const res = await wbStore.updateItemPriceById(product.value.nmID, Number(price.value), {
                headerApiKey: access.wbKeys.headerApiKey
            });

            if (!res) {
                return;
            }

            result.price = true;

        }


        await priceUpdateHandler();
        

        alert(`Цена: ${result.price ? "обновлена" : "ошибка"}; `);

    }

    onMounted(async () => {   

        loading.value = true;
        error.value = false;

        
        await access.getWbKeys();

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await wbStore.getWbItemList(key);
        product.value = await wbStore.getWbItemById(Number(route.params.id));
        loading.value = false;

        if (!product.value) {
            error.value = true;
        } else {
            // stocks.value = product.value.stocks.present;
            price.value = Number(product.value.price);
            name.value = product.value.title;
        }

    });

</script>
<template>
    <AdminWrapper>
        <AccessCheckHandler shopName="Wildberries" :accessExists="!!access.wbKeys.headerApiKey">
            <VFragment v-if="!error && !loading && product">
                <div class="flex flex-col lg:flex-row gap-[20px]">
                    <CardImg 
                        :src="product.photos[0].big"
                        :alt="product.title"
                        v-if="product.photos.length" 
                    />
                    <div class="w-full">
                        <h1 class="text-2xl font-bold mb-[20px]">{{ product.title }}</h1>
                        <!-- <div class="mb-[10px]">
                            <h4 class="mb-[10px] font-bold text-lg">Название</h4>
                            <Input 
                                :value="name"
                                placeholder="Название товара"
                                @input="(e) => name = e.target.value"
                            />
                        </div> -->
                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-[10px]">
                            <CardInput 
                                type="number"
                                :value="stocks.toString()"
                                placeholder="Количество товара на складе"
                                @input="(e) => stocks = e.target.value"
                            />
                            <CardInput 
                                type="number"
                                :value="price.toString()"
                                placeholder="Цена (в рублях)"
                                @input="(e) => price = e.target.value"
                            />
                        </div>
                        <Button buttonClass="w-full mt-[20px]" @click="saveProduct">
                            Сохранить
                        </Button>
                    </div>
                </div>
            </VFragment>
            <VFragment v-if="loading && !error">
                <div class="flex items-center justify-center">
                    <p class="text-2xl">
                        Загрузка...
                    </p>
                </div>
            </VFragment>
        </AccessCheckHandler>
    </AdminWrapper>
</template>