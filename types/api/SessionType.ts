export interface SessionType {
    id: number;
    email: string;
    iat: number;
    exp: number;
    hasAccess: boolean;
}