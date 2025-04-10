
import React from "react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShareDialogProps {
  open: boolean;
  shareLink: string;
  onOpenChange: (open: boolean) => void;
}

const ShareDialog = ({ open, shareLink, onOpenChange }: ShareDialogProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      toast({
        title: "Lien copié",
        description: "Le lien de partage a été copié dans le presse-papier."
      });
      onOpenChange(false);
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien. Veuillez réessayer.",
        variant: "destructive"
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={copyToClipboard}>
            Copier le lien
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
