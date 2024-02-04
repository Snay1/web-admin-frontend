<script setup>
    import { ref } from "vue";
    import { useAccessStore } from "~/store";
    import OzonInfo from "./OzonInfo.vue";
    import { VFragment } from "~/components";

    const access = useAccessStore();

    const isOpened = ref(false);

</script>
<template>
    <div class="fixed bottom-[20px] right-[20px] border-solid border-[1px] border-black rounded-md z-10 p-[10px] bg-white">
        <button @click="isOpened = !isOpened" class="ml-auto flex items-center justify-center border-solid border-[1px] rounded-md border-transparent transition-all" :style="{ 'border-color': isOpened ? 'black' : '' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-all" :style="{ transform: !isOpened ? 'rotate(180deg)' : '' }">
                <path d="m6 9 6 6 6-6"/>
            </svg>
        </button>
        <VFragment v-if="isOpened">
            <OzonInfo 
                v-if="access.ozonKeys.apiKey && access.ozonKeys.clientId" 
            />
        </VFragment>
    </div>
</template>