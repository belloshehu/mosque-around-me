import mosqueImage from "./_images/bread1.jpg";
import { FaHeart, FaSearch, FaUser, FaBell } from "react-icons/fa";
export const links = [
  {
    linkText: "Programs",
    path: "/programs",
  },
  {
    linkText: "Services",
    path: "/services",
  },
  {
    linkText: "About",
    path: "/about",
  },
];

export const userLinks = [
  {
    linkText: "My programs",
    path: "/user/programs",
  },
  {
    linkText: "My mosques",
    path: "/user/mosques",
  },
  {
    linkText: "Dashboard",
    path: "/dashboard",
  },
];

export const mosques = [
  {
    id: "44362261",
    name: "Warri central mosque",
    image: mosqueImage,
    address: "pti road, pti school",
    state: "Delta",
    country: "Nigeria",
    city: "Effurun",
    date: "10/10/23",
    time: "09:30am",
  },
  {
    id: "84322642",
    name: "Warri central mosque",
    image: mosqueImage,
    address: "Unguwa uku road, layin lungu",
    state: "Kano",
    country: "Nigeria",
    city: "kano",
    date: "10/10/23",
    time: "09:30am",
  },
  {
    id: "84322656",
    name: "Warri central mosque",
    image: mosqueImage,
    address: "pti road, pti school",
    state: "Delta",
    country: "Nigeria",
    city: "Warri",
    date: "10/10/23",
    time: "09:30am",
  },
];

export const prayers = [
  {
    id: "1",
    title: "Subhi",
  },
  {
    id: "2",
    title: "Zuhr",
  },
  {
    id: "3",
    title: "Asr",
  },
  {
    id: "4",
    title: "Magrib",
  },
  {
    id: "5",
    title: "Ishaa",
  },
  {
    id: "6",
    title: "Jumaa",
  },
];

export const programTypes = ["continous", "one-off"];
export const programNature = ["hybrid", "virtual", "physical"];

export const menuitems = [
  {
    icon: <FaSearch />,
    id: 1,
  },
  {
    icon: <FaHeart />,
    id: 0,
  },
  {
    icon: <FaBell />,
    id: 3,
  },
  {
    icon: <FaUser />,
    id: 2,
  },
];
