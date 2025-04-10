
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
  if (auditData.introduction) {
    report.push(`\n## Introduction\n${auditData.introduction}`);
  }
  
  // Company presentation
  if (auditData.companyPresentation) {
    report.push(`\n## Présentation générale de l'entreprise\n${auditData.companyPresentation}`);
  }
  
  // Technical organization state
  if (auditData.technicalState) {
    report.push(`\n## État des lieux de l'organisation technique du SI\n${auditData.technicalState}`);
  }
  
  // Audit scope
  if (auditData.scope) {
    report.push(`\n## Périmètre de l'audit\n${auditData.scope}`);
  }
  
  // Data flow analysis
  if (auditData.dataFlowAnalysis) {
    report.push(`\n## Analyse des flux de données\n${auditData.dataFlowAnalysis}`);
  }
  
  // Constraints and challenges
  if (auditData.constraints) {
    report.push(`\n## Contraintes et enjeux\n${auditData.constraints}`);
  }
  
  // Methodology used
  if (auditData.methodology) {
    report.push(`\n## Méthodologie\n${auditData.methodology}`);
  }
  
  // Functional and non-functional requirements
  if (auditData.requirements) {
    report.push(`\n## Exigences fonctionnelles et non-fonctionnelles\n${auditData.requirements}`);
  }
  
  // Main findings
  if (auditData.findings) {
    report.push(`\n## Constatations principales\n${auditData.findings}`);
  }
  
  // Audit summary
  if (auditData.auditSummary) {
    report.push(`\n## Synthèse de l'audit\n${auditData.auditSummary}`);
  }
  
  // Target architecture design
  if (auditData.targetArchitecture) {
    report.push(`\n## Conception de l'architecture cible\n${auditData.targetArchitecture}`);
  }
  
  // Recommendations
  if (auditData.recommendations) {
    report.push(`\n## Recommandations\n${auditData.recommendations}`);
  }
  
  // Validation indicators and monitoring dashboard
  if (auditData.validationIndicators) {
    report.push(`\n## Indicateurs de validation et dashboard de suivi\n${auditData.validationIndicators}`);
  }
  
  // Strategic advice for decision makers
  if (auditData.strategicAdvice) {
    report.push(`\n## Conseils stratégiques pour les décideurs\n${auditData.strategicAdvice}`);
  }
  
  // Bibliography
  if (auditData.bibliography) {
    report.push(`\n## Bibliographie / Webographie\n${auditData.bibliography}`);
  }
  
  // Conclusion
  if (auditData.conclusion) {
    report.push(`\n## Conclusion générale\n${auditData.conclusion}`);
  }
  
  return report.join('\n');
};

/**
 * Creates a more formatted PDF structure with styling
 * In a real app, this would generate a proper PDF using a library
 */
export const generateFormattedPDF = (auditData: AuditData): string => {
  // This is a simulated PDF structure with some basic styling instructions
  // In a real app, this would be replaced with actual PDF generation logic
  
  const pdfStructure = `
<!DOCTYPE html>
<html>
<head>
  <title>${auditData.title || "Rapport d'audit"}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #1a56db; text-align: center; margin-bottom: 30px; }
    h2 { color: #1e429f; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    .header-info { color: #4b5563; margin-bottom: 30px; text-align: center; }
    .section { margin-bottom: 20px; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <h1>${auditData.title || "Rapport d'audit"}</h1>
  
  <div class="header-info">
    <p><strong>Client:</strong> ${auditData.client || "Non spécifié"}</p>
    ${auditData.startDate && auditData.endDate ? 
      `<p><strong>Période:</strong> ${auditData.startDate} au ${auditData.endDate}</p>` : ''}
  </div>
  
  ${auditData.introduction ? 
    `<div class="section">
      <h2>Introduction</h2>
      <p>${auditData.introduction}</p>
    </div>` : ''}
  
  ${auditData.companyPresentation ? 
    `<div class="section">
      <h2>Présentation générale de l'entreprise</h2>
      <p>${auditData.companyPresentation}</p>
    </div>` : ''}
  
  ${auditData.technicalState ? 
    `<div class="section">
      <h2>État des lieux de l'organisation technique du SI</h2>
      <p>${auditData.technicalState}</p>
    </div>` : ''}
  
  ${auditData.scope ? 
    `<div class="section">
      <h2>Périmètre de l'audit</h2>
      <p>${auditData.scope}</p>
    </div>` : ''}
  
  ${auditData.dataFlowAnalysis ? 
    `<div class="section">
      <h2>Analyse des flux de données</h2>
      <p>${auditData.dataFlowAnalysis}</p>
    </div>` : ''}
  
  ${auditData.constraints ? 
    `<div class="section">
      <h2>Contraintes et enjeux</h2>
      <p>${auditData.constraints}</p>
    </div>` : ''}
  
  ${auditData.methodology ? 
    `<div class="section">
      <h2>Méthodologie</h2>
      <p>${auditData.methodology}</p>
    </div>` : ''}
  
  ${auditData.requirements ? 
    `<div class="section">
      <h2>Exigences fonctionnelles et non-fonctionnelles</h2>
      <p>${auditData.requirements}</p>
    </div>` : ''}
  
  ${auditData.findings ? 
    `<div class="section">
      <h2>Constatations principales</h2>
      <p>${auditData.findings}</p>
    </div>` : ''}
  
  ${auditData.auditSummary ? 
    `<div class="section">
      <h2>Synthèse de l'audit</h2>
      <p>${auditData.auditSummary}</p>
    </div>` : ''}
  
  ${auditData.targetArchitecture ? 
    `<div class="section">
      <h2>Conception de l'architecture cible</h2>
      <p>${auditData.targetArchitecture}</p>
    </div>` : ''}
  
  ${auditData.recommendations ? 
    `<div class="section">
      <h2>Recommandations</h2>
      <p>${auditData.recommendations}</p>
    </div>` : ''}
  
  ${auditData.validationIndicators ? 
    `<div class="section">
      <h2>Indicateurs de validation et dashboard de suivi</h2>
      <p>${auditData.validationIndicators}</p>
    </div>` : ''}
  
  ${auditData.strategicAdvice ? 
    `<div class="section">
      <h2>Conseils stratégiques pour les décideurs</h2>
      <p>${auditData.strategicAdvice}</p>
    </div>` : ''}
  
  ${auditData.bibliography ? 
    `<div class="section">
      <h2>Bibliographie / Webographie</h2>
      <p>${auditData.bibliography}</p>
    </div>` : ''}
  
  ${auditData.conclusion ? 
    `<div class="section">
      <h2>Conclusion générale</h2>
      <p>${auditData.conclusion}</p>
    </div>` : ''}
  
  <div class="footer">
    <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
  </div>
</body>
</html>
  `;
  
  return pdfStructure;
};

/**
 * In a real application, this would generate a PDF file using a library like pdfmake
 * For this demo, we'll simulate it by creating a downloadable HTML file styled to look like a PDF
 */
export const downloadAsPDF = (auditData: AuditData) => {
  const htmlContent = generateFormattedPDF(auditData);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `${auditData.title || 'rapport-audit'}.html`;
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
