export const user = {
  firstName: "Connell",
  lastName: "Boyce",
  username: "connellboyce",
  email: "connell@example.com",
};

export function fullName(u: typeof user) {
  return `${u.firstName} ${u.lastName}`;
}
