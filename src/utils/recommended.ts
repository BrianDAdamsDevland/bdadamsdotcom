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

export function getTagUrlFragment(tag: any) {
  return getTagName(tag).replaceAll(" ", "-").toLowerCase();
}

export function getTagName(tag: any) {
  return (typeof tag === "string" || tag instanceof String) ? tag : tag.name;
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
