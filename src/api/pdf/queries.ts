import { useMutation } from "@tanstack/react-query";
import { postPDFDownload, type PDFDownloadRequest } from "./pdf";

export const useDownloadPDF = () => {
  return useMutation({
    mutationFn: (data: PDFDownloadRequest) => postPDFDownload(data),
    onSuccess: (blob, variables) => {
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;

      const fileName = `${variables.objectName}_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("PDF 다운로드 에러:", error);
      alert("PDF 리포트를 생성하는 중 오류가 발생했습니다.");
    },
  });
};
