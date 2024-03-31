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
    default:
      return type;
  }
}
