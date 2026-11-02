import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

interface RoleRequestCardProps {
  username: string;
  fullName: string;
  role: string;
  justification: string;
}

export default function RoleRequestCard({
  username,
  fullName,
  role,
  justification,
}: RoleRequestCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-foreground/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate text-lg">{fullName}</h3>
          <p className="truncate text-sm text-muted">@{username}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="subtle"
            size="icon"
            aria-label={`Approve ${role} request from ${fullName}`}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button
            variant="subtle"
            size="icon"
            aria-label={`Deny ${role} request from ${fullName}`}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      </div>
      <dl className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <dt className="text-xs tracking-wide text-muted uppercase">
            Requested Role
          </dt>
          <dd>
            <Badge variant="brand">{role}</Badge>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs tracking-wide text-muted uppercase">
            Justification
          </dt>
          <dd className="text-sm">{justification}</dd>
        </div>
      </dl>
    </article>
  );
}
