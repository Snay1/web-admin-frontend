<script lang="ts" setup>
    defineProps({
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    })
</script>
<template>
    <div class="bg-[#232323] p-[16px] border-solid border-[1px] border-white rounded-[8px] w-full md:w-[600px] font-bold">
        <p class="text-[16px] md:text-[24px]">
            {{ `${price}р` }}
        </p>
        <h3 class="my-[16px] text-[24px] md:text-[36px]">
            {{ title }}
        </h3>
        <p class="text-[14px] md:text-[18px]">
            {{ description }}
        </p>
    </div>
</template>