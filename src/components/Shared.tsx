'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Post, Tag } from '@/lib/api/wp/wp-types'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share'

import { ShareIcon } from '@/components/icons'
import {
  FacebookIcon,
  XtwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from '@/components/icons'

import { HASH_TAG } from '@/lib/constants'

import dictionary from '@/dictionary/lang.json'

type SharedProps = {
  item?: Post
  tags?: Tag[]
  currentUrl?: string
  fill?: string
}

export const Shared: React.FC<SharedProps> = ({
  item,
  tags,
  currentUrl = '',
  fill = 'fill-primary',
}) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const title = item?.title?.rendered
  const tagNames = tags?.map((tag) => `#${tag.name}`) as string[]
  const [open, setOpen] = React.useState(false)
  const sharedText = `${dictionary['Check out this content of']} ${dictionary['site']}: ${title}`

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger onClick={() => setOpen(!open)}>
        <ShareIcon className={`${fill}`} width={24} height={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="grid grid-cols-4 gap-2">
          <FacebookShareButton
            url={currentUrl || url}
            hashtag={[...HASH_TAG, ...tagNames].toString()}
          >
            <FacebookIcon
              width={30}
              height={30}
              fill="#363636 "
              className=" hover:fill-secondary"
            />
          </FacebookShareButton>
          <TwitterShareButton
            url={currentUrl || url}
            title={title}
            hashtags={[...HASH_TAG, ...tagNames]}
          >
            <XtwitterIcon
              width={30}
              height={30}
              fill="#363636"
              className=" hover:fill-secondary"
            />
          </TwitterShareButton>
          <WhatsappShareButton url={currentUrl || url} title={sharedText}>
            <WhatsappIcon
              width={30}
              height={30}
              fill="#363636"
              className=" hover:fill-secondary"
            />
          </WhatsappShareButton>
          <TelegramShareButton url={currentUrl || url} title={sharedText}>
            <TelegramIcon
              width={30}
              height={30}
              fill="#363636"
              className=" hover:fill-secondary"
            />
          </TelegramShareButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
