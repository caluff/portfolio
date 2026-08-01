export type ExperienceIcon = "frontend" | "systems";
export type EmploymentType = "fullTime" | "partTime";

export type Experience = {
  readonly id: "activeTech" | "desoft";
  readonly company: string;
  readonly employmentType: EmploymentType;
  readonly from: string;
  readonly to?: string;
  readonly icon: ExperienceIcon;
  readonly highlightKeys: readonly ("1" | "2" | "3" | "4")[];
};

export const experiences = [
  {
    id: "activeTech",
    company: "Active Tech Corp",
    employmentType: "fullTime",
    from: "2023-08-01",
    icon: "frontend",
    highlightKeys: ["1", "2", "3", "4"],
  },
  {
    id: "desoft",
    company: "Desoft",
    employmentType: "partTime",
    from: "2023-01-01",
    to: "2024-08-01",
    icon: "systems",
    highlightKeys: ["1", "2", "3"],
  },
] as const satisfies readonly Experience[];
