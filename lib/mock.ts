import type { Video } from "./types";

export const mockVideos: Video[] = [
  {
    id: "v1",
    title: "How I survived AP week",
    description: "My time-blocking strategy + what I’d do differently next time.",
    tags: ["AP", "time management", "stress"],
    gradeLevel: "10",
    schoolType: "public",
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "v2",
    title: "Moving to a new school: my first month",
    description: "Feeling anxious is normal—here’s what helped me make friends.",
    tags: ["international student", "adjustment", "anxiety"],
    gradeLevel: "11",
    schoolType: "public",
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: "v3",
    title: "Study setup + how I focus after school",
    description: "Small habits that keep me consistent without burning out.",
    tags: ["habits", "focus", "productivity"],
    gradeLevel: "9",
    schoolType: "private",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "v4",
    title: "What I wish I knew before finals",
    description: "A realistic review plan + sleep + food schedule.",
    tags: ["finals", "planning", "health"],
    gradeLevel: "college",
    schoolType: "university",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];
