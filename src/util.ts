import { BiLogoBootstrap, BiHome, BiSpreadsheet } from "react-icons/bi";
import { IoIosPaper, IoIosBook, IoIosSchool, IoIosAnalytics } from "react-icons/io";
import type { IconType } from "react-icons";

export const BACKEND_URL = `http://${window.location.hostname}:5001`;

console.log(BACKEND_URL);

export const chunk = <T>(arr: T[], size: number): T[][] => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), [] as T[][]);

export const links = [
  ["Dashboard", "/", BiSpreadsheet],
  ["AI Writing Evaluator", "/essay", IoIosPaper],
  ["Lesson Plan Creator", "/lessonplan", IoIosBook],
  ["Assessment Generator", "/assessment", IoIosSchool],
  // ["Student Analytics", "/analytics", IoIosAnalytics],
] as [string, string, IconType][];
