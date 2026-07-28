import { clsx } from '@/utils/clsx'

/**
 * Skeleton — content placeholder during loading.
 * Use to match the shape of actual content.
 */

function Skeleton({ className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-ash/40 rounded animate-pulse',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

/** Skeleton for a stat card */
Skeleton.StatCard = function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-card p-6 shadow-sm-warm">
      <Skeleton className="h-3 w-20 mb-3" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}

/** Skeleton for a donation table row */
Skeleton.TableRow = function SkeletonTableRow() {
  return (
    <tr className="border-b border-ash/30">
      {[60, 40, 30, 20, 20, 15].map((w, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-3 w-${w}`} style={{ width: `${w}%` }} />
        </td>
      ))}
    </tr>
  )
}

/** Skeleton for a program card */
Skeleton.ProgramCard = function SkeletonProgramCard() {
  return (
    <div className="bg-white rounded-card shadow-sm-warm overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-5/6 mb-4" />
        <Skeleton className="h-8 w-28 rounded-card" />
      </div>
    </div>
  )
}

/** Skeleton for a story card */
Skeleton.StoryCard = function SkeletonStoryCard() {
  return (
    <div className="bg-white rounded-card p-6 shadow-sm-warm">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-3 w-24 mb-1.5" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
      <Skeleton className="h-3 w-full mb-1.5" />
      <Skeleton className="h-3 w-full mb-1.5" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}

export default Skeleton
