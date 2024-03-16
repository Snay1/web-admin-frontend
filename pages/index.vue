<script setup lang="ts">
    import { Header, MainFlexWrapper } from "~/components";
    import { 
        FunctionalitySection, 
        HowItWorksSection, 
        InitialSection, 
        PriceSection 
    } from "~/components/LandingPage";
</script>
<template>
    <MainFlexWrapper>
        <InitialSection />
        <PriceSection />
        <FunctionalitySection />
        <HowItWorksSection />
    </MainFlexWrapper>
</template>