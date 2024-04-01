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

export function getTagUrlFragment(tag: string) {
  return tag.replaceAll(" ", "-").toLowerCase();
}
