import mosqueImage from "./_images/bread1.jpg";
import {
  FaPray,
  FaPrayingHands,
  FaBookOpen,
  FaMosque,
  FaWalking,
} from "react-icons/fa";
import { RiRidingLine } from "react-icons/ri";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsSearch, BsBell, BsFillCarFrontFill, BsBook } from "react-icons/bs";
import { MdOutlineMosque } from "react-icons/md";
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
  // {
  //   icon: <BsSearch />,
  //   id: 1,
  // },
  {
    icon: <AiOutlineHeart />,
    text: "favorites",
    id: 0,
  },
  {
    icon: <BsBell />,
    id: 3,
    text: "notifications",
  },
  {
    icon: <MdOutlineMosque />,
    id: 4,
    text: "mosques",
  },
  {
    id: 5,
    icon: <BsBook />,
    text: "Verses",
  },
  {
    icon: <AiOutlineUser />,
    id: 6,
    text: "profile",
  },
];

export const categories = [
  {
    id: 0,
    text: "daily prayers",
    icon: <FaPray />,
  },
  {
    id: 1,
    text: "Jum'at prayer",
    icon: <FaPrayingHands />,
  },
  {
    id: 2,
    text: "programs",
    icon: <FaBookOpen />,
  },
  {
    id: 3,
    text: "Eid prayer",
    icon: <FaPray />,
  },
];

export const distances = [
  {
    id: 0,
    text: "40 mins",
    icon: <FaWalking />,
  },
  {
    id: 1,
    text: "20 mins",
    icon: <RiRidingLine />,
  },
  {
    id: 2,
    text: "12 mins",
    icon: <BsFillCarFrontFill />,
  },
];
