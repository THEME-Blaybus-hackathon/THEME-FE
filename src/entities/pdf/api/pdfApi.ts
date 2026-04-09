import axiosInstance from '@/shared/api/axiosInstance';

export interface PDFDownloadRequest {
  title: string;
  sessionId: string;
  objectName: string;
  quizId: string;
  partName: string;
}

export const postPDFDownload = async (
  data: PDFDownloadRequest,
): Promise<Blob> => {
  const response = await axiosInstance.post('/api/pdf/download', data, {
    responseType: 'blob',
    timeout: 60000,
  });

  return response.data;
};
