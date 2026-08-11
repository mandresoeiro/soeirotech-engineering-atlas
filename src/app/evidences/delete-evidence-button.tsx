"use client";

import { deleteEvidence } from "./actions";

type DeleteEvidenceButtonProps = {
  id: string;
  title: string;
};

export function DeleteEvidenceButton({
  id,
  title,
}: DeleteEvidenceButtonProps) {
  const deleteEvidenceWithId = deleteEvidence.bind(null, id);

  return (
    <form
      action={deleteEvidenceWithId}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Deseja excluir a evidência "${title}"?`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-xl border border-red-900 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-950/30"
      >
        Excluir
      </button>
    </form>
  );
}
