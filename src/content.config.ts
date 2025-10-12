import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const purchaseLink = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("apple"),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal("physical"),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal("spotify"),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal("amazon"),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal("indies"),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal("bandcamp"),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal("soundcloud"),
    url: z.string().url(),
  }),
]);

const albums = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "./src/data/albums",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      artwork: image(),
      releaseDate: z.string(),
      tracks: z.array(
        z.object({
          title: z.string(),
          lyrics: z.array(z.string()).optional(),
        }),
      ),
      links: z.array(purchaseLink),
    }),
});

const credits = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "./src/data/credits",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      artist: z.string(),
      artwork: image(),
      releaseDate: z.string(),
      credits: z.array(z.string()),
      links: z.array(purchaseLink).default([]),
    }),
});

export const collections = { albums, credits };
