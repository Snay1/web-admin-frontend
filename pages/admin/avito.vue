<script setup>
    import { AdminWrapper, AdminTitle } from '~/components/admin';
    import { VFragment } from "~/components";

    useHead({
        title: "Admin - Avito"
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Avito
        </AdminTitle>
        <VFragment>
        </VFragment>
    </AdminWrapper>
</template>