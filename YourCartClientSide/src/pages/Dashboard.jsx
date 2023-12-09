import React, { useEffect } from 'react'
import Product from '../components/Product'
import Filter from '../components/Filter'
import SlideFiter from '../components/SlideFiter'
import { useNavigate } from 'react-router-dom'


function Dashboard(props) {
  let navigate = useNavigate();

  useEffect(() => {

    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, []);
  return (
    <>
      <div className="px-4 md:px-0 md:grid justify-center md:justify-normal md:h-[750px] dashboard">
        <div className='hidden md:inline-block md:overflow-y-scroll  bg-white pt-20 overFlowScroll box-shadow' ><Filter /></div>
        <div className=''><Product /></div>
      </div>
        <SlideFiter open={props.open} setOpen={props.setOpen}/>
    </>
  )
}

export default Dashboard
