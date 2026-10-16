export type PortraitShoot = {
    slug: string;
    name: string;
    type: string;
    date: string;
    location: string;
    cover: string;
    photos: {
      src: string;
      alt: string;
    }[];
  };
  
  export const portraitShoots: PortraitShoot[] = [
    {
      slug: "mary",
      name: "Mary",
      type: "Portrait",
      date: "2026",
      location: "Chicago, IL",
      cover: "/photos/mary.jpg",
      photos: [
        {
          src: "/photos/mary.jpg",
          alt: "Portrait of Mary in warm natural light",
        },
      ],
    },
  
    {
      slug: "regan",
      name: "Regan",
      type: "Portrait",
      date: "2026",
      location: "Chicago, IL",
      cover: "/photos/regan.jpg",
      photos: [
        {
          src: "/photos/regan.jpg",
          alt: "Outdoor portrait of Regan",
        },
      ],
    },
  
    {
      slug: "ava",
      name: "Ava",
      type: "Portrait",
      date: "2026",
      location: "Chicago, IL",
      cover: "/photos/ava.jpg",
      photos: [
        {
          src: "/photos/ava.jpg",
          alt: "Portrait of Ava in soft natural light",
        },
      ],
    },
  
    {
      slug: "sam",
      name: "Sam",
      type: "Creative Portrait",
      date: "2026",
      location: "Chicago, IL",
      cover: "/photos/sam.jpg",
      photos: [
        {
          src: "/photos/sam.jpg",
          alt: "Creative portrait of Sam",
        },
      ],
    },
  
    {
      slug: "jake",
      name: "Jake",
      type: "Portrait",
      date: "2026",
      location: "Chicago, IL",
      cover: "/photos/jakeball.jpg",
      photos: [
        {
          src: "/photos/jakeball.jpg",
          alt: "Candid portrait of Jake",
        },
      ],
    },
  ];