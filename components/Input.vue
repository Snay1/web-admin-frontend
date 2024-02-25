<script setup lang="ts">
import type { PropType } from 'vue';

    type InputType = "input" | "textarea"; 

    const inputRef = ref();

    const props = defineProps({
        value: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
        inputType: {
            type: String as PropType<InputType>,
            required: false,
        },
    });
    defineEmits(["input", "blur"]);

    onUpdated(() => {
        inputRef.value = props.value;
    })

</script>
<template>
    <textarea
        ref="inputRef"
        v-if="inputType === 'textarea'" 
        :type="type || 'text'"
        :value="value"
        :placeholder="placeholder"
        @input="(e) => $emit('input', e)"
        @blur="(e) => $emit('blur', e)"
        class="w-full h-[100px] rounded-md border-solid border-[1px] border-stone-600 outline-none py-[10px] px-[12px] resize-y min-h-[100px] max-h-[200px]"
    >
    </textarea>
    <input 
        ref="inputRef"
        v-else
        :type="type || 'text'"
        :value="value"
        :placeholder="placeholder"
        @input="(e) => $emit('input', e)"
        @blur="(e) => $emit('blur', e)"
        class="w-full h-[50px] rounded-md border-solid border-[1px] border-stone-600 outline-none py-[10px] px-[12px]"
    />
</template>