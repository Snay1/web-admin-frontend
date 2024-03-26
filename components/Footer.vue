<script lang="ts" setup>
    import { Container } from "~/components";

    const year = new Date().getFullYear();


</script>
<template>
    <footer class="py-[20px] border-t border-l-stone-900 border-solid bg-[#292929] text-white">
        <Container>
            <p class="text-xl font-bold uppercase">
                Все права защищены © {{ year }}
            </p>
        </Container>
    </footer>
</template>