import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header(){
    return(
    <div className='flex items-center gap-5 py-2'>
        <img src={nlwUniteIcon}/>
        <nav className='flex items-center gap-5'>
            <NavLink href="/events" className='text-zinc-500'>Events</NavLink>
            <NavLink href="/participants">Participants</NavLink>
        </nav>
    </div>
    )
}