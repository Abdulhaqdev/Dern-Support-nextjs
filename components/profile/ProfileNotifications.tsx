'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function ProfileNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'ticket-updates',
      title: 'Chipta Yangilanishlari',
      description: 'Sizning qo‘llab-quvvatlash chiptalaringizda yangilanishlar bo‘lganda bildirishnoma oling',
      enabled: true,
    },
    {
      id: 'appointment-reminders',
      title: 'Uchrashuv Eslatmalari',
      description: 'Yaqinlashib kelayotgan ta‘mirlash uchrashuvlari haqida eslatmalar oling',
      enabled: true,
    },
    {
      id: 'support-messages',
      title: 'Qo‘llab-quvvatlash Xabarlari',
      description: 'Qo‘llab-quvvatlash agenti sizga xabar yuborganda bildirishnoma oling',
      enabled: true,
    },
    {
      id: 'knowledge-updates',
      title: 'Ma‘lumot Bazasi Yangilanishlari',
      description: 'Yangi ma‘lumot bazasi maqolalari haqida bildirishnomalar oling',
      enabled: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Xabarlari',
      description: 'Yangi xizmatlar, aksiyalar va yangiliklar haqida elektron pochta xabarlarni oling',
      enabled: false,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id 
        ? { ...setting, enabled: !setting.enabled } 
        : setting
    ));
  };

  const saveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Haqiqiy ilovada bu bildirishnoma sozlamalarini API orqali saqlaydi
      console.log('Yangilangan bildirishnoma sozlamalari:', settings);
      
      // API chaqiruvini simulyatsiya qilish
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Bildirishnoma sozlamalari muvaffaqiyatli saqlandi!');
    } catch (error) {
      toast.error('Sozlamalarni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bildirishnoma Sozlamalari</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {settings.map((setting) => (
            <div 
              key={setting.id} 
              className="flex items-center justify-between space-x-2"
            >
              <div className="space-y-0.5">
                <Label 
                  htmlFor={setting.id}
                  className="text-base"
                >
                  {setting.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch
                id={setting.id}
                checked={setting.enabled}
                onCheckedChange={() => toggleSetting(setting.id)}
              />
            </div>
          ))}
          
          <div className="pt-4">
            <Button 
              onClick={saveSettings}
              disabled={isLoading}
            >
              {isLoading ? 'Saqlanmoqda...' : 'Sozlamalarni Saqlash'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
