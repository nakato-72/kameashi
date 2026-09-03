type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
};

export function GuideToggle({ checked, onChange, label }: Props) {
  return (
    <label className="guide-toggle">
      <span className="guide-toggle-label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label="構図ガイド"
        className={`switch ${checked ? "is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-thumb" />
      </button>
    </label>
  );
}
