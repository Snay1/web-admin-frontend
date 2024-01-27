<script setup>
    import { AdminNavBar } from '.';
    import { AuthWrapper } from "~/components";
</script>
<template>
    <AuthWrapper>
        <div class="relative px-[20px] pb-[20px] pt-[90px] md:py-[20px] md:pl-[280px]">
            <AdminNavBar />
            <slot />
        </div>
    </AuthWrapper>
</template>