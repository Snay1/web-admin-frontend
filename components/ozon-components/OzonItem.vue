<script setup lang="ts">

    import type { PropType } from "vue";
    import type { OzonStocksType } from "~/types/api"; 

    defineProps({
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
        <div class="w-full h-[250px] md:h-[300px] bg-slate-300 mb-[20px] rounded-md overflow-hidden">
            <img 
                :src="image" 
                :alt="name"
                class="w-full h-full object-cover rounded-md" 
            />
        </div>
        <h3 class="text-xl font-bold mb-[20px]">
            {{ name.length > 45 ? `${name.slice(0, 45)}...` : name }}
        </h3>
        <div class="text-lg">
            <p>{{ price }} {{ currency }}</p>
            <p>Остаток на складе: {{ stocks.present }}</p>
        </div>
    </li>
</template>