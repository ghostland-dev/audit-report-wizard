import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users, Save, X } from "lucide-react";
import { toast } from "sonner";

interface AuditEvent {
  id?: number;
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

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: AuditEvent | null;
  onSave?: (event: AuditEvent) => void;
}

const EventDialog = ({ open, onOpenChange, event, onSave }: EventDialogProps) => {
  const [formData, setFormData] = useState<Partial<AuditEvent>>(() => 
    event ? { ...event } : {
      title: '',
      client: '',
      type: 'audit',
      status: 'scheduled',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: [],
      description: ''
    }
  );

  const [attendeeInput, setAttendeeInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.title || !formData.client || !formData.startDate) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventToSave: AuditEvent = {
        id: event?.id || Math.floor(Math.random() * 10000),
        title: formData.title!,
        client: formData.client!,
        type: formData.type!,
        status: formData.status!,
        startDate: formData.startDate!,
        endDate: formData.endDate || formData.startDate!,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        attendees: formData.attendees,
        description: formData.description
      };

      onSave?.(eventToSave);
      toast.success(event ? "Événement mis à jour" : "Événement créé avec succès");
      onOpenChange(false);
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsLoading(false);
    }
  };

  const addAttendee = () => {
    if (attendeeInput.trim()) {
      setFormData(prev => ({
        ...prev,
        attendees: [...(prev.attendees || []), attendeeInput.trim()]
      }));
      setAttendeeInput('');
    }
  };

  const removeAttendee = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? "Modifier l'événement" : "Créer un nouvel événement"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de votre événement d'audit
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'événement *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Audit de sécurité - ABC Corp"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Input
                id="client"
                value={formData.client || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                placeholder="Nom du client"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type d'événement</Label>
              <Select 
                value={formData.type || 'audit'} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as AuditEvent['type'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audit">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Audit
                    </div>
                  </SelectItem>
                  <SelectItem value="meeting">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Réunion
                    </div>
                  </SelectItem>
                  <SelectItem value="deadline">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Échéance
                    </div>
                  </SelectItem>
                  <SelectItem value="review">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Révision
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status || 'scheduled'} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as AuditEvent['status'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Planifié</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Heure de début</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure de fin</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <div className="flex">
              <MapPin className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ex: Bureau client, Visioconférence"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Participants</Label>
            <div className="flex gap-2">
              <Input
                value={attendeeInput}
                onChange={(e) => setAttendeeInput(e.target.value)}
                placeholder="Nom du participant"
                onKeyPress={(e) => e.key === 'Enter' && addAttendee()}
              />
              <Button type="button" onClick={addAttendee} variant="outline">
                Ajouter
              </Button>
            </div>
            {formData.attendees && formData.attendees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.attendees.map((attendee, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {attendee}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeAttendee(index)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Détails supplémentaires sur l'événement"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Sauvegarde..." : (event ? "Mettre à jour" : "Créer l'événement")}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;