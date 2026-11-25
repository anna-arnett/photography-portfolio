
from pathlib import Path
import argparse
import difflib

ROOT = Path(__file__).resolve().parents[1]

parser = argparse.ArgumentParser()
parser.add_argument(
    "--apply",
    action="store_true",
    help="Apply the proposed SEO changes.",
)

args = parser.parse_args()

changes = {}


def read(relative_path):
    path = ROOT / relative_path

    if not path.is_file():
        raise RuntimeError(f"File not found: {relative_path}")

    return path.read_text(encoding="utf-8")


def stage(relative_path, content):
    changes[relative_path] = content


def create(relative_path, content):
    path = ROOT / relative_path

    if path.exists():
        raise RuntimeError(
            f"File already exists: {relative_path}. "
            "Refusing to overwrite."
        )

    stage(relative_path, content)


def replace_once(content, old, new, path):
    if content.count(old) != 1:
        raise RuntimeError(
            f"Expected exactly one matching code block in {path}."
        )

    return content.replace(old, new, 1)


# --------------------------------------------------
# SHARED SEO CONFIGURATION
# --------------------------------------------------

create(
    "app/seo.ts",
    '''import type { Metadata } from "next";

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
''',
)


# --------------------------------------------------
# CATEGORY PAGE METADATA
# --------------------------------------------------

category_pages = [
    {
        "path": "app/work/seniors/page.tsx",
        "anchor": "export default function SeniorsPage()",
        "metadata": '''export const metadata = createPageMetadata({
  title: "Chicago Senior & Graduation Photographer",
  description:
    "Explore natural, nostalgic senior portraits and graduation photography by Anna Arnett. Chicago-based photographer with senior sessions starting at $150.",
  path: "/work/seniors",
  image: seniorShoots[0]?.cover ?? "/photos/lydiasenior.JPG",
  imageAlt: "Outdoor senior portrait by Anna Arnett",
});

''',
    },
    {
        "path": "app/work/portraits/page.tsx",
        "anchor": "export default function PortraitsPage()",
        "metadata": '''export const metadata = createPageMetadata({
  title: "Chicago Portrait & Headshot Photography",
  description:
    "Explore creative portraits and affordable professional headshots by Chicago photographer Anna Arnett. Headshots from $50 and portrait sessions from $100.",
  path: "/work/portraits",
  image: portraitShoots[0]?.cover ?? "/photos/marlokate2.JPG",
  imageAlt: "Portrait photography by Anna Arnett",
});

''',
    },
    {
        "path": "app/work/creative/page.tsx",
        "anchor": "export default function CreativePage()",
        "metadata": '''export const metadata = createPageMetadata({
  title: "Chicago Creative & Editorial Photography",
  description:
    "Explore experimental portraits, creative photography, movement, light and shadow by Chicago-based editorial photographer Anna Arnett.",
  path: "/work/creative",
  image: "/photos/shadow.jpg",
  imageAlt: "Creative portrait exploring light and shadow",
});

''',
    },
]

for page in category_pages:
    path = page["path"]
    content = read(path)

    if "export const metadata" in content:
        raise RuntimeError(
            f"Metadata already exists in {path}."
        )

    content = (
        'import { createPageMetadata } from "../../seo";\n'
        + content
    )

    content = replace_once(
        content,
        page["anchor"],
        page["metadata"] + page["anchor"],
        path,
    )

    stage(path, content)


# --------------------------------------------------
# DYNAMIC SENIOR GALLERY METADATA
# --------------------------------------------------

senior_path = "app/work/seniors/[shoot]/page.tsx"

content = read(senior_path)

if "generateMetadata" in content:
    raise RuntimeError(
        f"Dynamic metadata already exists in {senior_path}."
    )

content = (
    'import type { Metadata } from "next";\n'
    'import { createPageMetadata } from "../../../seo";\n'
    + content
)

senior_metadata = '''export async function generateMetadata({
  params,
}: {
  params: Promise<{ shoot: string }>;
}): Promise<Metadata> {
  const { shoot: slug } = await params;

  const shoot = seniorShoots.find(
    (item) => item.slug === slug
  );

  if (!shoot) {
    notFound();
  }

  return createPageMetadata({
    title: `${shoot.name} - Senior Portraits in ${shoot.location}`,
    description:
      `Explore ${shoot.name}'s senior portrait session in ` +
      `${shoot.location}, photographed by Anna Arnett ` +
      `in ${shoot.date}.`,
    path: `/work/seniors/${shoot.slug}`,
    image: shoot.cover,
    imageAlt: `${shoot.name} senior portrait`,
  });
}

'''

content = replace_once(
    content,
    "export function generateStaticParams()",
    senior_metadata + "export function generateStaticParams()",
    senior_path,
)

stage(senior_path, content)


# --------------------------------------------------
# DYNAMIC PORTRAIT GALLERY METADATA
# --------------------------------------------------

portrait_path = "app/work/portraits/[shoot]/page.tsx"

content = read(portrait_path)

if "generateMetadata" in content:
    raise RuntimeError(
        f"Dynamic metadata already exists in {portrait_path}."
    )

content = (
    'import type { Metadata } from "next";\n'
    'import {\n'
    '  createPageMetadata,\n'
    '  isIndexablePortrait,\n'
    '} from "../../../seo";\n'
    + content
)

