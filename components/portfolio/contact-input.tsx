import type { ComponentProps } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type ContactInputProps = ComponentProps<typeof Input> & { label: string };

export function ContactInput({ label, name, ...props }: ContactInputProps) {
  const id = `contact-${name}`;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} name={name} required {...props} />
    </Field>
  );
}
