export type SeniorShoot = {
    slug: string;
    name: string;
    date: string;
    location: string;
    cover: string;
    photos: {
      src: string;
      alt: string;
      orientation?: "portrait" | "landscape" | "square";
    }[];
  };
  
  export const seniorShoots: SeniorShoot[] = [
    {
        slug: "lydia-senior",
        name: "Lydia",
        date: "August 2026",
        location: "Chicago, IL",
      
        cover: "/photos/seniors/lydia-senior/01.JPG",
      
        photos: [
          {
            src: "/photos/seniors/lydia-senior/01.JPG",
            alt: "Lydia senior portrait among tall grasses",
            orientation: "portrait",
          },
          {
            src: "/photos/seniors/lydia-senior/02.JPG",
            alt: "Lydia senior portrait in wildflowers",
            orientation: "portrait",
          },
          {
            src: "/photos/seniors/lydia-senior/03.JPG",
            alt: "Lydia senior portrait outdoors",
            orientation: "portrait",
          },
          {
            src: "/photos/seniors/lydia-senior/04.JPG",
            alt: "Lydia senior portrait in warm evening light",
            orientation: "landscape",
          },
          {
            src: "/photos/seniors/lydia-senior/05.JPG",
            alt: "Close portrait of Lydia",
            orientation: "portrait",
          },
          {
            src: "/photos/seniors/lydia-senior/06.JPG",
            alt: "Lydia senior portrait surrounded by greenery",
            orientation: "portrait",
          },
          {
            src: "/photos/seniors/lydia-senior/07.JPG",
            alt: "Lydia senior portrait in natural light",
            orientation: "square",
          },
          {
            src: "/photos/seniors/lydia-senior/08.JPG",
            alt: "Lydia senior portrait at golden hour",
            orientation: "portrait",
          },
        ],
      },
  
    {
      slug: "regan",
      name: "Regan",
      date: "May 2026",
      location: "Chicago, IL",
      cover: "/photos/regan.jpg",
      photos: [
        {
          src: "/photos/regan.jpg",
          alt: "Regan portrait in warm field light",
          orientation: "portrait",
        },
      ],
    },
  
    {
      slug: "mary",
      name: "Mary",
      date: "May 2026",
      location: "Chicago, IL",
      cover: "/photos/mary.jpg",
      photos: [
        {
          src: "/photos/mary.jpg",
          alt: "Mary portrait in warm natural light",
          orientation: "portrait",
        },
      ],
    },
  
    {
      slug: "ava",
      name: "Ava",
      date: "Spring 2026",
      location: "Chicago, IL",
      cover: "/photos/ava.jpg",
      photos: [
        {
          src: "/photos/ava.jpg",
          alt: "Ava portrait in soft natural light",
          orientation: "portrait",
        },
      ],
    },
  ];