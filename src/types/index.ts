
export interface ChaffResponse {
  content: string;
  type: 'html' | 'text';
}

export interface Generator {
  pattern: RegExp;
  generator: (path: string) => ChaffResponse;
}
