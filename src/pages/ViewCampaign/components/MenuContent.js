import React, { useState } from 'react'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  ContentCopy,
  DeleteForever,
  Menu as MenuIcon,
} from '@mui/icons-material'
import DialogDeleteContent from './DialogDeleteContent'
import DialogCopyContent from './DialogCopyContent'

const MenuContent = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [copyIsOpen, setCopyIsOpen] = useState(false)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  const handleDeleteOpen = () => {
    setDeleteIsOpen(true)
    handleClose()
  }

  const handleCopyOpen = () => {
    setCopyIsOpen(true)
    handleClose()
  }

  return (
    <>
      <DialogCopyContent
        id={id}
        open={copyIsOpen}
        onClose={() => setCopyIsOpen(false)}
      />
      <DialogDeleteContent
        id={id}
        open={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
      />
      <IconButton onClick={handleOpen} edge="end">
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        transitionDuration={0}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        anchorPosition={{ left: 0, top: -20 }}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem onClick={handleDeleteOpen}>
          <ListItemIcon>
            <DeleteForever fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Story</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopyOpen}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Make a Copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteOpen}>
          <ListItemIcon>
            <DeleteForever fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Story</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuContent
