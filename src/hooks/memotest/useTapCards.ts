// src/hooks/memotest/useTapCards.ts

import { useState, useEffect } from 'react'
import useMemotestConfigStore from '@/stores/memotest-config-store'

import useSound from 'use-sound'

export function useTapCards(cardsAmount: number) {
  const { soundOn, sounds } = useMemotestConfigStore()
  const [cardsMatch] = useSound(sounds.cardsMatch)
  const [cardSelected] = useSound(sounds.bubblePop)
  const [wrongTap] = useSound(sounds.negativeToneTap)
  const [selected, setSelected] = useState<string[]>([])
  const [guessed, setGuessed] = useState<string[]>([])
  const [levelFinished, setLevelFinished] = useState<boolean>(false)

  function cardTaped(card: string | null) {
    if (card === null) {
      setSelected([])
      setGuessed([])
      setLevelFinished(false)
      return
    }
    if (guessed.includes(card)) {
      if (soundOn) wrongTap()
      return
    }
    if (selected[0] !== card) {
      if (selected.length < 2) {
        if (soundOn) cardSelected()
        setSelected((selected) => selected.concat(card))
      } else {
        if (soundOn) wrongTap()
      }
    } else {
      if (soundOn) wrongTap()
    }
  }

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
        if (soundOn) cardsMatch()
        setGuessed((guessed) => guessed.concat(selected))
      }

      setTimeout(() => {
        setSelected([])
      }, 700)
    }
  }, [selected])

  useEffect(() => {
    if (cardsAmount !== 0 && guessed.length === cardsAmount) {
      setLevelFinished(true)
    }
  }, [guessed])

  return { selected, guessed, cardTaped, levelFinished }
}
