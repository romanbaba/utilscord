export enum EmbedStyle {
    Success = 'success',
    Error = 'error',
    Warn = 'warn',
    Default = 'default',
    Loading = "loading"
}

export interface TableOptions {
    headers?: string[];
    rows?: string[][];
}

export interface SaveOptions {
    name: string;
    mimeType?: "application/pdf" | "image/jpeg" | "image/png" | "raw";
}