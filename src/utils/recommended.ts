export function getTypeTitle(type: string) {
  switch (type) {
    case "podcast":
      return "Podcasts";
    case "movie":
      return "Movies";
    default:
      return type;
  }
}
