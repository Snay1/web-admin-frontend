<script setup lang="ts"> 
    import type { PropType } from 'vue';
    import { hostURL } from '~/common';
    import type { ProductType } from '~/types/api/ProductType';
    import { Button } from "~/components";

    defineProps({
        product: {
            type: Object as PropType<ProductType>,
            required: true,
        }
    })

</script>
<template>
    <li class="flex flex-col">
        <div class="w-full h-[250px] md:h-[400px] overflow-hidden rounded-md bg-slate-400 relative">
            <div class="opacity-1 md:opacity-0 hover:opacity-100 transition-all w-full h-full absolute top-0 left-0 items-end justify-end flex md:items-center md:justify-center flex-col gap-[12px] p-[10px]">
                <Button :link="`/admin/products/edit/${product.id}`" buttonClass="w-full md:w-fit">
                    Редактировать
                </Button>
            </div>
            <img 
                v-if="product.images.length" 
                :src="`${hostURL}/uploads/${product.images[0]}`" 
                alt="product-image" 
                class="w-full h-full object-cover"
            />
        </div>
        <div class="flex flex-col gap-[8px] p-[10px]">
            <h4 class="text-xl font-medium">
                {{ product.title }}
            </h4>
            <p v-if="product.description">
                {{ 
                    product.description.length > 30 ? 
                        `${product.description.slice(0, 30)}...` 
                    : 
                        product.description 
                }}
            </p>
            <p>Цена: <span class="font-medium">{{ product.price || 0 }}Р</span></p>
        </div>
    </li>
</template>