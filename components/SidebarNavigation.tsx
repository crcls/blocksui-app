import {
  BoltIcon,
  Cog8ToothIcon,
  RectangleStackIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const sidebarNavigation = [
  {
    current: false,
    icon: BoltIcon,
    name: 'Connectors',
  },
  { current: true, icon: Squares2X2Icon, name: 'Elements' },
  { current: false, icon: RectangleStackIcon, name: 'Transitions' },
  { current: false, icon: Cog8ToothIcon, name: 'Settings' },
]

export function SidebarNavigation() {
  return (
    <>
      {sidebarNavigation.map((item) => (
        <button
          aria-current={item.current ? 'page' : undefined}
          className={clsx(
            item.current
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-100 hover:bg-neutral-800 hover:text-white',
            'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
          )}
          key={item.name}
        >
          <item.icon
            aria-hidden="true"
            className={clsx(
              item.current
                ? 'text-white'
                : 'text-neutral-300 group-hover:text-white',
              'h-6 w-6'
            )}
          />
          <span className="mt-2">{item.name}</span>
        </button>
      ))}
    </>
  )
}
