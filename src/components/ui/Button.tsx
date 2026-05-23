interface IProps {
    type?: 'button' | 'submit' | 'reset'
    width?: 'w-full' | 'w-fit'
    className?: string
    isLoading?: boolean
    children: React.ReactNode
}

const Button = ({ type = 'button', width = 'w-full', isLoading = false, className, children }: IProps) => {
    return (
        <button type={type} disabled={isLoading} className={`${width} ${className} flex items-center justify-center gap-x-2 text-white font-medium rounded-md py-2 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}>
            {
                isLoading &&
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin lucide lucide-loader-circle-icon lucide-loader-circle">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
            }
            {children}
        </button>
    )
}

export default Button
