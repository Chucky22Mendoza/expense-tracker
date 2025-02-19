import { ITag } from "@/modules/tracker/domain/Tag";
import { ITransaction } from "@/modules/tracker/domain/Transaction";
import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const colorNames: Record<string, { r: number; g: number; b: number }> = {
  blue: { r: 0, g: 0, b: 255 },
  cyan: { r: 0, g: 255, b: 255 },
  fuchsia: { r: 255, g: 0, b: 255 },
  gray: { r: 128, g: 128, b: 128 },
  green: { r: 0, g: 255, b: 0 },
  indigo: { r: 75, g: 0, b: 130 },
  lime: { r: 0, g: 255, b: 0 },
  orange: { r: 255, g: 165, b: 0 },
  pink: { r: 255, g: 192, b: 203 },
  purple: { r: 128, g: 0, b: 128 },
  red: { r: 255, g: 0, b: 0 },
  teal: { r: 0, g: 128, b: 128 },
  violet: { r: 238, g: 130, b: 238 },
  yellow: { r: 255, g: 255, b: 0 },
  slate: { r: 112, g: 128, b: 144 },
  zinc: { r: 66, g: 66, b: 66 },
  neutral: { r: 169, g: 169, b: 169 },
  stone: { r: 133, g: 128, b: 121 },
  amber: { r: 255, g: 191, b: 0 },
  emerald: { r: 80, g: 200, b: 120 },
  sky: { r: 135, g: 206, b: 235 },
  rose: { r: 255, g: 102, b: 204 },
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace('#', '');

  const hexRegex = /^[0-9A-Fa-f]{6}$/;
  if (!hexRegex.test(hex)) return null;

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export function colorDistance(c1: { r: number; g: number; b: number }, c2: { r: number; g: number; b: number }): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2)
  );
}

export function getColor(hex: string): string | null {
  const inputRgb = hexToRgb(hex);
  if (!inputRgb) return null;

  let closestColor = '';
  let minDistance = Infinity;

  for (const [name, rgb] of Object.entries(colorNames)) {
    const distance = colorDistance(inputRgb, rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = name;
    }
  }

  return closestColor;
}

// export const formatCurrency = (amount: number, currency: string) => (
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency,
//     maximumFractionDigits: 2,
//     minimumFractionDigits: 2,
//   }).format(amount)
// );

export const formatCurrencyShort = (amount: number, currency: string) => (
  `${currency}${parseFloat(String(amount)).toFixed(2)}`
);

export const isTransaction = (element: any): element is ITransaction => (
  typeof element.id === 'number' &&
  typeof element.name === 'string' &&
  typeof element.amount === 'number' &&
  typeof element.tagId === 'number' &&
  typeof element.date === 'string' &&
  ['expense', 'income'].includes(element.type)
);

export const isTag = (element: any): element is ITag => (
  typeof element.id === 'number' &&
  typeof element.name === 'string' &&
  typeof element.color === 'string'
);

export const isTransactionList = (list: any): list is ITransaction[] => (
  Array.isArray(list) && list.every(isTransaction)
);

export const isTagList = (list: any): list is ITag[] => (
  Array.isArray(list) && list.every(isTag)
);
