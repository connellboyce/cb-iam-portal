import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";

interface BackLinkProps {
  href: string;
  destination: string;
}

export default function BackLink({ href, destination }: BackLinkProps) {
  return (
    <Button
      href={href}
      variant="text"
      aria-label={`Back to ${destination}`}
      className="-ml-5 self-start text-sm"
    >
      <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
      Back
    </Button>
  );
}
