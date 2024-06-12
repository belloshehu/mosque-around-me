import mosqueImage from "./_images/bread1.jpg";
import { FaPray, FaPrayingHands, FaBookOpen, FaWalking } from "react-icons/fa";
import { RiRidingLine } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBell, BsFillCarFrontFill, BsBook } from "react-icons/bs";
import { MdOutlineMosque } from "react-icons/md";

const randomVerse = Math.floor(Math.random() * 6666);

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
    icon: <AiOutlineHome />,
    id: 1,
    path: "/",
    text: "Home",
  },
  {
    icon: <AiOutlineHeart />,
    text: "Favorites",
    id: 0,
    path: "/favorites",
  },
  {
    icon: <BsBell />,
    id: 3,
    text: "Notifications",
    path: "/notifications",
  },
  {
    icon: <MdOutlineMosque />,
    id: 4,
    text: "Mosques",
    path: "/mosques",
  },
  {
    id: 5,
    icon: <BsBook />,
    text: "Verses",
    path: `/verses`,
  },
  {
    icon: <AiOutlineUser />,
    id: 6,
    text: "Profile",
    path: "/profile",
  },
  {
    icon: <AiOutlineUsergroupAdd />,
    id: 7,
    text: "Admins",
    path: "/admin/users",
  },
  {
    icon: <AiOutlineSetting />,
    id: 8,
    text: "Settings",
    path: "/settings",
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
    text: "40",
    icon: <FaWalking />,
  },
  {
    id: 1,
    text: "20",
    icon: <RiRidingLine />,
  },
  {
    id: 2,
    text: "12",
    icon: <BsFillCarFrontFill />,
  },
];

export const notificationPageTabsData = [
  {
    id: "1",
    heading: "Visible",
  },
  {
    id: "2",
    heading: "Hidden",
  },
];

export const usersPageTabsData = [
  {
    id: "1",
    heading: "Applications",
  },
  {
    id: "2",
    heading: "Approved",
  },
  {
    id: "3",
    heading: "Suspended",
  },
];

export const profilePageTabsData = [
  {
    id: "1",
    heading: "Mosques",
  },
  {
    id: "2",
    heading: "Programs",
  },
  {
    id: "3",
    heading: "Application",
  },
];

export const favoritePageTabs = [
  {
    id: "1",
    heading: "Mosques",
  },
  {
    id: "2",
    heading: "Verses",
  },
];
