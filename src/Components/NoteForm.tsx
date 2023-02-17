import { FormEvent, useRef, useState } from 'react'
import { Form, Stack, Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from '../App'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
    onSubmit: (data : NoteData) =>void
    onAddTag:(data: Tag) => void
    availableTags: Tag[]
}

function NoteForm({onSubmit, onAddTag, availableTags}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()
  
  function handleSubmit ( e: FormEvent ) {
    e.preventDefault()

    onSubmit({
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tags:selectedTags,
    })

    navigate('..')
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                    <Form.Group controlId='title' >
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef}  required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='tags' >
                        <Form.Label>Tags</Form.Label>
                        {/* Why we save label and value? Cause it is what is expected for CreatableReactSelect */}
                        <CreatableReactSelect 
                            onCreateOption={label => {
                                const newTag = { id: uuidV4(), label}
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                            }}
                            value={selectedTags.map(tag => {
                            return {label: tag.label, value: tag.id}})}
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id}
                            })} 
                            onChange={tags => {setSelectedTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value}}))}} 
                            isMulti />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId='markdown' >
                <Form.Label>Body</Form.Label>
                <Form.Control required as='textarea' ref={markdownRef} rows={15} />
            </Form.Group>
            <Stack direction='horizontal' gap={2} className='justify-content-end'>
                <Button type='submit' variant='primary'>Save</Button>
                <Link to='..'> 
                    {/* it sends the user back just one step */}
                    <Button type='button' variant='outline-secondary'>Cancel</Button>
                </Link>
            </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm