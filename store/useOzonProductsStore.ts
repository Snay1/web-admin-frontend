import { defineStore } from 'pinia';
import axios from 'axios';

import type { OzonProductListType, OzonProductItemInfo } from '~/types/api';
import { baseOzonUrl } from '~/common';

interface OzonKeysObject {
    clientId: string | null;
    apiKey: string | null;
}

const useOzonProductsStore = defineStore("ozonStore", {
    state: () => ({
        itemsList: [] as OzonProductListType[],
        itemsInfoList: [] as OzonProductItemInfo[],
        status: {
            loading: true,
            error: false,
        }
    }),
    actions: {
        async getOzonItemList({
            clientId,
            apiKey
        }: OzonKeysObject) {

            if (this.itemsList.length || !clientId || !apiKey) {
                return;
            }

            try {
                this.status.loading = true;

                const res = await axios.post<{ result: { items: OzonProductListType[] } }>(`${baseOzonUrl}/v2/product/list`, {}, {
                    headers: {
                        "Client-Id": clientId,
                        "Api-Key": apiKey
                    }
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsList = res.data.result.items;

                this.status.error = false;
            } catch (error) {
                this.status.error = true;
            } finally {
                this.status.loading = false;
            }

        },
        async getOzonItemInfoList({
            clientId,
            apiKey,
        }: OzonKeysObject) {

            if (!clientId || !apiKey) {
                return;
            }
 
            try {

                const res = await axios.post<{ result: { items: OzonProductItemInfo[] } }>(`${baseOzonUrl}/v2/product/info/list`, {
                    offer_id: [],
                    product_id: this.itemsList.map((item) => item.product_id),
                    sku: [],
                }, {
                    headers: {
                        "Client-Id": clientId,
                        "Api-Key": apiKey
                    }
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsInfoList = res.data.result.items;

            } catch (error) {
            }

        },
    },
});

export default useOzonProductsStore;