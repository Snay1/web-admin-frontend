<script setup>
    import { AdminWrapper, AdminTitle } from '~/components/admin';
    import { VFragment } from "~/components";

    useHead({
        title: "Admin - Главная"
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Главная
        </AdminTitle>
        <VFragment>
        </VFragment>
    </AdminWrapper>
</template>