import { useState, useEffect } from 'react'

export const ispolzovanieApi = (url, parametri = {}) => {
  const [dannie, ustanovitDannie] = useState(null)
  const [zagruzka, ustanovitZagruzku] = useState(true)
  const [oshibka, ustanovitOshibku] = useState(null)

  useEffect(() => {
    const poluchitDannie = async () => {
      try {
        ustanovitZagruzku(true)
        ustanovitOshibku(null)
        
        const otvet = await fetch(`http://localhost:3001${url}`, parametri)
        
        if (!otvet.ok) {
          throw new Error(`Ошибка HTTP! status: ${otvet.status}`)
        }
        
        const rezultat = await otvet.json()
        ustanovitDannie(rezultat)
      } catch (oshibka) {
        ustanovitOshibku(oshibka.message)
      } finally {
        ustanovitZagruzku(false)
      }
    }

    poluchitDannie()
  }, [url])

  return { dannie, zagruzka, oshibka }
}