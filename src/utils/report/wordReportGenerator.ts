
import { AuditData } from "@/components/AuditForm";
import { generateReportText } from "./reportGeneratorBase";

/**
 * In a real application, this would generate a Word document using a library like docx
 * For this demo, we'll simulate it by creating a downloadable text file
 */
export const downloadAsWord = (auditData: AuditData) => {
  const reportText = generateReportText(auditData);
  const blob = new Blob([reportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `${auditData.title || 'rapport-audit'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
