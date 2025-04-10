
import { AuditData } from "@/components/AuditForm";

/**
 * Creates a more formatted PDF structure with styling
 * In a real app, this would generate a proper PDF using a library
 */
export const generateFormattedPDF = (auditData: AuditData, theme: 'standard' | 'modern' | 'minimal' = 'standard'): string => {
  // Choose style based on theme
  let styleContent = '';
  
  switch(theme) {
    case 'modern':
      styleContent = `
        body { font-family: 'Segoe UI', Roboto, sans-serif; margin: 40px; color: #333; }
        h1 { color: #2563eb; text-align: center; margin-bottom: 30px; font-weight: 300; }
        h2 { color: #3b82f6; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-weight: 400; }
        .header-info { color: #6b7280; margin-bottom: 30px; text-align: center; }
        .section { margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; }
      `;
      break;
    case 'minimal':
      styleContent = `
        body { font-family: 'Arial', sans-serif; margin: 40px; color: #333; line-height: 1.6; }
        h1 { color: #000; text-align: center; margin-bottom: 30px; font-weight: normal; letter-spacing: 1px; }
        h2 { color: #000; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 8px; font-weight: normal; }
        .header-info { color: #666; margin-bottom: 30px; text-align: center; }
        .section { margin-bottom: 20px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; }
      `;
      break;
    default: // standard
      styleContent = `
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1a56db; text-align: center; margin-bottom: 30px; }
        h2 { color: #1e429f; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
        .header-info { color: #4b5563; margin-bottom: 30px; text-align: center; }
        .section { margin-bottom: 20px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #6b7280; }
      `;
  }
  
  const pdfStructure = `
<!DOCTYPE html>
<html>
<head>
  <title>${auditData.title || "Rapport d'audit"}</title>
  <style>
    ${styleContent}
    @page { size: A4; margin: 2cm; }
    @media print {
      .page-break { page-break-before: always; }
    }
  </style>
</head>
<body>
  <h1>${auditData.title || "Rapport d'audit"}</h1>
  
  <div class="header-info">
    <p><strong>Client:</strong> ${auditData.client || "Non spécifié"}</p>
    ${auditData.startDate && auditData.endDate ? 
      `<p><strong>Période:</strong> ${auditData.startDate} au ${auditData.endDate}</p>` : ''}
    <p><strong>Date du rapport:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
  </div>
  
  <div class="table-of-contents">
    <h2>Table des matières</h2>
    <ul>
      ${('introduction' in auditData && auditData.introduction) ? '<li>Introduction</li>' : ''}
      ${('companyPresentation' in auditData && auditData.companyPresentation) ? '<li>Présentation générale de l\'entreprise</li>' : ''}
      ${('technicalState' in auditData && auditData.technicalState) ? '<li>État des lieux de l\'organisation technique du SI</li>' : ''}
      ${auditData.scope ? '<li>Périmètre de l\'audit</li>' : ''}
      ${('dataFlowAnalysis' in auditData && auditData.dataFlowAnalysis) ? '<li>Analyse des flux de données</li>' : ''}
      ${('constraints' in auditData && auditData.constraints) ? '<li>Contraintes et enjeux</li>' : ''}
      ${auditData.methodology ? '<li>Méthodologie</li>' : ''}
      ${('requirements' in auditData && auditData.requirements) ? '<li>Exigences fonctionnelles et non-fonctionnelles</li>' : ''}
      ${auditData.findings ? '<li>Constatations principales</li>' : ''}
      ${('auditSummary' in auditData && auditData.auditSummary) ? '<li>Synthèse de l\'audit</li>' : ''}
      ${('targetArchitecture' in auditData && auditData.targetArchitecture) ? '<li>Conception de l\'architecture cible</li>' : ''}
      ${auditData.recommendations ? '<li>Recommandations</li>' : ''}
      ${('validationIndicators' in auditData && auditData.validationIndicators) ? '<li>Indicateurs de validation et dashboard de suivi</li>' : ''}
      ${('strategicAdvice' in auditData && auditData.strategicAdvice) ? '<li>Conseils stratégiques pour les décideurs</li>' : ''}
      ${('bibliography' in auditData && auditData.bibliography) ? '<li>Bibliographie / Webographie</li>' : ''}
      ${('conclusion' in auditData && auditData.conclusion) ? '<li>Conclusion générale</li>' : ''}
    </ul>
  </div>

  <div class="page-break"></div>
  
  ${'introduction' in auditData && auditData.introduction ? 
    `<div class="section">
      <h2>Introduction</h2>
      <p>${auditData.introduction}</p>
    </div>` : ''}
  
  ${'companyPresentation' in auditData && auditData.companyPresentation ? 
    `<div class="section">
      <h2>Présentation générale de l'entreprise</h2>
      <p>${auditData.companyPresentation}</p>
    </div>` : ''}
  
  ${'technicalState' in auditData && auditData.technicalState ? 
    `<div class="section">
      <h2>État des lieux de l'organisation technique du SI</h2>
      <p>${auditData.technicalState}</p>
    </div>` : ''}
  
  ${auditData.scope ? 
    `<div class="section">
      <h2>Périmètre de l'audit</h2>
      <p>${auditData.scope}</p>
    </div>` : ''}
  
  ${'dataFlowAnalysis' in auditData && auditData.dataFlowAnalysis ? 
    `<div class="section">
      <h2>Analyse des flux de données</h2>
      <p>${auditData.dataFlowAnalysis}</p>
    </div>` : ''}
  
  ${'constraints' in auditData && auditData.constraints ? 
    `<div class="section">
      <h2>Contraintes et enjeux</h2>
      <p>${auditData.constraints}</p>
    </div>` : ''}
  
  ${auditData.methodology ? 
    `<div class="section">
      <h2>Méthodologie</h2>
      <p>${auditData.methodology}</p>
    </div>` : ''}
  
  ${'requirements' in auditData && auditData.requirements ? 
    `<div class="section">
      <h2>Exigences fonctionnelles et non-fonctionnelles</h2>
      <p>${auditData.requirements}</p>
    </div>` : ''}
  
  ${auditData.findings ? 
    `<div class="section">
      <h2>Constatations principales</h2>
      <p>${auditData.findings}</p>
    </div>` : ''}
  
  ${'auditSummary' in auditData && auditData.auditSummary ? 
    `<div class="section">
      <h2>Synthèse de l'audit</h2>
      <p>${auditData.auditSummary}</p>
    </div>` : ''}
  
  ${'targetArchitecture' in auditData && auditData.targetArchitecture ? 
    `<div class="section">
      <h2>Conception de l'architecture cible</h2>
      <p>${auditData.targetArchitecture}</p>
    </div>` : ''}
  
  ${auditData.recommendations ? 
    `<div class="section">
      <h2>Recommandations</h2>
      <p>${auditData.recommendations}</p>
    </div>` : ''}
  
  ${'validationIndicators' in auditData && auditData.validationIndicators ? 
    `<div class="section">
      <h2>Indicateurs de validation et dashboard de suivi</h2>
      <p>${auditData.validationIndicators}</p>
    </div>` : ''}
  
  ${'strategicAdvice' in auditData && auditData.strategicAdvice ? 
    `<div class="section">
      <h2>Conseils stratégiques pour les décideurs</h2>
      <p>${auditData.strategicAdvice}</p>
    </div>` : ''}
  
  ${'bibliography' in auditData && auditData.bibliography ? 
    `<div class="section">
      <h2>Bibliographie / Webographie</h2>
      <p>${auditData.bibliography}</p>
    </div>` : ''}
  
  ${'conclusion' in auditData && auditData.conclusion ? 
    `<div class="section">
      <h2>Conclusion générale</h2>
      <p>${auditData.conclusion}</p>
    </div>` : ''}
  
  <div class="footer">
    <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} | ${auditData.client || "Client"} - ${auditData.title || "Rapport d'audit"}</p>
  </div>
</body>
</html>
  `;
  
  return pdfStructure;
};

/**
 * Generates a printable version of the report
 */
export const printReport = (auditData: AuditData, theme: 'standard' | 'modern' | 'minimal' = 'standard') => {
  const htmlContent = generateFormattedPDF(auditData, theme);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for resources to load before printing
    printWindow.onload = () => {
      printWindow.print();
      // Don't close the window after printing so user can see the preview
    };
  }
};

/**
 * In a real application, this would generate a PDF file using a library like pdfmake
 * For this demo, we'll simulate it by creating a downloadable HTML file styled to look like a PDF
 */
export const downloadAsPDF = (auditData: AuditData, theme: 'standard' | 'modern' | 'minimal' = 'standard') => {
  const htmlContent = generateFormattedPDF(auditData, theme);
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
