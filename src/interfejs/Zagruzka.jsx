const Zagruzka = ({ size = 'medium', text = 'Загрузка...' }) => {
  return (
    <div className={`zagruzka zagruzka--${size}`}>
      <div className="zagruzka-spinner"></div>
      <p>{text}</p>
    </div>
  )
}

export default Zagruzka