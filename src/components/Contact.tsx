"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import { SiLine } from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { sendMail } from "@/app/actions/sendMail";
import {
  EMPTY_CONTACT_FORM_DATA,
  hasContactFormErrors,
  type ContactField,
  type ContactFormData,
  type ContactFormFieldErrors,
  validateContactField,
  validateContactFormData,
} from "@/lib/contactForm";
import { getStyles } from "@/styles";
import type { ContactFormState } from "@/types/contact";

const VISITOR_COUNTER_NAMESPACE = "prasertnuannim-portfolio";
const VISITOR_COUNTER_NAME = "visitors";
const VISITOR_COUNTER_STORAGE_KEY =
  "prasertnuannim-portfolio-visitor-counted";
const VISITOR_COUNTER_BASE_URL = `https://api.counterapi.dev/v1/${VISITOR_COUNTER_NAMESPACE}/${VISITOR_COUNTER_NAME}`;
const CONTACT_EMAIL = "nuannimprasert@gmail.com";

type CounterResponse = {
  count?: number;
};
type ContactErrors = Record<ContactField, string>;
type SubmitStatus = "idle" | "success" | "error";

const EMPTY_ERRORS: ContactErrors = {
  name: "",
  email: "",
  message: "",
};

function toContactErrors(
  fieldErrors: ContactFormFieldErrors | undefined,
  translate: (key: string) => string
): ContactErrors {
  return {
    name: fieldErrors?.name ? translate(`form.errors.${fieldErrors.name}`) : "",
    email: fieldErrors?.email
      ? translate(`form.errors.${fieldErrors.email}`)
      : "",
    message: fieldErrors?.message
      ? translate(`form.errors.${fieldErrors.message}`)
      : "",
  };
}

let visitorCountRequest: Promise<number> | null = null;

