export interface Role {
  id: string;
  name: string;
  active: boolean;
  hidden: boolean;
}

export const roles: Role[] = [
  { id: "admin", name: "Admin", active: true, hidden: false },
  { id: "user", name: "User", active: true, hidden: false },
  { id: "developer", name: "Developer", active: true, hidden: false },
];

export function getRole(id: string) {
  return roles.find((role) => role.id === id);
}

export function isRequestable(role: Role) {
  return role.active && !role.hidden;
}

export interface RoleMember {
  username: string;
  fullName: string;
}

const roleMembers: Record<string, RoleMember[]> = {
  admin: [{ username: "connellboyce", fullName: "Connell Boyce" }],
  user: [
    { username: "connellboyce", fullName: "Connell Boyce" },
    { username: "jdoe", fullName: "Jane Doe" },
    { username: "slee", fullName: "Sam Lee" },
    { username: "ppatel", fullName: "Priya Patel" },
    { username: "akim", fullName: "Alex Kim" },
  ],
  developer: [
    { username: "connellboyce", fullName: "Connell Boyce" },
    { username: "mchen", fullName: "Morgan Chen" },
  ],
};

export function getRoleMembers(id: string) {
  return roleMembers[id] ?? [];
}
