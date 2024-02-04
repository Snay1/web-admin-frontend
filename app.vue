<script setup>
  import { LimitsInfo } from '~/components';
  import { useUserStore } from "~/store";

  const router = useRouter();

  const userStore = useUserStore();
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <LimitsInfo v-if="userStore.user" />
  </NuxtLayout>
</template>
