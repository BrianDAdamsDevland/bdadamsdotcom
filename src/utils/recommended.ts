export function getTypeTitle(type: string) {
  switch (type.toLowerCase()) {
    case "podcast":
      return "Podcasts";
    case "movie":
      return "Movies";
    case "tv":
      return "TV";
    case "music":
      return "Music";
    case "app":
      return "Apps";
    default:
      return type;
  }
}

export type Tag = string | { name: string; rank?: number };

export function getTagUrlFragment(tag: Tag) {
  return getTagName(tag).replaceAll(" ", "-").toLowerCase();
}

export function getTagName(tag: Tag): string {
  return typeof tag === "string" ? tag : tag.name;
}

export function getTagRank(tag: Tag | undefined): number | undefined {
  if (!tag || typeof tag === "string") return undefined;
  return tag.rank;
}

export function getPaginationInfo(totalItems: number, currentPage: number = 1, pageSize: number = 24) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  
  return {
    totalPages,
    currentPage: validCurrentPage,
    startIndex,
    endIndex,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
    pageSize
  };
}
