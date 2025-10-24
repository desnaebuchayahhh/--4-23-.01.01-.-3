import KartochkaTovara from './Kartochka-tovara.jsx'

const SetkaTovarov = ({ tovari }) => {
  if (tovari.length === 0) {
    return (
      <div className="net-tovarov">
        <p>Товары по данным фильтрам не найдены</p>
      </div>
    )
  }

  return (
    <div className="setka-tovarov">
      {tovari.map(tovar => (
        <KartochkaTovara key={tovar.id} tovar={tovar} />
      ))}
    </div>
  )
}

export default SetkaTovarov