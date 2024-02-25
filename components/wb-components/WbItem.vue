<script lang="ts" setup>
    import { sliceItemNameHandler } from '~/usable';
    import { useWbProductsStore } from '~/store';

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
            type: Number,
            required: true,
        },
        stocks: {
            type: Number,
            required: true,
        },
    });
</script>
<template>
    <li class="p-[20px] bg-stone-100 rounded-md">
        <NuxtLink :to="`/admin/wildberries/${id}`">
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
                <p>{{ Number(price) }} Р</p>
                <p>Остаток на складе: <span :style="{ color: !stocks ? 'red' : '' }">{{ typeof stocks === "number" ? stocks : "-" }}</span></p>
            </div>
        </NuxtLink>
    </li>
</template>