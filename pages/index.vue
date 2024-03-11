<script setup lang="ts">
    import { Header } from "~/components";
    import { 
        FunctionalitySection, 
        HowItWorksSection, 
        InitialSection, 
        PriceSection 
    } from "~/components/LandingPage";
</script>
<template>
    <div class="flex flex-col">
        <Header />
        <main class="main">
            <InitialSection />
            <PriceSection />
            <FunctionalitySection />
            <HowItWorksSection />
        </main>
    </div>
</template>
<style lang="scss" scoped>
    .main {
        flex: 1 1 100%;
    }
</style>