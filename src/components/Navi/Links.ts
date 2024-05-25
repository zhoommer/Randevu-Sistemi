interface LinkTypes {
  link: string;
  path: string;
  scrollTo: string;
}

export const linkArray: LinkTypes[] = [
  {
    link: "ANASAYFA",
    path: "/",
    scrollTo: "home",
  },
  {
    link: "HAKKIMIZDA",
    path: "/hakkimizda",
    scrollTo: "about",
  },
  {
    link: "HIZMETLERIMIZ",
    path: "/hizmetlerimiz",
    scrollTo: "services",
  },
  {
    link: "ILETISIM",
    path: "/iletisim",
    scrollTo: "contact",
  },
  {
    link: "RANDEVU AL",
    path: "/randevu-al",
    scrollTo: "",
  },
];
