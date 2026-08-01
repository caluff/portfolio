"use client";

import emailjs from "@emailjs/browser";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { ContactInput } from "@/components/portfolio/contact-input";
import { ContactSubmitButton } from "@/components/portfolio/contact-submit-button";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { contactCta } from "@/data/contact";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const initialForm = { name: "", email: "", message: "" };

export function ContactFormReveal() {
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState(initialForm);
  const isConfigured = Boolean(serviceId && templateId && publicKey);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serviceId || !templateId || !publicKey) return;
    setIsSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: contactCta.recipientName,
          from_email: form.email,
          reply_to: form.email,
          to_email: contactCta.recipientEmail,
          message: form.message,
        },
        { publicKey },
      );
      toast.add({
        title: contactCta.successTitle,
        description: contactCta.successDescription,
        type: "success",
      });
      setForm(initialForm);
    } catch {
      toast.add({
        title: contactCta.errorTitle,
        description: contactCta.errorDescription,
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 px-5 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {contactCta.formEyebrow}
        </p>
        <Badge variant="outline">{contactCta.availability}</Badge>
      </div>

      <div className="flex max-w-2xl flex-col gap-4">
        <h3 className="font-heading text-5xl leading-none tracking-tighter sm:text-6xl">
          {contactCta.formTitle}
        </h3>
        <p className="text-muted-foreground">
          {contactCta.formDescription}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <ContactInput
              autoComplete="name"
              disabled={isSending}
              label={contactCta.fields.name.label}
              name="name"
              onChange={handleChange}
              placeholder={contactCta.fields.name.placeholder}
              value={form.name}
            />
            <ContactInput
              autoComplete="email"
              disabled={isSending}
              label={contactCta.fields.email.label}
              name="email"
              onChange={handleChange}
              placeholder={contactCta.fields.email.placeholder}
              type="email"
              value={form.email}
            />
          </div>
          <Field>
            <FieldLabel htmlFor="contact-message">
              {contactCta.fields.message.label}
            </FieldLabel>
            <Textarea
              className="min-h-36 resize-y"
              disabled={isSending}
              id="contact-message"
              name="message"
              onChange={handleChange}
              placeholder={contactCta.fields.message.placeholder}
              required
              value={form.message}
            />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <ContactSubmitButton
              isConfigured={isConfigured}
              isSending={isSending}
            />
            {!isConfigured && (
              <p className="text-sm text-destructive" role="status">
                {contactCta.configurationError}
              </p>
            )}
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
