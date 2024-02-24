import { defineStore } from 'pinia';
import axios from 'axios';

import type { WbProductListItemType, OzonInfoLimitType } from '~/types/api';
import { baseWbUrl } from '~/common';

interface WbKeysObject {
    headerApiKey: string | null;
}

interface WbPriceInfoItemType {
    discount: number;
    nmId: number;
    price: number;
    promoCode: number;
}

const useWbProductsStore = defineStore("wbStore", {
    state: () => ({
        itemsList: [] as WbProductListItemType[],
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
    },
});

export default useWbProductsStore;