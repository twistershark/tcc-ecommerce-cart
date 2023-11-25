export interface HttpClientInterface<T> {
  get(pathname: string): Promise<T | T[]>;
}
