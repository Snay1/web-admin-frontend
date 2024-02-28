import { defineStore } from 'pinia';
import axios from 'axios';

import type { OzonProductListType, OzonProductItemInfo, OzonInfoLimitType } from '~/types/api';
import { baseOzonUrl } from '~/common';

interface OzonKeysObject {
    clientId: string | null;
    apiKey: string | null;
}

interface ProductUpdateType {
    product_id: number;
    offer_id: string;
    price: string;
    old_price: string;
    min_price: string;
    stocks: number;
}

const useOzonProductsStore = defineStore("ozonStore", {
    state: () => ({
        itemsList: [] as OzonProductListType[],
        itemsInfoList: [] as OzonProductItemInfo[],
        limits: null as OzonInfoLimitType | null ,
        status: {
            itemsList: {
                loading: true,
                error: false,
            },
            limits: {
                loading: true,
                error: false,
            },
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
                this.status.itemsList.loading = true;

                const res = await axios.post<{ result: { items: OzonProductListType[] } }>(`${baseOzonUrl}/v2/product/list`, {}, {
                    headers: {
                        "Client-Id": clientId,
                        "Api-Key": apiKey
                    },
                    withCredentials: true,
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsList = res.data.result.items;

                this.status.itemsList.error = false;
            } catch (error) {
                this.status.itemsList.error = true;
            } finally {
                this.status.itemsList.loading = false;
            }

        },
        async getOzonItemInfoList({
            clientId,
            apiKey,
        }: OzonKeysObject) {

            if (!clientId || !apiKey || this.itemsInfoList.length) {
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
                    },
                    withCredentials: true,
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsInfoList = res.data.result.items;

            } catch (error) {
            }

        },
        async getOzonItemById(id: number, {
            clientId,
            apiKey,
        }: OzonKeysObject) {
            if (!clientId || !apiKey || !id) {
                return null;
            }

            const item = this.itemsInfoList.find((item) => item.id === id);

            if (!item) {
                return null;
            }

            return item;

        },
        async getOzonLimit({
            clientId,
            apiKey,
        }: OzonKeysObject) {

            if (this.limits) {
                return;
            }

            try {

                this.status.limits.loading = true;
                this.status.limits.error = false;

                const res = await axios.post<OzonInfoLimitType>(`${baseOzonUrl}/v4/product/info/limit`, {
                    offer_id: [],
                    product_id: this.itemsList.map((item) => item.product_id),
                    sku: [],
                }, {
                    headers: {
                        "Client-Id": clientId,
                        "Api-Key": apiKey
                    },
                    withCredentials: true,
                });
    
                if (!res.data) {
                    throw Error();
                }

                this.limits = res.data;

            } catch (error) {
                this.status.limits.error = true;
            } finally {
                this.status.limits.loading = false;
            }

        },
        async updateProductById({
            product_id,
            offer_id,
            price,
            old_price,
            min_price,
            stocks,
        }: ProductUpdateType, {
            clientId,
            apiKey,
        }: OzonKeysObject) {

            const headers = {
                "Client-Id": clientId,
                "Api-Key": apiKey
            }

            try {

                const priceRes = await axios.post(`${baseOzonUrl}/v1/product/import/prices`, {
                    prices: [
                        {
                            auto_action_enabled: "UNKNOWN",
                            currency_code: "RUB",
                            price_strategy_enabled: "UNKNOWN",
                            min_price,
                            offer_id,
                            old_price,
                            price,
                        }
                    ]
                }, {
                    headers
                });

                if (!priceRes.data) {
                    throw Error();
                }

                const stocksRes = await axios.post(`${baseOzonUrl}/v1/product/import/stocks`, {
                    stocks: [
                        {
                            offer_id,
                            product_id,
                            stock: stocks,
                        }
                    ]
                }, {
                    headers
                });

                if (!stocksRes.data) {
                    throw Error();
                }

                this.itemsInfoList = [...this.itemsInfoList.map((item) => {

                    if (item.id === product_id) {
                        return {
                            ...item,
                            price,
                            stocks: {
                                ...item.stocks,
                                present: stocks,
                            },
                        }
                    }

                    return item;

                })];

                return true;

            } catch (error) {
            }

            return false;
        }
    },
});

export default useOzonProductsStore;