import { UserRole } from "@/types";

export type FeatureKey =
  | "student-management"
  | "teacher-management"
  | "attendance"
  | "library"
  | "fees"
  | "results"
  | "courses";

export const ROLE_PERMISSIONS: Record<UserRole, FeatureKey[]> = {
  admin: [
    "student-management",
    "teacher-management",
    "attendance",
    "library",
    "fees",
    "results",
    "courses",
  ],
  teacher: [
    "results",
    "courses",
  ],
  student: [
    "courses",
    "results",
  ],
  parent: [
    "results",
  ],
  librarian: [
    "courses",
  ],
};

/**
 * Checks whether a given role has permissions for a specific feature key.
 */
export function hasPermission(role: UserRole, feature: FeatureKey): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(feature) : false;
}
