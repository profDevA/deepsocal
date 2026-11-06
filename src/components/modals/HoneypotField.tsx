import { HONEYPOT_FIELD } from "@/lib/form-validation";

// Off-screen input that people never see, tab to, or hear (aria-hidden).
// Form-filling bots tend to complete it; the API then drops the submission.
// See src/lib/form-validation.ts.
export default function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <label>
        Website
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
