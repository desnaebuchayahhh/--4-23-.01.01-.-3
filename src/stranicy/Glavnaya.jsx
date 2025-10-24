import Knopka from '../interfejs/Knopka.jsx'

const Glavnaya = () => {
  return (
    <div className="stranica-glavnaya">
      <section className="geroy-banner">
        <div className="soderzhanie-geroya">
          <h1 className="zagolovok-geroya">ДОБРО ПОЖАЛОВАТЬ В ДЕСНАШОП!</h1>
          <p className="podzagolovok-geroya">
            Откройте для себя одежду уже сегодня.
          </p>
          <Knopka 
            stil="pervichnaya" 
            razmer="krupnyi"
            naKlik={() => window.location.href = '/katalog'}
          >
            Смотреть коллекцию
          </Knopka>
        </div>
      </section>

      <section className="preimushchestva">
        <div className="setka-preimushchestv">
          <div className="kartochka-preimushchestva">
            <h3>Качество</h3>
            <p>Премиум материалы и мастерство изготовления</p>
          </div>
          <div className="kartochka-preimushchestva">
            <h3>Стиль</h3>
            <p>Вечная классика в монохромных тонах</p>
          </div>
          <div className="kartochka-preimushchestva">
            <h3>Универсальность</h3>
            <p>Подходит для любых событий и ситуаций</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Glavnaya