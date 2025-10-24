import { ispolzovanieKorziny } from '../kontekst/KontekstKorziny.jsx'

const ElementKorziny = ({ element }) => {
  const { removeItem, updateQuantity } = ispolzovanieKorziny()

  const obrabotatUvelichenie = () => {
    updateQuantity(element.id, element.quantity + 1)
  }

  const obrabotatUmenshenie = () => {
    if (element.quantity > 1) {
      updateQuantity(element.id, element.quantity - 1)
    }
  }

  const obrabotatUdalit = () => {
    removeItem(element.id)
  }

  return (
    <div className="element-korziny">
      <div className="izobrazhenie-elementa">
        <img 
          src={element.image} 
          alt={element.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      <div className="informaciya-elementa">
        <h3 className="nazvanie-elementa">{element.name}</h3>
        <p className="opisanie-elementa">{element.description}</p>
        <div className="cena-elementa">
          <span className="tekushaya-cena">{element.price} ₽</span>
        </div>
      </div>

      <div className="upravlenie-kolichestvom">
        <button className="knopka-kolichestva" onClick={obrabotatUmenshenie}>-</button>
        <span className="znachenie-kolichestva">{element.quantity}</span>
        <button className="knopka-kolichestva" onClick={obrabotatUvelichenie}>+</button>
      </div>

      <div className="deystviya-elementa">
        <button className="knopka-udaleniya" onClick={obrabotatUdalit}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default ElementKorziny