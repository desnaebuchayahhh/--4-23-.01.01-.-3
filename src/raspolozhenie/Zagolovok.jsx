
  import { ispolzovanieAvtorizacii } from './kontekst/KontekstAutorizacii.jsx'
  import FormaAvtorizacii from './autorizaciya/Forma-autorizacii.jsx'


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
            
      
            <button 
              className="knopka-temy"
              onClick={pereklyuchitTemu}
            >
              {temnayaTema ? 'СВЕТЛАЯ' : 'ТЕМНАЯ'}
            </button>

            
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

        {}
        {pokazatFormu && (
          <FormaAvtorizacii naZakritie={() => ustanovitPokazatFormu(false)} />
        )}
      </header>
    )
  }