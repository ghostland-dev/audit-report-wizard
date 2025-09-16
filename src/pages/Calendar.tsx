import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditEvent {
  id: number;
  title: string;
  client: string;
  type: 'audit' | 'meeting' | 'deadline' | 'review';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  attendees?: string[];
  description?: string;
}

const mockEvents: AuditEvent[] = [
  {
    id: 1,
    title: "Audit de sécurité - ABC Corp",
    client: "ABC Corporation",
    type: "audit",
    status: "in-progress",
    startDate: "2023-12-15",
    endDate: "2023-12-22",
    startTime: "09:00",
    endTime: "17:00",
    location: "ABC Corp - Paris",
    attendees: ["Marie Dubois", "Pierre Martin"],
    description: "Audit complet de la sécurité informatique"
  },
  {
    id: 2,
    title: "Réunion de restitution - XYZ Ltd",
    client: "XYZ Limited",
    type: "meeting",
    status: "scheduled",
    startDate: "2023-12-20",
    endDate: "2023-12-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Visioconférence",
    attendees: ["Sophie Bernard"],
    description: "Présentation des résultats d'audit RGPD"
  },
  {
    id: 3,
    title: "Deadline - Rapport Tech Solutions",
    client: "Tech Solutions Inc",
    type: "deadline",
    status: "scheduled",
    startDate: "2023-12-25",
    endDate: "2023-12-25",
    description: "Livraison du rapport final d'audit infrastructure"
  }
];

const eventTypeConfig = {
  audit: { label: "Audit", color: "bg-blue-100 text-blue-800", icon: CalendarIcon },
  meeting: { label: "Réunion", color: "bg-green-100 text-green-800", icon: Users },
  deadline: { label: "Échéance", color: "bg-red-100 text-red-800", icon: AlertCircle },
  review: { label: "Révision", color: "bg-purple-100 text-purple-800", icon: CheckCircle2 }
};

const statusConfig = {
  scheduled: { label: "Planifié", color: "bg-gray-100 text-gray-800" },
  "in-progress": { label: "En cours", color: "bg-amber-100 text-amber-800" },
  completed: { label: "Terminé", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-800" }
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return mockEvents.filter(event => 
      event.startDate <= dateStr && event.endDate >= dateStr
    );
  };

  const formatTime = (time?: string) => {
    if (!time) return '';
    return new Date(`2023-01-01T${time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderCalendarGrid = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const isToday = isCurrentMonth && today.getDate() === day;
      
      days.push(
        <div 
          key={day} 
          className={cn(
            "p-2 border border-gray-100 min-h-[120px] cursor-pointer hover:bg-gray-50",
            isToday && "bg-blue-50 border-blue-200"
          )}
        >
          <div className={cn(
            "text-sm font-medium mb-1",
            isToday && "text-blue-600"
          )}>
            {day}
          </div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event) => {
              const typeConfig = eventTypeConfig[event.type];
              return (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                  }}
                  className={cn(
                    "text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate",
                    typeConfig.color
                  )}
                >
                  {event.title}
                </div>
              );
            })}
            {events.length > 2 && (
              <div className="text-xs text-gray-500">
                +{events.length - 2} autres
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Calendrier des audits</h1>
            <p className="text-muted-foreground">Planifiez et suivez vos audits et réunions</p>
          </div>
          <Button className="bg-audit-blue-600 hover:bg-audit-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Tabs value={view} onValueChange={(v) => setView(v as 'month' | 'week' | 'day')}>
                    <TabsList>
                      <TabsTrigger value="month">Mois</TabsTrigger>
                      <TabsTrigger value="week">Semaine</TabsTrigger>
                      <TabsTrigger value="day">Jour</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {view === 'month' && (
                  <div className="grid grid-cols-7 gap-0">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                      <div key={day} className="p-3 font-medium text-center bg-gray-50 border border-gray-200">
                        {day}
                      </div>
                    ))}
                    {renderCalendarGrid()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Vos prochains audits et réunions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEvents
                  .filter(event => new Date(event.startDate) >= new Date())
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .slice(0, 5)
                  .map((event) => {
                    const typeConfig = eventTypeConfig[event.type];
                    const statusInfo = statusConfig[event.status];
                    const TypeIcon = typeConfig.icon;
                    
                    return (
                      <div 
                        key={event.id} 
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-start gap-3">
                          <TypeIcon className="h-4 w-4 mt-1 text-gray-500" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {event.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(event.startDate).toLocaleDateString('fr-FR')}
                              {event.startTime && ` à ${formatTime(event.startTime)}`}
                            </div>
                            <div className="flex gap-1 mt-2">
                              <Badge variant="outline" className={typeConfig.color}>
                                {typeConfig.label}
                              </Badge>
                              <Badge variant="outline" className={statusInfo.color}>
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Audits ce mois</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Réunions planifiées</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Échéances à venir</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taux d'occupation</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
              <DialogDescription>
                Détails de l'événement
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge className={eventTypeConfig[selectedEvent.type].color}>
                    {eventTypeConfig[selectedEvent.type].label}
                  </Badge>
                  <Badge className={statusConfig[selectedEvent.status].color}>
                    {statusConfig[selectedEvent.status].label}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(selectedEvent.startDate).toLocaleDateString('fr-FR')}
                      {selectedEvent.startTime && ` ${formatTime(selectedEvent.startTime)}`}
                      {selectedEvent.endDate !== selectedEvent.startDate && 
                        ` - ${new Date(selectedEvent.endDate).toLocaleDateString('fr-FR')}`}
                      {selectedEvent.endTime && selectedEvent.endDate === selectedEvent.startDate && 
                        ` - ${formatTime(selectedEvent.endTime)}`}
                    </span>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                  
                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{selectedEvent.attendees.join(', ')}</span>
                    </div>
                  )}
                </div>
                
                {selectedEvent.description && (
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1">
                    Modifier
                  </Button>
                  <Button size="sm" variant="outline">
                    Dupliquer
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CalendarPage;