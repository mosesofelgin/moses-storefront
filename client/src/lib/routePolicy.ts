export const VAULT_BYPASS_PATHS = ['/clarity-sales', '/event', '/links', '/checkout', '/artist'] as const;
export const FOCUS_ROUTE_PATHS = ['/clarity-sales', '/listen', '/links', '/event', '/checkout'] as const;

function matchesPath(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isVaultBypassPath(pathname: string) {
  return VAULT_BYPASS_PATHS.some((route) => matchesPath(pathname, route));
}

export function isFocusedRoutePath(pathname: string) {
  return FOCUS_ROUTE_PATHS.some((route) => matchesPath(pathname, route));
}

export function shouldShowVaultGate(pathname: string, vaultUnlocked: boolean) {
  return !vaultUnlocked && !isVaultBypassPath(pathname);
}
