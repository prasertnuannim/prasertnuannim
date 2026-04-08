import type { ContactFormFieldErrors } from "@/lib/contactForm";

export type ContactFormStatus = "idle" | "success" | "error";

export type ContactFormMessageKey =
  | "invalidFields"
  | "sent"
  | "sendFailed"
  | "missingConfig";

export type ContactFormState = {
  status: ContactFormStatus;
  messageKey?: ContactFormMessageKey;
  fieldErrors?: ContactFormFieldErrors;
};
