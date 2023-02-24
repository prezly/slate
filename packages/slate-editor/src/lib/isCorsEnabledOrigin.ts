const CORS_ENABLED_ORIGINS = ['https://cdn.uc.assets.prezly.com'];

export function isCorsEnabledOrigin(url: string) {
    const { origin } = new URL(url);
    return CORS_ENABLED_ORIGINS.includes(origin);
}
