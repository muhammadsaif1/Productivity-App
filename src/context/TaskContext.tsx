import axios, { AxiosError } from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';
export type Task = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
};

interface ContextType {
  mainTask: Task[];
  setMainTask: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteHandler: (taskId: number) => void;
  confirmDeleteHandler: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  desc: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  titleError: boolean;
  setTitleError: React.Dispatch<React.SetStateAction<boolean>>;
  descriptionError: boolean;
  setDescriptionError: React.Dispatch<React.SetStateAction<boolean>>;
  date: dayjs.Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  editingTaskIndex: number | null;
  setEditingTaskIndex: React.Dispatch<React.SetStateAction<number | null>>;
  addingTask: boolean;
  setAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editHandler: (taskId: number) => void;
  openModalHandler: () => void;
  closeModalHandler: () => void;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isDialogOpen: boolean;
  isDeleting: boolean;
  closeDialog: () => void;
}

export const TaskContext = createContext<ContextType>({
  mainTask: [
    { _id: '', title: '', description: '', createdAt: '', deadline: '' },
  ],
  setMainTask: () => {},
  deleteHandler: () => {},
  confirmDeleteHandler: () => {},
  isLoading: true,
  setIsLoading: () => {},
  title: '',
  setTitle: () => {},
  desc: '',
  setDesc: () => {},
  titleError: false,
  setTitleError: () => {},
  descriptionError: false,
  setDescriptionError: () => {},
  date: dayjs(),
  setDate: () => {},
  editingTaskIndex: null,
  setEditingTaskIndex: () => {},
  addingTask: false,
  setAddingTask: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  editHandler: () => {},
  openModalHandler: () => {},
  closeModalHandler: () => {},
  submitHandler: async () => {},
  isDialogOpen: false,
  isDeleting: false,
  closeDialog: () => {},
});

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState<number | null>(
    null,
  );

  const openDialog = (index: number) => {
    setTaskToDeleteIndex(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setTaskToDeleteIndex(null);
    setIsDialogOpen(false);
  };

  const confirmDeleteHandler = async () => {
    if (taskToDeleteIndex === null) return;

    const taskId = mainTask[taskToDeleteIndex]?._id;
    if (!taskId) {
      console.error('Task ID is missing for the task to be deleted.');
      return;
    }
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.delete(
        `https://saif-project-27e9eb091b33.herokuapp.com/api/deleteTask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        const updatedTasks = mainTask.filter(
          (_, index) => index !== taskToDeleteIndex,
        );
        navigate('/');
        setMainTask(updatedTasks);
      } else {
        console.error('Failed to delete task:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting task:', error.message);
        console.log('Error response:', error.response);
        console.log('Error response data:', error.response?.data);
      } else {
        console.error('Non-Axios error occurred:', error);
      }
    }
    setIsDeleting(false);
    closeDialog();
  };

  const deleteHandler = (index: number) => {
    openDialog(index);
  };

  const editHandler = (index: number) => {
    const taskToEdit = mainTask[index];
    if (!taskToEdit) {
      console.error('Task to edit is not found.');
      return;
    }
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.description);
    setDate(dayjs(taskToEdit.deadline));
    setEditingTaskIndex(index);
    openModalHandler();
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setTitleError(false);
    setDescriptionError(false);
    setDesc('');
    setTitle('');
    setEditingTaskIndex(null);
    setDate(dayjs());
    setAddingTask(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 1 || !title.length) {
      setTitleError(true);
      return;
    }
    if (desc.length < 1 || !desc.length) {
      setDescriptionError(true);
      return;
    }
    setAddingTask(true);

    const deadline: string = date ? date.toString() : '';
    const createdAt: string = new Date().toISOString();

    const taskPayload = { title, description: desc, deadline, createdAt };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      if (editingTaskIndex !== null) {
        const taskId = mainTask[editingTaskIndex]._id;
        const response = await axios.put(
          `https://saif-project-27e9eb091b33.herokuapp.com/api/updateTask/${taskId}`,
          taskPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          const updatedTask: Task = response.data.data;
          const updatedMainTask = [...mainTask];
          updatedMainTask[editingTaskIndex] = updatedTask;

          setMainTask(updatedMainTask);
        } else {
          console.error('Failed to update task:', response.data.message);
        }
      } else {
        const response = await axios.post(
          'https://saif-project-27e9eb091b33.herokuapp.com/api/createTask',
          taskPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.success) {
          const updatedTask: Task = response.data.data;
          const updatedMainTask = [updatedTask, ...mainTask];
          setMainTask(updatedMainTask);
        } else {
          console.error('Failed to create task:', response.data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.message);
        console.log('Error response:', error.response);
        console.log('Error response data:', error.response?.data);
      } else {
        console.error('Non-Axios error occurred:', error);
      }
    }

    closeModalHandler();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get<{ success: boolean; data: Task[] }>(
          'https://saif-project-27e9eb091b33.herokuapp.com/api/fetchTasks',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success) {
          const data = response.data.data.map((item) => ({
            title: item.title,
            description: item.description,
            _id: item._id,
            createdAt: item.createdAt,
            deadline: item.deadline,
          }));
          setMainTask(data.reverse());
        } else {
          console.error('Failed to fetch tasks:', response.data);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error(
          'Error fetching tasks:',
          error.message,
          error.response?.data,
        );
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        mainTask,
        setMainTask,
        deleteHandler,
        confirmDeleteHandler,
        isLoading,
        setIsLoading,
        title,
        desc,
        setTitle,
        setDesc,
        titleError,
        setDate,
        setDescriptionError,
        setEditingTaskIndex,
        setTitleError,
        date,
        descriptionError,
        editingTaskIndex,
        addingTask,
        setAddingTask,
        openModalHandler,
        editHandler,
        isModalOpen,
        setIsModalOpen,
        closeModalHandler,
        submitHandler,
        isDeleting,
        isDialogOpen,
        closeDialog,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
