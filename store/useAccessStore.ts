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
        async getWbKeys() {

            if (this.wbKeys) {
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

        }
    },
});

export default useAccessStore;