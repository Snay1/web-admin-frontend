<script setup lang="ts">
    import { Header } from "~/components";
    import { InitialSection, PriceSection } from "~/components/LandingPage";
</script>
<template>
    <div class="flex flex-col">
        <Header />
        <main class="main">
            <InitialSection />
            <PriceSection />
        </main>
    </div>
</template>
<style lang="scss" scoped>
    .main {
        flex: 1 1 100%;
    }
</style>