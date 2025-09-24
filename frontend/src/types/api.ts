export interface RequestSummary {
  name: string;
  method: string;
  url: string;
  description?: string;
  parameters?: Parameter[];
}

export interface Parameter {
  key: string;
  value: string;
  type: 'query' | 'header' | 'path' | 'body';
  description?: string;
}

export interface ExecuteRequest {
  requestName: string;
  parameters: Record<string, string>;
  environment?: string;
}

export interface ApiResponse {
  statusCode: number;
  headers?: Record<string, string>;
  responseBody: any;
  rawResponse?: string;
  executionTimeMs: number;
  timestamp: string;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  message?: string;
  error?: string;
  collectionName?: string;
  environmentName?: string;
}