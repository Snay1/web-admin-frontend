<script setup lang="ts">
    import { ref } from "vue";
    import { AdminWrapper, AdminInput, AccessCheckHandler, CardImg } from '~/components/admin';
    import { VFragment, Button } from '~/components';
    import { useAccessStore, useWbProductsStore } from "~/store";
    import type { WbProductListItemType } from "~/types/api";
    import axios from "axios";
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
    }

    onMounted(async () => {   

        loading.value = true;
        error.value = false;

        await access.getOzonKeys();

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await access.getWbKeys();
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
                                <h4 class="mb-[10px] font-bold text-lg">Цена (в рублях)</h4>
                                <AdminInput 
                                    type="number"
                                    :value="price.toString()"
                                    placeholder="Цена"
                                    @input="(e) => price = e.target.value"
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