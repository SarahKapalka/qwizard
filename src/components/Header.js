import Link from 'next/link'
import React from 'react'
import Logo from '../images/logo.svg'
import Image from 'next/image'

function Header() {
  return (
    <div className="header">
        <Link className="logo" href="/"><Image src={Logo} height={30} /></Link>
        <Link href="/" className="quizes-link">Quizes</Link>
        <Link href="/make-a-quiz" className="make-link">Make a quiz</Link>
    </div>
  )
}

export default Header