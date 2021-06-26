// images
import copyImg from '../../assets/images/copy.svg'

// styles
import '../../styles/room-code.scss'

// -----------------------------------
interface RoomCodeProps {
  code: string
}
// -----------------------------------

export default function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copiar código da sala' />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  )
}
