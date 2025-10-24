import { ispolzovanieKorziny } from '../kontekst/KontekstKorziny.jsx'

const KartochkaTovara = ({ tovar }) => {
  const { addItem } = ispolzovanieKorziny()

  const obrabotatDobavlenieVKorzinu = () => {
    addItem(tovar)
    alert('Товар добавлен в корзину!')
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
      </div>
      <div className="informaciya-tovara">
        <h3 className="nazvanie-tovara">{tovar.name}</h3>
        <p className="opisanie-tovara">{tovar.description}</p>
        <div className="cena-tovara">
          <span className="tekushaya-cena">{tovar.price} ₽</span>
        </div>
        <button 
          className="knopka-dobavleniya-v-korzinu"
          onClick={obrabotatDobavlenieVKorzinu}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  )
}

export default KartochkaTovara