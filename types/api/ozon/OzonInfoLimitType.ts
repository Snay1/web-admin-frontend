export interface OzonInfoLimitType {
    daily_create: {
        limit: number;
        reset_at: string;
        usage: number;
    },
    daily_update: {
        limit: number;
        reset_at: string;
        usage: number;    
    },
    total: {
        limit: number;
        usage: number;    
    }
}