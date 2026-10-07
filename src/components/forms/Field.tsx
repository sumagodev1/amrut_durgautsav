import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Form field primitives.
 *
 * Every control is wired to its label and, when invalid, to its error message
 * through `aria-describedby` + `aria-invalid`, so a screen reader announces
 * the problem with the field rather than leaving it stranded on screen.
 * Errors also carry a visible marker, never colour alone.
 */

const CONTROL =
  "w-full rounded-[2px] border bg-[var(--surface)] px-4 py-3 text-base " +
  "text-[var(--foreground)] placeholder:text-[var(--muted)] " +
  "transition-colors duration-300 outline-none " +
  "focus-visible:border-[var(--accent)] " +
  "aria-[invalid=true]:border-[var(--danger)]";

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="text-[0.9375rem] font-semibold text-[var(--foreground)]">
        {label}
        {optional && (
          <span className="ml-2 font-normal text-[var(--muted)]">({optional})</span>
        )}
      </label>

      <div className="mt-2">{children}</div>

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-[var(--muted)]">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-sm text-[var(--danger)]"
        >
          <span aria-hidden>▲</span>
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  id,
  name,
  error,
  hint,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  error?: string;
  hint?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className={cn(CONTROL, "border-[var(--border)]")}
      {...rest}
    />
  );
}

export function SelectInput({
  id,
  name,
  error,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  name: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(CONTROL, "appearance-none border-[var(--border)] pr-10")}
        {...rest}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--muted)]"
      >
        ▾
      </span>
    </div>
  );
}

export function CheckboxInput({
  id,
  name,
  error,
  children,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--primary)]"
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-[var(--danger)]">
          <span aria-hidden>▲</span>
          {error}
        </p>
      )}
    </div>
  );
}
