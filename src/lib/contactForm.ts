export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactField = keyof ContactFormData;

export type ContactFormErrorKey =
  | "nameRequired"
  | "nameMin"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"
  | "messageMin";

export type ContactFormFieldErrors = Partial<
  Record<ContactField, ContactFormErrorKey>
>;

export const EMPTY_CONTACT_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactField(
  field: ContactField,
  value: string
): ContactFormErrorKey | undefined {
  const trimmedValue = value.trim();

  switch (field) {
    case "name":
      if (trimmedValue.length === 0) {
        return "nameRequired";
      }

      if (trimmedValue.length < 2) {
        return "nameMin";
      }

      return undefined;
    case "email":
      if (trimmedValue.length === 0) {
        return "emailRequired";
      }

      if (!EMAIL_REGEX.test(trimmedValue)) {
        return "emailInvalid";
      }

      return undefined;
    case "message":
      if (trimmedValue.length === 0) {
        return "messageRequired";
      }

      if (trimmedValue.length < 10) {
        return "messageMin";
      }

      return undefined;
  }
}

export function validateContactFormData(
  data: ContactFormData
): ContactFormFieldErrors {
  const errors: ContactFormFieldErrors = {};

  const nameError = validateContactField("name", data.name);
  const emailError = validateContactField("email", data.email);
  const messageError = validateContactField("message", data.message);

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (messageError) {
    errors.message = messageError;
  }

  return errors;
}

export function hasContactFormErrors(errors: ContactFormFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function getContactFormData(formData: FormData): ContactFormData {
  return {
    name: typeof formData.get("name") === "string" ? String(formData.get("name")) : "",
    email:
      typeof formData.get("email") === "string"
        ? String(formData.get("email"))
        : "",
    message:
      typeof formData.get("message") === "string"
        ? String(formData.get("message"))
        : "",
  };
}
