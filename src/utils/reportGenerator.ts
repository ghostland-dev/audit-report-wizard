
import { AuditData } from "@/components/AuditForm";

/**
 * Generates a simple text-based representation of the audit report
 * In a real application, this would use a library like pdfmake or docx
 * to generate actual PDF or Word documents
 */
export const generateReportText = (auditData: AuditData): string => {
  const report = [];
  
  // Title and header information
  report.push(`# ${auditData.title || "Rapport d'audit"}`);
  report.push(`\nClient: ${auditData.client || "Non spécifié"}`);
  
  if (auditData.startDate && auditData.endDate) {
    report.push(`Période: ${auditData.startDate} au ${auditData.endDate}`);
  }
  
  // We'll only add introduction if it exists in the data
  // This is a temporary fix until we update the AuditData type
  if ('introduction' in auditData && (auditData as any).introduction) {
    report.push(`\n## Introduction\n${(auditData as any).introduction}`);
  }
  
  // Scope
  if (auditData.scope) {
    report.push(`\n## Périmètre de l'audit\n${auditData.scope}`);
  }
  
  // Methodology
  if (auditData.methodology) {
    report.push(`\n## Méthodologie\n${auditData.methodology}`);
  }
  
  // Findings
  if (auditData.findings) {
    report.push(`\n## Constatations principales\n${auditData.findings}`);
  }
  
  // Recommendations
  if (auditData.recommendations) {
    report.push(`\n## Recommandations\n${auditData.recommendations}`);
  }
  
  // We'll only add conclusion if it exists in the data
  // This is a temporary fix until we update the AuditData type
  if ('conclusion' in auditData && (auditData as any).conclusion) {
    report.push(`\n## Conclusion\n${(auditData as any).conclusion}`);
  }
  
  return report.join('\n');
};

/**
 * In a real application, this would generate a PDF file using a library like pdfmake
 * For this demo, we'll simulate it by creating a downloadable text file
 */
export const downloadAsPDF = (auditData: AuditData) => {
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
