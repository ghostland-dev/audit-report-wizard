
import { AuditData } from "@/components/AuditForm";

interface ShareOptions {
  isProtected?: boolean;
  password?: string;
  expiresInDays?: number;
}

/**
 * In a real application, this would generate and share a link to the report
 * For this demo, we'll just return a dummy link
 */
export const generateShareableLink = (auditData: AuditData, options?: ShareOptions): string => {
  // In a real application, this would create a unique link to the report
  // and potentially store password protection details in a database
  const auditId = auditData.id || Math.floor(Math.random() * 10000);
  let shareUrl = `https://rapport-audit.example.com/share/${auditId}`;
  
  // In a real app, we'd handle password protection server-side
  // For this demo, we'll just simulate it by adding a query parameter
  if (options?.isProtected && options.password) {
    // In a real app, we would NEVER include the actual password in the URL
    // This is just for demonstration purposes
    shareUrl += '?protected=true';
  }
  
  // Add expiration if provided
  if (options?.expiresInDays) {
    const expires = new Date();
    expires.setDate(expires.getDate() + options.expiresInDays);
    shareUrl += `${shareUrl.includes('?') ? '&' : '?'}expires=${expires.toISOString()}`;
  }
  
  return shareUrl;
};

/**
 * Validates if a shared link is still valid (not expired)
 * In a real app, this would check against a database
 */
export const validateShareableLink = (shareLink: string): boolean => {
  // In a real application, this would validate the link against a database
  // For this demo, we'll just check if it contains 'share' in the URL
  return shareLink.includes('share');
};

/**
 * In a real app, this would verify the password against a database
 * For this demo, we'll just simulate it
 */
export const verifySharePassword = (shareLink: string, password: string): boolean => {
  // In a real application, this would verify the password against a database
  // For this demo, we'll just return true if the password is not empty
  return password.length > 0;
};

/**
 * Generate a QR code for a shared report
 * In a real app, this would use a QR code generation library
 */
export const generateQrCodeForShare = (shareLink: string): string => {
  // In a real application, this would generate a QR code using a library
  // For this demo, we'll just return a placeholder URL
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareLink)}`;
};
