interface IProps {
    message?: string
}

const MessageError = ({ message }: IProps) => {
    return <>{ message && <p className="text-red-500">{message}</p> }</>
}

export default MessageError
