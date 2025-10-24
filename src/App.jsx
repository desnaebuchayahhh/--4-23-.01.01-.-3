import { useState, useEffect } from 'react'
import { PostavshikKorziny } from './kontekst/KontekstKorziny.jsx'
import { PostavshikTemy } from './kontekst/KontekstTemy.jsx'
import { PostavshikAvtorizacii } from './kontekst/KontekstAvtorizacii.jsx'
import { ispolzovanieKorziny } from './kontekst/KontekstKorziny.jsx'
import { ispolzovanieTemy } from './kontekst/KontekstTemy.jsx'
import { ispolzovanieAvtorizacii } from './kontekst/KontekstAvtorizacii.jsx'
import FormaAvtorizacii from "./avtorizaciya/Forma-avtorizacii.jsx"
import './App.css'

const mockTovari = [
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

const KorzinaStranica = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = ispolzovanieKorziny()

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
                <span className="tekushaya-cena">{item.price} ₽</span>
              </div>
            </div>

            <div className="upravlenie-kolichestvom">
              <button 
                className="knopka-kolichestva"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="znachenie-kolichestva">{item.quantity}</span>
              <button 
                className="knopka-kolichestva"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="deystviya-elementa">
              <button 
                className="knopka-udaleniya"
                onClick={() => removeItem(item.id)}
              >
                УДАЛИТЬ
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="itogo-korzina">
        <div className="stroka-itogo">
          <span>Промежуточная сумма:</span>
          <span>{getTotalPrice()} ₽</span>
        </div>
        <div className="stroka-itogo obshaya-stoimost">
          <span>Общая стоимость:</span>
          <span>{getTotalPrice()} ₽</span>
        </div>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem'}}>
          <button className="knopka knopka--secondary" onClick={clearCart}>
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
          
          {/* Кнопка переключения темы */}
          <button 
            className="knopka-temy"
            onClick={pereklyuchitTemu}
          >
            {temnayaTema ? 'СВЕТЛАЯ' : 'ТЕМНАЯ'}
          </button>

          {/* Кнопка авторизации */}
          {polzovatel ? (
            <div className="profil-polzovatelya">
              <span className="imya-polzovatelya">Привет, {polzovatel.imya}</span>
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
                onClick={vihod}
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

      {/* Модальное окно авторизации */}
      {pokazatFormu && (
        <FormaAvtorizacii naZakritie={() => ustanovitPokazatFormu(false)} />
      )}
    </header>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('glavnaya')
  const [vibrannayaKategoriya, setVibrannayaKategoriya] = useState('ВСЕ ТОВАРЫ')
  const { addItem } = ispolzovanieKorziny()
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

  const otfiltrovannieTovari = vibrannayaKategoriya === 'ВСЕ ТОВАРЫ' 
    ? mockTovari 
    : mockTovari.filter(tovar => tovar.category === vibrannayaKategoriya)

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
            </p>
            <div className="setka-tovarov">
              {otfiltrovannieTovari.map(tovar => (
                <div key={tovar.id} className="kartochka-tovara">
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
                  </div>
                  <div className="informaciya-tovara">
                    <h3 className="nazvanie-tovara">{tovar.name}</h3>
                    <p className="opisanie-tovara">{tovar.description}</p>
                    <div className="cena-tovara">
                      <span className="tekushaya-cena">{tovar.price} ₽</span>
                    </div>
                    <button 
                      className="knopka-dobavleniya-v-korzinu"
                      onClick={() => {
                        addItem(tovar)
                        alert('Товар добавлен в корзину!')
                      }}
                    >
                      ДОБАВИТЬ В КОРЗИНУ
                    </button>
                  </div>
                </div>
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
              АДМИНИСТРИРОВАНИЕ
            </h1>
            <p style={{fontSize: '1.2rem'}}>Панель управления магазином</p>
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
                {mockTovari.slice(0, 4).map(tovar => (
                  <div key={tovar.id} className="kartochka-tovara">
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
                    </div>
                    <div className="informaciya-tovara">
                      <h3 className="nazvanie-tovara">{tovar.name}</h3>
                      <p className="opisanie-tovara">{tovar.description}</p>
                      <div className="cena-tovara">
                        <span className="tekushaya-cena">{tovar.price} ₽</span>
                      </div>
                      <button 
                        className="knopka-dobavleniya-v-korzinu"
                        onClick={() => {
                          addItem(tovar)
                          alert('Товар добавлен в корзину!')
                        }}
                      >
                        ДОБАВИТЬ В КОРЗИНУ
                      </button>
                    </div>
                  </div>
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