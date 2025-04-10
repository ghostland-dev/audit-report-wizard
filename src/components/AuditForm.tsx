
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar, Clipboard, FileText, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export interface AuditData {
  id?: number;
  title: string;
  client: string;
  clientContact: string;
  clientEmail: string;
  startDate: string;
  endDate: string;
  scope: string;
  methodology: string;
  findings: string;
  recommendations: string;
  status: "draft" | "in-progress" | "completed";
  progress: number;
}

const auditFormSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères",
  }),
  client: z.string().min(2, {
    message: "Le nom du client est requis",
  }),
  clientContact: z.string().min(2, {
    message: "Le nom du contact est requis",
  }),
  clientEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  startDate: z.string().min(1, {
    message: "La date de début est requise",
  }),
  endDate: z.string().min(1, {
    message: "La date de fin est requise",
  }),
  scope: z.string().min(10, {
    message: "Le périmètre doit contenir au moins 10 caractères",
  }),
  methodology: z.string().optional(),
  findings: z.string().optional(),
  recommendations: z.string().optional(),
});

interface AuditFormProps {
  initialData?: Partial<AuditData>;
  onSubmit: (data: AuditData) => void;
  isEditing?: boolean;
  onChange?: (data: Partial<AuditData>) => void;
}

const AuditForm = ({
  initialData,
  onSubmit,
  isEditing = false,
  onChange,
}: AuditFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");

  const defaultValues: Partial<AuditData> = {
    title: "",
    client: "",
    clientContact: "",
    clientEmail: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    scope: "",
    methodology: "",
    findings: "",
    recommendations: "",
    status: "draft",
    progress: 0,
    ...initialData,
  };

  const form = useForm<AuditData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues,
  });

  const handleSubmit = (data: AuditData) => {
    // Calculate progress based on filled fields
    const totalFields = Object.keys(auditFormSchema.shape).length;
    const filledFields = Object.entries(data).filter(
      ([key, value]) => value && auditFormSchema.shape[key as keyof typeof auditFormSchema.shape]
    ).length;
    
    const progress = Math.round((filledFields / totalFields) * 100);
    
    const formData = {
      ...data,
      progress,
      status: progress === 100 ? "completed" : progress > 30 ? "in-progress" : "draft"
    } as AuditData;
    
    onSubmit(formData);
  };

  const handleFieldChange = () => {
    if (onChange) {
      const currentValues = form.getValues();
      onChange(currentValues);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Modifier l'audit" : "Nouvel audit"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            onChange={handleFieldChange}
            className="space-y-6"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span className="hidden sm:inline">Informations</span>
                </TabsTrigger>
                <TabsTrigger value="client" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Client</span>
                </TabsTrigger>
                <TabsTrigger value="scope" className="flex items-center gap-2">
                  <Clipboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Périmètre</span>
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Résultats</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre de l'audit</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ex. Audit de sécurité - Société ABC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="date"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="date"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="client" className="space-y-4">
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du client</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ex. Société ABC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personne de contact</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ex. Jean Dupont"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de contact</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ex. jean.dupont@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="scope" className="space-y-4">
                <FormField
                  control={form.control}
                  name="scope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Périmètre de l'audit</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez le périmètre de l'audit..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Détaillez les aspects couverts par l'audit.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="methodology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Méthodologie</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez la méthodologie utilisée..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Expliquez l'approche et les outils utilisés.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="results" className="space-y-4">
                <FormField
                  control={form.control}
                  name="findings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Constatations</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez les principales constatations..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Listez les problèmes et vulnérabilités découverts.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recommendations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recommandations</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Listez vos recommandations..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Proposez des solutions et améliorations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setActiveTab(activeTab === "info" ? "client" : 
                                activeTab === "client" ? "scope" : 
                                activeTab === "scope" ? "results" : "info");
                }}
              >
                {activeTab === "results" ? "Retour au début" : "Suivant"}
              </Button>
              <Button type="submit" className="bg-audit-blue-600 hover:bg-audit-blue-700">
                {isEditing ? "Mettre à jour" : "Créer l'audit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AuditForm;
