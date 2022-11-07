import React, { useRef, useState } from 'react'
import { Box, Typography, Grid, IconButton } from '@mui/material'
import Individual from './Individual'
import PanelEdit from 'layouts/PanelEdit'
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import DialogCreateIndividual from './DialogCreateIndividual'
import { animateScroll as scroll } from 'react-scroll'

const PanelIndividuals = ({ individuals, id }) => {
  const sortedIndividuals = [...individuals].sort((a, b) => {
    return b.lastName - a.lastName
  })

  const ScrollElement = () => {
    const [scrollX, setScrollX] = useState(0) // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState(false) // For detecting end of scrolling

    const scrl = useRef(null) // For scrolling

    const slide = shift => {
      scroll.scrollMore(shift, {
        horizontal: true,
        containerId: 'scroll-container',
        smooth: true,
        duration: 500,
      })
    }

    // const slide = shift => {
    //   scrl.current.scrollLeft += shift
    //   setScrollX(scrollX + shift) // Updates the latest scrolled postion

    //   //For checking if the scroll has ended
    //   if (
    //     Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
    //     scrl.current.offsetWidth
    //   ) {
    //     setScrollEnd(true)
    //   } else {
    //     setScrollEnd(false)
    //   }
    // }

    const scrollCheck = () => {
      setScrollX(scrl.current.scrollLeft)
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setScrollEnd(true)
      } else {
        setScrollEnd(false)
      }
    }

    return (
      <Box position="relative">
        <Box
          position="absolute"
          left="10px"
          zIndex={10}
          height="100%"
          display="flex"
          alignItems="center"
        >
          {scrollX !== 0 && (
            <IconButton
              onClick={() => slide(-200)}
              sx={{
                backgroundColor: 'grey.200',
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: 'grey.400',
                },
                border: '1px solid #bbbbbb',
              }}
              size="small"
            >
              <KeyboardArrowLeft fontSize="large" />
            </IconButton>
          )}
        </Box>
        <Box
          position="absolute"
          right="10px"
          zIndex={10}
          height="100%"
          display="flex"
          alignItems="center"
        >
          {!scrollEnd && (
            <IconButton
              onClick={() => slide(+200)}
              sx={{
                backgroundColor: 'grey.200',
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: 'grey.400',
                },
                border: '1px solid #bbbbbb',
              }}
              size="small"
            >
              <KeyboardArrowRight fontSize="large" />
            </IconButton>
          )}
        </Box>
        <Box
          overflow="scroll"
          display="flex"
          flexWrap="none"
          width="100%"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            scrollBehavior: 'smooth',
          }}
          ref={scrl}
          onScroll={scrollCheck}
          id="scroll-container"
        >
          {sortedIndividuals.map((individual, i) => (
            <Box
              key={(individual || {}).id}
              pr={i === sortedIndividuals.length - 1 ? 2 : 1}
              mb={1}
              pl={i === 0 ? 2 : 0}
            >
              <Individual individual={individual} />
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  // const ScrollElement = () => {
  //   const [scrollX, setScrollX] = useState(0) // For detecting start scroll postion
  //   const [scrollEnd, setScrollEnd] = useState(false) // For detecting end of scrolling

  //   const scrl = useRef(null) // For scrolling

  //   const slide = shift => {
  //     scrl.current.scrollLeft += shift
  //     setScrollX(scrollX + shift) // Updates the latest scrolled postion

  //     //For checking if the scroll has ended
  //     if (
  //       Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
  //       scrl.current.offsetWidth
  //     ) {
  //       setScrollEnd(true)
  //     } else {
  //       setScrollEnd(false)
  //     }
  //   }

  //   const scrollCheck = () => {
  //     setScrollX(scrl.current.scrollLeft)
  //     if (
  //       Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
  //       scrl.current.offsetWidth
  //     ) {
  //       setScrollEnd(true)
  //     } else {
  //       setScrollEnd(false)
  //     }
  //   }

  //   return (
  //     <Box position="relative">
  //       <Box
  //         position="absolute"
  //         right="10px"
  //         zIndex={10}
  //         height="100%"
  //         display="flex"
  //         alignItems="center"
  //       >
  //         {!scrollEnd && (
  //           <IconButton
  //             onClick={() => slide(+200)}
  //             sx={{
  //               backgroundColor: 'grey.200',
  //               '&:hover, &.Mui-focusVisible': {
  //                 backgroundColor: 'grey.400',
  //               },
  //               border: '1px solid #bbbbbb',
  //             }}
  //           >
  //             <ArrowForwardIos fontSize="inherit" />
  //           </IconButton>
  //         )}
  //       </Box>
  //       <Box
  //         overflow="scroll"
  //         display="flex"
  //         flexWrap="none"
  //         width="100%"
  //         scrollBehavior="smooth"
  //         msOverflowStyle="none"
  //         scrollbarWidth="none"
  //         sx={{
  //           '&::-webkit-scrollbar': {
  //             display: 'none',
  //           },
  //         }}
  //         ref={scrl}
  //         onScroll={scrollCheck}
  //       >
  //         {sortedIndividuals.map((individual, i) => (
  //           <Box
  //             key={(individual || {}).id}
  //             pr={i === sortedIndividuals.length - 1 ? 2 : 1}
  //             mb={1}
  //             pl={i === 0 ? 2 : 0}
  //           >
  //             <Individual individual={individual} />
  //           </Box>
  //         ))}
  //       </Box>
  //     </Box>
  //   )
  // }

  return (
    <PanelEdit
      dialog={DialogCreateIndividual}
      dialogProps={{ organization: id }}
      icon={Add}
    >
      <Box pt={1} pb={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box pl={2}>
              <Typography color="primary">
                <b>Spokespeople</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ScrollElement />
          </Grid>
        </Grid>
      </Box>
    </PanelEdit>
  )
}

export default PanelIndividuals
