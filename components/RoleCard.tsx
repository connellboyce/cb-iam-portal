import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import ConfirmButton from "@/components/ConfirmButton";
import type { Role } from "@/lib/roles";

type RoleCardProps = Role;

export default function RoleCard({ id, name, active, hidden }: RoleCardProps) {
  const details = [
    { label: "Active", value: active },
    { label: "Hidden", value: hidden },
  ];

  return (
    <article className="flex items-start justify-between gap-4 rounded-2xl bg-foreground/5 p-5">
      <div className="flex min-w-0 flex-col gap-3">
        <h3 className="truncate text-lg">{name}</h3>
        <dl className="flex gap-8">
          {details.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-1">
              <dt className="text-xs tracking-wide text-muted uppercase">
                {detail.label}
              </dt>
              <dd className="text-sm">{detail.value ? "Yes" : "No"}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex gap-2">
        <Button
          href={`/admin/roles/${id}/users`}
          variant="subtle"
          size="icon"
          aria-label={`View users with ${name} role`}
        >
          <FontAwesomeIcon icon={faUsers} className="text-sm" />
        </Button>
        <Button
          href={`/admin/roles/${id}/edit`}
          variant="subtle"
          size="icon"
          aria-label={`Edit ${name} role`}
        >
          <FontAwesomeIcon icon={faPen} className="text-sm" />
        </Button>
        <ConfirmButton
          variant="subtle"
          label={`Delete ${name} role`}
          icon={faTrash}
          question={`Are you sure you want to delete the ${name} role?`}
        />
      </div>
    </article>
  );
}
