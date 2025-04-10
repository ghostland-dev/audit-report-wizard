
import { FileText, Download, FileX, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditData } from "@/components/AuditForm";
import { downloadAsPDF, downloadAsWord, generateShareableLink, printReport } from "@/utils/reportGenerator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      toast({
        title: "Lien copié",
        description: "Le lien de partage a été copié dans le presse-papier."
      });
      setShareDialogOpen(false);
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien. Veuillez réessayer.",
        variant: "destructive"
      });
    });
  };

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
      <CardFooter className="p-4 flex flex-col sm:flex-row gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              disabled={!hasData} 
              variant="outline" 
              className="w-full sm:w-auto gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              <FileText className="h-4 w-4 mr-2" />
              Exporter en PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('word')}>
              <FileX className="h-4 w-4 mr-2" />
              Exporter en Word
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Style du rapport</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={reportTheme} onValueChange={(value) => setReportTheme(value as 'standard' | 'modern' | 'minimal')}>
              <DropdownMenuRadioItem value="standard">Standard</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="modern">Moderne</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="minimal">Minimaliste</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
        
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Partager le rapport</DialogTitle>
              <DialogDescription>
                Utilisez ce lien pour partager le rapport avec d'autres personnes.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={shareLink}
                readOnly
                className="w-full"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={copyToClipboard}>
                Copier le lien
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ReportPreview;
