export interface PlatformInfo {
  introduced: string;
  multiple?: boolean;
  devicechannel?: boolean;
  userchannel?: boolean;
  supervised?: boolean;
  requiresdep?: boolean;
  userapprovedmdm?: boolean;
  allowmanualinstall?: boolean;
  userenrollment?: { mode: string };
  sharedipad?: { mode: string; devicechannel?: boolean; userchannel?: boolean };
}

export interface FieldDefinition {
  type: string;
  required: boolean;
  description: string;
  default: unknown;
  supportedOS: Record<string, unknown> | null;
  values?: unknown[];
  subkeys?: Record<string, FieldDefinition>;
  subtype?: string;
}

export interface PayloadDefinition {
  displayName: string;
  platforms: Record<string, PlatformInfo>;
  fields: Record<string, FieldDefinition>;
}

export type SchemaMap = Record<string, PayloadDefinition>;
