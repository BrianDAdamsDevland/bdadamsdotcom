/**
 * Calculate estimated reading time for content
 * @param content - The markdown/MDX content string
 * @param wordsPerMinute - Reading speed (default: 200 WPM)
 * @returns Formatted reading time string (e.g., "3 min read")
 */
export function getReadingTime(content: string | undefined, wordsPerMinute: number = 200): string {
  if (!content) {
    return "1 min read";
  }
  // Remove markdown/MDX syntax for accurate word count
  const cleanContent = content
    .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links (keep text)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .trim();

  // Count words
  const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;

  // Calculate reading time in minutes (round up)
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} min read`;
}