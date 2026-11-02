import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import Section from "@/components/Section";

export default function DeveloperPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-10">
      <Section title="Manage OAuth">
        <Button href="/manage-oauth">
          OAuth Portal
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-sm"
          />
        </Button>
      </Section>
    </div>
  );
}
