
import { AuditData } from "@/components/AuditForm";

/**
 * In a real application, this would generate and share a link to the report
 * For this demo, we'll just return a dummy link
 */
export const generateShareableLink = (auditData: AuditData): string => {
  // In a real application, this would create a unique link to the report
  const auditId = auditData.id || Math.floor(Math.random() * 10000);
  return `https://rapport-audit.example.com/share/${auditId}`;
};
