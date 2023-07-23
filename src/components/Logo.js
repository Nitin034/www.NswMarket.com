import React from 'react'
import { Link } from 'react-router-dom'
import logoma from "../Images/logo ain.png"

const Logo = () => {
  return (
     <Link to="/"
      className='absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan flex items-center  xs:relative xs:items-center xs:left-0 xs:text-md md:relative md:items-center md:left-0 md:text-lg'
      >
        <img className='w-14 h-14 mx-2 xs:w-8 xs:h-8 xs:my-3' src={logoma} alt='' srcSet=''/>
        <span>CryptowithNsw</span>
     </Link>
  )
}

export default Logo
