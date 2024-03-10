<script lang="ts" setup>
    defineProps({
        isSoon: {
            type: Boolean,
            required: true,
        },
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
    });
</script>
<template>
    <li class="w-[125px] h-[125px] relative rounded-[12px] overflow-hidden">
        <div v-if="isSoon" class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[5px] font-bold bg-[#56565699] text-white text-[16px]">
            скоро.
        </div>
        <img 
            :src="src"
            :alt="alt"
            class="w-full h-full"
        />
    </li>
</template>