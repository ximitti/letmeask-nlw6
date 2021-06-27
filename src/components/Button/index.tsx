// hooks
import { ButtonHTMLAttributes } from 'react'

// styles
import '../../styles/button.scss'
// --------------------------------------------
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

// --------------------------------------------
export default function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}>
      {props.children}
    </button>
  )
}
