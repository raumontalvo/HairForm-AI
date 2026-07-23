export const HAIR_LEVELS = [
  { level: 1, name: "Black" },
  { level: 2, name: "Darkest brown" },
  { level: 3, name: "Dark brown" },
  { level: 4, name: "Medium brown" },
  { level: 5, name: "Light brown" },
  { level: 6, name: "Dark blonde" },
  { level: 7, name: "Medium blonde" },
  { level: 8, name: "Light blonde" },
  { level: 9, name: "Very light blonde" },
  { level: 10, name: "Lightest blonde" },
] as const;

export type HairLevel = (typeof HAIR_LEVELS)[number]["level"];

export function isValidHairLevel(value: number): value is HairLevel {
  return Number.isInteger(value) && value >= 1 && value <= 10;
}

export function getHairLevelName(level: HairLevel): string {
  const match = HAIR_LEVELS.find((item) => item.level === level);

  if (!match) {
    throw new Error(`Unsupported hair level: ${level}`);
  }

  return match.name;
}