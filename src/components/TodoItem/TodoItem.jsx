import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, toggleTodo, reorderTodo } from '../lib/todoSlice';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, TextField, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import './TodoItem.css';  // Import the CSS file

export default function TodoItem({ groupId }) {
  const [newItem, setNewItem] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const todos = useSelector(state => state.todos.todos.filter(todo => todo.groupId === groupId));
  const dispatch = useDispatch();
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleDragStart = (index, e) => {
    setDraggedIndex(index);
    e.target.classList.add('dragging');
  };
  // DRAG, DROP 
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === index) return;
    e.target.closest('.task').classList.add('droppable');
  };

  const handleDragLeave = (e) => {
    e.target.closest('.task').classList.remove('droppable');
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const targetItem = e.target.closest('.task');
    targetItem.classList.remove('droppable');

    const reorderedItems = [...todos];
    const draggedItem = reorderedItems[draggedIndex];

    reorderedItems.splice(draggedIndex, 1);
    reorderedItems.splice(index, 0, draggedItem);

    dispatch(reorderTodo(reorderedItems));

    setDraggedIndex(null);
  };
  //  ADD, EDIT, DELTE, SELECTION 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      if (editTaskId) {
        dispatch(updateTodo({
          id: editTaskId,
          title: newItem,
          groupId
        }));
        setEditTaskId(null);
        setMessage({
          type: "success",
          text: "Task updated successfully!"
        });
      } else {
        dispatch(addTodo({
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
          groupId
        }));
        setMessage({
          type: "success",
          text: "Task added successfully!"
        });
      }
      setNewItem("");
      setTimeout(() => setMessage({}), 3000);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    setMessage({
      type: "error",
      text: "Selected Tasks deleted."
    });
    setTimeout(() => setMessage({}), 3000);
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };
  // SELECT ALL, DESELECT ALL
  const handleMasterCheckboxChange = () => {
    const allCompleted = todos.every(todo => todo.completed);
    todos.forEach(todo => {
      if (allCompleted) {
        // Uncheck all tasks
        if (todo.completed) {
          handleToggle(todo.id);
        }
      } else {
        // Check all tasks
        if (!todo.completed) {
          handleToggle(todo.id);
        }
      }
    });
  };

  const handleTaskSelection = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
      {message.text && (
        <Alert className="my-2" variant="outlined" severity={message.type}>
          {message.text}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Checkbox
          checked={todos.every(todo => todo.completed)}
          indeterminate={todos.some(todo => todo.completed) && !todos.every(todo => todo.completed)}
          onChange={handleMasterCheckboxChange}
          className="mt-3 ms-3"
        />
        <TextField
          label="New Todo"
          variant="standard"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ marginLeft: '8px' }}
        />
        <IconButton type="submit">
          <AddIcon />
        </IconButton>
      </form>

      <List>
        {todos.map((todo, index) => (
          <ListItem
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(index, e)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            className="task shadow"
          >
            <ListItemButton>
              <ListItemIcon>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleTaskSelection(todo.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(todo.id);
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={todo.completed ? <s className='text-muted'>{todo.title}</s> : todo.title} />
            </ListItemButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setNewItem(todo.title);
                setEditTaskId(todo.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
            >
              <DeleteOutlineIcon color='error'/>
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
