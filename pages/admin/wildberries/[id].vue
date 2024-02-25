<script setup lang="ts">
    import { ref } from "vue";
    import { VFragment, Button, AdminWrapper, AccessCheckHandler, CardImg, CardInput } from '~/components';
    import { WbWarehouseSelect } from "~/components/wb-components";
    import { useAccessStore, useWbProductsStore } from "~/store";
    import type { WbProductListItemType } from "~/types/api";

    useHead({
        title: "Admin - Wildberries"
    });

    const route = useRoute();
    
    const access = useAccessStore();
    const wbStore = useWbProductsStore();

    const product = ref<WbProductListItemType | null>(null);
    const name = ref("");
    const stocks = ref(0);
    const stocksLoaded = ref(false);
    const price = ref(0);

    const loading = ref(true);
    const error = ref(false);

    const barcodes = ref<string>("");
    const barcodesItems = ref<string[]>([]);

    const savePrice = async () => {

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

    const saveBarcodes = async () => {

        const barcodesValue = barcodes.value.trim();
        
        if (!barcodesValue) {
            return alert("Баркоды не вписаны!");
        }
        const items = barcodesValue.split(";");
        const resItems = [];

        for (let i = 0; i < items.length; i++) {

            const item = items[i].trim();

            if (!item) {
                continue;
            }

            resItems.push(item);

        }

        if (!resItems.length) {
            return alert("Баркоды не вписаны!");
        }

        const res = await wbStore.createEditBarcode(Number(route.params.id), resItems);

        if (!res) {
            return alert("Не удалось сохранить баркоды");
        }

        barcodesItems.value = resItems;

        return alert("Баркоды успешно сохранены");

    }

    const stocksHandler = async () => {

        const paramId = Number(route.params.id);

        for (let i = 0; i < wbStore.barcodes.length; i++) {
            const item = wbStore.barcodes[i];

            if (item.nmID === paramId) {

                const items = item.items;
                barcodesItems.value = items;

                let value = "";

                for (let j = 0; j < items.length; j++) {
                    const el = items[j];

                    value += `${el.trim()};`;

                }

                barcodes.value = value;

                const stocksRes = await wbStore.getStocks({
                    skus: items,
                    nmID: item.nmID,
                    headerApiKey: access.wbKeys.headerApiKey,
                    warehouseId: wbStore.currentWarehouseId,
                    isSellerWarehouse: wbStore.isSellerWarehouse,
                });

                for (let i = 0; i < wbStore.itemsList.length; i++) {
                    const item = wbStore.itemsList[i];

                    if (item.nmID !== paramId) {
                        continue;
                    }

                    stocks.value = wbStore.isSellerWarehouse ? item.stocks.sellerWarehouse : item.stocks.wbWarehouse;

                    break;

                }

                if (typeof stocksRes === "boolean") {
                    stocksLoaded.value = stocksRes;
                }

                return;
            }

        }
    }
    
    const saveStocks = async () => {

        if (!barcodesItems.value.length) {
            return;
        }

        await wbStore.saveStocks({
            headerApiKey: access.wbKeys.headerApiKey,
            warehouseId: wbStore.currentWarehouseId,
            stocks: [{
                sku: barcodesItems.value[0],
                amount: Number(stocks.value),
            }],
        })
    }

    onMounted(async () => {   

        const paramId = Number(route.params.id);

        await access.getWbKeys();

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await wbStore.getWbItemList(key);

        loading.value = true;
        error.value = false;

        product.value = await wbStore.getWbItemById(paramId);
        loading.value = false;

        await wbStore.getBarcodes();

        if (!product.value) {
            error.value = true;
        } else {

            stocksHandler();

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
                        <div class="mb-[10px]">
                            <CardInput 
                                type="text"
                                :value="barcodes.toString()"
                                placeholder="Баркоды (вводить без пробела через ';')"
                                @input="(e) => barcodes = e.target.value"
                            />
                            <Button button-class="w-full mt-[10px]" @click="saveBarcodes">
                                Сохранить баркоды
                            </Button>
                        </div>
                        <div class="mb-[10px]">
                            <WbWarehouseSelect 
                                class="mb-[10px]"
                            />
                            <Button button-class="w-full" @click="stocksHandler">
                                Получить остатки
                            </Button>
                        </div>
                        <div class="mb-[10px]">
                            <VFragment v-if="barcodes.length">
                                <CardInput 
                                    type="number"
                                    :value="stocks.toString()"
                                    placeholder="Количество товара на складе"
                                    @input="(e) => stocks = e.target.value"
                                />
                                <Button button-class="w-full mt-[10px]" @click="saveStocks">
                                    Сохранить остатки
                                </Button>
                            </VFragment>
                            <div class="mb-[10px] p-[12px] border-solid border-[1px] border-black rounded-md" v-else>
                                Добавьте хотя бы один баркод, чтобы можно было получить остатки товаров.
                            </div>
                        </div>
                        <div class="grid grid-cols-1">
                            <CardInput 
                                type="number"
                                :value="price.toString()"
                                placeholder="Цена (в рублях)"
                                @input="(e) => price = e.target.value"
                            />
                        </div>
                        <Button buttonClass="w-full mt-[20px]" @click="savePrice">
                            Сохранить цену
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