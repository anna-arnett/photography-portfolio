import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexablePortrait } from "./seo";
import { seniorShoots } from "./work/seniors/shoots";
import { portraitShoots } from "./work/portraits/shoots";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/work",
    "/work/seniors",
    "/work/portraits",
    "/work/creative",
    "/inquire",
    "/privacy",
  ];

  const seniorPaths = seniorShoots.map(
    (shoot) => `/work/seniors/${shoot.slug}`
  );

  const portraitPaths = portraitShoots
    .filter(isIndexablePortrait)
    .map((shoot) => `/work/portraits/${shoot.slug}`);

  const paths = [
    ...staticPaths,
    ...seniorPaths,
    ...portraitPaths,
  ];

  return [...new Set(paths)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
