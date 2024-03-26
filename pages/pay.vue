<script lang="ts" setup>

    import  { useUserStore } from "~/store";
    import { Logo, VFragment } from "~/components";

    const userStore = useUserStore();

</script>
<template>
    <div class="flex flex-col items-center justify-center h-full">
        <Logo />
        <VFragment v-if="userStore.user">
            <VFragment v-if="!userStore.user.hasAccess">
                <ol class="flex flex-col text-lg my-[20px]">
                    <li>1. Оплачиваете по ссылке</li>
                    <li>2. Заполняете форму</li>
                    <li>3. Ждете ответ от администратора</li>
                </ol>
                <iframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=11MJROAT9GI.240325&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe>

            </VFragment>
        </VFragment>
        <VFragment v-else>
            <p class="my-[10px] text-xl">
                Вы не авторизованы
            </p>
            <NuxtLink to="/" class="underline text-[#3FBAFF]">
                На главную
            </NuxtLink>
        </VFragment>
    </div>
</template>