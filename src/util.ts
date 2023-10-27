export const BACKEND_URL = "http://localhost:5000";

export const chunk = <T>(arr: T[], size: number): T[][] => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), [] as T[][]);
