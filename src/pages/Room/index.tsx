// hooks
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

// components
import RoomCode from '../../components/RoomCode'
import Button from '../../components/Button'

// services
import { database } from '../../services/firebase'

// images
import logoImg from '../../assets/images/logo.svg'

// styles
import '../../styles/room.scss'

// ------------------------------

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighlighted: boolean
    isAnswered: boolean
  }
>

interface Question {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
}

interface RoomParams {
  id: string
}
// ------------------------------

export default function Room() {
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  const params = useParams<RoomParams>()
  const { user } = useAuth()

  console.log(questions)

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${params.id}`)

    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parseQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          }
        }
      )

      setTitle(databaseRoom.title)
      setQuestions(parseQuestions)
    })
  }, [params.id])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`/rooms/${params.id}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type='submit' disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
