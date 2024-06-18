import React from 'react'

interface Props {
  change: (content: boolean) => void
}

const Header = ({change}: Props) => {
  return (
    <div className='header'>
        <div className='logo'>
          eSłużba
        </div>
        <div className='links'>
          <span onClick={() => change(true)}>
              Wojsko
          </span>
          <span onClick={() => change(false)}>
            Służby
          </span>
        </div>
    </div>
  )
}

export default Header