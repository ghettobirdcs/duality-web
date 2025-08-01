import React from "react";

const EditableRole = ({
  isEditing,
  currentRole,
  newRole,
  setNewRole,
  onEdit,
  onSubmit,
  onCancel,
}) => {
  if (isEditing) {
    return (
      <span className="player__role--container">
        <span className="box-line line-bottom" />
        <span className="box-line line-left" />
        <span className="box-line line-right" />
        <span className="box-line line-top-left" />
        <span className="box-line line-top-right" />
        <input
          className="player__role--input"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          onBlur={onSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
            if (e.key === "Escape") onCancel();
          }}
          autoFocus
        />
      </span>
    );
  }

  return (
    <span className="player__role" onClick={onEdit}>
      {currentRole}
    </span>
  );
};

export default EditableRole;
