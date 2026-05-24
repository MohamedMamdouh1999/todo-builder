import Button from "../components/ui/Button";
import useAuthenticateHook from "../hooks/useAuthenticatedQuery"

import type { ITodo } from "../interfaces/todo";

const Home = () => {
    // Hooks
    const { isLoading, data } = useAuthenticateHook(["Todo"], "/todos", {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string).jwt}`
        }
    });
    const todos = data?.data as ITodo[] || [];

    // Renders
    const todosList = todos.map((todo: ITodo) => (
        <li key={todo.id} className="flex justify-between items-center">
            <p className="text-lg font-medium">{todo.title}</p>
            <div className="flex items-center gap-x-2">
                <Button className="bg-blue-700 hover:bg-blue-800">Edit</Button>
                <Button className="bg-red-700 hover:bg-red-800">Delete</Button>
            </div>
        </li>
    ))

    return (
        <>
            { isLoading ? <h3 className="text-center font-medium">Loading...</h3> : <ul className="space-y-3">{todosList}</ul> }
        </>
    )
}

export default Home
