export interface Options {
  test?: string | string[] | RegExp
  beforeReload?: (e?: PromiseRejectionEvent) => boolean | Promise<boolean>
}
export declare const useVersionCheck: (options: Options) => {
  run: (state: { back: string }) => void
  listener: () => void
}
