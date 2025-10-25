import { useState } from 'react'
import { ispolzovanieAvtorizacii } from '../kontekst/KontekstAvtorizacii.jsx'

const FormaAvtorizacii = ({ naZakritie }) => {
  const [email, setEmail] = useState('')
  const [parol, setParol] = useState('')
  const [zagruzka, setZagruzka] = useState(false)
  const [oshibki, setOshibki] = useState({})
  
  const { voshod } = ispolzovanieAvtorizacii()

  const validirovatFormu = () => {
    const novieOshibki = {}

   
    if (!email.trim()) {
      novieOshibki.email = 'Email обязателен для заполнения'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novieOshibki.email = 'Введите корректный email адрес'
    }

    
    if (!parol) {
      novieOshibki.parol = 'Пароль обязателен для заполнения'
    } else if (parol.length < 3) {
      novieOshibki.parol = 'Пароль должен содержать минимум 3 символа'
    }

    setOshibki(novieOshibki)
    return Object.keys(novieOshibki).length === 0
  }

  const obrabotatOtpravku = async (e) => {
    e.preventDefault()
    
    if (!validirovatFormu()) {
      return
    }

    setZagruzka(true)
    setOshibki({})

    try {
      const result = await voshod(email, parol)
      
      if (result.uspeh) {
        naZakritie()
      } else {
        setOshibki({ obshaya: result.oshibka || 'Ошибка авторизации' })
      }
    } catch (error) {
      setOshibki({ obshaya: 'Произошла ошибка при авторизации' })
    } finally {
      setZagruzka(false)
    }
  }

  const obrabotatIzmenenieEmail = (e) => {
    setEmail(e.target.value)
    
    if (oshibki.email) {
      setOshibki({ ...oshibki, email: '' })
    }
  }

  const obrabotatIzmenenieParol = (e) => {
    setParol(e.target.value)
    
    if (oshibki.parol) {
      setOshibki({ ...oshibki, parol: '' })
    }
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
            fontSize: '2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--cherniy)',
            margin: 0
          }}>
            ВХОД В СИСТЕМУ
          </h2>
          <button 
            className="knopka-zakritiya" 
            onClick={naZakritie}
            disabled={zagruzka}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2.5rem',
              cursor: 'pointer',
              color: 'var(--cherniy)',
              lineHeight: 1,
              padding: 0,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >×</button>
        </div>
        
        <form onSubmit={obrabotatOtpravku}>
          <div className="gruppa-formi" style={{ marginBottom: '1.5rem' }}>
            <label className="metka-formi" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 700,
              color: 'var(--cherniy)',
              textTransform: 'uppercase',
              fontSize: '1.1rem'
            }}>EMAIL</label>
            <input
              type="email"
              className={`vvod-formi ${oshibki.email ? 'vvod-formi--oshibka' : ''}`}
              value={email}
              onChange={obrabotatIzmenenieEmail}
              placeholder="ваш@email.com"
              disabled={zagruzka}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cherniy)',
                background: 'var(--beliy)',
                color: 'var(--cherniy)',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            {oshibki.email && <div className="soobshchenie-ob-oshibke-pole" style={{
              color: '#e74c3c',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              fontWeight: 600
            }}>{oshibki.email}</div>}
          </div>
          
          <div className="gruppa-formi" style={{ marginBottom: '2rem' }}>
            <label className="metka-formi" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 700,
              color: 'var(--cherniy)',
              textTransform: 'uppercase',
              fontSize: '1.1rem'
            }}>ПАРОЛЬ</label>
            <input
              type="password"
              className={`vvod-formi ${oshibki.parol ? 'vvod-formi--oshibka' : ''}`}
              value={parol}
              onChange={obrabotatIzmenenieParol}
              placeholder="Ваш пароль"
              disabled={zagruzka}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cherniy)',
                background: 'var(--beliy)',
                color: 'var(--cherniy)',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            {oshibki.parol && <div className="soobshchenie-ob-oshibke-pole" style={{
              color: '#e74c3c',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              fontWeight: 600
            }}>{oshibki.parol}</div>}
          </div>
          
          {oshibki.obshaya && <div className="soobshchenie-ob-oshibke" style={{
            background: '#fee',
            border: '2px solid #e74c3c',
            color: '#c62828',
            padding: '1rem',
            marginBottom: '1.5rem',
            fontWeight: 600,
            textAlign: 'center'
          }}>{oshibki.obshaya}</div>}
          
          <button 
            type="submit" 
            className="knopka knopka--primary"
            disabled={zagruzka}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              border: '2px solid var(--cherniy)',
              background: 'var(--cherniy)',
              color: 'var(--beliy)',
              fontSize: '1.2rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: zagruzka ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: zagruzka ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!zagruzka) {
                e.target.style.background = 'var(--beliy)';
                e.target.style.color = 'var(--cherniy)';
              }
            }}
            onMouseOut={(e) => {
              if (!zagruzka) {
                e.target.style.background = 'var(--cherniy)';
                e.target.style.color = 'var(--beliy)';
              }
            }}
          >
            {zagruzka ? 'ЗАГРУЗКА...' : 'ВОЙТИ'}
          </button>
        </form>

        <div className="podskazka-formi" style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--seriy-sredniy)',
          fontSize: '0.9rem',
          color: 'var(--seriy-temnyi)',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 700, color: 'var(--cherniy)' }}>ДОСТУПНЫЕ АККАУНТЫ:</p>
          <p style={{ margin: '0.25rem 0' }}><strong>Админ:</strong> admin@example.com / admin</p>
          <p style={{ margin: '0.25rem 0' }}><strong>Пользователь:</strong> user@example.com / user</p>
        </div>
      </div>
    </div>
  )
}

export default FormaAvtorizacii