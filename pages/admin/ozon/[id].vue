<script setup lang="ts">
    import { ref } from "vue";
    import { VFragment, Button, AdminWrapper, Input, AccessCheckHandler, CardImg, CardInput } from '~/components';
    import { useAccessStore, useOzonProductsStore } from "~/store";
    import type { OzonProductItemInfo } from "~/types/api";
    import axios from "axios";
    import { baseOzonUrl } from "~/common";

    useHead({
        title: "Admin - Ozon"
    });

    const route = useRoute();

    const access = useAccessStore();
    const ozonStore = useOzonProductsStore();

    const product = ref<OzonProductItemInfo | null>(null);
    const name = ref("");
    const stocks = ref(0);
    const price = ref(0);
    const oldPrice = ref(0);
    const minPrice = ref(0);

    const loading = ref(true);
    const error = ref(false);

    const getRequiredAttributes = async () => {

        if (!product.value) {
            return;
        }

        const { description_category_id, type_id } = product.value;

        const res = await axios.post(`${baseOzonUrl}/v1/description-category/attribute`, {
            description_category_id,
            language: "RU",
            type_id
        }, {
            headers: {
                "Client-Id": access.ozonKeys.clientId,
                "Api-Key": access.ozonKeys.apiKey
            }
        });

    }

    const saveProduct = async () => {

        if (!product.value) {
            return;
        }

        const res = await ozonStore.updateProductById({
            product_id: product.value.id,
            offer_id: product.value.offer_id,
            price: price.value.toString(),
            min_price: minPrice.value.toString(),
            old_price: oldPrice.value.toString(),
            stocks: stocks.value,
        }, {
            clientId: access.ozonKeys.clientId,
            apiKey: access.ozonKeys.apiKey,
        });

        if (!res) {
            return alert("Не удалось обновить товар");
        }

        alert("Товар успешно обновлен");
        product.value = {
            ...product.value,
            name: name.value,
            price: price.value.toString(),
            stocks: {
                ...product.value.stocks,
                present: Number(stocks.value),
            },
        }
    }

    onMounted(async () => {   

        loading.value = true;
        error.value = false;

        await access.getOzonKeys();

        const keysObject = {
            apiKey: access.ozonKeys.apiKey,
            clientId: access.ozonKeys.clientId
        }

        await ozonStore.getOzonItemList(keysObject);
        await ozonStore.getOzonItemInfoList(keysObject);
        product.value = await ozonStore.getOzonItemById(Number(route.params.id), keysObject);
        loading.value = false;

        if (!product.value) {
            error.value = true;
        } else {
            stocks.value = product.value.stocks.present;
            price.value = Number(product.value.price);
            oldPrice.value = Number(product.value.old_price);
            minPrice.value = Number(product.value.min_price) || 0;
            name.value = product.value.name;
        }

    });

</script>
<template>
    <AdminWrapper>
        <AccessCheckHandler shopName="Ozon" :accessExists="!!(access.ozonKeys.apiKey && access.ozonKeys.clientId)">
            <VFragment v-if="!error && !loading && product">
                <div class="flex flex-col lg:flex-row gap-[20px]">
                    <CardImg 
                        :src="product.primary_image"
                        :alt="product.name"
                    />
                    <div class="w-full">
                        <h1 class="text-2xl font-bold mb-[20px]">{{ product.name }}</h1>
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
                            <CardInput 
                                type="number"
                                :value="oldPrice.toString()"
                                placeholder="Старая цена"
                                @input="(e) => oldPrice = e.target.value"
                            />
                            <CardInput 
                                type="number"
                                value="minPrice.toString()"
                                placeholder="Минимальная цена"
                                @input="(e) => minPrice = e.target.value"
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