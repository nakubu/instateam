export interface APIError {
  errors: {
    [key: string]: string[];
  };
  status: number;
}
