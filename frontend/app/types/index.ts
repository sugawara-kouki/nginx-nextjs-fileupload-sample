export interface UploadResponse {
  success: boolean;
  imageUrl: string;
  filename: string;
  size: number;
  error?: string;
}

export interface ImageInfo {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}