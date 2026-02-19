import { useCallback } from "react";
import { Upload, FileJson } from "lucide-react";

interface Props {
  onSchemaLoaded: (schema: unknown, fileName: string) => void;
}

const SchemaUploader = ({ onSchemaLoaded }: Props) => {
  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          onSchemaLoaded(json, file.name);
        } catch {
          alert("File JSON non valido.");
        }
      };
      reader.readAsText(file);
    },
    [onSchemaLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <FileJson className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Profile Configurator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Carica uno schema JSON per iniziare a configurare i profili MDM
          </p>
        </div>

        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="group flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-card p-12 transition-all hover:border-primary/50 hover:bg-primary/5"
        >
          <Upload className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
          <div>
            <p className="font-medium">
              Trascina il file JSON qui
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              oppure clicca per selezionare
            </p>
          </div>
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default SchemaUploader;
