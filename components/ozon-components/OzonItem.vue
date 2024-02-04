<script setup lang="ts">

    import type { PropType } from "vue";
    import type { OzonStocksType } from "~/types/api"; 
    import { sliceItemNameHandler } from "~/usable";

    defineProps({
        id: {
            type: Number,
            required: true, 
        },
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        stocks: {
            type: Object as PropType<OzonStocksType>,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
    }); 
    

</script>
<template>
    <li class="p-[20px] bg-stone-100 rounded-md">
        <NuxtLink :to="`/admin/ozon/${id}`">
            <div class="w-full h-[250px] md:h-[300px] bg-slate-300 mb-[20px] rounded-md overflow-hidden">
                <img 
                    :src="image" 
                    :alt="name"
                    class="w-full h-full object-cover rounded-md" 
                />
            </div>
            <h3 class="text-xl font-bold mb-[20px]">
                {{ sliceItemNameHandler(name) }}
            </h3>
            <div class="text-lg">
                <p>{{ Number(price) }} {{ currency }}</p>
                <p>Остаток на складе: <span :style="{ color: stocks.present === 0 ? 'red' : '' }">{{ stocks.present }}</span></p>
            </div>
        </NuxtLink>
    </li>
</template>