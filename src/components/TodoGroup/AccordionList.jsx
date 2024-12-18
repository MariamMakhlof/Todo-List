// import React, { useState } from "react";
// import { Box, TextField, IconButton } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import AccordionItem from "./AccordionItem"; // Import AccordionItem

// function AccordionList() {
//   const [accordions, setAccordions] = useState([
//     { id: 1, title: "Custom transition using Fade", content: "Lorem ipsum dolor sit amet." },
//     { id: 2, title: "Default transition using Collapse", content: "Lorem ipsum dolor sit amet." }
//   ]);
//   const [newTitle, setNewTitle] = useState("");

//   // Handle adding a new accordion
//   const handleAddAccordion = () => {
//     if (!newTitle) return;
//     const newId = accordions.length + 1;
//     setAccordions([
//       ...accordions,
//       { id: newId, title: newTitle, content: "New content added dynamically." }
//     ]);
//     setNewTitle(""); // Clear the input after adding
//   };

//   // Handle editing an accordion title
//   const handleEditAccordion = (id, newTitle) => {
//     const updatedAccordions = accordions.map((accordion) =>
//       accordion.id === id ? { ...accordion, title: newTitle } : accordion
//     );
//     setAccordions(updatedAccordions);
//   };

//   // Handle deleting an accordion
//   const handleDeleteAccordion = (id) => {
//     const updatedAccordions = accordions.filter((accordion) => accordion.id !== id);
//     setAccordions(updatedAccordions);
//   };

//   return (
//     <div>
//       {/* Input field to add a new accordion */}
//       <Box display="flex" alignItems="center" marginBottom={2}>
//         <TextField
//           label="New Accordion Title"
//           variant="standard"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           size="small"
//           style={{ marginRight: '10px' }}
//         />
//         <IconButton onClick={handleAddAccordion}>
//           <AddIcon />
//         </IconButton>
//       </Box>

//       {/* Render all accordion items */}
//       {accordions.map((accordion) => (
//         <AccordionItem
//           key={accordion.id}
//           accordion={accordion}
//           onEdit={handleEditAccordion}
//           onDelete={handleDeleteAccordion}
//         />
//       ))}
//     </div>
//   );
// }

// export default AccordionList;
