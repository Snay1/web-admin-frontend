<script setup lang="ts">
    import { ref } from "vue";
    import { AdminWrapper, AdminTitle, AdminInput } from '~/components/admin';
    import { Button } from '~/components';
    import { useAccessStore } from "~/store";

    useHead({
        title: "Admin - Доступы к сервисам"
    });

    const access = useAccessStore();

    const ozonApiKey = ref("");
    const ozonClientId = ref("");

    const wbHeaderApiKey = ref("");

    const avitoClientId = ref("");
    const avitoClientSecret = ref("");

    const yandexMarketClientId = ref("");
    const yandexMarketClientSecret = ref("");

    const saveOzonKeys = async (e: Event) => {
        e.preventDefault();

        if (ozonApiKey.value.length && !ozonApiKey.value.trim().length) {
            return alert("Ozon: Api Key не должен быть пустым");
        }

        if (ozonClientId.value.length && !ozonClientId.value.trim().length) {
            return alert("Ozon: Client Id не должен быть пустым");
        }

        const res = await access.editOzonKeys(ozonApiKey.value.trim(), ozonClientId.value.trim());

        if (!res?.apiKey) {
            return;
        }

        ozonApiKey.value = res.apiKey;
        ozonClientId.value = res.clientId;

    }

    const saveWbKeys = async (e: Event) => {
        e.preventDefault();

        if (wbHeaderApiKey.value.length && !wbHeaderApiKey.value.trim().length) {
            return alert("Wildberries: Header Api Key не должен быть пустым");
        }

        const res = await access.editWbKeys(wbHeaderApiKey.value.trim());

        if (!res?.headerApiKey) {
            return;
        }

        wbHeaderApiKey.value = res.headerApiKey;

    }

    const saveAvitoKeys = async (e: Event) => {
        e.preventDefault();

        if (avitoClientId.value.length && !avitoClientId.value.trim().length) {
            return alert("Avito: client_id не должен быть пустым");
        }

        if (avitoClientSecret.value.length && !avitoClientSecret.value.trim().length) {
            return alert("Avito: client_secret не должен быть пустым");
        }

        const res = await access.editAvitoKeys(avitoClientId.value.trim(), avitoClientSecret.value.trim());

        if (!res?.client_id) {
            return;
        }

        avitoClientId.value = res.client_id;
        avitoClientSecret.value = res.client_secret;

    }
    const saveYandexMarketKeys = async (e: Event) => {
        e.preventDefault();

        if (yandexMarketClientId.value.length && !yandexMarketClientId.value.trim().length) {
            return alert("Yandex Market: client_id не должен быть пустым");
        }

        if (yandexMarketClientSecret.value.length && !yandexMarketClientSecret.value.trim().length) {
            return alert("Yandex Market: client_secret не должен быть пустым");
        }

        const res = await access.editYandexMarketKeys(yandexMarketClientId.value.trim(), yandexMarketClientSecret.value.trim());

        if (!res?.client_id) {
            return;
        }

        avitoClientId.value = res.client_id;
        avitoClientSecret.value = res.client_secret;

    }

    onMounted(async () => {   
        await access.getOzonKeys();
        await access.getWbKeys();
        await access.getAvitoKeys();
        await access.getYandexMarketKeys();

        ozonApiKey.value = access.ozonKeys.apiKey || "";
        ozonClientId.value = access.ozonKeys.clientId || "";

        wbHeaderApiKey.value = access.wbKeys.headerApiKey || "";

        avitoClientId.value = access.avitoKeys.client_id || "";
        avitoClientSecret.value = access.avitoKeys.client_secret || "";

        yandexMarketClientId.value = access.yandexMarketKeys.client_id || "";
        yandexMarketClientSecret.value = access.yandexMarketKeys.client_secret || "";

    });

</script>
<template>
    <AdminWrapper>
        <AdminTitle>
            Доступы к сервисам
        </AdminTitle>
        <form @submit="saveOzonKeys">
            <h2 class="text-xl font-bold">
                Ozon
            </h2>
            <div class="my-[20px] flex gap-[10px] flex-col md:flex-row">
                <AdminInput 
                    placeholder="Api Key"
                    :value="ozonApiKey"
                    @input="(e) => ozonApiKey = e.target.value"
                />
                <AdminInput 
                    placeholder="Client Id"
                    :value="ozonClientId"
                    @input="(e) => ozonClientId = e.target.value"
                />
            </div>
            <Button type="submit" buttonClass="w-full">
                Сохранить
            </Button>
            <div class="mt-[20px] w-full h-[1px] bg-slate-800"></div>
        </form>
        <form @submit="saveWbKeys" class="mt-[20px]">
            <h2 class="text-xl font-bold">
                Wildberries
            </h2>
            <div class="my-[20px] flex gap-[10px] flex-col md:flex-row">
                <AdminInput 
                    placeholder="Header Api Key"
                    :value="wbHeaderApiKey"
                    @input="(e) => wbHeaderApiKey = e.target.value"
                />
            </div>
            <Button type="submit" buttonClass="w-full">
                Сохранить
            </Button>
            <div class="mt-[20px] w-full h-[1px] bg-slate-800"></div>
        </form>
        <form @submit="saveAvitoKeys" class="mt-[20px]">
            <h2 class="text-xl font-bold">
                Avito
            </h2>
            <div class="my-[20px] flex gap-[10px] flex-col md:flex-row">
                <AdminInput 
                    placeholder="client_id"
                    :value="avitoClientId"
                    @input="(e) => avitoClientId = e.target.value"
                />
                <AdminInput 
                    placeholder="client_secret"
                    :value="avitoClientSecret"
                    @input="(e) => avitoClientSecret = e.target.value"
                />
            </div>
            <Button type="submit" buttonClass="w-full">
                Сохранить
            </Button>
            <div class="mt-[20px] w-full h-[1px] bg-slate-800"></div>
        </form>
        <form @submit="saveYandexMarketKeys" class="mt-[20px]">
            <h2 class="text-xl font-bold">
                Yandex Market
            </h2>
            <div class="my-[20px] flex gap-[10px] flex-col md:flex-row">
                <AdminInput 
                    placeholder="client_id"
                    :value="avitoClientId"
                    @input="(e) => avitoClientId = e.target.value"
                />
                <AdminInput 
                    placeholder="client_secret"
                    :value="avitoClientSecret"
                    @input="(e) => avitoClientSecret = e.target.value"
                />
            </div>
            <Button type="submit" buttonClass="w-full">
                Сохранить
            </Button>
            <div class="mt-[20px] w-full h-[1px] bg-slate-800"></div>
        </form>
    </AdminWrapper>
</template>