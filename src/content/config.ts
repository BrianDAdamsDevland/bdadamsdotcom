import { z, defineCollection } from "astro:content";

const galleryCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    year: z.number(),
    image: image(),
  }),
});

const resumeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string()
  })
})

const resumeExperienceCollection = defineCollection({
  type: "content",
  schema: z.object({
    startDate: z.string(),
    title: z.string(),
    subtitle: z.string().optional()
  }),
});

const resumeSkillsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number()
  })
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional()
  })
});

export const collections = {
  gallery: galleryCollection,
  resume: resumeCollection,
  resumeExperience: resumeExperienceCollection,
  resumeSkills: resumeSkillsCollection,
  blog: blogCollection
};
