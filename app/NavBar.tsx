'use client';

import Link from "next/link"
import classnames from 'classnames'
import { usePathname } from "next/navigation"


const NavBar = () => {
    const currentPath=usePathname();
    const links=[
        {label:"Dashboard",
        href:"/"
    },
        {label:"issues",
        href:"/issues"
    },
    ]
  return (
   <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
    <Link href="/">Logo</Link>
    <ul className="flex space-x-6">
        {links.map((link,index)=>(
            <li key={index}>
                <Link className={classnames({
                    'text-zinc-900':currentPath===link.href,
                    'text-zinc-500':currentPath!=link.href,
                    'transition-colors hover:text-zinc-800 ':true

                })} href={link.href}>{link.label}</Link>
            </li>
        ))}
    </ul>

   </nav>
  )
}

export default NavBar
