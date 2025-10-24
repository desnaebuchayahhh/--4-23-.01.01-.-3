import { ispolzovanieApi } from '../huki/ispolzovanie-api.js'

const BokovayaPanel = ({ naIzmenenieKategorii, vibrannieKategorii }) => {
  const { dannie: kategorii, zagruzka, oshibka } = ispolzovanieApi('/api/kategorii')
  
  const obrabotatIzmenenieKategorii = (idKategorii) => {
    const novieKategorii = vibrannieKategorii.includes(idKategorii)
      ? vibrannieKategorii.filter(id => id !== idKategorii)
      : [...vibrannieKategorii, idKategorii]
    
    naIzmenenieKategorii(novieKategorii)
  }

  if (zagruzka) return <div className="bokovaya-panel">Загрузка категорий...</div>
  if (oshibka) return <div className="bokovaya-panel">Ошибка загрузки категорий</div>

  return (
    <aside className="bokovaya-panel">
      <h3 className="zagolovok-kategorii">Категории</h3>
      <ul className="spisok-kategorii">
        {kategorii?.map(kategoriya => (
          <li key={kategoriya.id} className="element-kategorii">
            <label className="metka-kategorii">
              <input
                type="checkbox"
                className="fon-kategorii"
                checked={vibrannieKategorii.includes(kategoriya.id)}
                onChange={() => obrabotatIzmenenieKategorii(kategoriya.id)}
              />
              {kategoriya.nazvanie}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default BokovayaPanel