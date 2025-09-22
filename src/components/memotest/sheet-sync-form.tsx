// src/components/memotest/sheet-sync-form.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'

import { Loader2, Mail, User } from 'lucide-react'

import { submitData } from '@/app/actions/google-api'

const OPTIONS = [
  { label: 'Playa', value: 'playa' },
  { label: 'Selva', value: 'selva' },
  { label: 'Montaña', value: 'montaña' },
  { label: 'Ciudad', value: 'ciudad' },
]

export function SheetSyncForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    hashID: '',
    unlockedContent: '',
    levelCompleted: 0,
  })

  async function onSubmit(event: any) {
    event?.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    if (
      !formData.hashID ||
      !formData.levelCompleted ||
      !formData.unlockedContent
    ) {
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitData(formData)
      if (result.success) {
        console.log('success: ', result)
        setIsSubmitting(false)
        setFormData({ hashID: '', unlockedContent: '', levelCompleted: 0 })
      } else {
        throw new Error(result.message)
      }
    } catch (error: any) {
      console.log('error: ', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-md shadow-lg">
      <div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label>Tu ID</label>
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tu hash ID"
                  value={formData.hashID}
                  onChange={(e) =>
                    setFormData({ ...formData, hashID: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div>
            <label>Nivel completado</label>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="number"
                  placeholder="Tu Nivel"
                  value={formData.levelCompleted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      levelCompleted: parseInt(e.target.value),
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className=" relative">
            <label>Seleccion</label>

            <div>
              <div className="relative">
                {OPTIONS.map((option) => {
                  return (
                    <div
                      key={option.value}
                      className=" flex items-center gap-2 my-2"
                    >
                      <input
                        type="radio"
                        placeholder={option.label}
                        value={formData.unlockedContent}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            unlockedContent: e.target.value,
                          })
                        }
                        className="pl-10 text-white"
                      />
                      <span>{option.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
