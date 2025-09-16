import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Upload,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Trash,
  Search,
  Filter,
  FolderPlus,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'doc' | 'img' | 'xls' | 'other';
  size: string;
  uploadDate: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  description?: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    name: "Template_Audit_Sécurité_v2.docx",
    type: "doc",
    size: "2.3 MB",
    uploadDate: "2023-12-10",
    category: "Templates",
    tags: ["sécurité", "template", "standard"],
    isFavorite: true,
    description: "Template standard pour les audits de sécurité informatique"
  },
  {
    id: 2,
    name: "Checklist_RGPD_2023.pdf",
    type: "pdf",
    size: "850 KB",
    uploadDate: "2023-12-08",
    category: "Checklists",
    tags: ["RGPD", "conformité", "checklist"],
    isFavorite: false,
    description: "Liste de contrôle mise à jour pour la conformité RGPD"
  },
  {
    id: 3,
    name: "Architecture_Réseau_Schema.png",
    type: "img",
    size: "1.2 MB",
    uploadDate: "2023-12-05",
    category: "Schémas",
    tags: ["réseau", "architecture", "infrastructure"],
    isFavorite: false,
    description: "Schéma type d'architecture réseau d'entreprise"
  }
];

const typeConfig = {
  pdf: { label: "PDF", color: "bg-red-100 text-red-800", icon: FileText },
  doc: { label: "Document", color: "bg-blue-100 text-blue-800", icon: FileText },
  img: { label: "Image", color: "bg-green-100 text-green-800", icon: Image },
  xls: { label: "Excel", color: "bg-emerald-100 text-emerald-800", icon: FileText },
  other: { label: "Autre", color: "bg-gray-100 text-gray-800", icon: File }
};

const LibraryPage = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const categories = ["all", "Templates", "Checklists", "Schémas", "Rapports", "Procédures"];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Math.max(...documents.map(d => d.id)) + 1,
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 
              file.type.includes('document') || file.type.includes('word') ? 'doc' :
              file.type.includes('image') ? 'img' :
              file.type.includes('sheet') || file.type.includes('excel') ? 'xls' : 'other',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        category: "Autres",
        tags: [],
        isFavorite: false
      };
      
      setDocuments(prev => [...prev, newDoc]);
    });

    toast({
      title: "Fichiers uploadés",
      description: `${files.length} fichier(s) ont été ajoutés à la bibliothèque.`
    });
    setUploadDialogOpen(false);
  };

  const toggleFavorite = (id: number) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  const handleDelete = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document supprimé",
      description: "Le document a été retiré de la bibliothèque."
    });
  };

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bibliothèque de documents</h1>
            <p className="text-muted-foreground">Gérez vos templates, checklists et ressources</p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-audit-blue-600 hover:bg-audit-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Uploader des fichiers
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Uploader des documents</DialogTitle>
                <DialogDescription>
                  Ajoutez des fichiers à votre bibliothèque de documents
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleUpload(e.target.files)}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Sélectionner des fichiers
                    </Button>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Formats acceptés: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, GIF (Max: 10MB par fichier)
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                {documents.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-green-600" />
                {documents.filter(d => d.category === "Templates").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Favoris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Star className="h-6 w-6 text-amber-600" />
                {documents.filter(d => d.isFavorite).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Espace utilisé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <File className="h-6 w-6 text-purple-600" />
                12.8 MB
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              Nouveau dossier
            </Button>
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category === "all" ? "Tous" : category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => {
                const typeInfo = typeConfig[document.type];
                const TypeIcon = typeInfo.icon;

                return (
                  <Card key={document.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <TypeIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <CardTitle className="text-sm truncate">{document.name}</CardTitle>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="outline" className={typeInfo.color}>
                                {typeInfo.label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(document.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              document.isFavorite ? "fill-amber-400 text-amber-400" : "text-gray-400"
                            }`}
                          />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {document.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {document.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Taille: {document.size}</div>
                        <div>Ajouté le {new Date(document.uploadDate).toLocaleDateString('fr-FR')}</div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(document.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Aucun document trouvé</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchQuery || selectedCategory !== "all"
                    ? "Aucun document ne correspond aux critères de recherche."
                    : "Commencez par uploader vos premiers documents."}
                </p>
                <Button className="mt-4" onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Uploader des fichiers
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LibraryPage;