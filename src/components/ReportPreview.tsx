
import React, { useState } from "react";
import { FileText, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditData } from "@/components/AuditForm";
import { useToast } from "@/hooks/use-toast";
import { downloadAsPDF, downloadAsWord, generateShareableLink, printReport } from "@/utils/reportGenerator";
import ReportContent from "@/components/report/ReportContent";
import ExportOptions from "@/components/report/ExportOptions";
import ShareDialog from "@/components/report/ShareDialog";

interface ReportPreviewProps {
  auditData?: Partial<AuditData>;
  loading?: boolean;
}

const ReportPreview = ({ auditData, loading = false }: ReportPreviewProps) => {
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [reportTheme, setReportTheme] = useState<'standard' | 'modern' | 'minimal'>('standard');
  
  const hasData = auditData && (
    auditData.title || 
    auditData.client || 
    auditData.scope || 
    auditData.findings
  );

  const handleExport = (format: 'pdf' | 'word') => {
    if (!auditData) {
      toast({
        title: "Impossible d'exporter",
        description: "Veuillez d'abord compléter les informations de l'audit.",
        variant: "destructive"
      });
      return;
    }
    
    if (format === 'pdf') {
      downloadAsPDF(auditData as AuditData, reportTheme);
      toast({
        title: "Rapport téléchargé",
        description: `Le rapport a été téléchargé au format PDF (simulé) avec le thème ${reportTheme}.`
      });
    } else {
      downloadAsWord(auditData as AuditData);
      toast({
        title: "Rapport téléchargé",
        description: "Le rapport a été téléchargé au format Word (simulé)."
      });
    }
  };
  
  const handlePrint = () => {
    if (!auditData) {
      toast({
        title: "Impossible d'imprimer",
        description: "Veuillez d'abord compléter les informations de l'audit.",
        variant: "destructive"
      });
      return;
    }
    
    printReport(auditData as AuditData, reportTheme);
    toast({
      title: "Impression lancée",
      description: "La fenêtre d'impression a été ouverte."
    });
  };
  
  const handleShare = () => {
    if (!auditData) {
      toast({
        title: "Impossible de partager",
        description: "Veuillez d'abord compléter les informations de l'audit.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a shareable link
    const link = generateShareableLink(auditData as AuditData);
    setShareLink(link);
    setShareDialogOpen(true);
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
        <ReportContent auditData={auditData} loading={loading} />
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row gap-2">
        <ExportOptions 
          disabled={!hasData}
          reportTheme={reportTheme}
          onExport={handleExport}
          onThemeChange={setReportTheme}
        />
        
        <Button 
          disabled={!hasData} 
          variant="outline" 
          onClick={handlePrint}
          className="w-full sm:w-auto gap-2"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
        
        <Button 
          disabled={!hasData} 
          variant="ghost" 
          onClick={handleShare}
          className="w-full sm:w-auto gap-2"
        >
          <Share2 className="h-4 w-4" />
          Partager
        </Button>
        
        <ShareDialog 
          open={shareDialogOpen} 
          shareLink={shareLink}
          onOpenChange={setShareDialogOpen}
        />
      </CardFooter>
    </Card>
  );
};

export default ReportPreview;
