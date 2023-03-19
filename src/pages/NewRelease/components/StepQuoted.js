import React, { useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import GridButtons from './GridButtons'
import ItemQuotedIndividual from './ItemQuotedIndividual'
import { Add } from '@mui/icons-material'
import IndividualDialog from './IndividualDialog'

const StepQuoted = ({
  answers,
  label,
  subtitle,
  onAnswer,
  value,
  onNext,
  onBack,
  showSkip,
  required,
  placeholder,
  name,
}) => {
  const [editingIndividual, setEditingIndividual] = useState(null)

  // const [showError, setShowError] = useState(false)

  const individuals = answers.individuals || []

  // const startingIndividuals =
  //   individuals.length === 0
  //     ? [{ firstName: '', lastName: '', title: '', company: '' }]
  //     : individuals

  const handleAddIndividual = values => {
    if (individuals.length < 2) {
      onAnswer({ individuals: [...individuals, values] })
      // setShowError(false)
      setEditingIndividual(individuals.length)
      setEditingIndividual(null)
    }
  }

  const handleRemoveIndividual = index => {
    setEditingIndividual(null)
    const newIndividuals = [...individuals]
    newIndividuals.splice(index, 1)
    onAnswer({ individuals: newIndividuals })
  }

  const submitIndividual = (index, individual) => {
    const newIndividuals = [...individuals]
    newIndividuals[index] = individual
    setEditingIndividual(null)
    // setShowError(false)
  }

  const [newIndividualDialogOpen, setNewIndividualDialogOpen] = useState(false)

  const handleSetNewIndividualDialogOpen = () => {
    if (!!editingIndividual) {
      return
    } else {
      setNewIndividualDialogOpen(true)
    }
  }

  const handleNext = () => {
    // if (individuals.length === 0) {
    //   setShowError(true)
    // } else {
    //   setShowError(false)
    onNext()
    // }
  }

  return (
    <>
      <Box
      // height="700px"
      // maxHeight="100%"
      // width="100%"
      // display="flex"
      // flexDirection="column"
      // alignItems="space-between"
      >
        <IndividualDialog
          open={newIndividualDialogOpen}
          onClose={() => setNewIndividualDialogOpen(false)}
          submitIndividual={handleAddIndividual}
          individual={{
            firstName: '',
            lastName: '',
            title: '',
            company: answers.subject,
          }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1" gutterBottom>
              Who do you want to quote in this release?
            </Typography>
          </Grid>
          {individuals.map((individual, index) => (
            <Grid item xs={12} key={index}>
              <ItemQuotedIndividual
                index={index}
                individual={individual}
                setIsEditing={setEditingIndividual}
                isEditing={editingIndividual === index}
                submitIndividual={submitIndividual}
                onRemove={handleRemoveIndividual}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleSetNewIndividualDialogOpen}
              disabled={!!editingIndividual || individuals.length >= 2}
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  <Typography variant="h6" component="span">
                    <b>Add New</b>
                  </Typography>
                </Box>
                <Add fontSize="medium" />
              </Box>
            </Button>
            {/* {showError && (
              <Typography color="error" pt={1}>
                Please add at least one person
              </Typography>
            )} */}
          </Grid>

          <Grid item xs={12}>
            <GridButtons
              onNext={handleNext}
              onBack={onBack}
              showSkip={showSkip}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default StepQuoted
