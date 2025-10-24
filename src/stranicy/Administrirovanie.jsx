import { ispolzovanieAvtorizacii } from '../kontekst/KontekstAutorizacii.jsx'
import Knopka from '../interfejs/Knopka.jsx'

const Administrirovanie = () => {
  const { polzovatel } = ispolzovanieAvtorizacii()

  if (!polzovatel || polzovatel.rol !== 'admin') {
    return (
      <div className="stranica-administrirovaniya">
        <h1>Доступ запрещен</h1>
        <p>У вас нет прав для доступа к этой странице</p>
      </div>
    )
  }

  return (
    <div className="stranica-administrirovaniya">
      <h1>Панель администрирования</h1>
      <p>Здесь будет управление магазином</p>
    </div>
  )
}

export default Administrirovanie