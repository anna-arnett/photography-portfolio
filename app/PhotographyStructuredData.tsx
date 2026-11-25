import { absoluteUrl, BUSINESS_NAME, SITE_URL } from "./seo";

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
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
