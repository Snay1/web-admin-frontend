export interface WbProductListCharacteristicType {
    id: number;
    name: string;
    value: number;
}

export interface WbProductListItemPhotosType {
    "516x288": string;
    big: string;
    small: string;
}

export interface WbProductListItemSizesType {
    chrtID: number;
    skus: string[];
    techSize: string;
    wbSize: string;
}

export interface WbProductListItemType {
    nmID: number;
    brand: string;
    characteristics: WbProductListCharacteristicType[];
    createdAt: string;
    description: string;
    dimesions: {
        length: number;
        width: number;
        height: number;
    };
    imtID: number;
    nmUUID: string;
    photos: WbProductListItemPhotosType[];
    sizes: WbProductListItemSizesType[];
    subjectID: number;
    subjectName: string;
    title: string;
    updatedAt: string;
    vendorCode: string;
}