import { defineStore } from 'pinia';
import axios from 'axios';
import mainAxios from '~/axios';

import type { WbProductListItemType, WbPriceInfoItemType, WbBarcodeItemType } from '~/types/api';
import { baseWbUrl } from '~/common';

interface WbKeysObject {
    headerApiKey: string | null;
}

const useWbProductsStore = defineStore("wbStore", {
    state: () => ({
        itemsList: [] as WbProductListItemType[],
        barcodes: [] as WbBarcodeItemType[],
        status: {
            itemsList: {
                loading: true,
                error: false,
            },
            limits: {
                loading: true,
                error: false,
            },
            barcodes: {
                loading: true,
                error: false, 
            }
        }
    }),
    actions: {
        async getWbItemList({
            headerApiKey
        }: WbKeysObject) {

            if (this.itemsList.length || !headerApiKey) {
                return;
            }

            try {
                this.status.itemsList.loading = true;

                const res = await axios.post<{ cards: WbProductListItemType[] }>(`${baseWbUrl}/content/v2/get/cards/list`, {
                    "settings": {
                      "sort": {
                        "ascending": false
                      },
                      "filter": {
                        "withPhoto": -1
                      },
                      "cursor": {
                        "limit":500
                      }
                    }
                  }, {
                    headers: {
                        "Authorization": headerApiKey,
                    }
                });

                if (!res.data) {
                    throw Error();
                }

                const items = res.data.cards;

                const resPrice = await axios.get<WbPriceInfoItemType[]>(`${baseWbUrl}/public/api/v1/info`, {
                    headers: {
                        "Authorization": headerApiKey,
                    }
                });

                const pricesItems = resPrice.data;

                if (!pricesItems) {
                    throw Error();
                }

                const updatedItems = items.map((item) => {
                    
                    for (let i = 0; i < pricesItems.length; i++) {
                        const priceItem = pricesItems[i];

                        if (priceItem.nmId === item.nmID) {
                            return {
                                ...item,
                                price: priceItem.price,
                                discount: priceItem.discount,
                                promoCode: priceItem.promoCode
                            }
                        }

                    }

                    return item;

                })

                this.itemsList = updatedItems;

                this.status.itemsList.error = false;
            } catch (error) {
                this.status.itemsList.error = true;
            } finally {
                this.status.itemsList.loading = false;
            }

        },
        getWbItemById(id: number) {

            for (let i = 0; i < this.itemsList.length; i++) {
                const item = this.itemsList[i];

                if (item.nmID === id) {
                    return item;
                }

            }

            return null;

        },
        async updateItemPriceById(id: number, price: number, {
            headerApiKey
        }: WbKeysObject) {
            try {
                const res = await axios.post(`${baseWbUrl}/public/api/v1/prices`, 
                    [
                        {
                            nmId: id,
                            price,
                        }
                    ]
                , {
                    headers: {
                        "Authorization": headerApiKey,
                    }
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsList = this.itemsList.map((item) => {
                    if (item.nmID === id) {
                        return {
                            ...item,
                            price: price,
                        }
                    }
                    return item;
                })

                return true;

            } catch (error) {
                console.log("Не удалось обновить цену");
            }
        },
        async getBarcodes() {
            try {

                this.status.barcodes.loading = true;

                const res = await mainAxios.get("/wildberries/barcodes");

                if (!res.data) {
                    throw Error();
                }

                this.barcodes = res.data.result;

            } catch (error) {
                this.status.barcodes.error = true;
            } finally {
                this.status.barcodes.loading = false;
            }
        },
        async createEditBarcode(nmID: number, items: string[]) {
            try {

                const res = await mainAxios.post("/wildberries/barcodes/create-update", {
                    nmID,
                    items,                    
                });

                if (!res.data) {
                    throw Error();
                }

                this.barcodes = this.barcodes.map((item) => {
                    if (item.nmID === nmID) {
                        return {
                            ...item,
                            items,
                        };
                    }

                    return item;
                });

                return true;

            } catch (error) {
                return false;
            } 
        },
        async getStocks(skus: string[]) {

        }
    },
});

export default useWbProductsStore;