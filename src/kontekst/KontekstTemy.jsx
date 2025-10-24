import { createContext, useContext, useState, useEffect } from 'react'

const KontekstTemy = createContext()

export const PostavshikTemy = ({ children }) => {
  const [temnayaTema, ustanovitTemnuyuTemu] = useState(false)

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const isDark = savedTheme === 'dark'
      ustanovitTemnuyuTemu(isDark)
 
      if (isDark) {
        document.documentElement.classList.add('temnaya-tema')
        document.documentElement.classList.remove('svetlaya-tema')
      } else {
        document.documentElement.classList.add('svetlaya-tema')
        document.documentElement.classList.remove('temnaya-tema')
      }
    }
  }, [])


  useEffect(() => {
    if (temnayaTema) {
      document.documentElement.classList.add('temnaya-tema')
      document.documentElement.classList.remove('svetlaya-tema')
      document.body.style.backgroundColor = '#000000'
      document.body.style.color = '#ffffff'
    } else {
      document.documentElement.classList.add('svetlaya-tema')
      document.documentElement.classList.remove('temnaya-tema')
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#000000'
    }
  }, [temnayaTema])

  const pereklyuchitTemu = () => {
    const newTheme = !temnayaTema
    ustanovitTemnuyuTemu(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <KontekstTemy.Provider value={{
      temnayaTema,
      pereklyuchitTemu
    }}>
      {children}
    </KontekstTemy.Provider>
  )
}

export const ispolzovanieTemy = () => {
  const context = useContext(KontekstTemy)
  if (!context) {
    throw new Error('ispolzovanieTemy dolzhen ispolzovatsya vnutri PostavshikTemy')
  }
  return context
}