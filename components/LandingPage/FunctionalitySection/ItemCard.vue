<script lang="ts" setup>
import type { PropType } from 'vue';
    defineProps({
        icon: {
            type: String,
            required: false,
        },
        alt: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        items: {
            type: Array as PropType<string[]>,
            required: true,
        },
    });
</script>
<template>
    <div class="flex flex-col p-[16px] border-solid border-[1px] border-white rounded-[8px] text-white">
        <div class="flex items-center gap-[16px]">
            <div class="w-[50px] min-w-[50px] max-w-[50px] h-[50px] min-h-[50px] max-h-[50px] rounded-[8px] bg-[#575757]">
                <img  
                    :src="icon"
                    :alt="alt"
                    class="object-cover rounded-[8px]"
                    v-if="icon"
                />
            </div>
            <h3 class="font-bold text-white text-[18px] md:text-[20px] uppercase">
                {{ title }}
            </h3>
        </div>
        <div class="w-full h-[1px] bg-white mt-[12px] mb-[16px]">
        </div>
        <ul class="flex flex-col gap-[12px] text-[16px] font-bold">
            <li class="flex items-start gap-[10px]" v-for="item in items">
                <div class="mt-[10px] w-[5px] min-w-[5px] max-w-[5px] h-[5px] min-h-[5px] max-h-[5px] rounded-full bg-white">
                </div>
                <p>
                    {{ item }}
                </p>
            </li>
        </ul>
    </div>
</template>