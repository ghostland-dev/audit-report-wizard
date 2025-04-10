
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import { AuditData } from "@/components/AuditForm";

interface ReportContentProps {
  auditData?: Partial<AuditData>;
  loading?: boolean;
}

const ReportContent = ({ auditData, loading = false }: ReportContentProps) => {
  const hasData = auditData && (
    auditData.title || 
    auditData.client || 
    auditData.scope || 
    auditData.findings
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-1/2 mt-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="rounded-full bg-gray-100 p-3">
          <FileText className="h-8 w-8 text-audit-gray-400" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Complétez le formulaire d'audit pour générer un aperçu du rapport
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      {auditData.title && (
        <div>
          <h3 className="font-bold text-lg mb-1">{auditData.title}</h3>
          {auditData.client && (
            <p className="text-muted-foreground">Client: {auditData.client}</p>
          )}
          {auditData.startDate && auditData.endDate && (
            <p className="text-muted-foreground text-xs">
              Période: {auditData.startDate} au {auditData.endDate}
            </p>
          )}
        </div>
      )}

      {auditData.scope && (
        <div>
          <h4 className="font-semibold text-sm">Périmètre</h4>
          <p className="text-muted-foreground text-xs mt-1">{auditData.scope}</p>
        </div>
      )}

      {auditData.methodology && (
        <div>
          <h4 className="font-semibold text-sm">Méthodologie</h4>
          <p className="text-muted-foreground text-xs mt-1">{auditData.methodology}</p>
        </div>
      )}

      {auditData.findings && (
        <div>
          <h4 className="font-semibold text-sm">Constatations</h4>
          <p className="text-muted-foreground text-xs mt-1">{auditData.findings}</p>
        </div>
      )}

      {auditData.recommendations && (
        <div>
          <h4 className="font-semibold text-sm">Recommandations</h4>
          <p className="text-muted-foreground text-xs mt-1">{auditData.recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default ReportContent;
