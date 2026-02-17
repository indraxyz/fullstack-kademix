type ResolverMap = Record<string, unknown>;

export function mergeResolvers(resolverMaps: ResolverMap[]): ResolverMap {
  const merged: ResolverMap = {};
  for (const map of resolverMaps) {
    for (const key of Object.keys(map)) {
      const value = map[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const existing = merged[key];
        merged[key] =
          existing && typeof existing === "object" && !Array.isArray(existing)
            ? { ...(existing as Record<string, unknown>), ...(value as Record<string, unknown>) }
            : value;
      } else {
        merged[key] = value;
      }
    }
  }
  return merged;
}
