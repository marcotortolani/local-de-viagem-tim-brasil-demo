'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import Link from 'next/link'
import { RouteItem } from '@/lib/route/route-types'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed bg-black/30 backdrop-blur-sm inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out w-full',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-t data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left md:w-3/4',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  closeColor?: string
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, closeColor, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute bg-black p-1 right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className={`h-4 w-4`} color={closeColor} />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-light', className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

type SheetUIProps = {
  side?: 'top' | 'bottom' | 'left' | 'right'
  open?: boolean
  onOpenChange?(open: boolean): void
  header?: ReactNode
  footer?: ReactNode
  items: RouteItem[]
  sidebarClassName?: string
  sidebarMenuItemClassName?: string
  closeColor?: string
}

const SheetUI: React.FC<SheetUIProps> = ({
  side = 'right',
  open,
  onOpenChange,
  header,
  sidebarClassName,
  sidebarMenuItemClassName,
  closeColor,
  items = [],
  footer,
}) => {
  return (
    <Sheet key={side} open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={sidebarClassName}
        closeColor={closeColor}
      >
        <div className="flex flex-col justify-between h-full ">
          <div>
            <SheetHeader>
              <SheetTitle>{header}</SheetTitle>
            </SheetHeader>
            <div>
              {items.map(({ title, Icon, internalRoutes, href }, key) => {
                if (internalRoutes && internalRoutes.length) {
                  return (
                    <Collapsible
                      className="group/collapsible rounded-0 "
                      key={key}
                    >
                      <div>
                        <div
                          className={cn(
                            `flex w-full items-center rounded-none border-t border-t-white py-2 text-[16px] font-light text-white `,
                            sidebarMenuItemClassName,
                          )}
                        >
                          <CollapsibleTrigger
                            className={`flex w-full items-center justify-between`}
                          >
                            <div className="flex items-center text-white">
                              {Icon && <Icon height={16} width={16} />}
                              {title}
                            </div>
                            <ChevronDown
                              className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                              size={16}
                            />
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="pl-4">
                          {internalRoutes.map((internalRoute, key) => (
                            <Link
                              href={internalRoute.href || '#'}
                              key={key}
                              onClick={() =>
                                onOpenChange && onOpenChange(false)
                              }
                              className="flex items-center rounded-none border-t border-t-white py-2 text-lg text-white "
                            >
                              <internalRoute.Icon className="mr-2" size={16} />
                              <span className=" text-white ">
                                {internalRoute.title}
                              </span>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  )
                }
                return (
                  <Link
                    key={key}
                    href={href || '#'}
                    onClick={() => onOpenChange && onOpenChange(false)}
                    className={cn(
                      `  flex items-center rounded-none py-1  border-t border-t-white/50  text-white/80`,
                      sidebarMenuItemClassName,
                    )}
                  >
                    <span className={` py-2 text-[16px] font-light leading-6`}>
                      {title}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div>{footer}</div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetUI,
}
