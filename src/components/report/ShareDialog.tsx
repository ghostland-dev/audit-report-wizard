
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Copy, Mail, Link, Share2 } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ShareDialogProps {
  open: boolean;
  shareLink: string;
  onOpenChange: (open: boolean) => void;
}

const ShareDialog = ({ open, shareLink, onOpenChange }: ShareDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("link");
  const [email, setEmail] = useState<string>("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      toast({
        title: "Lien copié",
        description: "Le lien de partage a été copié dans le presse-papier."
      });
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien. Veuillez réessayer.",
        variant: "destructive"
      });
    });
  };

  const shareByEmail = () => {
    if (!email) {
      toast({
        title: "Email manquant",
        description: "Veuillez entrer une adresse email.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would connect to an API to send the email
    // Here we'll just simulate it
    toast({
      title: "Rapport partagé",
      description: `Le rapport a été envoyé à ${email} (simulé).`
    });
    setEmail("");
    onOpenChange(false);
  };

  const openShareMenu = () => {
    // This would use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: "Rapport d'audit",
        text: "Consultez ce rapport d'audit",
        url: shareLink,
      }).catch((error) => console.log('Error sharing', error));
      onOpenChange(false);
    } else {
      toast({
        title: "Partage non supporté",
        description: "Votre navigateur ne prend pas en charge cette fonction. Utilisez le lien de partage à la place.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager le rapport</DialogTitle>
          <DialogDescription>
            Choisissez comment vous souhaitez partager ce rapport d'audit.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">
              <Link className="h-4 w-4 mr-2" />
              Lien
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="other">
              <Share2 className="h-4 w-4 mr-2" />
              Autre
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="py-4">
            <div className="flex space-x-2">
              <Input
                value={shareLink}
                readOnly
                className="flex-1"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button variant="secondary" className="shrink-0" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Email du destinataire"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={shareByEmail} className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Envoyer le lien par email
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="py-4">
            <Button onClick={openShareMenu} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Partager via d'autres applications
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Cette option utilise l'API de partage de votre appareil, qui peut inclure les réseaux sociaux, les applications de messagerie, et d'autres méthodes de partage.
            </p>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
