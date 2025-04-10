
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditData } from "@/components/AuditForm";

interface ReportPreviewProps {
  auditData?: Partial<AuditData>;
  loading?: boolean;
}

const ReportPreview = ({ auditData, loading = false }: ReportPreviewProps) => {
  const hasData = auditData && (
    auditData.title || 
    auditData.client || 
    auditData.scope || 
    auditData.findings
  );

  const renderContent = () => {
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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-audit-blue-600" />
          Aperçu du rapport
        </CardTitle>
      </CardHeader>
      <CardContent className="border-t border-b p-4 min-h-[300px] bg-gray-50 overflow-auto">
        {renderContent()}
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          disabled={!hasData} 
          variant="outline" 
          className="w-full gap-2"
        >
          <Download className="h-4 w-4" />
          Télécharger le rapport
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportPreview;
