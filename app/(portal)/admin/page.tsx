import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import ExpandableList from "@/components/ExpandableList";
import RoleCard from "@/components/RoleCard";
import RoleRequestCard from "@/components/RoleRequestCard";
import Section from "@/components/Section";
import { roles } from "@/lib/roles";

const roleRequests = [
  {
    id: "1",
    username: "jdoe",
    fullName: "Jane Doe",
    role: "Developer",
    justification:
      "I need to register OAuth clients for the billing service integration.",
  },
  {
    id: "2",
    username: "slee",
    fullName: "Sam Lee",
    role: "Admin",
    justification: "Taking over on-call for access reviews next quarter.",
  },
  {
    id: "3",
    username: "ppatel",
    fullName: "Priya Patel",
    role: "Developer",
    justification: "Building a dashboard that signs in through the portal.",
  },
  {
    id: "4",
    username: "akim",
    fullName: "Alex Kim",
    role: "Developer",
    justification: "Need to rotate client secrets for the mobile app.",
  },
];

export default function AdminPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-10">
      <Section title="Role Requests">
        {roleRequests.length > 0 ? (
          <ExpandableList>
            {roleRequests.map(({ id, ...request }) => (
              <RoleRequestCard key={id} {...request} />
            ))}
          </ExpandableList>
        ) : (
          <EmptyState>No role requests to review.</EmptyState>
        )}
      </Section>
      <Section title="Roles">
        <ul className="flex flex-col gap-3">
          {roles.map((role) => (
            <li key={role.id}>
              <RoleCard {...role} />
            </li>
          ))}
        </ul>
        <Button href="/admin/roles/new">
          <FontAwesomeIcon icon={faPlus} />
          Add New Role
        </Button>
      </Section>
    </div>
  );
}
