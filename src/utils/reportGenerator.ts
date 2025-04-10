
import { AuditData } from "@/components/AuditForm";

/**
 * Generates a structured text-based representation of the audit report
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
  
  // Introduction section
  if ('introduction' in auditData && (auditData as any).introduction) {
    report.push(`\n## Introduction\n${(auditData as any).introduction}`);
  }
  
  // Company presentation
  if ('companyPresentation' in auditData && (auditData as any).companyPresentation) {
    report.push(`\n## Présentation générale de l'entreprise\n${(auditData as any).companyPresentation}`);
  }
  
  // Technical organization state
  if ('technicalState' in auditData && (auditData as any).technicalState) {
    report.push(`\n## État des lieux de l'organisation technique du SI\n${(auditData as any).technicalState}`);
  }
  
  // Audit scope
  if (auditData.scope) {
    report.push(`\n## Périmètre de l'audit\n${auditData.scope}`);
  }
  
  // Data flow analysis
  if ('dataFlowAnalysis' in auditData && (auditData as any).dataFlowAnalysis) {
    report.push(`\n## Analyse des flux de données\n${(auditData as any).dataFlowAnalysis}`);
  }
  
  // Constraints and challenges
  if ('constraints' in auditData && (auditData as any).constraints) {
    report.push(`\n## Contraintes et enjeux\n${(auditData as any).constraints}`);
  }
  
  // Methodology used
  if (auditData.methodology) {
    report.push(`\n## Méthodologie\n${auditData.methodology}`);
  }
  
  // Functional and non-functional requirements
  if ('requirements' in auditData && (auditData as any).requirements) {
    report.push(`\n## Exigences fonctionnelles et non-fonctionnelles\n${(auditData as any).requirements}`);
  }
  
  // Main findings
  if (auditData.findings) {
    report.push(`\n## Constatations principales\n${auditData.findings}`);
  }
  
  // Audit summary
  if ('auditSummary' in auditData && (auditData as any).auditSummary) {
    report.push(`\n## Synthèse de l'audit\n${(auditData as any).auditSummary}`);
  }
  
  // Target architecture design
  if ('targetArchitecture' in auditData && (auditData as any).targetArchitecture) {
    report.push(`\n## Conception de l'architecture cible\n${(auditData as any).targetArchitecture}`);
  }
  
  // Recommendations
  if (auditData.recommendations) {
    report.push(`\n## Recommandations\n${auditData.recommendations}`);
  }
  
  // Validation indicators and monitoring dashboard
  if ('validationIndicators' in auditData && (auditData as any).validationIndicators) {
    report.push(`\n## Indicateurs de validation et dashboard de suivi\n${(auditData as any).validationIndicators}`);
  }
  
  // Strategic advice for decision makers
  if ('strategicAdvice' in auditData && (auditData as any).strategicAdvice) {
    report.push(`\n## Conseils stratégiques pour les décideurs\n${(auditData as any).strategicAdvice}`);
  }
  
  // Bibliography
  if ('bibliography' in auditData && (auditData as any).bibliography) {
    report.push(`\n## Bibliographie / Webographie\n${(auditData as any).bibliography}`);
  }
  
  // Conclusion
  if ('conclusion' in auditData && (auditData as any).conclusion) {
    report.push(`\n## Conclusion générale\n${(auditData as any).conclusion}`);
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

/**
 * In a real application, this would generate and share a link to the report
 * For this demo, we'll just return a dummy link
 */
export const generateShareableLink = (auditData: AuditData): string => {
  // In a real application, this would create a unique link to the report
  const auditId = auditData.id || Math.floor(Math.random() * 10000);
  return `https://rapport-audit.example.com/share/${auditId}`;
};
