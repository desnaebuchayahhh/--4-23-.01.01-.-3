const Knopka = ({ 
  children, 
  onClick, 
  style = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  ...props 
}) => {
  const getClasses = () => {
    const baseClasses = ['knopka']
    if (style === 'primary') baseClasses.push('knopka--primary')
    if (style === 'secondary') baseClasses.push('knopka--secondary')
    if (loading) baseClasses.push('knopka--loading')
    
    return baseClasses.join(' ')
  }

  return (
    <button
      type={type}
      className={getClasses()}
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? 'Загрузка...' : children}
    </button>
  )
}

export default Knopka