import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Scheme } from '../types/schemes';
import { SCHEMES } from '../../server/data/schemes';
import {
  Bell,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Smartphone,
  Check,
  X,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'deadline' | 'match' | 'status' | 'info';
  title: string;
  description: string;
  timeAgo: string;
  unread: boolean;
  schemeId?: string;
  urgent?: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScheme?: (scheme: Scheme) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  onSelectScheme,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'deadlines' | 'matches' | 'settings'>('all');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'deadline',
      title: 'PM Awas Yojana (PMAY) - Final Deadline Approaching',
      description: 'Application portal for credit subsidy closes in 5 days. Complete your document checklist now.',
      timeAgo: '1 hour ago',
      unread: true,
      schemeId: 'pm-awas-yojana',
      urgent: true,
    },
    {
      id: 'notif-2',
      type: 'match',
      title: 'New Scheme Matched: Kalaignar Magalir Urimai Thittam',
      description: 'Your profile matches 95% eligibility for ₹1,000/month women entitlement assistance.',
      timeAgo: '3 hours ago',
      unread: true,
      schemeId: 'tn-magalir-urimai',
    },
    {
      id: 'notif-3',
      type: 'status',
      title: 'PM-KISAN 17th Installment Sanctioned',
      description: '₹2,000 direct benefit transferred to your Aadhaar-linked bank account.',
      timeAgo: '1 day ago',
      unread: false,
      schemeId: 'pm-kisan',
    },
    {
      id: 'notif-4',
      type: 'status',
      title: 'Ayushman Bharat Card Approved',
      description: 'Your cashless ₹5 Lakh health insurance card is ready for instant download.',
      timeAgo: '2 days ago',
      unread: false,
      schemeId: 'ayushman-bharat',
    },
  ]);

  // Channel notification preference settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Close on ESC key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    // Mark clicked notification as read
    setNotifications(prev =>
      prev.map(n => (n.id === item.id ? { ...n, unread: false } : n))
    );

    if (item.schemeId && onSelectScheme) {
      const foundScheme = SCHEMES.find(s => s.id === item.schemeId);
      if (foundScheme) {
        onSelectScheme(foundScheme);
        onClose();
      }
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'deadlines') return n.type === 'deadline';
    if (activeTab === 'matches') return n.type === 'match';
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-2 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-center-title"
    >
      {/* Backdrop overlay listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Drawer Panel */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-teal-100/80 overflow-hidden flex flex-col max-h-[90vh] z-10">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600/60 border border-teal-400/40 flex items-center justify-center text-white">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 id="notification-center-title" className="text-base font-extrabold tracking-tight">
                {t('notificationsTitle', 'Notifications & Deadline Alerts')}
              </h2>
              <p className="text-[11px] text-teal-200/90 font-medium">
                {unreadCount > 0 ? `${unreadCount} unread updates` : 'All caught up'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold bg-teal-800/80 hover:bg-teal-700 text-teal-100 border border-teal-600/60 px-2.5 py-1 rounded-lg transition-all"
                title="Mark all as read"
              >
                {t('markAllRead', 'Mark All Read')}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-teal-800/80 text-teal-200 hover:text-white transition-colors focus:ring-2 focus:ring-teal-400 focus:outline-none"
              aria-label="Close notification center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex items-center bg-slate-50 border-b border-slate-200 px-3 py-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
              activeTab === 'deadlines'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Deadlines</span>
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
              activeTab === 'matches'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Matches</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ml-auto flex items-center space-x-1 ${
              activeTab === 'settings'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
            title="Notification Settings"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

        {/* Notifications Body Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {activeTab === 'settings' ? (
            <div className="p-4 space-y-4 text-xs">
              <div className="font-bold text-slate-800 text-sm flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Delivery Channels & Preferences</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Configure how you want to receive urgent scheme deadline cutoffs and personal eligibility match alerts.
              </p>

              <div className="space-y-3 pt-2">
                {/* Email Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-teal-700" />
                    <div>
                      <div className="font-bold text-slate-900">{t('channelEmail', 'Email Alerts')}</div>
                      <div className="text-[10px] text-slate-500">Sent to citizen@govassist.in</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      emailAlerts ? 'bg-teal-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        emailAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* SMS Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-4 h-4 text-teal-700" />
                    <div>
                      <div className="font-bold text-slate-900">{t('channelSms', 'SMS Alerts')}</div>
                      <div className="text-[10px] text-slate-500">Sent to +91 98765 43210</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSmsAlerts(!smsAlerts)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      smsAlerts ? 'bg-teal-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        smsAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Push Notifications Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-4 h-4 text-teal-700" />
                    <div>
                      <div className="font-bold text-slate-900">{t('channelPush', 'Push Notifications')}</div>
                      <div className="text-[10px] text-slate-500">Browser & Mobile app notifications</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushAlerts(!pushAlerts)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      pushAlerts ? 'bg-teal-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        pushAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map(item => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-start space-x-3 my-1 border ${
                  item.unread
                    ? 'bg-teal-50/70 border-teal-200/80 shadow-xs'
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                {/* Icon Badge */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white ${
                    item.type === 'deadline'
                      ? 'bg-rose-500'
                      : item.type === 'match'
                      ? 'bg-teal-600'
                      : 'bg-emerald-600'
                  }`}
                >
                  {item.type === 'deadline' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : item.type === 'match' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className={`text-xs font-bold leading-tight ${item.unread ? 'text-teal-950 font-black' : 'text-slate-800'}`}>
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">{item.timeAgo}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{item.description}</p>

                  {item.schemeId && (
                    <div className="mt-2 inline-flex items-center text-[10px] font-bold text-teal-700 hover:text-teal-900 group">
                      <span>View Scheme Details & Apply</span>
                      <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </div>

                {item.unread && <div className="w-2 h-2 rounded-full bg-teal-600 shrink-0 mt-1.5" />}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-medium">No notifications found in this category.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] font-medium text-slate-500">
          GovAssist AI Real-Time Notification Gateway • Verification active
        </div>

      </div>
    </div>
  );
};
