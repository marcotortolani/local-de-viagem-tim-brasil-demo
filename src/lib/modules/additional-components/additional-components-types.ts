// create types to the additional component store

export type AdditionalComponentsStore = {
  show: boolean
  additionalConfig: AdditionalConfigType
  setShow: (show: boolean) => void
  setAdditionalConfig: (additionalConfig: AdditionalConfigType) => void
}

export type AdditionalComponentsActionStore = {
  setShow: (show: boolean) => void
}

export type AdditionalComponentsSelectorStore = {
  show: (state: AdditionalComponentsStore) => boolean
}

export type AdditionalComponentsStateStore = {
  show: boolean
}

export type AdditionalConfigType = {
  game: {
    title: string
    bannerMobile: string
    bannerDesktop: string
    url: string
    validPeriod: {
      startDate: string
      endDate: string
    }
  }
  additionalSection: {
    show: boolean
    title: string
    flag: string
    'wp-category-slug': string
    'wp-category-id': number
  }
  validatorActive: boolean
}
