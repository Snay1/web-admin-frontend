<script lang="ts" setup>
    import { useAccessStore, useWbProductsStore } from "~/store";
    import { AccessCheckHandler } from "~/components";

    const access = useAccessStore();
    const wbStore = useWbProductsStore();

    onMounted(async () => {   

        await access.getWbKeys();

        const key = {
            headerApiKey: access.wbKeys.headerApiKey
        }

        await wbStore.getWbItemList(key);
        await wbStore.getBarcodes();
        await wbStore.getWbWarehouses(key);
        await wbStore.getWbSellerWarehouses(key);

        const skus: string[] = [];

        for (let i = 0; i < wbStore.barcodes.length; i++) {
            const item = wbStore.barcodes[i];

            item.items.forEach((el) => skus.push(el));

        }

        await wbStore.getStocks({
            skus,
            headerApiKey: access.wbKeys.headerApiKey,
            warehouseId: wbStore.currentWarehouseId,
            isSellerWarehouse: wbStore.isSellerWarehouse,
        });

    });

</script>
<template>
    <AccessCheckHandler shopName="Wildberries" :accessExists="!!access.wbKeys.headerApiKey">
        <slot />
    </AccessCheckHandler>
</template>