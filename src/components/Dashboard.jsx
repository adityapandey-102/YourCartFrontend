import React from 'react'
import Product from './Product'
import Filter from './Filter'
import SlideFiter from './SlideFiter'

function Dashboard(props) {
  return (
    <>
      <div className="px-4 md:px-0 md:grid justify-center md:justify-normal md:h-[750px] dashboard">
        <div className='hidden md:inline-block md:overflow-y-scroll  bg-white pt-20 overFlowScroll' ><Filter /></div>
        <div className=''><Product /></div>
      </div>
        <SlideFiter open={props.open} setOpen={props.setOpen}/>
    </>
  )
}

export default Dashboard
