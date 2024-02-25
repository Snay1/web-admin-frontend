<script lang="ts" setup>

  import { useWbProductsStore } from './store';

  const wbStore = useWbProductsStore();

  const currentWarehouseHandler = () => {

    const warehouseId = localStorage.getItem("selected-wb-warehouse-id");
    const isSeller = localStorage.getItem("selected-wb-warehouse-is-seller");

    if (!warehouseId) {
      return
    }

    wbStore.selectWarehouse(Number(warehouseId), isSeller === "true");

  }

  onMounted(() => {
    currentWarehouseHandler();
  })

</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- <LimitsInfo v-if="userStore.user" /> -->
  </NuxtLayout>
</template>
