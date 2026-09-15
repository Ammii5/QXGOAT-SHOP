import { Bell, CheckCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { cx } from '../lib/ui'
import { Drawer, OverlayHeading } from './Overlay'
import { Button, EmptyState } from './ui'

export default function NotificationDrawer() {
  const { notifOpen, setNotifOpen, notifications, unreadCount, markAllNotificationsRead } = useApp()

  const close = () => setNotifOpen(false)

  return (
    <Drawer open={notifOpen} onClose={close} side="right" labelledBy="notif-drawer-title">
      <OverlayHeading
        icon={Bell}
        title="Notifications"
        caption={unreadCount ? `${unreadCount} unread` : 'You’re all caught up'}
        onClose={close}
        closeLabel="Close notifications"
      />

      {notifications.length ? (
        <>
          <ul className="flex-1 space-y-2 overflow-y-auto overscroll-contain p-4">
            {notifications.map((item) => (
              <li
                key={item.id}
                className={cx(
                  'relative rounded-xl border p-3.5 transition-colors',
                  item.read
                    ? 'border-surface-line bg-surface'
                    : 'border-primary-100 bg-primary-50/60',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold leading-snug text-ink">{item.title}</p>
                  {!item.read ? (
                    <span
                      aria-label="Unread"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                    />
                  ) : null}
                </div>
                {item.body ? (
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.body}</p>
                ) : null}
              </li>
            ))}
          </ul>

          {unreadCount > 0 ? (
            <div className="border-t border-surface-line bg-surface-soft p-4">
              <Button variant="secondary" block onClick={markAllNotificationsRead}>
                <CheckCheck size={16} strokeWidth={2.4} />
                Mark all as read
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex flex-1 items-center px-5">
          <EmptyState
            icon={Bell}
            title="No notifications yet"
            description="Order updates and new product drops will show up here."
            className="w-full border-none bg-transparent"
          />
        </div>
      )}
      <div className="safe-bottom" />
    </Drawer>
  )
}
