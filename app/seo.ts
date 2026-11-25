import type { Metadata } from "next";

export const SITE_URL = "https://annaarnett.photo";

export const BUSINESS_NAME = "Anna Arnett Photography";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  index?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  index = true,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${BUSINESS_NAME}`;

  return {
    title,
    description,

    alternates: {
      canonical: absoluteUrl(path),
    },

    robots: {
      index,
      follow: true,
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BUSINESS_NAME,
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl(image),
          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl(image),
          alt: imageAlt,
        },
      ],
    },
  };
}

export function isIndexablePortrait(shoot: {
  type: string;
  photos: readonly unknown[];
}) {
  return !(
    shoot.type.toLowerCase().includes("headshot") &&
    shoot.photos.length <= 1
  );
}
