import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface Props {
  value: string;
  canEdit: boolean;
  multiline?: boolean;
  onSave: (next: string) => Promise<void> | void;
  className?: string;
  placeholder?: string;
}

export function EditableText({ value, canEdit, multiline, onSave, className, placeholder }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);

  if (!editing) {
    return (
      <div className={`group inline-flex items-start gap-2 ${className ?? ""}`}>
        <span className="whitespace-pre-wrap">{value || <span className="text-muted-foreground">{placeholder}</span>}</span>
        {canEdit && (
          <button
            onClick={() => {
              setDraft(value);
              setEditing(true);
            }}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4 text-primary" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {multiline ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          className="w-full border border-border bg-secondary p-3 font-sans text-sm focus:border-primary focus:outline-none"
        />
      ) : (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full border border-border bg-secondary p-2 font-sans text-sm focus:border-primary focus:outline-none"
        />
      )}
      <div className="flex gap-2">
        <button
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            await onSave(draft);
            setSaving(false);
            setEditing(false);
          }}
          className="flex items-center gap-1 border border-primary bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground disabled:opacity-50"
        >
          <Check className="h-3 w-3" /> Save
        </button>
        <button
          onClick={() => setEditing(false)}
          className="flex items-center gap-1 border border-border px-3 py-1 text-xs"
        >
          <X className="h-3 w-3" /> Cancel
        </button>
      </div>
    </div>
  );
}
