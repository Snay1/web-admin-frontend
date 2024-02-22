import { defineStore } from 'pinia';
import axios from '~/axios';
import type { 
    AvitoKeysType,
    OzonKeysType, 
    WbKeysType, 
    YandexMarketKeysType 
} from '~/types/api';

const statusInitial = {
    loading: true,
    error: false,
}

const useAccessStore = defineStore("access", {
    state: () => ({
        ozonKeys: {
            apiKey: null,
            clientId: null,
        } as OzonKeysType,
        wbKeys: {
            headerApiKey: null,
        } as WbKeysType,
        avitoKeys: {
            client_id: null,
            client_secret: null,
        } as AvitoKeysType,
        yandexMarketKeys: {
            client_id: null,
            client_secret: null,
        } as YandexMarketKeysType,
        status: {
            ozon: statusInitial,
            wb: statusInitial,
            avito: statusInitial,
            yandexMarket: statusInitial,
        },
    }),
    actions: {
        async getOzonKeys() {

            if (this.ozonKeys.apiKey && this.ozonKeys.clientId) {
                return;
            }

            try {
                this.status.ozon.loading = true;

                const res = await axios<OzonKeysType>("/keys/ozon");

                if (!res.data) {
                    throw Error();
                }

                this.ozonKeys = res.data;

                this.status.ozon.error = false;
            } catch (error) {
                this.status.ozon.error = true;
            } finally {
                this.status.ozon.loading = false;
            }

        },
        async editOzonKeys(apiKey: string, clientId: string) {

            try {

                const res = await axios.post<OzonKeysType>("/keys/ozon", {
                    apiKey,
                    clientId
                });

                if (!res.data) {
                    throw Error();
                }

                this.ozonKeys = res.data;

                alert("Ozon ключи обновлены!");

                return { apiKey, clientId };

            } catch (error) {
                alert("Не получилось обновить ключи Ozon");
            }

        },
        async getWbKeys() {

            if (this.wbKeys.headerApiKey) {
                return;
            }

            try {
                this.status.wb.loading = true;

                const res = await axios<WbKeysType>("/keys/wildberries");

                if (!res.data) {
                    throw Error();
                }

                this.wbKeys = res.data;

                this.status.wb.error = false;
            } catch (error) {
                this.status.wb.error = true;
            } finally {
                this.status.wb.loading = false;
            }

        },
        async editWbKeys(headerApiKey: string) {

            try {

                const res = await axios.post<WbKeysType>("/keys/wildberries", {
                    headerApiKey,
                });

                if (!res.data) {
                    throw Error();
                }

                this.wbKeys = res.data;

                alert("Wildberries ключи обновлены!");

                return { headerApiKey };

            } catch (error) {
                alert("Не получилось обновить ключи Wildberries");
            }

        },
        async getAvitoKeys() {

            if (this.avitoKeys) {
                return;
            }

            try {
                this.status.avito.loading = true;

                const res = await axios<AvitoKeysType>("/keys/avito");

                if (!res.data) {
                    throw Error();
                }

                this.avitoKeys = res.data;

                this.status.avito.error = false;
            } catch (error) {
                this.status.avito.error = true;
            } finally {
                this.status.avito.loading = false;
            }

        },
        async editAvitoKeys(client_id: string, client_secret: string) {

            try {

                const res = await axios.post<AvitoKeysType>("/keys/avito", {
                    client_id,
                    client_secret
                });

                if (!res.data) {
                    throw Error();
                }

                this.avitoKeys = res.data;

                alert("Avito ключи обновлены!");

                return { client_id, client_secret };

            } catch (error) {
                alert("Не получилось обновить ключи Avito");
            }

        },
        async getYandexMarketKeys() {

            if (this.avitoKeys) {
                return;
            }

            try {
                this.status.yandexMarket.loading = true;

                const res = await axios<YandexMarketKeysType>("/keys/yandex-market");

                if (!res.data) {
                    throw Error();
                }

                this.yandexMarketKeys = res.data;
                this.status.yandexMarket.error = false;

            } catch (error) {
                this.status.yandexMarket.error = true;
            } finally {
                this.status.yandexMarket.loading = false;
            }

        },
        async editYandexMarketKeys(client_id: string, client_secret: string) {

            try {

                const res = await axios.post<YandexMarketKeysType>("/keys/yandex-market", {
                    client_id,
                    client_secret
                });

                if (!res.data) {
                    throw Error();
                }

                this.avitoKeys = res.data;

                alert("Yandex Market ключи обновлены!");

                return { client_id, client_secret };

            } catch (error) {
                alert("Не получилось обновить ключи Yandex Market");
            }

        },
    },
});

export default useAccessStore;