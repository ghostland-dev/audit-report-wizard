
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
  if ('introduction' in auditData && auditData.introduction) {
    report.push(`\n## Introduction\n${auditData.introduction}`);
  }
  
  // Company presentation
  if ('companyPresentation' in auditData && auditData.companyPresentation) {
    report.push(`\n## Présentation générale de l'entreprise\n${auditData.companyPresentation}`);
  }
  
  // Technical organization state
  if ('technicalState' in auditData && auditData.technicalState) {
    report.push(`\n## État des lieux de l'organisation technique du SI\n${auditData.technicalState}`);
  }
  
  // Audit scope
  if (auditData.scope) {
    report.push(`\n## Périmètre de l'audit\n${auditData.scope}`);
  }
  
  // Data flow analysis
  if ('dataFlowAnalysis' in auditData && auditData.dataFlowAnalysis) {
    report.push(`\n## Analyse des flux de données\n${auditData.dataFlowAnalysis}`);
  }
  
  // Constraints and challenges
  if ('constraints' in auditData && auditData.constraints) {
    report.push(`\n## Contraintes et enjeux\n${auditData.constraints}`);
  }
  
  // Methodology used
  if (auditData.methodology) {
    report.push(`\n## Méthodologie\n${auditData.methodology}`);
  }
  
  // Functional and non-functional requirements
  if ('requirements' in auditData && auditData.requirements) {
    report.push(`\n## Exigences fonctionnelles et non-fonctionnelles\n${auditData.requirements}`);
  }
  
  // Main findings
  if (auditData.findings) {
    report.push(`\n## Constatations principales\n${auditData.findings}`);
  }
  
  // Audit summary
  if ('auditSummary' in auditData && auditData.auditSummary) {
    report.push(`\n## Synthèse de l'audit\n${auditData.auditSummary}`);
  }
  
  // Target architecture design
  if ('targetArchitecture' in auditData && auditData.targetArchitecture) {
    report.push(`\n## Conception de l'architecture cible\n${auditData.targetArchitecture}`);
  }
  
  // Recommendations
  if (auditData.recommendations) {
    report.push(`\n## Recommandations\n${auditData.recommendations}`);
  }
  
  // Validation indicators and monitoring dashboard
  if ('validationIndicators' in auditData && auditData.validationIndicators) {
    report.push(`\n## Indicateurs de validation et dashboard de suivi\n${auditData.validationIndicators}`);
  }
  
  // Strategic advice for decision makers
  if ('strategicAdvice' in auditData && auditData.strategicAdvice) {
    report.push(`\n## Conseils stratégiques pour les décideurs\n${auditData.strategicAdvice}`);
  }
  
  // Bibliography
  if ('bibliography' in auditData && auditData.bibliography) {
    report.push(`\n## Bibliographie / Webographie\n${auditData.bibliography}`);
  }
  
  // Conclusion
  if ('conclusion' in auditData && auditData.conclusion) {
    report.push(`\n## Conclusion générale\n${auditData.conclusion}`);
  }
  
  return report.join('\n');
};

/**
 * Takes an auditData object and returns only the populated fields
 * This is useful for minimizing data size when sharing
 */
export const sanitizeAuditData = (auditData: AuditData): Partial<AuditData> => {
  const sanitized: Partial<AuditData> = {};
  
  Object.entries(auditData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      (sanitized as any)[key] = value;
    }
  });
  
  return sanitized;
};
