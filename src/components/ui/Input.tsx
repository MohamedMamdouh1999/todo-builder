import { forwardRef } from "react"

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ ...props }, ref) => {
    return <input ref={ref} {...props} className="block w-full p-2 rounded-md border border-gray-300 shadow-lg focus:outline-none" />
})

Input.displayName = "Input"

export default Input
