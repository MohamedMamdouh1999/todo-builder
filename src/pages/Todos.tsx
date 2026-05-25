import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import TodoSkeleton from "../components/TodoSkeleton";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import useApiQuery from "../hooks/useApiQuery"

import axiosInstance from "../config/axios.config";

import type { ITodo } from "../interfaces/todo";

const Todos = () => {
    // States
    const queryClient = useQueryClient();
    const defaultTodo: ITodo = { id: 0, title: "" };
    const [todo, setTodo] = useState<ITodo>(defaultTodo);
    const [error, setError] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    // Handlers
    // Add / Edit Todo
    const openModalHandler = () => setIsOpenModal(true);
    const closeModalHandler = () => {
        setIsOpenModal(false);
        setIsEditing(false);
        setTodo(defaultTodo);
    };
    const onEditHandler = (todo: ITodo) => {
        if (todo.id) {
            setIsEditing(true);
            setTodo(todo);
            openModalHandler();
        } else {
            closeModalHandler();
            setIsEditing(false);
        }
    };
    const onSubmitHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;
        try {
            if (isEditing) {
                const { status } = await axiosInstance.put(`/todos/${todo.id}`, { data: { title: todo.title } }, getAuthHeaders());
                if (status === 200) {
                    toastHandler('Todo updated successfully');
                    queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
                    closeModalHandler();
                }
            } else {
                const { status } = await axiosInstance.post('/todos', { data: { title: todo.title } }, getAuthHeaders());
                if (status === 201) {
                    toastHandler('Todo added successfully');
                    queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
                    closeModalHandler();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    // Delete Todo
    const closeConfirmModalHandler = () => {
        setIsOpenConfirmModal(false);
        setTodo(defaultTodo);
    };
    const onDeleteHandler = async () => {
        try {
            const { status } = await axiosInstance.delete(`/todos/${todo.id}`, getAuthHeaders());
            if (status === 200) {
                toastHandler('Todo deleted successfully');
                queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
                closeConfirmModalHandler();
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Toast
    const toastHandler = (message: string) => toast.success(message,
        {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff'
            }
        }
    );
    const getAuthHeaders = () => ({
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string).jwt}`
        }
    });
    const validate = () => {
        if (!todo.title.trim()) {
            setError("Title is required");
            return false;
        }
        if (todo.title.trim().length < 3) {
            setError("Minimum 3 characters required");
            return false;
        }
        setError("");
        return true;
    };

    // Hooks
    const { isLoading, data } = useApiQuery(["todos"], "/todos", { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string).jwt}` }});
    const todosData = (data?.data as ITodo[]) || [];

    // Renders
    const todosList = todosData.map((todo: ITodo) => (
        <li key={todo.id} className="flex items-center justify-between">
            <p className="text-lg font-medium">{todo.title}</p>
            <div className="flex items-center gap-x-2">
                <Button onClick={() => onEditHandler(todo)} className="bg-blue-700 hover:bg-blue-800">Edit</Button>
                <Button onClick={() => {
                    setTodo(todo);
                    setIsOpenConfirmModal(true);
                }} className="bg-red-700 hover:bg-red-800">Delete</Button>
            </div>
        </li>
    ))

    return (
        <>
            <Button onClick={openModalHandler} width="w-fit" className="mb-4 mx-auto bg-violet-700 hover:bg-violet-800">Add Todo</Button>
            {
                isLoading ? 
                <div className="space-y-3">{Array.from({ length: 3 }, (_, index) => <TodoSkeleton key={index} />)}</div>
                : (todosList.length > 0 ? <ul className="space-y-3">{todosList}</ul> : <p className="text-center text-gray-500">No todos found</p>)
            }
            <Modal isOpen={isOpenModal} close={closeModalHandler} title={isEditing ? "Edit todo" : "Add a new todo"}>
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-3">
                    <Input type="text" placeholder="Title" value={todo.title} onChange={(event) => setTodo({ ...todo, title: event.target.value })} />
                    {error && (<p className="text-red-500 text-sm">{error}</p>)}
                    <div className="flex items-center gap-x-2">
                        <Button type="submit" className="bg-violet-800 hover:bg-violet-900">{isEditing ? "Edit" : "Save"}</Button>
                        <Button onClick={closeModalHandler} type="reset" className="bg-red-700 hover:bg-red-800">Cancel</Button>
                    </div>
                </form>
            </Modal>
            <Modal isOpen={isOpenConfirmModal} close={closeConfirmModalHandler} title="Delete todo">
                <div className="space-y-3">
                    <p>Are you sure you want to delete this todo?</p>
                    <div className="flex items-center gap-x-2">
                        <Button onClick={onDeleteHandler} className="bg-red-800 hover:bg-red-900">Yes</Button>
                        <Button onClick={closeConfirmModalHandler} type="reset" className="bg-gray-400 hover:bg-gray-500">No</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Todos
