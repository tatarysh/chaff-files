export interface ChaffResponse {
  content: string;
  type: 'html' | 'text' | 'text/plain';
}

export interface Generator {
  pattern: RegExp;
  generator: (path: string) => ChaffResponse;
}
