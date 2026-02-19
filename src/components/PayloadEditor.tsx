import type { PayloadDefinition, FieldDefinition } from "@/types/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  payloadKey: string;
  definition: PayloadDefinition;
  values: Record<string, unknown>;
  onChange: (key: string, field: string, value: unknown) => void;
}

const FieldInput = ({
  name,
  field,
  value,
  onValueChange,
}: {
  name: string;
  field: FieldDefinition;
  value: unknown;
  onValueChange: (val: unknown) => void;
}) => {
  // Enum values
  if (field.values && field.values.length > 0 && field.type === "string") {
    return (
      <Select
        value={(value as string) ?? ""}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Seleziona..." />
        </SelectTrigger>
        <SelectContent>
          {field.values.map((v) => (
            <SelectItem key={String(v)} value={String(v)}>
              {String(v)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  switch (field.type) {
    case "boolean":
      return (
        <Switch
          checked={value === true || value === "true"}
          onCheckedChange={onValueChange}
        />
      );
    case "integer":
      return (
        <Input
          type="number"
          step="1"
          value={value !== undefined && value !== null ? String(value) : ""}
          onChange={(e) =>
            onValueChange(e.target.value ? parseInt(e.target.value) : undefined)
          }
          placeholder={field.default !== null ? String(field.default) : ""}
          className="h-9"
        />
      );
    case "real":
      return (
        <Input
          type="number"
          step="any"
          value={value !== undefined && value !== null ? String(value) : ""}
          onChange={(e) =>
            onValueChange(
              e.target.value ? parseFloat(e.target.value) : undefined
            )
          }
          placeholder={field.default !== null ? String(field.default) : ""}
          className="h-9"
        />
      );
    case "string":
      if (name.toLowerCase().includes("description")) {
        return (
          <Textarea
            value={(value as string) ?? ""}
            onChange={(e) => onValueChange(e.target.value || undefined)}
            placeholder={field.default !== null ? String(field.default) : ""}
            className="min-h-[80px] resize-y"
          />
        );
      }
      return (
        <Input
          value={(value as string) ?? ""}
          onChange={(e) => onValueChange(e.target.value || undefined)}
          placeholder={field.default !== null ? String(field.default) : ""}
          className="h-9"
        />
      );
    default:
      return (
        <Input
          value={value !== undefined && value !== null ? String(value) : ""}
          onChange={(e) => onValueChange(e.target.value || undefined)}
          placeholder={`Tipo: ${field.type}`}
          className="h-9"
        />
      );
  }
};

const PayloadEditor = ({ payloadKey, definition, values, onChange }: Props) => {
  const platforms = Object.entries(definition.platforms)
    .filter(([, v]) => v.introduced !== "n/a")
    .map(([k]) => k);

  const fields = Object.entries(definition.fields);

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-2xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            {definition.displayName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground font-mono">
            {payloadKey}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <Badge key={p} variant="secondary" className="text-xs">
                {p}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {fields.map(([name, field]) => (
            <div
              key={name}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Label className="text-sm font-medium font-mono">
                    {name}
                  </Label>
                  {field.required && (
                    <Badge
                      variant="destructive"
                      className="ml-2 text-[10px] px-1.5 py-0"
                    >
                      Richiesto
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {field.type}
                </Badge>
              </div>
              {field.description && (
                <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
                  {field.description.replace(/`/g, "")}
                </p>
              )}
              <FieldInput
                name={name}
                field={field}
                value={values[name]}
                onValueChange={(val) => onChange(payloadKey, name, val)}
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default PayloadEditor;
