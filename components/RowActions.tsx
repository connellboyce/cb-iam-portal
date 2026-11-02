import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGear, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import ConfirmButton from "@/components/ConfirmButton";

interface RowAction {
  label: string;
  icon: IconDefinition;
  href?: string;
}

interface RowActionsProps {
  name: string;
  settingsHref?: string;
  editHref?: string;
  extraActions?: RowAction[];
}

export default function RowActions({
  name,
  settingsHref,
  editHref,
  extraActions = [],
}: RowActionsProps) {
  const actions: RowAction[] = [
    ...(settingsHref
      ? [{ label: "Settings for", icon: faGear, href: settingsHref }]
      : []),
    ...extraActions,
    ...(editHref ? [{ label: "Edit", icon: faPen, href: editHref }] : []),
  ];

  return (
    <>
      {actions.map((action) => (
        <Button
          key={action.label}
          href={action.href}
          variant="text"
          size="icon"
          aria-label={`${action.label} ${name}`}
        >
          <FontAwesomeIcon icon={action.icon} className="text-sm" />
        </Button>
      ))}
      <ConfirmButton
        label={`Delete ${name}`}
        icon={faTrash}
        question={`Are you sure you want to delete ${name}?`}
      />
    </>
  );
}
