import Badge from "@/components/Badge";
import Field from "@/components/Field";
import Section from "@/components/Section";

const security = {
  passwordLastChanged: "March 4, 2026",
  twoStepEnabled: false,
};

export default function SecurityPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-10">
      <Section title="Password">
        <Field
          label="Password Last Changed"
          value={security.passwordLastChanged}
        />
        <Field label="Change Password" href="/security/change-password" />
      </Section>
      <Section title="Multi-Factor Authentication">
        <Field
          label="2-Step Verification"
          value={
            <Badge>{security.twoStepEnabled ? "Enabled" : "Disabled"}</Badge>
          }
        />
      </Section>
    </div>
  );
}
