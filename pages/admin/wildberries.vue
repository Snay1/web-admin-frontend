<script setup>
    import { AdminWrapper, AdminTitle } from '~/components/admin';
    import { VFragment } from "~/components";

    useHead({
        title: "Admin - Wildberries"
    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Wildberries
        </AdminTitle>
        <VFragment>
        </VFragment>
    </AdminWrapper>
</template>