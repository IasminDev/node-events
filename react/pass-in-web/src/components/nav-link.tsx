import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface NavLinkProps extends ComponentProps<'a'>{}

export function NavLink(props: NavLinkProps){
    return(
        <a {...props} 
            className={twMerge('font-medium text-sm', props.className)}>
        </a>
    )
}