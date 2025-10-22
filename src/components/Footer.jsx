import React from 'react'

const Footer = () => {
  return (<div className='bg-slate-800 text-white flex flex-col justify-center items-center py-4 px-2 '> 
        <div className="logo font-bold text-white">
          
          <span className='text-green-700 text-xl'>&lt;</span>
          <span className='text-xl'>Pass</span>
          <span className='text-green-700 text-xl'>OP/&gt;</span>
          
          </div>
        <div className="text-sm"> {/* Added text-sm for better mobile font size */}

        Created with <i className="fa-solid fa-heart"></i> by Mohamed Fateen ®
        </div>
    </div>
  )
}

export default Footer