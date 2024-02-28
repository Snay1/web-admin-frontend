import { defineStore } from 'pinia';
import axios from 'axios';
import mainAxios from '~/axios';

import type {
    WbProductListItemType, 
    WbPriceInfoItemType, 
    WbBarcodeItemType, 
    WbWarehouseItemType, 
    WbWarehouseSellerItemType, 
    WbStockItemType
} from '~/types/api';
import { baseWbUrl } from '~/common';

interface WbKeysObject {
    headerApiKey: string | null;
}

interface GetStocksAttributes extends WbKeysObject {
    skus: string[];
    warehouseId: number;
    isSellerWarehouse: boolean;
}

interface SaveStocksAttributes extends WbKeysObject {
    warehouseId: number;
    stocks: WbStockItemType[];
}

const useWbProductsStore = defineStore("wbStore", {
    state: () => ({
        itemsList: [] as WbProductListItemType[],
        barcodes: [] as WbBarcodeItemType[],
        currentWarehouseId: -1,
        isSellerWarehouse: false,
        warehouses: [] as WbWarehouseItemType[],
        sellerWarehouses: [] as WbWarehouseSellerItemType[],
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
            },
            warehouses: {
                loading: true,
                error: false, 
            },
            sellerWarehouses: {
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
                                promoCode: priceItem.promoCode,
                                stocks: {
                                    sellerWarehouse: 0,
                                    wbWarehouse: 0,
                                },
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

                if (!headerApiKey) {
                    return;
                }

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

            if (this.barcodes.length) {
                return;
            }

            try {

                this.status.barcodes.loading = true;

                const res = await mainAxios.get("/wildberries/barcodes", {
                    withCredentials: true,
                });

                if (!res.data) {
                    throw Error();
                }

                this.barcodes = res.data.result;
                this.itemsList = this.itemsList.map((item) => {
                    
                    const skusItems = this.barcodes.filter((barcodeItem) => barcodeItem.nmID === item.nmID);
                    
                    return {
                        ...item,
                        skus: skusItems.length ? skusItems[0].items : [],
                    };
                });

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
        async getWbWarehouses({
            headerApiKey
        }: WbKeysObject) {
            try {
                
                if (this.warehouses.length || !headerApiKey) {
                    return;
                }

                this.status.warehouses.loading = true;
                
                const res = await axios.get<WbWarehouseItemType[]>(`${baseWbUrl}/api/v3/offices`, {
                    headers: {
                        "Authorization": headerApiKey,
                    },
                });

                if (!res.data) {
                    throw Error();
                }

                this.warehouses = res.data.map((item) => {
                    return {
                        ...item,
                        name: `${item.name} (WB)`,
                    };
                });
                this.status.warehouses.error = false;

                return true;

            } catch (error) {
                this.status.warehouses.error = true;
                return false;
            } finally {
                this.status.warehouses.loading = false;
            }
        },
        async getWbSellerWarehouses({
            headerApiKey
        }: WbKeysObject) {
            try {

                if (this.sellerWarehouses.length || !headerApiKey) {
                    return;
                }

                this.status.sellerWarehouses.loading = true;
                
                const res = await axios.get<WbWarehouseSellerItemType[]>(`${baseWbUrl}/api/v3/warehouses`, {
                    headers: {
                        "Authorization": headerApiKey,
                    }
                });

                if (!res.data) {
                    throw Error();
                }

                this.sellerWarehouses = res.data.map((item) => {
                    return {
                        ...item,
                        name: `${item.name} (Seller)`,
                    };
                });
                this.status.sellerWarehouses.error = false;

                return true;

            } catch (error) {
                this.status.sellerWarehouses.error = true;
                return false;
            } finally {
                this.status.sellerWarehouses.loading = false;
            }
        },
        selectWarehouse(id: number, isSellerWarehouse: boolean) {
            this.currentWarehouseId = id;
            this.isSellerWarehouse = isSellerWarehouse || false;
        },
        async getStocks({
            skus, 
            warehouseId, 
            isSellerWarehouse,
            headerApiKey,
        }: GetStocksAttributes) {

            if (!warehouseId || warehouseId === -1 || !skus.length || !headerApiKey) {
                return;
            }

            try {
                const res = await axios.post<{ stocks: WbStockItemType[] }>(`${baseWbUrl}/api/v3/stocks/${warehouseId}`, {
                    skus,
                }, {
                    headers: {
                        "Authorization": headerApiKey,
                    },
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsList = this.itemsList.map((item) => {

                    let amount = 0;

                    for (let i = 0; i < res.data.stocks.length; i++) {

                        const skuItem = res.data.stocks[i];

                        if (item.skus.indexOf(skuItem.sku) === -1) {
                            continue;
                        }

                        amount = skuItem.amount;

                        return {
                            ...item,
                            stocks: {
                                sellerWarehouse: isSellerWarehouse ? skuItem.amount : (item.stocks?.sellerWarehouse),
                                wbWarehouse: !isSellerWarehouse ? skuItem.amount : (item.stocks?.wbWarehouse),
                            }
                        };

                    }

                    // if ( === nmID) {

                    //     let amount = 0;
                        
                    //     for (let i = 0; i < res.data.stocks.length; i++) {
                    //         const stocksItem = res.data.stocks[i];

                    //         for (let j = 0; j < this.itemsList.length; j++) {
                    //             const wbItem = this.itemsList[j];

                    //             console.log(wbItem.skus)

                    //             if (wbItem.skus.indexOf(stocksItem.sku) !== -1) {
                                    
                    //                 amount = stocksItem.amount;
                                    
                    //                 break;
                    //             }

                    //         }

                    //     }

                    //     console.log(amount)

                    //     return {
                    //         ...item,
                    //         stocks: {
                    //             sellerWarehouse: isSellerWarehouse ? amount : (item.stocks?.sellerWarehouse),
                    //             wbWarehouse: !isSellerWarehouse ? amount : (item.stocks?.wbWarehouse),
                    //         }
                    //     };
                    // }
                    
                    return item;
                    
                });

                return true;

            } catch (error) {
                return false;
            }

        },
        async saveStocks({
            headerApiKey,
            warehouseId,
            stocks,
        }: SaveStocksAttributes) {
            
            if (!warehouseId || warehouseId === -1 || !headerApiKey) {
                return false;
            }

            try {
                const res = await axios.put(`${baseWbUrl}/api/v3/stocks/${warehouseId}`, {
                    stocks,
                }, {
                    headers: {
                        "Authorization": headerApiKey,
                    },
                });

                if (!res.data) {
                    throw Error();
                }

                this.itemsList = this.itemsList.map((item) => {

                    for (let i = 0; i < stocks.length; i++) {
                        const stockItem = stocks[i];

                        const isSku = item.skus.indexOf(stockItem.sku) !== -1;

                        if (!isSku) {
                            continue;
                        }

                        if (this.isSellerWarehouse) {

                            item.stocks.sellerWarehouse = stockItem.amount;

                            continue;
                        }

                        item.stocks.wbWarehouse = stockItem.amount;

                    }

                    return item;
                });

                return true;

            } catch (error) {
                return false;
            }
        }

    },
});

export default useWbProductsStore;