
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ReportPreview = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-audit-blue-600" />
          Aperçu du rapport
        </CardTitle>
      </CardHeader>
      <CardContent className="border-t border-b p-4 min-h-[300px] bg-gray-50">
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
      </CardContent>
      <CardFooter className="p-4">
        <Button disabled variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Télécharger le rapport
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportPreview;
