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


export const logDeystvie = (deystvie, polzovatel = null, detali = {}) => {
  console.log('Действие:', deystvie, polzovatel, detali)
  

  fetch('http://localhost:3001/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: deystvie,
      user: polzovatel,
      details: detali,
      timestamp: new Date().toISOString()
    })
  }).catch(error => {
    console.error('Ошибка при логировании:', error)
  })
}

export const logAdminDeystvie = (deystvie, detali = {}) => {
  console.log('Действие администратора:', deystvie, detali)
  
  fetch('http://localhost:3001/api/admin/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: deystvie,
      details: detali,
      timestamp: new Date().toISOString()
    })
  }).catch(error => {
    console.error('Ошибка при логировании администратора:', error)
  })
}

export const logKorzinaDeystvie = (deystvie, polzovatel = null, tovar = null, kolichestvo = null) => {
  console.log('Действие с корзиной:', deystvie, polzovatel, tovar, kolichestvo)
  
  fetch('http://localhost:3001/api/cart/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: deystvie,
      user: polzovatel,
      product: tovar ? {
        id: tovar.id,
        name: tovar.name,
        price: tovar.price
      } : null,
      quantity: kolichestvo,
      timestamp: new Date().toISOString()
    })
  }).catch(error => {
    console.error('Ошибка при логировании корзины:', error)
  })
}