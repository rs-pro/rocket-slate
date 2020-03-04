export type FileData = {
  url: string;
  id?: string | number;
  name?: string;
  size?: number;
};

export type HandlerInsertFile = (
  file: File,
  onComplete: (uploadedFile: FileData) => void,
  onError: () => void,
  onProgress?: (progress: number) => void,
) => void;
