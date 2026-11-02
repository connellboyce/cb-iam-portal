import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import EditableField from "@/components/EditableField";
import Field from "@/components/Field";
import ProfilePicture from "@/components/ProfilePicture";
import { user } from "@/lib/user";

export default function ProfilePage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-8">
      <ProfilePicture />
      <div className="flex w-full flex-col gap-3">
        <EditableField
          label="First Name"
          name="firstName"
          defaultValue={user.firstName}
          autoComplete="given-name"
        />
        <EditableField
          label="Last Name"
          name="lastName"
          defaultValue={user.lastName}
          autoComplete="family-name"
        />
        <EditableField
          label="Username"
          name="username"
          defaultValue={user.username}
          autoComplete="username"
        />
        <Field
          label="Email"
          value={user.email}
          action={
            <Button
              href="/profile/change-email"
              variant="text"
              size="icon"
              aria-label="Edit Email"
            >
              <FontAwesomeIcon icon={faPen} className="text-sm" />
            </Button>
          }
        />
      </div>
    </div>
  );
}
