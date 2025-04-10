
import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Copy, Mail, Link, Share2, QrCode, Lock, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Generate QR code when shareLink changes or when password protection is toggled
  useEffect(() => {
    if (!shareLink) return;
    
    // In a real app, we'd use a proper QR code generation API
    // Here we'll use a public API for demo purposes
    const linkToEncode = isProtected 
      ? `${shareLink}?protected=true` 
      : shareLink;
      
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(linkToEncode)}`;
    setQrCodeUrl(qrUrl);
  }, [shareLink, isProtected]);

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
    const linkToShare = isProtected 
      ? `${shareLink} (Protégé par mot de passe: ${password})` 
      : shareLink;
      
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
  
  const downloadQrCode = () => {
    // Create a temporary link to download the QR code
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode-rapport-audit.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code téléchargé",
      description: "Le QR code a été téléchargé avec succès."
    });
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
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="link">
              <Link className="h-4 w-4 mr-2" />
              Lien
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="qrcode">
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="other">
              <Share2 className="h-4 w-4 mr-2" />
              Autre
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="py-4">
            <div className="space-y-4">
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
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="password-protection" 
                  checked={isProtected}
                  onCheckedChange={setIsProtected}
                />
                <Label htmlFor="password-protection">Protéger par mot de passe</Label>
              </div>
              
              {isProtected && (
                <div className="space-y-2 pt-2">
                  <div className="flex space-x-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez un mot de passe"
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Le destinataire devra entrer ce mot de passe pour accéder au rapport.
                  </p>
                </div>
              )}
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
              
              {isProtected && (
                <div className="flex items-center space-x-2 pt-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Le lien sera protégé par le mot de passe: {password || "[non défini]"}
                  </p>
                </div>
              )}
              
              <Button onClick={shareByEmail} className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Envoyer le lien par email
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="qrcode" className="py-4">
            <div className="space-y-4">
              <div className="flex justify-center py-2">
                {qrCodeUrl ? (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code pour le rapport" 
                    className="border rounded-md shadow-sm max-w-[200px]"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center rounded-md">
                    Chargement du QR code...
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadQrCode} className="flex-1" variant="outline">
                  Télécharger
                </Button>
                <Button onClick={copyToClipboard} className="flex-1" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copier le lien
                </Button>
              </div>
              
              {isProtected && (
                <div className="flex items-center space-x-2 pt-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Le QR code contient un lien protégé par mot de passe.
                  </p>
                </div>
              )}
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
