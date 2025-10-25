import { useState, useEffect } from 'react'
import { PostavshikKorziny } from './kontekst/KontekstKorziny.jsx'
import { PostavshikTemy } from './kontekst/KontekstTemy.jsx'
import { PostavshikAvtorizacii } from './kontekst/KontekstAvtorizacii.jsx'
import { ispolzovanieKorziny } from './kontekst/KontekstKorziny.jsx'
import { ispolzovanieTemy } from './kontekst/KontekstTemy.jsx'
import { ispolzovanieAvtorizacii } from './kontekst/KontekstAvtorizacii.jsx'
import FormaAvtorizacii from './avtorizaciya/Forma-avtorizacii.jsx'
import { logDeystvie, logAdminDeystvie, logKorzinaDeystvie } from './huki/ispolzovanie-api.js'
import './App.css'

const nachalnieTovari = [
  {
    id: 1,
    name: 'МЫ ДЕТИ',
    description: 'Футболка для отталкивания ЖЕНСКОГО внимания',
    price: 2990,
    category: 'ФУТБОЛКИ',
    image: 'https://granhetl.com/static/itemsphoto/502_1.jpg'
  },
  {
    id: 2,
    name: '(Г/Р)АДОСТЬ ',
    description: 'НА РАДОСТЬ ВСЕМ Майка с надписью и необр. рукавами',
    price: 4990,
    category: 'МАЙКИ',
    image: 'https://addzip.ru/_next/image?url=https%3A%2F%2Fcdnmedia.addzip.ru%2Fproducts%2F10533859-5ef3-4f85-9f34-d383c4c5738e%2FUOC3f8BKQXDhqpYqlqIFy5tVsAy5wp-Yb5BWZpIqh3kEeoklZRoHDJP3wQc3mSWz5mCUOz2tx0d8WoK49yfQqDYc.jpg&w=750&q=75'
  },
  {
    id: 3,
    name: 'ДЖИНСЫ БЛИЗНЕЦЫ',
    description: 'Прекол)))))',
    price: 5990,
    category: 'БРЮКИ',
    image: 'https://i.etsystatic.com/54300523/r/il/69eccf/6835393463/il_300x300.6835393463_f1jh.jpg'
  },
  {
    id: 4,
    name: 'ЦЕПЬ',
    description: 'Для диалога',
    price: 7990,
    category: 'ЦЕПИ',
    image: 'https://yponton.ru/wp-content/uploads/2021/10/11.jpg'
  },
  {
    id: 5,
    name: 'СКАЗ О ДВУХ',
    description: 'Пальто с павлом мазком',
    price: 3990,
    category: 'ВЕРХНЯЯ ОДЕЖДА',
    image: 'https://granhetl.com/static/itemsphoto/1649_1.jpg'
  },
  {
    id: 6,
    name: 'ПРОКОЛЫ',
    description: 'Шарф с люверсами',
    price: 3490,
    category: 'АКСЕССУАРЫ',
    image: 'https://granhetl.com/static/itemsphoto/1652_1.jpg'
  }
]

const kategorii = ['ВСЕ ТОВАРЫ', 'ФУТБОЛКИ', 'ЦЕПИ', 'БРЮКИ', 'МАЙКИ', 'ВЕРХНЯЯ ОДЕЖДА', 'АКСЕССУАРЫ']

