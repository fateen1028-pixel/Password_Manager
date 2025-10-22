import React from 'react'

const Navbar = () => {
  return (<nav className='bg-slate-800 text-white '>
      {/* Ensures horizontal padding on small screens (px-4) and bigger screens (py-6) */}
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-6">
        <div className="logo font-bold text-white">
          
          <span className='text-green-700 text-2xl'>&lt;</span>
          <span className='text-2xl'>Pass</span>
          <span className='text-green-700 text-2xl'>OP/&gt;</span>
          
          </div>
        {/* <ul className='flex gap-4'>
            <li><a className='hover:font-bold' href="">Home</a></li>
            <li><a className='hover:font-bold' href="">About</a></li>
            <li><a className='hover:font-bold' href="">Contact</a></li>
            
        </ul> */}
        <button className=' cursor-pointer'>
          <i className="fa-brands fa-github fa-xl invert-1 bg-green-950 py-5  "></i>
        </button>
        </div>
      
    </nav>
  )
}

export default Navbar