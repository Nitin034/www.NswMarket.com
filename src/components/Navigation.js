import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg xs:w-[80%] xs:mt-8 md:w-[80%] md:mt-12'>
    <NavLink to="/" end className={
        ({isActive}) => {
            return `w-full text-base text-center font-mono m-2.5 ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100  hover:text-cyan active:bg-cyan active:text-gray-300'}  border-0 cursor-pointer rounded capitalize font-bold`
            }
            } >
      Crypto
    </NavLink>
    <NavLink to="/trending" className={
          ({isActive}) => {
            return `w-full text-base text-center font-mono m-2.5 ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100  hover:text-cyan active:bg-cyan active:text-gray-300'}  border-0 cursor-pointer rounded capitalize font-bold`
            }
            } >
      Trending
    </NavLink>
    <NavLink to="/saved" className={
         ({isActive}) => {
            return `w-full text-base text-center font-mono m-2.5 ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100  hover:text-cyan active:bg-cyan active:text-gray-300'}  border-0 cursor-pointer rounded capitalize font-bold`
            }
            } >
      Saved
    </NavLink>
       
    </nav>
  )
}

export default Navigation
