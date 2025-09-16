import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  UserPlus, 
  Users, 
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  Edit,
  Trash,
  Settings,
  UserCheck,
  UserX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'auditor' | 'viewer';
  phone?: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
  auditsCount: number;
  avatar?: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    role: "admin",
    phone: "+33 1 23 45 67 89",
    department: "IT Security",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2023-12-10T14:30:00",
    auditsCount: 25
  },
  {
    id: 2,
    name: "Pierre Martin",
    email: "pierre.martin@example.com",
    role: "auditor",
    phone: "+33 1 23 45 67 90",
    department: "Compliance",
    status: "active",
    joinDate: "2023-03-20",
    lastLogin: "2023-12-09T16:45:00",
    auditsCount: 18
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    role: "auditor",
    phone: "+33 1 23 45 67 91",
    department: "Risk Management",
    status: "active",
    joinDate: "2023-05-10",
    lastLogin: "2023-12-08T09:15:00",
    auditsCount: 12
  }
];

const roleConfig = {
  admin: { label: "Administrateur", color: "bg-red-100 text-red-800", icon: Shield },
  auditor: { label: "Auditeur", color: "bg-blue-100 text-blue-800", icon: UserCheck },
  viewer: { label: "Observateur", color: "bg-gray-100 text-gray-800", icon: UserX }
};

const TeamManagementPage = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editMemberDialogOpen, setEditMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteMember = (formData: FormData) => {
    const newMember: TeamMember = {
      id: Math.max(...teamMembers.map(m => m.id)) + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'admin' | 'auditor' | 'viewer',
      department: formData.get('department') as string,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: '',
      auditsCount: 0
    };

    setTeamMembers(prev => [...prev, newMember]);
    setInviteDialogOpen(false);
    
    toast({
      title: "Invitation envoyée",
      description: `Une invitation a été envoyée à ${newMember.email}`,
    });
  };

  const handleUpdateMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setEditMemberDialogOpen(false);
    setSelectedMember(null);
    
    toast({
      title: "Membre mis à jour",
      description: "Les informations ont été mises à jour avec succès",
    });
  };

  const handleRemoveMember = (memberId: number) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    toast({
      title: "Membre supprimé",
      description: "Le membre a été retiré de l'équipe",
    });
  };

  const formatLastLogin = (dateString: string) => {
    if (!dateString) return "Jamais connecté";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestion d'équipe</h1>
            <p className="text-muted-foreground">Gérez les membres de votre équipe et leurs autorisations</p>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-audit-blue-600 hover:bg-audit-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Inviter un membre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Inviter un nouveau membre</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau membre à votre équipe d'audit
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleInviteMember(new FormData(e.currentTarget));
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" name="name" placeholder="Ex: Jean Dupont" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jean.dupont@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="role">Rôle</Label>
                    <Select name="role" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Observateur</SelectItem>
                        <SelectItem value="auditor">Auditeur</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Département</Label>
                    <Input id="department" name="department" placeholder="Ex: IT Security" required />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Envoyer l'invitation
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Membres actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-green-600" />
                {teamMembers.filter(m => m.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Administrateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
                {teamMembers.filter(m => m.role === 'admin').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Auditeurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-blue-600" />
                {teamMembers.filter(m => m.role === 'auditor').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Audits totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                {teamMembers.reduce((sum, m) => sum + m.auditsCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <div className="mb-4">
              <Input
                placeholder="Rechercher un membre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => {
                const roleInfo = roleConfig[member.role];
                const RoleIcon = roleInfo.icon;
                
                return (
                  <Card key={member.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <Badge className={roleInfo.color}>
                              <RoleIcon className="h-3 w-3 mr-1" />
                              {roleInfo.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedMember(member);
                              setEditMemberDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{member.email}</span>
                        </div>
                        {member.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{member.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{member.auditsCount} audits</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t text-xs text-muted-foreground">
                        <div>Rejoint le {new Date(member.joinDate).toLocaleDateString('fr-FR')}</div>
                        <div>Dernière connexion: {formatLastLogin(member.lastLogin)}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Matrice des permissions</CardTitle>
                <CardDescription>
                  Définissez les autorisations par rôle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { permission: "Créer des audits", admin: true, auditor: true, viewer: false },
                    { permission: "Modifier des audits", admin: true, auditor: true, viewer: false },
                    { permission: "Supprimer des audits", admin: true, auditor: false, viewer: false },
                    { permission: "Voir tous les audits", admin: true, auditor: true, viewer: true },
                    { permission: "Gérer l'équipe", admin: true, auditor: false, viewer: false },
                    { permission: "Accès aux analytics", admin: true, auditor: true, viewer: false },
                    { permission: "Exporter les rapports", admin: true, auditor: true, viewer: true },
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b">
                      <div className="font-medium">{item.permission}</div>
                      <div className="text-center">
                        {item.admin ? "✅" : "❌"}
                      </div>
                      <div className="text-center">
                        {item.auditor ? "✅" : "❌"}
                      </div>
                      <div className="text-center">
                        {item.viewer ? "✅" : "❌"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Actions récentes des membres de l'équipe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Marie Dubois", action: "a créé l'audit 'Sécurité IT - ABC Corp'", time: "Il y a 2 heures" },
                    { user: "Pierre Martin", action: "a complété l'audit 'RGPD - XYZ Ltd'", time: "Il y a 4 heures" },
                    { user: "Sophie Bernard", action: "a modifié l'audit 'Infrastructure - Tech Inc'", time: "Hier" },
                    { user: "Marie Dubois", action: "a invité un nouveau membre", time: "Avant-hier" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Member Dialog */}
        <Dialog open={editMemberDialogOpen} onOpenChange={setEditMemberDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le membre</DialogTitle>
              <DialogDescription>
                Modifiez les informations du membre de l'équipe
              </DialogDescription>
            </DialogHeader>
            {selectedMember && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedMember: TeamMember = {
                  ...selectedMember,
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  role: formData.get('role') as 'admin' | 'auditor' | 'viewer',
                  department: formData.get('department') as string,
                };
                handleUpdateMember(updatedMember);
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Nom complet</Label>
                    <Input 
                      id="edit-name" 
                      name="name" 
                      defaultValue={selectedMember.name} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input 
                      id="edit-email" 
                      name="email" 
                      type="email" 
                      defaultValue={selectedMember.email} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-role">Rôle</Label>
                    <Select name="role" defaultValue={selectedMember.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Observateur</SelectItem>
                        <SelectItem value="auditor">Auditeur</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-department">Département</Label>
                    <Input 
                      id="edit-department" 
                      name="department" 
                      defaultValue={selectedMember.department} 
                      required 
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setEditMemberDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Mettre à jour
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TeamManagementPage;