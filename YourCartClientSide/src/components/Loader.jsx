import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader(props) {
  return (
    <>
      <div className='w-full h-full flex justify-center items-center'>
        <img className='w-[300px] h-[300px]' src="https://media.tenor.com/6gHLhmwO87sAAAAi/gg.gif" alt="" />
      {/* <CircularProgress color="success" sx={{"width":"400px","height":"400px"}}/> */}
      </div>
    </>
  )
}

export default Loader
