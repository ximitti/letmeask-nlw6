// hooks
import { ReactNode } from 'react'

// styles
import '../../styles/question.scss'

// --------------------------------

interface QuestionProps {
  children?: ReactNode
  content: string
  author: {
    name: string
    avatar: string
  }
}

// --------------------------------

export default function Question({ children, content, author }: QuestionProps) {
  return (
    <div className='question'>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  )
}
