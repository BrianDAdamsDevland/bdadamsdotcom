import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const blog = await getCollection("blog");

export function GET(context) {
  return rss({
    title: "Brian D. Adams' Blog",
    description:
      "Musings on programming, management, and whatever else I think up!",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      description: post.data.description,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