async function getVisitorCount() {
  if (visitorCountRequest) {
    return visitorCountRequest;
  }

  visitorCountRequest = (async () => {
    const hasCountedVisit =
      window.localStorage.getItem(VISITOR_COUNTER_STORAGE_KEY) === "1";

    const endpoint = hasCountedVisit
      ? `${VISITOR_COUNTER_BASE_URL}/`
      : `${VISITOR_COUNTER_BASE_URL}/up`;

    if (!hasCountedVisit) {
      window.localStorage.setItem(VISITOR_COUNTER_STORAGE_KEY, "1");
    }

    try {
      const response = await fetch(endpoint, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to load visitor count");
      }

      const data = (await response.json()) as CounterResponse;

      if (typeof data.count !== "number") {
        throw new Error("Invalid visitor count response");
      }

      return data.count;
    } catch (error) {
      if (!hasCountedVisit) {
        window.localStorage.removeItem(VISITOR_COUNTER_STORAGE_KEY);
      }

      visitorCountRequest = null;
      throw error;
    }
  })();

  return visitorCountRequest;
}

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const styles = getStyles(locale);

  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [visitorCountError, setVisitorCountError] = useState(false);
  const initialState: ContactFormState = { status: "idle" };
  const [state, formAction, isPending] = useActionState(sendMail, initialState);

  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(
    EMPTY_CONTACT_FORM_DATA
  );
  const [errors, setErrors] = useState<ContactErrors>(EMPTY_ERRORS);

  const contactItems = [
    {
      href: "tel:+66830099743",
      label: t("phoneLabel"),
      value: "083-009-9743",
      icon: <MdPhone className="text-2xl" />,
      ariaLabel: "Call 083-009-9743",
    },
    {
      href: `mailto:${CONTACT_EMAIL}`,
      label: t("emailLabel"),
      value: CONTACT_EMAIL,
      icon: <MdEmail className="text-2xl" />,
      ariaLabel: `Send email to ${CONTACT_EMAIL}`,
      valueClassName: "break-all",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as ContactField;
    const { value } = e.target;

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: (() => {
        const errorKey = validateContactField(field, value);
        return errorKey ? t(`form.errors.${errorKey}`) : "";
      })(),
    }));
  };

  useEffect(() => {
    let isMounted = true;

    void getVisitorCount()
      .then((count) => {
        if (!isMounted) return;
        setVisitorCount(count);
        setVisitorCountError(false);
      })
      .catch(() => {
        if (isMounted) {
          setVisitorCountError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!showMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowMessage(false);
      setFormStatus("idle");
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [showMessage]);

  useEffect(() => {
    if (state.status === "idle") {
      return;
    }

    setErrors(toContactErrors(state.fieldErrors, t));
    setFormStatus(state.status);
    setStatusMessage(state.messageKey ? t(`form.${state.messageKey}`) : "");
    setShowMessage(true);

    if (state.status === "success") {
      formRef.current?.reset();
      setFormData(EMPTY_CONTACT_FORM_DATA);
    }
  }, [state, t]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const nextFieldErrors = validateContactFormData(formData);
    const nextErrors = toContactErrors(nextFieldErrors, t);
    setErrors(nextErrors);

    if (hasContactFormErrors(nextFieldErrors)) {
      e.preventDefault();
      setFormStatus("error");
      setStatusMessage(t("form.invalidFields"));
      setShowMessage(true);
      return;
    }

    setFormStatus("idle");
    setStatusMessage("");
    setShowMessage(false);
  };

  const hasError = Object.values(errors).some(Boolean);

  const formattedVisitorCount =
    typeof visitorCount === "number"
      ? new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(
          visitorCount
        )
      : null;

  const visitorCountText = visitorCountError
    ? t("visitorCountUnavailable")
    : formattedVisitorCount === null
      ? t("visitorCountLoading")
      : t("visitorCountSummary", { count: formattedVisitorCount });

  return (
    <section className="relative px-4 py-20 sm:px-6 md:px-10">
      <div className={`mx-auto max-w-6xl ${styles.baseText}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="bg-gradient-to-r from-green-800 via-green-500 to-emerald-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item) => (
                <div
                  key={item.href}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-base text-gray-500">{item.label}</p>
                    <p
                      className={`text-lg font-semibold text-gray-900 ${
                        item.valueClassName ?? ""
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://line.me/R/ti/p/~s_er_t"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LINE contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:text-lg"
              >
                <SiLine className="text-xl" />
                {t("lineButton")}
              </a>
            </div>

            <div className="mt-10">
              <div className="mb-6 text-center text-gray-600 leading-relaxed">
                <p>{t("formIntro")}</p>
              </div>

              <form
                ref={formRef}
                action={formAction}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="locale" value={locale} />

                <div className="text-left">
                  <input
                    name="name"
                    type="text"
                    placeholder={t("form.namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border bg-white/90 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                      errors.name
                        ? "border-red-400"
                        : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="text-left">
                  <input
                    name="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border bg-white/90 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                      errors.email
                        ? "border-red-400"
                        : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="text-left">
                  <textarea
                    name="message"
                    placeholder={t("form.messagePlaceholder")}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border bg-white/90 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                      errors.message
                        ? "border-red-400"
                        : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: formStatus === "idle" ? 1.02 : 1 }}
                  whileTap={{ scale: formStatus === "idle" ? 0.98 : 1 }}
                  type="submit"
                  disabled={isPending || hasError}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-lg font-semibold text-white shadow-md transition-all ${
                    formStatus === "success"
                      ? "bg-green-600"
                      : formStatus === "error"
                        ? "bg-red-600"
                        : "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 hover:brightness-110"
                  } ${isPending || hasError ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {isPending && (
                    <motion.span
                      className="h-5 w-5 rounded-full border-[3px] border-white/40 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: [0.45, 0, 0.55, 1],
                      }}
                    />
                  )}

                  {isPending
                    ? t("form.submitting")
                    : formStatus === "success"
                      ? t("form.success")
                      : formStatus === "error"
                        ? t("form.error")
                        : t("form.submit")}
                </motion.button>

                <AnimatePresence>
                  {statusMessage && showMessage && (
                    <motion.p
                      key={statusMessage}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`mt-3 text-sm ${
                        formStatus === "success"
                          ? "text-green-600"
                          : formStatus === "error"
                            ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {statusMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-center text-sm font-medium text-emerald-800 sm:text-base">
                {visitorCountText}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
