import { createContext, useContext, useState, useEffect } from 'react'

const KontekstAvtorizacii = createContext()

export const PostavshikAvtorizacii = ({ children }) => {
  const [polzovatel, ustanovitPolzovatelya] = useState(null)
  const [zagruzka, ustanovitZagruzku] = useState(true)

  useEffect(() => {
    proveritAvtorizaciyu()
  }, [])

  const proveritAvtorizaciyu = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        ustanovitPolzovatelya({ 
          id: 1, 
          imya: 'Test User', 
          email: 'test@example.com',
          rol: 'user'
        })
      }
    } catch (oshibka) {
      console.error('Ошибка проверки авторизации:', oshibka)
    } finally {
      ustanovitZagruzku(false)
    }
  }

  const voshod = async (email, parol) => {
    try {
      if (email === 'admin@example.com' && parol === 'admin') {
        const dannye = {
          token: 'fake-token',
          polzovatel: { 
            id: 1, 
            imya: 'Admin', 
            email: 'admin@example.com',
            rol: 'admin'
          }
        }
        localStorage.setItem('token', dannye.token)
        ustanovitPolzovatelya(dannye.polzovatel)
        return { uspeh: true }
      } else if (email === 'user@example.com' && parol === 'user') {
        const dannye = {
          token: 'fake-token',
          polzovatel: { 
            id: 2, 
            imya: 'User', 
            email: 'user@example.com',
            rol: 'user',
            skidka: 20 // ← ДОБАВЬТЕ ЗНАЧЕНИЕ СКИДКИ ЗДЕСЬ
          }
        }
        localStorage.setItem('token', dannye.token)
        ustanovitPolzovatelya(dannye.polzovatel)
        return { uspeh: true }
      } else {
        throw new Error('Неправильный email или пароль')
      }
    } catch (oshibka) {
      return { uspeh: false, oshibka: oshibka.message }
    }
  }

  const vihod = () => {
    localStorage.removeItem('token')
    ustanovitPolzovatelya(null)
  }

  return (
    <KontekstAvtorizacii.Provider value={{
      polzovatel,
      zagruzka,
      voshod,
      vihod,
      proveritAvtorizaciyu
    }}>
      {children}
    </KontekstAvtorizacii.Provider>
  )
}

export const ispolzovanieAvtorizacii = () => {
  const context = useContext(KontekstAvtorizacii)
  if (!context) {
    throw new Error('ispolzovanieAvtorizacii должен использоваться внутри PostavshikAvtorizacii')
  }
  return context
}