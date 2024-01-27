<script setup lang="ts">
    import type { PropType } from 'vue';

    type ButtonType = "button" | "submit" | "reset";

    type ButtonTheme = "red";

    const props = defineProps({
        link: {
            type: String,
            required: false,
        },
        href: {
            type: String,
            required: false,
        },
        type: {
            type: String as PropType<ButtonType>,
            required: false,
        },
        buttonClass: {
            type: String,
            required: false,
        },
        buttonTheme: {
            type: String as PropType<ButtonTheme>,
            required: false,
        },
        disabled: {
            type: Boolean,
            required: false,
        }
    });

    defineEmits(["click"]);

    const mainClass = `font-bold flex items-center justify-center py-[12px] bg-[#6d1099] px-[20px] rounded-md border-solid text-white hover:opacity-80 transition-all disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${props.buttonClass || ""}`;

</script>
<template>
    <NuxtLink :to="link" v-if="link" :class="mainClass">
        <slot />
    </NuxtLink>
    <a :href="href" target="_blank" v-if="href" :class="mainClass">
        <slot />
    </a>
    <button :type="type" @click="$emit('click')" v-if="!href && !link" :class="`${mainClass}`" :disabled="disabled">
        <slot />
    </button>
</template>