export type VideoStatus = "pending" | "approved" | "rejected";

export type GradeLevel = "middle" | "9" | "10" | "11" | "12" | "college" | "";
export type SchoolType =
  | "public"
  | "private"
  | "community-college"
  | "university"
  | "other"
  | "";

export type Video = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradeLevel?: GradeLevel;
  schoolType?: SchoolType;
  status: VideoStatus;
  createdAt: string; // ISO string

  // for next step (Cloudinary)
  videoUrl?: string | null;
};

