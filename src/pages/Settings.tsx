
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Bell, 
  Lock, 
  FileText, 
  Save, 
  Globe 
} from "lucide-react";
import { useForm } from "react-hook-form";

const SettingsPage = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Form for profile settings
  const profileForm = useForm({
    defaultValues: {
      name: "Utilisateur Test",
      email: "user@example.com",
      company: "Entreprise ABC",
      role: "Auditeur SI"
    }
  });
  
  const handleSaveProfile = (data: any) => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées."
      });
    }, 1000);
  };
  
  const savePreferences = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences ont été enregistrées."
      });
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">Gérez vos préférences et votre compte</p>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rapports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles et professionnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fonction</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="mt-4" disabled={saving}>
                      {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Configurez comment et quand vous souhaitez être notifié
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-audit" className="font-medium">Nouvel audit</Label>
                    <p className="text-sm text-muted-foreground">Recevoir une notification lorsqu'un nouvel audit est assigné</p>
                  </div>
                  <Switch id="new-audit" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-update" className="font-medium">Mise à jour d'audit</Label>
                    <p className="text-sm text-muted-foreground">Recevoir une notification lorsqu'un audit est mis à jour</p>
                  </div>
                  <Switch id="audit-update" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="report-ready" className="font-medium">Rapport finalisé</Label>
                    <p className="text-sm text-muted-foreground">Recevoir une notification lorsqu'un rapport est prêt</p>
                  </div>
                  <Switch id="report-ready" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif" className="font-medium">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
                  </div>
                  <Switch id="email-notif" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={savePreferences} disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer les préférences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez les paramètres de sécurité et de confidentialité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Changer le mot de passe</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="mt-4" variant="outline">Mettre à jour le mot de passe</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Authentification à deux facteurs</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ajoutez une couche de sécurité supplémentaire à votre compte en activant l'authentification à deux facteurs
                  </p>
                  <Button variant="outline">Configurer l'authentification à deux facteurs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Préférences des rapports</CardTitle>
                <CardDescription>
                  Personnalisez la manière dont vos rapports sont générés et affichés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="default-template" className="font-medium">Modèle par défaut</Label>
                    <p className="text-sm text-muted-foreground">Utiliser un modèle personnalisé pour tous les nouveaux rapports</p>
                  </div>
                  <Switch id="default-template" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-logo" className="font-medium">Inclure le logo</Label>
                    <p className="text-sm text-muted-foreground">Ajouter automatiquement le logo de l'entreprise aux rapports</p>
                  </div>
                  <Switch id="include-logo" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-numbering" className="font-medium">Numérotation automatique</Label>
                    <p className="text-sm text-muted-foreground">Numéroter automatiquement les sections et sous-sections</p>
                  </div>
                  <Switch id="auto-numbering" defaultChecked />
                </div>
                
                <div className="space-y-1 pt-4">
                  <Label htmlFor="default-language">Langue par défaut</Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <select id="default-language" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={savePreferences} className="flex items-center gap-2" disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Enregistrement..." : "Enregistrer les préférences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
