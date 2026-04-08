import { useRouter } from "../hooks/useRouter.jsx";

export function Link({ href, children, ...restOfProps }) {
    const { currentPath, navigateTo } = useRouter();

    const isActive = currentPath === href;

    const handleClick = (event) => {
        event.preventDefault();
        navigateTo(href);
    }

    return(
        <a 
            href={href} 
            {...restOfProps} 
            onClick={handleClick}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </a>
    )
}