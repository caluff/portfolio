export type ExperienceIcon = "frontend" | "systems";
export type EmploymentType = "fullTime" | "partTime";
export type ProductionApp = {
  readonly name: string;
  readonly url: `https://${string}`;
};

export type Experience = {
  readonly id: "activeTech" | "desoft";
  readonly company: string;
  readonly employmentType: EmploymentType;
  readonly from: string;
  readonly to?: string;
  readonly icon: ExperienceIcon;
  readonly highlightKeys: readonly ("1" | "2" | "3" | "4")[];
  readonly productionApps?: readonly ProductionApp[];
};

export const experiences = [
  {
    id: "activeTech",
    company: "Active Tech Corp",
    employmentType: "fullTime",
    from: "2023-08-01",
    icon: "frontend",
    highlightKeys: ["1", "2", "3", "4"],
    productionApps: [
      {name: "Agenciapp", url: "https://agenciapp.com/landing"},
      {name: "Touradvisor", url: "https://puncana.touradvisor.net/"},
      {name: "Recogida en casa", url: "https://www.recogidaencasa.com/"},
    ],
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
