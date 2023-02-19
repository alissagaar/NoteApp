import { useParams } from "react-router-dom"
import { Note } from "../App"

type NoteLayoutProps = {
    notes: Note[]
}

function NoteLayout({notes}: NoteLayoutProps) {
  const { id } = useParams()
  return (
    <div>NoteLayout</div>
  )
}

export default NoteLayout