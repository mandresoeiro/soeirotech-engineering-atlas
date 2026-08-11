"use client";

import { deleteSkill } from "./actions";

type DeleteSkillButtonProps = {
  id: string;
  name: string;
};

export function DeleteSkillButton({
  id,
  name,
}: DeleteSkillButtonProps) {
  const deleteSkillWithId = deleteSkill.bind(null, id);

  return (
    <form
      action={deleteSkillWithId}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Deseja excluir a skill "${name}"?`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-xl border border-red-900 px-4 py-2 text-sm font-medium text-red-400"
      >
        Excluir
      </button>
    </form>
  );
}
