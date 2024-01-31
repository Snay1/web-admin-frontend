interface SourceItemType {
    is_enabled: boolean;
    sku: number;
    source: "fbo" | "fbs";
};

export interface OzonStocksType {
    coming: number;
    present: number;
    reserved: number;
};

interface PriceIndexType {
    minimal_price: string;
    minimal_price_currency: string;
    price_index_value: number;
};

interface OzonItemErrorType {
    code: string;
    field: string;
    attribute_id: number;
    state: "imported";
    level: string;
    description: string;
    optional_description_elements: {};
    attribute_name: string;
}

export interface OzonProductItemInfo {
    id: number;
    name: string;
    offer_id: string;
    barcode: string;
    barcodes: string[];
    buybox_price: string;
    category_id: number;
    type_id: number;
    created_at: string;
    images: string[];
    has_discounted_item: boolean;
    is_discounted: boolean;
    discounted_stocks: OzonStocksType;
    currency_code: "RUB";
    description_category_id: number;
    marketing_price: string;
    min_price: string;
    old_price: string;
    premium_price: string;
    price: string;
    recommended_price: string;
    sources: SourceItemType[];
    stocks: OzonStocksType;
    errors: [];
    updated_at: string;
    vat: string;
    visible: boolean;
    visibility_details: {
        has_price: boolean;
        has_stock: boolean;
        active_product: boolean;
    };
    price_indexes: {
        external_index_data: PriceIndexType;
        ozon_index_data: PriceIndexType;
        self_marketplaces_index_data: PriceIndexType;
        price_index: "WITHOUT_INDEX";
    };
    commissions: [];
    volume_weight: number;
    is_prepayment: boolean;
    is_prepayment_allowed: boolean;
    images360: [];
    is_kgt: boolean;
    color_image: string;
    primary_image: string;
    status: {
        state: "imported";
        state_failed: "imported";
        moderate_status: string;
        decline_reasons: [];
        validation_state: "pending";
        state_name: string;
        state_description: string;
        is_failed: boolean;
        is_created: boolean;
        state_tooltip: string;
        item_errors: OzonItemErrorType[];
        state_updated_at: string;
    }
}