portrait_metadata = '''export async function generateMetadata({
  params,
}: {
  params: Promise<{ shoot: string }>;
}): Promise<Metadata> {
  const { shoot: slug } = await params;

  const shoot = portraitShoots.find(
    (item) => item.slug === slug
  );

  if (!shoot) {
    notFound();
  }

  return createPageMetadata({
    title:
      `${shoot.name} - ${shoot.type} Photography in ` +
      shoot.location,
    description:
      `Explore the ${shoot.name} photography session ` +
      `in ${shoot.location}, photographed by Anna Arnett ` +
      `in ${shoot.date}.`,
    path: `/work/portraits/${shoot.slug}`,
    image: shoot.cover,
    imageAlt: `${shoot.name} - ${shoot.type}`,
    index: isIndexablePortrait(shoot),
  });
}

'''

content = replace_once(
    content,
    "export function generateStaticParams()",
    portrait_metadata + "export function generateStaticParams()",
    portrait_path,
)

stage(portrait_path, content)


# --------------------------------------------------
# AUTOMATIC SITEMAP
# --------------------------------------------------

create(
    "app/sitemap.ts",
    '''import type { MetadataRoute } from "next";
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
''',
)


# --------------------------------------------------
# ROBOTS.TXT
# --------------------------------------------------

create(
    "app/robots.ts",
    '''import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
''',
)


# --------------------------------------------------
# STRUCTURED BUSINESS DATA
# --------------------------------------------------

create(
    "app/PhotographyStructuredData.tsx",
    '''import { absoluteUrl, BUSINESS_NAME, SITE_URL } from "./seo";

export default function PhotographyStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        description:
          "Chicago-based portrait and editorial photography, available for select travel.",
        logo: absoluteUrl("/photos/coffeelogo.png"),
        image: absoluteUrl("/photos/converse.jpg"),
        founder: {
          "@type": "Person",
          name: "Anna Arnett",
        },
        areaServed: {
          "@type": "City",
          name: "Chicago",
          containedInPlace: {
            "@type": "State",
            name: "Illinois",
          },
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer inquiries",
          url: absoluteUrl("/inquire"),
          availableLanguage: "English",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Photography Sessions",
          itemListElement: [
            {
              "@type": "Offer",
              price: 150,
              priceCurrency: "USD",
              url: absoluteUrl("/inquire"),
              itemOffered: {
                "@type": "Service",
                name: "Senior and Graduation Photography",
              },
            },
            {
              "@type": "Offer",
              price: 50,
              priceCurrency: "USD",
              url: absoluteUrl("/inquire"),
              itemOffered: {
                "@type": "Service",
                name: "Headshot Photography",
              },
            },
            {
              "@type": "Offer",
              price: 100,
              priceCurrency: "USD",
              url: absoluteUrl("/inquire"),
              itemOffered: {
                "@type": "Service",
                name: "Portrait Photography",
              },
            },
            {
              "@type": "Offer",
              price: 100,
              priceCurrency: "USD",
              url: absoluteUrl("/inquire"),
              itemOffered: {
                "@type": "Service",
                name: "Couples Photography",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        publisher: {
          "@id": `${SITE_URL}/#business`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\\\u003c"),
      }}
    />
  );
}
''',
)


# --------------------------------------------------
# ADD STRUCTURED DATA TO HOMEPAGE
# --------------------------------------------------

home_path = "app/page.tsx"

content = read(home_path)

if "PhotographyStructuredData" in content:
    raise RuntimeError(
        "Structured data already exists on the homepage."
    )

content = (
    'import PhotographyStructuredData '
    'from "./PhotographyStructuredData";\n'
    + content
)

content = replace_once(
    content,
    "<main className={styles.home}>",
    "<main className={styles.home}>\n"
    "      <PhotographyStructuredData />",
    home_path,
)

stage(home_path, content)


# --------------------------------------------------
# CONSOLIDATE THE PRODUCTION DOMAIN
# --------------------------------------------------

layout_path = "app/layout.tsx"

content = read(layout_path)

content = 'import { SITE_URL } from "./seo";\n' + content

content = replace_once(
    content,
    'metadataBase: new URL("https://annaarnett.photo"),',
    "metadataBase: new URL(SITE_URL),",
    layout_path,
)

stage(layout_path, content)


# --------------------------------------------------
# DISPLAY DIFF / APPLY CHANGES
# --------------------------------------------------

print(
    "\nAPPLY MODE\n"
    if args.apply
    else "\nDRY RUN: No files will be modified.\n"
)

for relative_path, new_content in changes.items():
    path = ROOT / relative_path

    old_content = (
        path.read_text(encoding="utf-8")
        if path.exists()
        else ""
    )

    diff = difflib.unified_diff(
        old_content.splitlines(keepends=True),
        new_content.splitlines(keepends=True),
        fromfile=f"a/{relative_path}",
        tofile=f"b/{relative_path}",
    )

    print("".join(diff))

if args.apply:
    for relative_path, new_content in changes.items():
        path = ROOT / relative_path

        path.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        path.write_text(
            new_content,
            encoding="utf-8",
        )

        print(f"Updated: {relative_path}")

print("\n" + "=" * 50)
print("SEO IMPLEMENTATION SUMMARY")
print("=" * 50)

print(f"Files affected: {len(changes)}")

for relative_path in changes:
    print(f"  - {relative_path}")

if args.apply:
    print("\nChanges applied successfully.")
    print("Next: review git diff and run npm run build.")
else:
    print("\nNo files were modified.")
    print("Run with --apply to implement the changes.")
