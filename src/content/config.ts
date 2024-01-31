import { z, defineCollection } from "astro:content";

const galleryCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    year: z.number(),
    imageSrc: z.string(),
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

export const collections = {
  gallery: galleryCollection,
  resume: resumeCollection,
  resumeExperience: resumeExperienceCollection,
  resumeSkills: resumeSkillsCollection
};
