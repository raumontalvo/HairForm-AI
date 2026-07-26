import type { AcademyLesson } from "@/lib/academy/types";

export const academyCurriculum: AcademyLesson[] = [
  {
    id: "hair-levels",
    order: 1,
    slug: "hair-levels",
    title: "Hair Levels",
    description:
      "Learn the professional level system, natural depth, and how levels guide every color decision.",
    topics: [
      "Levels 1–10",
      "Natural depth",
      "Level identification",
    ],
    estimatedMinutes: 20,
    status: "available",
  },
  {
    id: "underlying-pigment",
    order: 2,
    slug: "underlying-pigment",
    title: "Underlying Pigment",
    description:
      "Understand which warm pigments are exposed as natural hair is lightened through each level.",
    topics: [
      "Pigment stages",
      "Warmth exposure",
      "Neutralization planning",
    ],
    estimatedMinutes: 25,
    status: "coming-soon",
  },
  {
    id: "lift-journey",
    order: 3,
    slug: "lift-journey",
    title: "Lift Journey",
    description:
      "Follow hair through the stages of lift and learn how starting level affects the final result.",
    topics: [
      "Lift stages",
      "Target levels",
      "Safety considerations",
    ],
    estimatedMinutes: 25,
    status: "coming-soon",
  },
  {
    id: "neutralization",
    order: 4,
    slug: "neutralization",
    title: "Neutralization",
    description:
      "Use complementary color theory to control unwanted warmth and refine tonal results.",
    topics: [
      "Complementary colors",
      "Toning",
      "Over-neutralization",
    ],
    estimatedMinutes: 25,
    status: "coming-soon",
  },
  {
    id: "porosity",
    order: 5,
    slug: "porosity",
    title: "Porosity",
    description:
      "Learn how the hair structure affects color absorption, retention, and formulation decisions.",
    topics: [
      "Low porosity",
      "Medium porosity",
      "High porosity",
    ],
    estimatedMinutes: 20,
    status: "coming-soon",
  },
  {
    id: "developers",
    order: 6,
    slug: "developers",
    title: "Developers",
    description:
      "Compare developer strengths and understand how peroxide supports lift and deposit.",
    topics: [
      "10 volume",
      "20 volume",
      "30 and 40 volume",
    ],
    estimatedMinutes: 25,
    status: "coming-soon",
  },
  {
    id: "gray-coverage",
    order: 7,
    slug: "gray-coverage",
    title: "Gray Coverage",
    description:
      "Build reliable strategies for gray blending, resistant gray, and complete coverage.",
    topics: [
      "Gray percentage",
      "Natural series",
      "Resistant hair",
    ],
    estimatedMinutes: 30,
    status: "coming-soon",
  },
  {
    id: "corrective-color",
    order: 8,
    slug: "corrective-color",
    title: "Corrective Color",
    description:
      "Work through banding, hot roots, uneven lift, filling, and other corrective scenarios.",
    topics: [
      "Color correction",
      "Banding",
      "Fillers",
    ],
    estimatedMinutes: 35,
    status: "coming-soon",
  },
  {
    id: "consultations",
    order: 9,
    slug: "consultations",
    title: "Consultations",
    description:
      "Develop a structured consultation process that supports safe and realistic service planning.",
    topics: [
      "Hair history",
      "Expectation setting",
      "Testing and safety",
    ],
    estimatedMinutes: 25,
    status: "coming-soon",
  },
  {
    id: "formula-building",
    order: 10,
    slug: "formula-building",
    title: "Formula Building",
    description:
      "Combine level, tone, developer, porosity, and application strategy into a professional plan.",
    topics: [
      "Tonal families",
      "Developer selection",
      "Application strategy",
    ],
    estimatedMinutes: 35,
    status: "coming-soon",
  },
];

export function getAvailableAcademyLessons(): AcademyLesson[] {
  return academyCurriculum.filter(
    (lesson) => lesson.status === "available",
  );
}

export function getTotalAcademyMinutes(): number {
  return academyCurriculum.reduce(
    (total, lesson) =>
      total + lesson.estimatedMinutes,
    0,
  );
}