import HomeSvg from "@/svg/HomeSvg";
import PeopleLogo from "@/svg/PeopleLogo";
import SettingSvg from "@/svg/SettingSvg";
import ProductIcon from "@/svg/Products";
import TeamIcon from "@/svg/TeamIcon";
import BlogIcon from "@/svg/BlogIcon";
import UserIcon from "@/svg/UserIcon";
import RefundIcon from "@/svg/RefundIcon";
import PdfIcon from "@/svg/PdfIcon";
import OrderIcon from "@/svg/OrderSvg";

interface MenuItem {
  id: number;
  text: string;
  icon: () => JSX.Element;
  link?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  link: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    text: "Asosiy",
    icon: HomeSvg,
    link: "/",
  },
  {
    id: 7,
    text: "Travel4you tourlar",
    icon: BlogIcon,
    submenu: [
      {
        text: "Tourlar",
        link: "/categories",
      },
      {
        text: "Tour yaratish",
        link: "/create-categories",
      },
    ],
  },

  {
    id: 8,
    text: "Manzillar",
    icon: BlogIcon,
    submenu: [
      {
        text: "Manzillar",
        link: "/products",
      },
      {
        text: "Manzil yaratish",
        link: "/create-products",
      },
    ],
  },
  // {
  //   id: 9,
  //   text: "Rang turlari",
  //   icon: BlogIcon,
  //   submenu: [
  //     {
  //       text: "Rang turlari",
  //       link: "/blogs",
  //     },
  //     {
  //       text: "Rang turlari yaratish",
  //       link: "/create-blog",
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   text: "Rang",
  //   icon: BlogIcon,
  //   submenu: [
  //     {
  //       text: "Rang",
  //       link: "/tours",
  //     },
  //     {
  //       text: "Rang yaratish",
  //       link: "/create-tours",
  //     },
  //   ],
  // },
  // {
  //   id: 11,
  //   text: "Loyiha",
  //   icon: BlogIcon,
  //   submenu: [
  //     {
  //       text: "Loyiha",
  //       link: "/news",
  //     },
  //     {
  //       text: "Loyiha yaratish",
  //       link: "/create-news",
  //     },
  //   ],
  // },
  
];