const FormaRedaktirovaniyaTovara = ({ tovar, naSokhranenie, naOtmenu }) => {
  const [nazvanie, ustanovitNazvanie] = useState(tovar.name)
  const [opisanie, ustanovitOpisanie] = useState(tovar.description)
  const [cena, ustanovitCenu] = useState(tovar.price)

  const obrabotatSokhranenie = (e) => {
    e.preventDefault()
    naSokhranenie({
      ...tovar,
      name: nazvanie,
      description: opisanie,
      price: parseInt(cena)
    })
  }

  return (
    <div className="overlay">
      <div className="forma-avtorizacii" style={{
        background: 'var(--beliy)',
        border: '2px solid var(--cherniy)',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        position: 'relative'
      }}>
        <div className="zagolovok-formi" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--cherniy)',
          paddingBottom: '1rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--cherniy)',
            margin: 0
          }}>
            РЕДАКТИРОВАТЬ ТОВАР
          </h2>
          <button 
            className="knopka-zakritiya" 
            onClick={naOtmenu}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              color: 'var(--cherniy)',
              lineHeight: 1
            }}
          >×</button>
        </div>
        
        <form onSubmit={obrabotatSokhranenie}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 700,
              color: 'var(--cherniy)',
              textTransform: 'uppercase'
            }}>НАЗВАНИЕ</label>
            <input
              type="text"
              value={nazvanie}
              onChange={(e) => ustanovitNazvanie(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--cherniy)',
                background: 'var(--beliy)',
                color: 'var(--cherniy)',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 700,
              color: 'var(--cherniy)',
              textTransform: 'uppercase'
            }}>ОПИСАНИЕ</label>
            <textarea
              value={opisanie}
              onChange={(e) => ustanovitOpisanie(e.target.value)}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--cherniy)',
                background: 'var(--beliy)',
                color: 'var(--cherniy)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 700,
              color: 'var(--cherniy)',
              textTransform: 'uppercase'
            }}>ЦЕНА (₽)</label>
            <input
              type="number"
              value={cena}
              onChange={(e) => ustanovitCenu(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--cherniy)',
                background: 'var(--beliy)',
                color: 'var(--cherniy)',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="button" 
              className="knopka"
              onClick={naOtmenu}
              style={{ flex: 1 }}
            >
              ОТМЕНА
            </button>
            <button 
              type="submit" 
              className="knopka knopka--primary"
              style={{ flex: 1 }}
            >
              СОХРАНИТЬ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const KorzinaStranica = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = ispolzovanieKorziny()
  const { polzovatel } = ispolzovanieAvtorizacii()

  const rasschitatCenuSoSkidkoi = (cena) => {
    if (polzovatel && polzovatel.skidka) {
      return Math.round(cena * (1 - polzovatel.skidka / 100))
    }
    return cena
  }

  const obshayaStoimost = getTotalPrice()
  const stoimostSoSkidkoi = polzovatel && polzovatel.skidka 
    ? Math.round(obshayaStoimost * (1 - polzovatel.skidka / 100))
    : obshayaStoimost

  const obrabotatUdalenie = (item) => {
    removeItem(item.id)
    logKorzinaDeystvie('УДАЛЕН ИЗ КОРЗИНЫ', polzovatel, item)
  }

  const obrabotatIzmenenieKolichestva = (itemId, novoeKolichestvo) => {
    updateQuantity(itemId, novoeKolichestvo)
    const item = items.find(i => i.id === itemId)
    if (item) {
      logKorzinaDeystvie('ИЗМЕНЕНО КОЛИЧЕСТВО', polzovatel, item, novoeKolichestvo)
    }
  }

  const obrabotatOchistkuKorziny = () => {
    clearCart()
    logDeystvie('ОЧИЩЕНА КОРЗИНА', polzovatel)
  }

  if (items.length === 0) {
    return (
      <div className="stranica-korziny">
        <h1 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase'}}>
          КОРЗИНА
        </h1>
        <div className="pustaya-korzina">
          <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>Ваша корзина пуста</p>
          <button 
            className="knopka knopka--primary"
            onClick={() => window.location.href = '#katalog'}
          >
            ПРОДОЛЖИТЬ ПОКУПКИ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="stranica-korziny">
      <h1 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase'}}>
        КОРЗИНА ({items.reduce((sum, item) => sum + item.quantity, 0)} товаров)
      </h1>
      
      {polzovatel && polzovatel.skidka && (
        <div style={{
          background: 'var(--cherniy)',
          color: 'var(--beliy)',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          🎉 ВАША СКИДКА {polzovatel.skidka}% АКТИВИРОВАНА!
        </div>
      )}
      
      <div className="spisok-tovarov">
        {items.map(item => (
          <div key={item.id} className="element-korziny">
            <div className="izobrazhenie-elementa">
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div className="informaciya-elementa">
              <h3 className="nazvanie-elementa">{item.name}</h3>
              <p className="opisanie-elementa">{item.description}</p>
              <div className="cena-elementa">
                {polzovatel && polzovatel.skidka ? (
                  <>
                    <span style={{textDecoration: 'line-through', color: 'var(--seriy-temnyi)'}}>
                      {item.originalPrice || item.price} ₽
                    </span>
                    <span className="tekushaya-cena" style={{color: '#e74c3c', marginLeft: '1rem'}}>
                      {rasschitatCenuSoSkidkoi(item.originalPrice || item.price)} ₽
                    </span>
                  </>
                ) : (
                  <span className="tekushaya-cena">{item.price} ₽</span>
                )}
              </div>
            </div>

            <div className="upravlenie-kolichestvom">
              <button 
                className="knopka-kolichestva"
                onClick={() => obrabotatIzmenenieKolichestva(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="znachenie-kolichestva">{item.quantity}</span>
              <button 
                className="knopka-kolichestva"
                onClick={() => obrabotatIzmenenieKolichestva(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="deystviya-elementa">
              <button 
                className="knopka-udaleniya"
                onClick={() => obrabotatUdalenie(item)}
              >
                УДАЛИТЬ
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="itogo-korzina">
        {polzovatel && polzovatel.skidka && (
          <>
            <div className="stroka-itogo">
              <span>Сумма без скидки:</span>
              <span>{obshayaStoimost} ₽</span>
            </div>
            <div className="stroka-itogo">
              <span>Скидка {polzovatel.skidka}%:</span>
              <span style={{color: '#27ae60'}}>-{obshayaStoimost - stoimostSoSkidkoi} ₽</span>
            </div>
          </>
        )}
        <div className="stroka-itogo obshaya-stoimost">
          <span>Общая стоимость:</span>
          <span>{stoimostSoSkidkoi} ₽</span>
        </div>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem'}}>
          <button className="knopka knopka--secondary" onClick={obrabotatOchistkuKorziny}>
            ОЧИСТИТЬ КОРЗИНУ
          </button>
          <button className="knopka knopka--primary">
            ОФОРМИТЬ ЗАКАЗ
          </button>
        </div>
      </div>
    </div>
  )
}

const Zagolovok = ({ currentPage, onNavigate }) => {
  const { getTotalItems } = ispolzovanieKorziny()
  const { temnayaTema, pereklyuchitTemu } = ispolzovanieTemy()
  const { polzovatel, vihod } = ispolzovanieAvtorizacii()
  const [pokazatFormu, ustanovitPokazatFormu] = useState(false)

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

  const obrabotatVihod = () => {
    logDeystvie('ВЫШЕЛ ИЗ СИСТЕМЫ', polzovatel)
    vihod()
  }

  return (
    <header className="zagolovok">
      <div className="soderzhanie-zagolovka">
        <div className="logo" onClick={() => onNavigate('glavnaya')}>
          ДЕСНАШОП
        </div>
        
        <nav className="navigaciya">
          <button 
            className={`knopka-navigacii ${currentPage === 'glavnaya' ? 'aktivnaya' : ''}`}
            onClick={() => onNavigate('glavnaya')}
          >
            ГЛАВНАЯ
          </button>
          <button 
            className={`knopka-navigacii ${currentPage === 'katalog' ? 'aktivnaya' : ''}`}
            onClick={() => onNavigate('katalog')}
          >
            КАТАЛОГ
          </button>
          <button 
            className={`knopka-navigacii knopka-korziny ${currentPage === 'korzina' ? 'aktivnaya' : ''}`}
            onClick={() => onNavigate('korzina')}
          >
            КОРЗИНА
            {getTotalItems() > 0 && (
              <span className="schetchik-korziny">
                {getTotalItems()}
              </span>
            )}
          </button>
          
          <button 
            className="knopka-temy"
            onClick={pereklyuchitTemu}
          >
            {temnayaTema ? 'СВЕТЛАЯ' : 'ТЕМНАЯ'}
          </button>

          {polzovatel ? (
            <div className="profil-polzovatelya">
              <span className="imya-polzovatelya">
                Привет, {polzovatel.imya}
                {polzovatel.skidka && ` (${polzovatel.skidka}% скидка)`}
              </span>
              {polzovatel.rol === 'admin' && (
                <button 
                  className="knopka-navigacii"
                  onClick={() => onNavigate('administrirovanie')}
                >
                  АДМИН
                </button>
              )}
              <button 
                className="knopka-navigacii"
                onClick={obrabotatVihod}
              >
                ВЫХОД
              </button>
            </div>
          ) : (
            <button 
              className="knopka-navigacii"
              onClick={() => ustanovitPokazatFormu(true)}
            >
              ВОЙТИ
            </button>
          )}
        </nav>
      </div>

      {pokazatFormu && (
        <FormaAvtorizacii naZakritie={() => ustanovitPokazatFormu(false)} />
      )}
    </header>
  )
}

const KartochkaTovara = ({ tovar, naRedaktirovanie, polzovatel }) => {
  const { addItem } = ispolzovanieKorziny()

  const rasschitatCenuSoSkidkoi = (cena) => {
    if (polzovatel && polzovatel.skidka) {
      return Math.round(cena * (1 - polzovatel.skidka / 100))
    }
    return cena
  }

  const obrabotatDobavlenieVKorzinu = () => {
    const tovarSKorrekcieiCeni = {
      ...tovar,
      originalPrice: tovar.price,
      price: rasschitatCenuSoSkidkoi(tovar.price)
    }
    addItem(tovarSKorrekcieiCeni)
    alert('Товар добавлен в корзину!')
    logKorzinaDeystvie('ДОБАВЛЕН В КОРЗИНУ', polzovatel, tovar)
  }

  return (
    <div className="kartochka-tovara">
      <div className="izobrazhenie-tovara">
        <img 
          src={tovar.image} 
          alt={tovar.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {polzovatel && polzovatel.rol === 'admin' && (
          <button 
            onClick={() => naRedaktirovanie(tovar)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'var(--beliy)',
              color: 'var(--cherniy)',
              border: '2px solid var(--cherniy)',
              padding: '0.5rem',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}
          >
            ✎
          </button>
        )}
      </div>
      <div className="informaciya-tovara">
        <h3 className="nazvanie-tovara">{tovar.name}</h3>
        <p className="opisanie-tovara">{tovar.description}</p>
        <div className="cena-tovara">
          {polzovatel && polzovatel.skidka ? (
            <>
              <span style={{textDecoration: 'line-through', color: 'var(--seriy-temnyi)'}}>
                {tovar.price} ₽
              </span>
              <span className="tekushaya-cena" style={{color: '#e74c3c', marginLeft: '1rem'}}>
                {rasschitatCenuSoSkidkoi(tovar.price)} ₽
              </span>
              <span className="znachok-skidki" style={{background: '#27ae60'}}>
                -{polzovatel.skidka}%
              </span>
            </>
          ) : (
            <span className="tekushaya-cena">{tovar.price} ₽</span>
          )}
        </div>
        <button 
          className="knopka-dobavleniya-v-korzinu"
          onClick={obrabotatDobavlenieVKorzinu}
        >
          ДОБАВИТЬ В КОРЗИНУ
        </button>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('glavnaya')
  const [vibrannayaKategoriya, setVibrannayaKategoriya] = useState('ВСЕ ТОВАРЫ')
  const [tovari, ustanovitTovari] = useState(nachalnieTovari)
  const [redaktiruemyiTovar, ustanovitRedaktiruemyiTovar] = useState(null)
  const { polzovatel } = ispolzovanieAvtorizacii()
  const { temnayaTema } = ispolzovanieTemy()

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory')
    const savedPage = localStorage.getItem('currentPage')
    if (savedCategory) setVibrannayaKategoriya(savedCategory)
    if (savedPage) setCurrentPage(savedPage)
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedCategory', vibrannayaKategoriya)
  }, [vibrannayaKategoriya])

  const sokhranitIzmeneniyaTovara = (obnovlennyiTovar) => {
    const obnovlennieTovari = tovari.map(tovar => 
      tovar.id === obnovlennyiTovar.id ? obnovlennyiTovar : tovar
    )
    ustanovitTovari(obnovlennieTovari)
    ustanovitRedaktiruemyiTovar(null)
    logAdminDeystvie('ОТРЕДАКТИРОВАН ТОВАР', obnovlennyiTovar)
  }

  const otfiltrovannieTovari = vibrannayaKategoriya === 'ВСЕ ТОВАРЫ' 
    ? tovari 
    : tovari.filter(tovar => tovar.category === vibrannayaKategoriya)

  const renderPage = () => {
    switch (currentPage) {
      case 'katalog': 
        return (
          <div>
            <h1 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase'}}>
              КАТАЛОГ ТОВАРОВ
            </h1>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--seriy-temnyi)'}}>
              Найдено товаров: {otfiltrovannieTovari.length}
              {polzovatel && polzovatel.skidka && ` (Ваша скидка ${polzovatel.skidka}% активна)`}
            </p>
            <div className="setka-tovarov">
              {otfiltrovannieTovari.map(tovar => (
                <KartochkaTovara 
                  key={tovar.id} 
                  tovar={tovar}
                  polzovatel={polzovatel}
                  naRedaktirovanie={ustanovitRedaktiruemyiTovar}
                />
              ))}
            </div>
          </div>
        )
      case 'korzina': 
        return <KorzinaStranica />
      case 'administrirovanie': 
        return (
          <div>
            <h1 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase'}}>
              ПАНЕЛЬ АДМИНИСТРАТОРА
            </h1>
            <div style={{
              border: '2px solid var(--cherniy)',
              padding: '2rem',
              background: 'var(--beliy)',
              marginBottom: '2rem'
            }}>
              <h2 style={{marginBottom: '1rem'}}>Управление товарами</h2>
              <p>Для редактирования товара нажмите на значок ✎ в карточке товара в каталоге.</p>
            </div>
          </div>
        )
      default: 
        return (
          <div>
            <section className="geroy-banner">
              <div className="soderzhanie-geroya">
                <h1 className="zagolovok-geroya">ДОБРО ПОЖАЛОВАТЬ В ДЕСНАШОП!</h1>
                <p className="podzagolovok-geroya">
                  Откройте для себя одежду...
                  {polzovatel && polzovatel.skidka && ` Ваша скидка ${polzovatel.skidka}% активна!`}
                </p>
                <button 
                  className="knopka knopka--primary"
                  onClick={() => setCurrentPage('katalog')}
                >
                  СМОТРЕТЬ КАТАЛОГ
                </button>
              </div>
            </section>
            
            <section style={{padding: '4rem 0', textAlign: 'center'}}>
              <h2 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase'}}>
                ИЗБРАННЫЕ ТОВАРЫ
              </h2>
              <div className="setka-tovarov">
                {tovari.slice(0, 4).map(tovar => (
                  <KartochkaTovara 
                    key={tovar.id} 
                    tovar={tovar}
                    polzovatel={polzovatel}
                    naRedaktirovanie={ustanovitRedaktiruemyiTovar}
                  />
                ))}
              </div>
            </section>
          </div>
        )
    }
  }

  return (
    <div className={temnayaTema ? "temnaya-tema" : "svetlaya-tema"}>
      <Zagolovok currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="main-container">
        <aside className="bokovaya-panel">
          <h3 className="zagolovok-kategorii">КАТЕГОРИИ</h3>
          <ul className="spisok-kategorii">
            {kategorii.map(kategoriya => (
              <li 
                key={kategoriya}
                className="element-kategorii"
                onClick={() => setVibrannayaKategoriya(kategoriya)}
                style={{
                  background: vibrannayaKategoriya === kategoriya ? 'var(--cherniy)' : 'transparent',
                  color: vibrannayaKategoriya === kategoriya ? 'var(--beliy)' : 'var(--cherniy)'
                }}
              >
                {kategoriya}
              </li>
            ))}
          </ul>
        </aside>
        
        <main className="osnovnoy-kontent">
          {renderPage()}
        </main>
      </div>

      {redaktiruemyiTovar && (
        <FormaRedaktirovaniyaTovara 
          tovar={redaktiruemyiTovar}
          naSokhranenie={sokhranitIzmeneniyaTovara}
          naOtmenu={() => ustanovitRedaktiruemyiTovar(null)}
        />
      )}

      <footer className="podval">
        <div className="soderzhanie-podvala">
          <p style={{fontSize: '1.2rem', fontWeight: 600}}>
            &copy; 2025 ДЕСНАШОП.
          </p>
          <p style={{marginTop: '1rem', opacity: 0.8}}>
            Магазин для избранных
          </p>
        </div>
      </footer>
    </div>
  )
}

function AppSProviderami() {
  return (
    <PostavshikTemy>
      <PostavshikKorziny>
        <PostavshikAvtorizacii>
          <App />
        </PostavshikAvtorizacii>
      </PostavshikKorziny>
    </PostavshikTemy>
  )
}

export default AppSProviderami