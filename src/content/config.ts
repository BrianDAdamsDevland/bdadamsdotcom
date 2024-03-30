import { z, defineCollection } from "astro:content";
import { rssSchema } from "@astrojs/rss";

const portfolioCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      year: z.number(),
      image: image(),
      tags: z.array(z.string()),
    }),
});

const resumeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const resumeExperienceCollection = defineCollection({
  type: "content",
  schema: z.object({
    startDate: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

const resumeSkillsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    rssSchema.extend({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string(),
      pubDate: z.date(),
      heroImage: image(),
      heroImageAltText: z.string(),
    }),
});

const mediaRecommendationsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      tags: z.array(z.string()).optional(),
      type: z.enum(["podcast", "movie", "tv", "music"]),
      link: z.string().url(),
      date: z.date()
    }),
});

export const collections = {
  portfolio: portfolioCollection,
  resume: resumeCollection,
  resumeExperience: resumeExperienceCollection,
  resumeSkills: resumeSkillsCollection,
  blog: blogCollection,
  mediaRecommendations: mediaRecommendationsCollection
};
