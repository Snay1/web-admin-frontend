<script setup>
    import { AuthWrapper, NavBar } from "~/components";
</script>
<template>
    <AuthWrapper>
        <div class="relative px-[20px] pb-[20px] pt-[90px] md:py-[20px] md:pl-[280px]">
            <NavBar />
            <slot />
        </div>
    </AuthWrapper>
</template>