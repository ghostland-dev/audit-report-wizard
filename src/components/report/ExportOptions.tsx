
import React from "react";
import { Download, FileText, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface ExportOptionsProps {
  disabled: boolean;
  reportTheme: 'standard' | 'modern' | 'minimal';
  onExport: (format: 'pdf' | 'word') => void;
  onThemeChange: (theme: 'standard' | 'modern' | 'minimal') => void;
}

const ExportOptions = ({ 
  disabled, 
  reportTheme, 
  onExport, 
  onThemeChange 
}: ExportOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          disabled={disabled} 
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
        <DropdownMenuItem onClick={() => onExport('pdf')}>
          <FileText className="h-4 w-4 mr-2" />
          Exporter en PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('word')}>
          <FileX className="h-4 w-4 mr-2" />
          Exporter en Word
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Style du rapport</DropdownMenuLabel>
        <DropdownMenuRadioGroup 
          value={reportTheme} 
          onValueChange={(value) => onThemeChange(value as 'standard' | 'modern' | 'minimal')}
        >
          <DropdownMenuRadioItem value="standard">Standard</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="modern">Moderne</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="minimal">Minimaliste</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
