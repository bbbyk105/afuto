"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

type Fields = {
  company: string;
  name: string;
  email: string;
  tel: string;
  category: string;
  message: string;
  agree: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const categories = [
  "ITソリューション",
  "オフィスソリューション",
  "建設・インフラサポート",
  "流通・グローバルサポート",
  "その他のご相談",
];

const initial: Fields = {
  company: "",
  name: "",
  email: "",
  tel: "",
  category: categories[0],
  message: "",
  agree: false,
};

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "お名前を入力してください。";
    if (!fields.email.trim()) {
      next.email = "メールアドレスを入力してください。";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = "メールアドレスの形式が正しくありません。";
    }
    if (!fields.message.trim()) next.message = "お問い合わせ内容を入力してください。";
    if (!fields.agree) next.agree = "個人情報の取り扱いに同意してください。";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Placeholder submit — wire to an API route (e.g. /api/contact) later.
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-[1.5rem] border border-line bg-surface p-10 text-center sm:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-7 text-2xl font-semibold text-ink">送信が完了しました</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          お問い合わせいただきありがとうございます。
          <br />
          内容を確認のうえ、担当者より折り返しご連絡いたします。
        </p>
        <button
          onClick={() => {
            setFields(initial);
            setStatus("idle");
          }}
          className="mt-8 inline-flex items-center rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-navy"
        >
          続けて入力する
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-deep";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="会社名 / 団体名" htmlFor="company">
          <input
            id="company"
            className={inputCls}
            value={fields.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="株式会社○○"
          />
        </Field>
        <Field label="お名前" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            className={cn(inputCls, errors.name && "border-red-400")}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="山田 太郎"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="メールアドレス" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            type="email"
            className={cn(inputCls, errors.email && "border-red-400")}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="name@example.com"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="電話番号" htmlFor="tel">
          <input
            id="tel"
            type="tel"
            className={inputCls}
            value={fields.tel}
            onChange={(e) => update("tel", e.target.value)}
            placeholder="050-0000-0000"
          />
        </Field>
      </div>

      <Field label="ご相談内容の種別" htmlFor="category">
        <select
          id="category"
          className={inputCls}
          value={fields.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field label="お問い合わせ内容" htmlFor="message" required error={errors.message}>
        <textarea
          id="message"
          rows={6}
          className={cn(inputCls, "resize-y", errors.message && "border-red-400")}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="現状の課題やご相談内容をご記入ください。"
          aria-invalid={!!errors.message}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-navy)]"
            checked={fields.agree}
            onChange={(e) => update("agree", e.target.checked)}
            aria-invalid={!!errors.agree}
          />
          <span>
            個人情報の取り扱いに同意します。いただいた情報は、お問い合わせへの対応にのみ利用します。
          </span>
        </label>
        {errors.agree && <p className="mt-2 text-xs text-red-500">{errors.agree}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group/btn inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-navy px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            送信中…
          </>
        ) : (
          "この内容で送信する"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="rounded-full bg-deep/10 px-2 py-0.5 text-[0.65rem] font-medium text-deep">
            必須
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
