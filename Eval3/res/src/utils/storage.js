const KEY = "evalData";

const seedImage =
  "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg";

const seedData = [
  {
    restaurantID: 1,
    restaurantName: "1135 AD",
    address: "Jaipur, Amber Fort, Rajasthan",
    type: "Rajasthani",
    parkingLot: true,
    image: seedImage,
  },
];

export function getRestaurants() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seedData));
      return seedData;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setRestaurants(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function generateRestaurantID(existing) {
  const maxId = existing.reduce((m, r) => Math.max(m, Number(r.restaurantID) || 0), 0);
  return maxId + 1;
}

export const DEFAULT_IMAGE = seedImage;
export const STORAGE_KEY = KEY;
