import { Grid } from '@mui/material'
import React from 'react'
import ArtistCard from './ArtistCard'

const ArtistPage = ({artists}) => {
    console.log("artists", artists)
  return (
   <Grid container>
       {artists && artists.map((artist,ind) => {
           return <ArtistCard artist = {artist} key = {ind} />
       })}
   </Grid>
  )
}

export default ArtistPage