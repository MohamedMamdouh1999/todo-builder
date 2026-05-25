const TodoSkeleton = () => {
    return (
        <div className="flex items-center justify-between animate-pulse">
            <div className="h-3 bg-gray-300 rounded-md w-24"></div>
            <div className="flex items-center space-x-2">
                <div className="h-10 bg-gray-300 rounded-md w-12"></div>
                <div className="h-10 bg-gray-300 rounded-md w-12"></div>
            </div>
        </div>
    )
}

export default TodoSkeleton
