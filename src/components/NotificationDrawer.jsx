import { Bell, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Backdrop from './Backdrop'

export default function NotificationDrawer() {
  const { notifOpen, setNotifOpen, notifications, markAllNotificationsRead } = useApp()

  return (
    <>
      {notifOpen && <Backdrop onClick={() => setNotifOpen(false)} />}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-full max-w-[360px] transform bg-white shadow-2xl transition-transform duration-300 ${
          notifOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface-line px-5 py-5">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <h2 className="text-[16px] font-extrabold text-ink">Notifications</h2>
          </div>
          <button aria-label="Close notifications" onClick={() => setNotifOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">
          {notifications.length ? (
            <>
              <div className="space-y-3">
                {notifications.map((item) => (
                  <div key={item.id} className="rounded-xl bg-surface-soft p-3">
                    <p className="text-[12px] font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-[11px] text-ink-muted">{item.body}</p>
                  </div>
                ))}
              </div>
              <button onClick={markAllNotificationsRead} className="mt-4 w-full rounded-full bg-primary py-3 text-[12px] font-bold text-white">
                Mark all as read
              </button>
            </>
          ) : (
            <div className="py-12 text-center">
              <Bell size={28} className="mx-auto text-ink-muted" />
              <p className="mt-3 text-[13px] font-bold text-ink">No notifications</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}