<script setup lang="ts">
    import { ref } from "vue";
    import { AdminWrapper, AdminInput, AccessCheckHandler } from '~/components/admin';
    import { VFragment, Button } from '~/components';
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
            minPrice.value = Number(product.value.min_price);
            name.value = product.value.name;
        }

    });

</script>
<template>
    <AdminWrapper>
        <AccessCheckHandler shopName="Ozon" :accessExists="!!(access.ozonKeys.apiKey && access.ozonKeys.clientId)">
            <VFragment v-if="!error && !loading && product">
                <div class="flex flex-col lg:flex-row gap-[20px]">
                    <div class="w-full min-w-[300px] lg:max-w-[450px] h-[300px] xl:min-w-[450px] xl:h-[450px] bg-slate-200 rounded-lg border-solid border-[1px] border-slate-400">
                        <img 
                            :src="product.primary_image"
                            :alt="product.name"
                            class="w-full h-full object-cover rounded-lg" 
                        />
                    </div>
                    <div class="w-full">
                        <h1 class="text-2xl font-bold mb-[20px]">{{ product.name }}</h1>
                        <!-- <div class="mb-[10px]">
                            <h4 class="mb-[10px] font-bold text-lg">Название</h4>
                            <AdminInput 
                                :value="name"
                                placeholder="Название товара"
                                @input="(e) => name = e.target.value"
                            />
                        </div> -->
                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-[10px]">
                            <div>
                                <h4 class="mb-[10px] font-bold text-lg">Количество на складе</h4>
                                <AdminInput 
                                    type="number"
                                    :value="stocks.toString()"
                                    placeholder="Количество товара на складе"
                                    @input="(e) => stocks = e.target.value"
                                />
                            </div>
                            <div>
                                <h4 class="mb-[10px] font-bold text-lg">Цена</h4>
                                <AdminInput 
                                    type="number"
                                    :value="price.toString()"
                                    placeholder="Цена"
                                    @input="(e) => price = e.target.value"
                                />
                            </div>
                            <div>
                                <h4 class="mb-[10px] font-bold text-lg">Старая цена</h4>
                                <AdminInput 
                                    type="number"
                                    :value="oldPrice.toString()"
                                    placeholder="Старая цена"
                                    @input="(e) => oldPrice = e.target.value"
                                />
                            </div>
                            <div>
                                <h4 class="mb-[10px] font-bold text-lg">Минимальная цена</h4>
                                <AdminInput 
                                    type="number"
                                    :value="oldPrice.toString()"
                                    placeholder="Минимальная цена"
                                    @input="(e) => oldPrice = e.target.value"
                                />
                            </div>
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