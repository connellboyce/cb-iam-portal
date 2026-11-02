import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faGlobe,
  faKey,
  faRocket,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import LinkCard from "@/components/LinkCard";

const actions = [
  {
    title: "Manage Clients",
    description: "View, register, and configure the apps that sign users in.",
    href: "/manage-oauth/clients",
    icon: faKey,
  },
  {
    title: "Manage Resource Servers",
    description: "Define the APIs and resources your clients can access.",
    href: "/manage-oauth/resource-servers",
    icon: faServer,
  },
  {
    title: "Getting Started",
    description: "Walk through setting up your first OAuth integration.",
    href: "/manage-oauth/getting-started",
    icon: faRocket,
  },
];

const resources = [
  {
    label: "connellboyce.com",
    href: "https://connellboyce.com",
    icon: faGlobe,
  },
  { label: "GitHub", href: "https://github.com/connellboyce", icon: faGithub },
];

export default function ManageOAuthPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold md:text-4xl">
          <span className="text-brand">OAuth</span> Portal
        </h1>
        <p className="text-muted">
          Register clients, manage resource servers, and get your integration
          running.
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <li key={action.href}>
            <LinkCard {...action} />
          </li>
        ))}
      </ul>
      <nav aria-label="Resources" className="flex flex-wrap items-center gap-3">
        <span className="text-xs tracking-wide text-muted uppercase">
          Resources
        </span>
        {resources.map((resource) => (
          <Button
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            className="text-sm"
          >
            <FontAwesomeIcon icon={resource.icon} />
            {resource.label}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-xs text-muted"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        ))}
      </nav>
    </div>
  );
}
