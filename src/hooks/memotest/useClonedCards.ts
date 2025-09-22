// src/hooks/memotest/useClonedCards.ts

import { useState, useEffect } from 'react'

export function useCloneCards({ imgCards }: { imgCards: string[] }) {
  const [clonedCards, setClonedCards] = useState<string[]>([])

  function sortCards() {
    const IMGS = imgCards
      .flatMap((image) => [`a|${image}`, `b|${image}`])
      .sort(() => Math.random() - 0.5)
    setClonedCards(IMGS)
  }

  useEffect(() => {
    if (Object?.keys(imgCards)?.length > 0) {
      sortCards()
    }
  }, [imgCards])

  return { clonedCards, sortCards }
}
