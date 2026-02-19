import { useState } from "react";
import type { SchemaMap } from "@/types/schema";
import SchemaUploader from "@/components/SchemaUploader";
import ConfiguratorApp from "@/components/ConfiguratorApp";

const Index = () => {
  const [schema, setSchema] = useState<SchemaMap | null>(null);
  const [fileName, setFileName] = useState("");

  const handleSchemaLoaded = (data: unknown, name: string) => {
    setSchema(data as SchemaMap);
    setFileName(name);
  };

  if (!schema) {
    return <SchemaUploader onSchemaLoaded={handleSchemaLoaded} />;
  }

  return (
    <ConfiguratorApp
      schema={schema}
      fileName={fileName}
      onReset={() => {
        setSchema(null);
        setFileName("");
      }}
    />
  );
};

export default Index;
