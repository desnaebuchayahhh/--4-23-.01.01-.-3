import { useState } from 'react'
import { ispolzovanieKorziny } from '../kontekst/KontekstKorziny.jsx'
import { ispolzovanieAvtorizacii } from '../kontekst/KontekstAutorizacii.jsx'
import ElementKorziny from '../korzina/ElementKorziny.jsx'
import Knopka from '../interfejs/Knopka.jsx'

const Korzina = () => {
  const { elementi, skidka, primenitSkidku, poluchitObshuyuStoimost, ochistitKorzinu } = ispolzovanieKorziny()
  const { polzovatel } = ispolzovanieAvtorizacii()
  const [kodSkidki, ustanovitKodSkidki] = useState('')

  const obrabotatPrimenenieSkidki = () => {
    primenitSkidku(kodSkidki)
  }

  if (elementi.length === 0) {
    return (
      <div className="stranica-korziny">
        <h1>Korzina</h1>
        <div className="pustaya-korzina">
          <p>Vasha korzina pusta</p>
          <Knopka stil="pervichnaya" naKlik={() => window.location.href = '#katalog'}>
            Pereyti v katalog
          </Knopka>
        </div>
      </div>
    )
  }

  return (
    <div className="stranica-korziny">
      <h1>Korzina</h1>
      
      <div className="spisok-tovarov">
        {elementi.map(element => (
          <ElementKorziny key={element.id} element={element} />
        ))}
      </div>

      <div className="blok-skidki">
        <input
          type="text"
          placeholder="Vvedite kod skidki"
          value={kodSkidki}
          onChange={(e) => ustanovitKodSkidki(e.target.value)}
          className="vvod-skidki"
        />
        <Knopka naKlik={obrabotatPrimenenieSkidki}>
          Primenit skidku
        </Knopka>
      </div>

      <div className="itogo-korzina">
        <div className="stroka-itogo">
          <span>Promezhutochnaya summa:</span>
          <span>{elementi.reduce((sum, el) => sum + ((el.cenaSoSkidkoy || el.cena) * el.kolichestvo), 0)} ₽</span>
        </div>
        {skidka && (
          <div className="stroka-itogo">
            <span>Skidka ({skidka.kod}):</span>
            <span>-{skidka.znachenie * 100}%</span>
          </div>
        )}
        <div className="stroka-itogo obshaya-stoimost">
          <span>Obshaya stoimost:</span>
          <span>{poluchitObshuyuStoimost()} ₽</span>
        </div>
      </div>

      <div className="deystviya-korziny">
        <Knopka stil="vtorichnaya" naKlik={ochistitKorzinu}>
          Ochistit korzinu
        </Knopka>
        <Knopka stil="pervichnaya">
          Oformit zakaz
        </Knopka>
      </div>
    </div>
  )
}

export default Korzina