<script setup>
    import { AdminWrapper, AdminTitle } from '~/components/admin';
    import { VFragment } from "~/components";

    useHead({
        title: "Admin - Yandex Market"
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Yandex Market
        </AdminTitle>
        <VFragment>
        </VFragment>
    </AdminWrapper>
</template>