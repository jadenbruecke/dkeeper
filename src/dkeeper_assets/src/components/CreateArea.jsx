import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [inputNote, setInputNote] = useState({ title: "", content: "" });
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    props.onAdd(inputNote);
    setInputNote({ title: "", content: "" });
    // prevent auto refresh
    event.preventDefault();
  };

  const customStyle = {
    display: expanded ? "block" : "none"
  };

  return (
    <div>
      <form className="create-note">
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={inputNote.title}
          style={customStyle}
        />
        <textarea
          onChange={handleChange}
          onClick={handleExpand}
          name="content"
          placeholder="Take a note..."
          rows={expanded ? 3 : 1}
          value={inputNote.content}
        />
        <Zoom in={expanded}>
          <Fab onClick={handleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
