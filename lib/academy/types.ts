export type AcademyLessonStatus =
  | "available"
  | "coming-soon";

export type AcademyLesson = {
  id: string;
  order: number;
  slug: string;
  title: string;
  description: string;
  topics: string[];
  estimatedMinutes: number;
  status: AcademyLessonStatus;
};

export type AcademyProgress = {
  completedLessonIds: string[];
  totalLessons: number;
};