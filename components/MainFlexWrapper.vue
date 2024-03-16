<script lang="ts" setup>
    import { Header } from "~/components";
</script>
<template>
    <div class="flex flex-col">
        <Header />
        <main class="main">
            <slot />
        </main>
    </div>
</template>
<style lang="scss" scoped>
    .main {
        flex: 1 1 100%;
    }
</style>