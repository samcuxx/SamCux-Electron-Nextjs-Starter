export interface ElectronAPI {
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  toggleMaximize: () => Promise<boolean>;
  onWindowStateChange: (
    callback: (event: any, data: { isMaximized: boolean }) => void
  ) => () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
