export type LogoStyle = 'NoStyle' | 'Monogram' | 'Abstract' | 'Mascot';

export type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error';

export interface LogoRequest {
  id?: string;
  prompt: string;
  style: LogoStyle;
  status: ProcessingStatus;
  createdAt: number;
  updatedAt: number;
}

export interface LogoResult {
  id: string;
  requestId: string;
  imageUrl: string;
  createdAt: number;
}

export type RootStackParamList = {
  Input: undefined;
  Output: { logoId: string };
};