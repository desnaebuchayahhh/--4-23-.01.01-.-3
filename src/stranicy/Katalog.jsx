import { useState, useEffect } from 'react'
import { ispolzovanieApi } from '../huki/ispolzovanie-api.js'
import SetkaTovarov from '../katalog/Setka-tovarov.jsx'
import Zagruzka from '../interfejs/Zagruzka.jsx'

const Katalog = ({ vibrannieKategorii }) => {
  const [tovari, ustanovitTovari] = useState([])
  const { dannie, zagruzka, oshibka } = ispolzovanieApi('/api/tovari')

  useEffect(() => {
    if (dannie) {
      ustanovitTovari(dannie)
    }
  }, [dannie])

  const filtritTovari = () => {
    if (vibrannieKategorii.length === 0) {
      return tovari
    }
    return tovari.filter(tovar => 
      vibrannieKategorii.includes(tovar.kategoriyaId)
    )
  }

  if (zagruzka) return <Zagruzka />
  if (oshibka) return <div className="soobshchenie-ob-oshibke">Ошибка: {oshibka}</div>

  const otfiltrovannieTovari = filtritTovari()

  return (
    <div className="stranica-kataloga">
      <h1 className="zagolovok-kataloga">Каталог одежды</h1>
      <p className="opisanie-kataloga">
        {otfiltrovannieTovari.length} товаров найдено
      </p>
      <SetkaTovarov tovari={otfiltrovannieTovari} />
    </div>
  )
}

export default Katalog