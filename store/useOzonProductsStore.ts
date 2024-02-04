import { defineStore } from 'pinia';
import axios from 'axios';

import type { OzonProductListType, OzonProductItemInfo, OzonInfoLimitType } from '~/types/api';
import { baseOzonUrl } from '~/common';

interface OzonKeysObject {
    clientId: string | null;
    apiKey: string | null;
}

interface ProductUpdateType {
    offer_id: string;
    name: string;
    price: string;
    primary_image: string;
    stocks: number;
    vat: string;
    images: string[];
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
                    }
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
                    }
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
                    }
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
            offer_id,
            name,
            price,
            primary_image,
            stocks,
            images,
            vat,
        }: ProductUpdateType, {
            clientId,
            apiKey,
        }: OzonKeysObject) {
            try {

                const res = await axios.post(`${baseOzonUrl}/v3/product/import`, {
                    items: [
                        {
                            offer_id,
                            name,
                            price,
                            primary_image,
                            stocks,
                            images,
                            vat,
                        }
                    ],
                }, {
                    headers: {
                        "Client-Id": clientId,
                        "Api-Key": apiKey
                    }
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsInfoList = [...this.itemsInfoList.map((item) => {

                    if (item.offer_id === offer_id) {
                        return {
                            ...item,
                            name,
                            price,
                            primary_image,
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