import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, TextField, Box, Checkbox, Alert, Switch } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TodoItem from "../TodoItem/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addAccordion, deleteAccordion, editAccordion } from "../lib/accordionSlice";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'none',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'none',
  },
}));

function TodoGroup() {
  const dispatch = useDispatch();
  const { accordions } = useSelector((state) => state.accordions);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedAccordionIds, setSelectedAccordionIds] = useState([]);
  const [expandedAccordionId, setExpandedAccordionId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [checked, setChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddOrEditAccordion = () => {
    if (!newTitle.trim()) return;
    if (editingId) {
      dispatch(editAccordion({ id: editingId, title: newTitle }));
      setEditingId(null);
      setMessage({ type: "success", text: "Group updated successfully!" });
    } else {
      dispatch(addAccordion({ title: newTitle }));
      setMessage({ type: "success", text: "Group added successfully!" });
    }
    setNewTitle("");
    setTimeout(() => setMessage({}), 3000);
  };

  const handleEditAccordion = (id, title) => {
    setEditingId(id);
    setNewTitle(title);
  };

  const handleDeleteSelected = () => {
    selectedAccordionIds.forEach((id) => dispatch(deleteAccordion(id)));
    setSelectedAccordionIds([]);
    setMessage({ type: "error", text: "Selected groups deleted." });
    setTimeout(() => setMessage({}), 3000);
  };

  const handleCheckboxChange = (id) => {
    setSelectedAccordionIds((prev) =>
      prev.includes(id) ? prev.filter((accordionId) => accordionId !== id) : [...prev, id]
    );
  };

  // const handleSwitchChange = () => {
  //   setChecked(!checked);
  //   if (!checked && accordions.length > 0) {
  //     setExpandedAccordionId(accordions[0].id);
  //   } else {
  //     setExpandedAccordionId(null);
  //   }
  // };

  const handleAccordionChange = (id) => {
    setExpandedAccordionId((prev) => (prev === id ? null : id));
  };

  const handleMasterCheckboxChange = () => {
    if (selectedAccordionIds.length === accordions.length) {
      setSelectedAccordionIds([]);
    } else {
      setSelectedAccordionIds(accordions.map((accordion) => accordion.id));
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedAccordions = accordions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {message.text && (
        <Alert className="my-2" variant="outlined" severity={message.type}>
          {message.text}
        </Alert>
      )}
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
        <Box className="d-flex justify-content-center align-items-center">
          <Checkbox
            checked={selectedAccordionIds.length === accordions.length}
            indeterminate={selectedAccordionIds.length > 0 && selectedAccordionIds.length < accordions.length}
            onChange={handleMasterCheckboxChange}
            className="mt-3 ms-3"
          />
          <TextField
            label={editingId ? "Edit Group" : "New Group"}
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            style={{ marginRight: '10px' }}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleAddOrEditAccordion} style={{ marginLeft: 'auto' }}>
            <AddIcon color="primary"/>
          </IconButton>
          <IconButton onClick={handleDeleteSelected} sx={{ p: 0.5 }}>
            <DeleteOutlineIcon color="error"/>
          </IconButton>
          {/* <Switch
            inputProps={{ 'aria-label': 'Switch demo' }}
            checked={checked}
            onChange={handleSwitchChange}
          /> */}
        </Box>
      </Box>

      {paginatedAccordions.map((accordion) => (
        <Accordion className="border-none overflow-hidden rounded-3 my-3 "
          key={accordion.id}
          expanded={expandedAccordionId === accordion.id}
          onChange={() => handleAccordionChange(accordion.id)}
        >
          <CustomAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${accordion.id}-content`}
          >
            <Box display="flex" alignItems="center" width="100%">
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Checkbox
                  checked={selectedAccordionIds.includes(accordion.id)}
                  onChange={() => handleCheckboxChange(accordion.id)}
                />
                <Typography>{accordion.title}</Typography>
              </Box>
              <IconButton
                onClick={() => handleEditAccordion(accordion.id, accordion.title)}
                sx={{ p: 0.5 }}
              >
                <EditIcon/>
              </IconButton>
            </Box>
          </CustomAccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <TodoItem groupId={accordion.id} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box className='d-flex justify-content-center mt-5 fixed-bottom'>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(accordions.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </Box>
    </div>
  );
}

export default TodoGroup;
