import React, { useEffect, useState } from 'react'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import BulletItem from './BulletItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'
import { Box } from '@mui/system'

const DialogEditBullets = ({
  bullets: startingBullets,
  update,
  updateStatus,
  open,
  onClose,
  title,
  field,
  placeholders,
}) => {
  let [bullets, setBullets] = useState(startingBullets || [])

  const handleBulletSubmit = (index, value) => {
    const newBullets = [...bullets]
    newBullets[index] = { ...newBullets[index], text: value }
    setBullets(newBullets)
  }

  const handleDragEnd = result => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const newItems = [...bullets]
    const [removed] = newItems.splice(startIndex, 1)
    newItems.splice(endIndex, 0, removed)

    setBullets(newItems)
  }

  const handleClose = () => {
    onClose()
    setBullets(startingBullets)
  }

  const handleSubmit = async () => {
    try {
      await update({ [field]: bullets })
      onClose()
    } catch (err) {}
  }

  const handleAddBullet = () => {
    setBullets([...bullets, { id: uuid(), text: '' }])
  }

  const handleDeleteBullet = index => {
    const newBullets = [...bullets]
    newBullets.splice(index, 1)
    setBullets(newBullets)
  }

  useEffect(() => {
    setBullets(startingBullets)
  }, [startingBullets])

  return (
    <LayoutDialogEdit
      title={title}
      open={open}
      onClose={handleClose}
      onSave={handleSubmit}
      noScroll
      loading={updateStatus === 'loading'}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {bullets.map((bullet, index) => (
                  <Draggable
                    key={bullet.id}
                    draggableId={bullet.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style,
                        //   index
                        // )}
                      >
                        <BulletItem
                          placeholders={placeholders}
                          index={index}
                          bullet={bullet}
                          onSubmit={value => handleBulletSubmit(index, value)}
                          onDelete={() => handleDeleteBullet(index)}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
      <Box width="100%" mt={1}>
        <Button
          fullWidth
          endIcon={<Add />}
          onClick={handleAddBullet}
          variant="outlined"
          size="large"
          disabled={bullets.length >= 5}
        >
          Add Bullet
        </Button>
      </Box>
    </LayoutDialogEdit>
  )
}

export default DialogEditBullets
