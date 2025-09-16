import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  FileText,
  Users,
  Trash,
  Mail,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'audit' | 'system' | 'team' | 'deadline';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Nouvel audit assigné",
    message: "L'audit 'Sécurité IT - ABC Corp' vous a été assigné. Échéance: 25 décembre 2023",
    type: "info",
    category: "audit",
    isRead: false,
    createdAt: "2023-12-15T10:30:00",
    actionUrl: "/audits/1"
  },
  {
    id: 2,
    title: "Rapport prêt pour révision",
    message: "Le rapport d'audit pour XYZ Ltd est terminé et nécessite une révision finale.",
    type: "success",
    category: "audit",
    isRead: false,
    createdAt: "2023-12-15T09:15:00",
    actionUrl: "/audits/2"
  },
  {
    id: 3,
    title: "Échéance approche",
    message: "L'audit 'RGPD - TechSolutions' doit être livré dans 2 jours.",
    type: "warning",
    category: "deadline",
    isRead: true,
    createdAt: "2023-12-14T16:45:00",
    actionUrl: "/audits/3"
  },
  {
    id: 4,
    title: "Nouveau membre d'équipe",
    message: "Sophie Bernard a rejoint l'équipe d'audit en tant qu'auditrice senior.",
    type: "info",
    category: "team",
    isRead: true,
    createdAt: "2023-12-13T14:20:00"
  },
  {
    id: 5,
    title: "Mise à jour système",
    message: "Une mise à jour de sécurité sera effectuée ce soir de 22h à 2h du matin.",
    type: "warning",
    category: "system",
    isRead: false,
    createdAt: "2023-12-13T11:00:00"
  }
];

const typeConfig = {
  info: { icon: Info, color: "text-blue-600 bg-blue-50", badgeColor: "bg-blue-100 text-blue-800" },
  success: { icon: CheckCircle2, color: "text-green-600 bg-green-50", badgeColor: "bg-green-100 text-green-800" },
  warning: { icon: AlertCircle, color: "text-amber-600 bg-amber-50", badgeColor: "bg-amber-100 text-amber-800" },
  error: { icon: AlertCircle, color: "text-red-600 bg-red-50", badgeColor: "bg-red-100 text-red-800" }
};

const categoryConfig = {
  audit: { label: "Audit", icon: FileText },
  system: { label: "Système", icon: Settings },
  team: { label: "Équipe", icon: Users },
  deadline: { label: "Échéance", icon: Calendar }
};

const NotificationsPage = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui à " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return "Hier à " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAsUnread = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: false } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès."
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes les notifications ont été marquées comme lues."
    });
  };

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">Restez informé des dernières activités</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Bell className="h-6 w-6 text-gray-600" />
                {notifications.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Non lues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
                {unreadCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                {notifications.filter(n => n.category === 'audit').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Échéances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-amber-600" />
                {notifications.filter(n => n.category === 'deadline').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Toutes ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Non lues ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read">
              Lues ({notifications.length - unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((notification) => {
                  const typeInfo = typeConfig[notification.type];
                  const categoryInfo = categoryConfig[notification.category];
                  const TypeIcon = typeInfo.icon;
                  const CategoryIcon = categoryInfo.icon;

                  return (
                    <Card 
                      key={notification.id} 
                      className={`transition-colors ${
                        !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${typeInfo.color}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                <CategoryIcon className="h-3 w-3 mr-1" />
                                {categoryInfo.label}
                              </Badge>
                              {!notification.isRead && (
                                <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                                  Nouveau
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="text-xs text-gray-500">
                              {formatDate(notification.createdAt)}
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            {notification.isRead ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsUnread(notification.id)}
                                title="Marquer comme non lu"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                title="Marquer comme lu"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Supprimer"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
            ) : (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  {filter === 'unread' ? 'Aucune notification non lue' : 
                   filter === 'read' ? 'Aucune notification lue' : 
                   'Aucune notification'}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {filter === 'unread' ? 'Toutes vos notifications ont été lues.' :
                   filter === 'read' ? 'Vous n\'avez pas encore lu de notifications.' :
                   'Vous recevrez ici vos notifications importantes.'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationsPage;