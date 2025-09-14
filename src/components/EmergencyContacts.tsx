import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Plus, Edit, Trash2 } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  avatar?: string;
  isPrimary?: boolean;
}

const EmergencyContacts: React.FC = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Mom',
      phone: '012-3456789',
      relationship: 'Mother',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Dad',
      phone: '019-8765432',
      relationship: 'Father'
    },
    {
      id: '3',
      name: 'Clinic',
      phone: '03-11112222',
      relationship: 'Health Center'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', relationship: '' });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({ name: contact.name, phone: contact.phone, relationship: contact.relationship });
    setIsEditing(true);
  };

  const handleAdd = () => {
    setEditingContact(null);
    setFormData({ name: '', phone: '', relationship: '' });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingContact) {
      setContacts(prev => prev.map(c => c.id === editingContact.id ? { ...c, ...formData } : c));
    } else {
      const newContact: EmergencyContact = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        phone: formData.phone,
        relationship: formData.relationship,
      };
      setContacts(prev => [...prev, newContact]);
    }
    setIsEditing(false);
    setEditingContact(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-foreground flex items-center"
          >
            ← Back
          </button>
          <Button variant="medical" size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <CardTitle className="text-2xl font-bold">Emergency Contacts</CardTitle>
        <p className="text-sm text-muted-foreground">
          People who will be notified during emergencies
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing && (
          <form className="space-y-3 border rounded p-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input id="relationship" value={formData.relationship} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="medical" onClick={handleSave}>Save</Button>
            </div>
          </form>
        )}

        {contacts.map((contact) => (
          <Card key={contact.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="text-sm font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{contact.name}</h4>
                    {contact.isPrimary && (
                      <Badge variant="secondary" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {contact.relationship}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleCall(contact.phone)}
                  className="h-8 w-8 p-0"
                >
                  <Phone className="w-4 h-4" />
                </Button>

                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(contact)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            These contacts will receive your location and medical info during an emergency
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
