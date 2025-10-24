import { createContext, useContext, useReducer, useEffect } from 'react'

const KontekstKorziny = createContext()

const cartReducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'add':
      
      const currentItems = state.items || []
      const existingItem = currentItems.find(item => item.id === action.payload.id)
      if (existingItem) {
        newState = {
          ...state,
          items: currentItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      } else {
        newState = {
          ...state,
          items: [...currentItems, { ...action.payload, quantity: 1 }]
        }
      }
      break
    
    case 'remove':
      newState = {
        ...state,
        items: (state.items || []).filter(item => item.id !== action.payload)
      }
      break
    
    case 'update':
      newState = {
        ...state,
        items: (state.items || []).map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
      break
    
    case 'clear':
      newState = {
        items: [],
        discount: null
      }
      break
    
    case 'load':
   
      newState = {
        items: action.payload.items || [],
        discount: action.payload.discount || null
      }
      break
    
    default:
      newState = state
  }


  if (newState !== state) {
    localStorage.setItem('cart', JSON.stringify(newState))
  }

  return newState
}

export const PostavshikKorziny = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    discount: null
  })

 
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
       
        const safeCart = {
          items: parsedCart.items || [],
          discount: parsedCart.discount || null
        }
        dispatch({ type: 'load', payload: safeCart })
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error)
        
        localStorage.removeItem('cart')
      }
    }
  }, [])

  const addItem = (item) => {
    dispatch({ type: 'add', payload: item })
  }

  const removeItem = (itemId) => {
    dispatch({ type: 'remove', payload: itemId })
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeItem(itemId)
    } else {
      dispatch({ type: 'update', payload: { id: itemId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'clear' })
  }

  const getTotalPrice = () => {
    return (state.items || []).reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  const getTotalItems = () => {
    return (state.items || []).reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <KontekstKorziny.Provider value={{
      items: state.items || [],
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </KontekstKorziny.Provider>
  )
}

export const ispolzovanieKorziny = () => {
  const context = useContext(KontekstKorziny)
  if (!context) {
    throw new Error('ispolzovanieKorziny dolzhen ispolzovatsya vnutri PostavshikKorziny')
  }
  return context
}