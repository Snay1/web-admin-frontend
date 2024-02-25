<script setup>
  import { LimitsInfo } from '~/components';
  import { useUserStore } from "~/store";

  const router = useRouter();

  const userStore = useUserStore();
  const wbStore = useWbProductsStore();

  const currentWarehouseHandler = () => {

    const warehouseId = localStorage.getItem("selected-wb-warehouse-id");
    const isSeller = localStorage.getItem("selected-wb-warehouse-is-seller");

    if (!warehouseId) {
      return
    }

    console.log(warehouseId)

    wbStore.selectWarehouse(Number(warehouseId), isSeller === "true");

  }

  onMounted(() => {
    currentWarehouseHandler();
  })

</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <LimitsInfo v-if="userStore.user" />
  </NuxtLayout>
</template>
