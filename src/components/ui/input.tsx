import * as React from 'react'
import { cn } from '@/lib/utils'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'
import { X } from 'lucide-react'
// import { Button } from '@/components/ui/button'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  handleCloseIcon?: () => void
  handleIcon?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, value, type, Icon, handleIcon, handleCloseIcon, ...props },
    ref,
  ) => {
    return (
      <div className="relative">
        {Icon && (
          <>
            {value ? (
              <X
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                onClick={handleCloseIcon}
              />
            ) : (
              <Icon
                className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-white "
                onClick={handleIcon}
              />
            )}
          </>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 pl-10 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          value={value}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
export type { InputProps }
