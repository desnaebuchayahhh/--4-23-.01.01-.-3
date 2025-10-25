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


  if (zagruzka) return (
    <div className="stranica-kataloga">
      <h1 className="zagolovok-kataloga">Каталог одежды</h1>
      <Zagruzka size="large" text="Загружаем товары..." />
    </div>
  )

  
  if (oshibka) return (
    <div className="stranica-kataloga">
      <h1 className="zagolovok-kataloga">Каталог одежды</h1>
      <div className="soobshchenie-ob-oshibke" style={{
        padding: '2rem',
        textAlign: 'center',
        border: '2px solid #e74c3c',
        background: '#fee',
        color: '#c62828',
        margin: '2rem 0'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Ошибка загрузки каталога</h3>
        <p style={{ marginBottom: '1.5rem' }}>{oshibka}</p>
        <button 
          className="knopka knopka--primary"
          onClick={() => window.location.reload()}
        >
          ПОВТОРИТЬ ПОПЫТКУ
        </button>
      </div>
    </div>
  )

 
  if (!tovari || tovari.length === 0) {
    return (
      <div className="stranica-kataloga">
        <h1 className="zagolovok-kataloga">Каталог одежды</h1>
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          border: '2px solid var(--cherniy)',
          background: 'var(--beliy)'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Товары не найдены
          </p>
          <p style={{ color: 'var(--seriy-temnyi)' }}>
            Попробуйте изменить параметры фильтрации
          </p>
        </div>
      </div>
    )
  }

  const otfiltrovannieTovari = filtritTovari()

  
  if (otfiltrovannieTovari.length === 0 && vibrannieKategorii.length > 0) {
    return (
      <div className="stranica-kataloga">
        <h1 className="zagolovok-kataloga">Каталог одежды</h1>
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          border: '2px solid var(--cherniy)',
          background: 'var(--beliy)'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Товары не найдены в выбранных категориях
          </p>
          <p style={{ color: 'var(--seriy-temnyi)' }}>
            Попробуйте выбрать другие категории
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="stranica-kataloga">
      <h1 className="zagolovok-kataloga">Каталог одежды</h1>
      <p className="opisanie-kataloga">
        {otfiltrovannieTovari.length} товаров найдено
        {vibrannieKategorii.length > 0 && ` в ${vibrannieKategorii.length} категориях`}
      </p>
      <SetkaTovarov tovari={otfiltrovannieTovari} />
    </div>
  )
}

export default Katalog