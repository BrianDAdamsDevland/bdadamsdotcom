export function getTypeTitle(type: string) {
  switch (type) {
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
