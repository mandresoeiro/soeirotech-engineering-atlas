"use client";

import { archiveProject } from "./actions";

type ArchiveProjectButtonProps = {
  id: string;
  name: string;
};

export function ArchiveProjectButton({
  id,
  name,
}: ArchiveProjectButtonProps) {
  const archiveProjectWithId = archiveProject.bind(null, id);

  return (
    <form
      action={archiveProjectWithId}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Deseja arquivar o projeto "${name}"?`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-xl border border-amber-800 px-4 py-2 text-sm text-amber-400"
      >
        Arquivar
      </button>
    </form>
  );
}
