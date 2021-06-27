// hooks
import { ReactNode } from 'react'
import cx from 'classnames'

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
  isAnswered?: boolean
  isHighlighted?: boolean
}

// --------------------------------

export default function Question({
  children,
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
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
