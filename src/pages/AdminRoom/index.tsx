// hooks
import { useHistory, useParams } from 'react-router-dom'
// import useAuth from '../../hooks/useAuth'
import useRoom from '../../hooks/useRoom'

// components
import RoomCode from '../../components/RoomCode'
import Button from '../../components/Button'
import Question from '../../components/Question'

// services
import { database } from '../../services/firebase'

// images
import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

// styles
import '../../styles/room.scss'

// ------------------------------

interface RoomParams {
  id: string
}
// ------------------------------

export default function AdminRoom() {
  const params = useParams<RoomParams>()
  //   const { user } = useAuth()
  const { questions, title } = useRoom(params.id)
  const history = useHistory()

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${params.id}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza de que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt='Marcar pergunta como respondida'
                      />
                    </button>

                    <button
                      type='button'
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt='Dar destaque ?? pergunta' />
                    </button>
                  </>
                )}

                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
