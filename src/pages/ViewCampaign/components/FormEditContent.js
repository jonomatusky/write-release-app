import React from 'react'
import { Grid, Typography, Paper, InputLabel } from '@mui/material'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import BarIndividuals from 'components/BarIndividuals'

import FormField from 'components/Form/FormField'
import { Link } from 'react-router-dom'

const FormEditContent = ({
  control,
  submit,
  formFields,
  state,
  setState,
  contentType,
  organizationId,
}) => {
  const { items: individuals } = useIndividualsStore()

  const hiredOptions = individuals.filter(
    individual => individual.organization === organizationId
  )

  const quotedOptions = hiredOptions.filter(
    item => !state?.individualsHired?.includes(item.id)
  )

  // const mentionedOptions = quotedOptions.filter(
  //   item => !state?.individualsQuoted?.includes(item.id)
  // )

  // const handleSubmit = async () => {
  //   let values = {}
  //   values.organizations = [organizationId]
  //   values.type = contentTypeId
  //   values.individualsQuoted = individualsQuoted.map(item => item.id)
  //   values.individualsMentioned = individualsMentioned.map(item => item.id)
  //   values.titleInternal =
  //     organization.name +
  //     ' ' +
  //     contentType.secondary +
  //     ' Release - ' +
  //     new Date().toLocaleDateString('en-us', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //     })
  //   values.text = text
  //   try {
  //     const content = await create(values)
  //     navigate(`/content/${content.id}`)
  //   } catch (err) {}
  // }

  const handleChangeHiredIndividuals = individuals => {
    setState({
      ...state,
      individualsHired: individuals,
      individualsQuoted: state.individualsQuoted.filter(
        individual => !individuals.includes(individual)
      ),
      individualsMentioned: state.individualsMentioned.filter(
        individual => !individuals.includes(individual)
      ),
    })
  }

  const handleChangeQuotedIndividuals = individuals => {
    setState({
      ...state,
      individualsQuoted: individuals,
      individualsMentioned: state.individualsMentioned.filter(
        individual => !individuals.includes(individual)
      ),
    })
  }

  // const handleChangeMentionedIndividuals = individuals => {
  //   setState({ ...state, individualsMentioned: individuals })
  // }

  return (
    <Grid container justifyContent="center" mb={1} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body2" pb={1} pl={1}>
          Be sure to answer as many questions as possible. The more information
          you provide, the more accurate the results will be.
        </Typography>
      </Grid>
      {contentType.secondary === 'New Hire' && (
        <Grid item xs={12}>
          <InputLabel>
            <Typography variant="body2" pb={1} pl={1} pr={1} whiteSpace="wrap">
              <b>Who's being hired?</b>
            </Typography>
          </InputLabel>
          <Paper elevation={0}>
            <BarIndividuals
              values={state.individualsHired}
              setValues={handleChangeHiredIndividuals}
              options={hiredOptions}
            />
          </Paper>
        </Grid>
      )}
      <Grid component={Grid} item xs={12}>
        <InputLabel>
          <Typography variant="body2" pb={1} pl={1} pr={1} whiteSpace="wrap">
            <b>
              Who {contentType.secondary === 'New Hire' && 'else '}should be
              quoted in this release?
            </b>
          </Typography>
        </InputLabel>
        <Paper elevation={0}>
          <BarIndividuals
            values={state.individualsQuoted}
            setValues={handleChangeQuotedIndividuals}
            options={quotedOptions}
          />
          <Typography fontSize="10pt" pt={0.5} pl={0.5}>
            Don't see them in the list?{' '}
            <Link to="/profiles#create">Create a new profile</Link>{' '}
          </Typography>
        </Paper>
      </Grid>
      {/* {contentType.secondary !== 'New Hire' && (
        <Grid item xs={12}>
          <InputLabel>
            <Typography variant="body2" pb={1} pl={1} pr={1} whiteSpace="wrap">
              <b>Who else should be mentioned in this release?</b>
            </Typography>
          </InputLabel>
          <Paper elevation={0}>
            <BarIndividuals
              values={state.individualsMentioned}
              setValues={handleChangeMentionedIndividuals}
              options={mentionedOptions}
            />
          </Paper>
        </Grid>
      )} */}
      <Grid item xs={12}>
        <form onSubmit={submit}>
          <Grid container spacing={3}>
            {formFields.map(formField => {
              const { name, options } = formField
              return (
                <Grid item xs={12} key={name}>
                  <InputLabel>
                    <Typography
                      variant="body2"
                      pb={1}
                      pl={1}
                      pr={1}
                      whiteSpace="wrap"
                    >
                      <b>{formField.label}</b>
                    </Typography>
                  </InputLabel>
                  {formField.subtext && (
                    <Typography
                      variant="body2"
                      pb={1.5}
                      pl={1}
                      pr={1}
                      whiteSpace="wrap"
                      color="textSecondary"
                    >
                      <i>{formField.subtext}</i>
                    </Typography>
                  )}
                  <FormField
                    formField={{ name: formField.name, type: formField.type }}
                    control={control}
                    options={options}
                  />
                </Grid>
              )
            })}
          </Grid>
          <button type="submit" style={{ display: 'none' }} />
        </form>
      </Grid>
    </Grid>
  )
}

export default FormEditContent
