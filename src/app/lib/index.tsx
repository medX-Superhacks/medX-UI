import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const shortenAddress = (address: string): string => {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

/** Merge classes with tailwind-merge with clsx full feature */
export default function clsxm(...classes: ClassValue[]) {
    return twMerge(clsx(...classes));
}
