import { evidenceTypeLabels, evidenceTypes } from "@/lib/evidence-types";

type EvidenceSourceFieldsProps = {
  type?: (typeof evidenceTypes)[number];
  url?: string | null;
};

export function EvidenceSourceFields({ type = "OTHER", url }: EvidenceSourceFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="type" className="mb-2 block text-sm font-medium">
          Tipo de evidência
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue={type}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
        >
          {evidenceTypes.map((value) => (
            <option key={value} value={value}>
              {evidenceTypeLabels[value]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="url" className="mb-2 block text-sm font-medium">
          Link da fonte (opcional)
        </label>
        <input
          id="url"
          name="url"
          type="url"
          maxLength={2048}
          defaultValue={url ?? ""}
          placeholder="https://github.com/usuario/projeto/commit/..."
          aria-describedby="source-help"
          className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 outline-none focus:border-blue-500"
        />
        <p id="source-help" className="mt-2 text-sm leading-6 text-slate-400">
          Aponte para um commit, teste, documento ou entrega. Cadastrar o link não confirma seu
          conteúdo. Sem link, o registro permanece sem fonte vinculada.
        </p>
      </div>
    </>
  );
}
