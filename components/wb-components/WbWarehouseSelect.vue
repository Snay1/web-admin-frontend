<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import { Input } from "~/components";
    import { useWbProductsStore, useAccessStore } from "~/store";
    import type { InputEventType } from "~/types/client/InputEventType";
    import { onClickOutside } from '@vueuse/core'

    interface WarehouseItemType {
        name: string;
        id: number;
        isSellerWarehouse: boolean;
    }

    const access = useAccessStore();
    const wbStore = useWbProductsStore();   

    const selectRef = ref<HTMLDivElement | null>(null);

    
    const searchValue = ref("");
    const isSelectOpen = ref(false);
    const allWarehouses = ref<WarehouseItemType[]>([]);
    
    onClickOutside(selectRef, () => isSelectOpen.value = false);

    const currentWarehouseHandler = () => {

        if (wbStore.currentWarehouseId === -1) {
            return;
        }

        if (wbStore.isSellerWarehouse) {

            for (let i = 0; i < wbStore.sellerWarehouses.length; i++) {
                const item = wbStore.sellerWarehouses[i];

                if (item.id !== wbStore.currentWarehouseId) {
                    continue;
                }

                searchValue.value = item.name;

                break;

            }
            
            return;
        }

        for (let i = 0; i < wbStore.warehouses.length; i++) {
            const item = wbStore.warehouses[i];

            if (item.id !== wbStore.currentWarehouseId) {
                continue;
            }

            searchValue.value = item.name;

            break;

        }

    }

    const warehousesSortHandler = () => {

        const sortedWb = wbStore.warehouses.map((item) => {
            return {
                name: item.name,
                id: item.id,
                isSellerWarehouse: false,
            }
        });

        const sortedSeller = wbStore.sellerWarehouses.map((item) => {
            return {
                name: item.name,
                id: item.id,
                isSellerWarehouse: true,
            }
        });

        allWarehouses.value = [...sortedSeller, ...sortedWb];

    }

    const searchHandler = (e: InputEventType) => {
        searchValue.value = e.target.value;
        isSelectOpen.value = true;
    }

    const allWarehousesFilter = (value: string) => {

        const items = allWarehouses.value.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);

        if (items.length <= 1) {
            return allWarehouses.value;
        }

        return items;

    }

    const selectWarehouseHandler = (item: WarehouseItemType) => {
        isSelectOpen.value = false;
        searchValue.value = item.name;
        wbStore.selectWarehouse(item.id, item.isSellerWarehouse);
        localStorage.setItem("selected-wb-warehouse-id", `${item.id}`);
        localStorage.setItem("selected-wb-warehouse-is-seller", `${item.isSellerWarehouse}`);

        const skus: string[] = [];

        for (let i = 0; i < wbStore.barcodes.length; i++) {
            const item = wbStore.barcodes[i];

            item.items.forEach((el) => skus.push(el));

        }

        wbStore.getStocks({
            skus,
            headerApiKey: access.wbKeys.headerApiKey,
            warehouseId: wbStore.currentWarehouseId,
            isSellerWarehouse: wbStore.isSellerWarehouse,
        });

    }

    onMounted(async () => {

        await access.getWbKeys();

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await wbStore.getWbWarehouses(key);
        await wbStore.getWbSellerWarehouses(key);

        currentWarehouseHandler();
        warehousesSortHandler();
        
    });

</script>
<template>
    <div>
        <h4 class="text-lg font-bold mb-[10px]">Выбранный склад: </h4>
        <div class="relative" ref="selectRef">
            <div @click="isSelectOpen = true">
                <Input 
                    placeholder="Название склада"
                    :value="searchValue"
                    @input="(e) => searchHandler(e)"
                />
            </div>
            <ul class="absolute top-[60px] left-0 w-full max-h-[300px] overflow-auto border-[1px] border-solid rounded-md border-black bg-white" v-if="isSelectOpen && allWarehouses.length">
                <li class="p-[10px] border-b-[1px] border-black border-solid transition-all cursor-pointer hover:bg-slate-200 z-10" v-for="item in allWarehousesFilter(searchValue)" @click="selectWarehouseHandler(item)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>