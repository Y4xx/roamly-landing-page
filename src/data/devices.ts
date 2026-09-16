import type { DeviceBrand } from "@/types/landing";

/**
 * Shared eSIM compatibility data — used by the "Before you buy" compact
 * checker and the full `/compatible-devices` page. Not exhaustive; replace
 * with the real supported-device list from the aggregator before launch.
 *
 * Model/brand names are proper nouns and stay unlocalized. Notes (the
 * caveat shown under a result) are translated — see `devices.notes.<id>`
 * in messages/*.json, only rendered when `hasNote` is true.
 */
export const deviceBrands: DeviceBrand[] = [
  {
    brand: "Apple",
    models: [
      { id: "iphone-17", name: "iPhone 17 / 17 Pro / 17 Pro Max", result: "compatible" },
      { id: "iphone-16", name: "iPhone 16 series", result: "compatible" },
      { id: "iphone-15", name: "iPhone 15 series", result: "compatible" },
      { id: "iphone-14", name: "iPhone 14 series", result: "compatible" },
      { id: "iphone-13", name: "iPhone 13 series", result: "compatible" },
      { id: "iphone-12", name: "iPhone 12 series", result: "compatible" },
      { id: "iphone-11", name: "iPhone 11 series", result: "compatible" },
      { id: "iphone-xs-xr", name: "iPhone XS / XS Max / XR", result: "compatible" },
      { id: "iphone-x-earlier", name: "iPhone X and earlier", result: "incompatible", hasNote: true },
      { id: "iphone-us-carrier", name: "Any iPhone bought with a carrier contract in the US", result: "unknown", hasNote: true },
    ],
  },
  {
    brand: "Samsung",
    models: [
      { id: "galaxy-s25-24-23", name: "Galaxy S25 / S24 / S23 series", result: "compatible" },
      { id: "galaxy-s22-21-20", name: "Galaxy S22 / S21 / S20 series", result: "compatible" },
      { id: "galaxy-z", name: "Galaxy Z Fold / Z Flip (all generations)", result: "compatible" },
      { id: "galaxy-note20", name: "Galaxy Note 20", result: "compatible" },
      { id: "galaxy-a", name: "Galaxy A series (most 2021+ models)", result: "unknown", hasNote: true },
      { id: "galaxy-us-variant", name: "Galaxy S20/S21/S22 sold in the US", result: "incompatible", hasNote: true },
    ],
  },
  {
    brand: "Google",
    models: [
      { id: "pixel-9-8-7", name: "Pixel 9 / 8 / 7 series", result: "compatible" },
      { id: "pixel-6", name: "Pixel 6 series", result: "compatible" },
      { id: "pixel-5", name: "Pixel 5", result: "compatible" },
      { id: "pixel-4", name: "Pixel 4 / 4a", result: "compatible" },
      { id: "pixel-3", name: "Pixel 3 / 3a", result: "compatible" },
      { id: "pixel-2-earlier", name: "Pixel 2 and earlier", result: "incompatible", hasNote: true },
    ],
  },
  {
    brand: "Other Android",
    models: [
      { id: "huawei-p40", name: "Huawei P40 / P40 Pro", result: "compatible" },
      { id: "oppo-find-x3", name: "Oppo Find X3 Pro and newer flagships", result: "compatible" },
      { id: "budget-android", name: "Most budget and mid-range Android phones", result: "incompatible", hasNote: true },
    ],
  },
];

export function findModel(brand: string, modelName: string) {
  return deviceBrands
    .find((b) => b.brand === brand)
    ?.models.find((m) => m.name === modelName);
}
