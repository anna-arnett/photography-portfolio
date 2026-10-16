export type WorkPhoto = {
    src: string;
    alt: string;
    shape?: "portrait" | "square" | "wide";
  };
  
  export const workCategories = {
    seniors: {
      label: "Seniors",
      number: "01",
      title: "Senior portraits",
      intro:
        "Warm, relaxed portraits with room to move around, try things, and actually have fun with it.",
      photos: [
        {
          src: "/photos/lydiasenior.JPG",
          alt: "Senior portrait among wildflowers",
          shape: "portrait",
        },
        {
          src: "/photos/regan.jpg",
          alt: "Senior portrait in a grassy field",
          shape: "portrait",
        },
        {
          src: "/photos/mary.jpg",
          alt: "Outdoor senior portrait in warm light",
          shape: "portrait",
        },
        {
          src: "/photos/sam.jpg",
          alt: "Portrait using warm natural light",
          shape: "portrait",
        },
        {
          src: "/photos/ava.jpg",
          alt: "Portrait in soft natural light",
          shape: "portrait",
        },
      ] satisfies WorkPhoto[],
    },
  
    portraits: {
      label: "Portraits + Headshots",
      number: "02",
      title: "Portraits + headshots",
      intro:
        "Natural portraits, headshots, and photos that feel polished without feeling overly posed.",
      photos: [
        {
          src: "/photos/mary.jpg",
          alt: "Portrait in warm natural light",
          shape: "portrait",
        },
        {
          src: "/photos/regan.jpg",
          alt: "Outdoor portrait",
          shape: "portrait",
        },
        {
          src: "/photos/sam.jpg",
          alt: "Creative portrait in natural light",
          shape: "portrait",
        },
        {
          src: "/photos/ava.jpg",
          alt: "Portrait in soft light",
          shape: "portrait",
        },
        {
          src: "/photos/jakeball.jpg",
          alt: "Candid portrait in evening light",
          shape: "portrait",
        },
        {
          src: "/photos/lydiasenior.JPG",
          alt: "Portrait among wildflowers",
          shape: "portrait",
        },
      ] satisfies WorkPhoto[],
    },
  
    creative: {
      label: "Creative Shoots",
      number: "03",
      title: "Creative shoots",
      intro:
        "Movement, reflections, unusual framing, shadows, blur, and whatever idea seems interesting enough to try.",
      photos: [
        {
          src: "/photos/shadow.jpg",
          alt: "Portrait using patterned shadow",
          shape: "portrait",
        },
        {
          src: "/photos/motion-dance.jpg",
          alt: "Experimental black and white portrait",
          shape: "portrait",
        },
        {
          src: "/photos/strike2.jpg",
          alt: "Black and white figure in water",
          shape: "wide",
        },
        {
          src: "/photos/traincool.jpg",
          alt: "Chicago train framed through its environment",
          shape: "square",
        },
        {
          src: "/photos/converse.jpg",
          alt: "Water splashing around shoes in evening light",
          shape: "wide",
        },
      ] satisfies WorkPhoto[],
    },
  } as const;
  
  export type WorkCategory = keyof typeof workCategories;