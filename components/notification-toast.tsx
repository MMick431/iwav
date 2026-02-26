'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

export function NotificationToast({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: AlertCircle,
  }[type];

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  }[type];

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 max-w-sm ${bgColor} border rounded-lg p-4 shadow-lg animate-slideInRight z-50`}>
      <div className="flex gap-3 items-start">
        <Icon className={`${iconColor} flex-shrink-0`} size={20} />
        <p className={`${textColor} flex-1`}>{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className={`${textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

/**
 * Hook for managing notifications
 */
export function useNotification() {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const show = (props: Omit<NotificationProps, 'onClose'>) => {
    setNotification({
      ...props,
      onClose: () => setNotification(null),
    });
  };

  const success = (message: string, duration?: number) => {
    show({ message, type: 'success', duration });
  };

  const error = (message: string, duration?: number) => {
    show({ message, type: 'error', duration });
  };

  const info = (message: string, duration?: number) => {
    show({ message, type: 'info', duration });
  };

  return {
    notification,
    show,
    success,
    error,
    info,
  };
}
