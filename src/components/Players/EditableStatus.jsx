import React, { useEffect, useRef } from "react";

const EditableStatus = ({
  isCurrentUser,
  status,
  statusInput,
  setStatusInput,
  statusOpen,
  setStatusOpen,
  updateStatus,
  placeholder,
}) => {
  const statusRef = useRef();

  useEffect(() => {
    if (statusOpen && statusRef.current) {
      statusRef.current.focus();
    }
  }, [statusOpen]);

  if (!isCurrentUser) {
    return status ? (
      <span className="player__status">{status}</span>
    ) : (
      <span className="player__status player__status--empty">Empty...</span>
    );
  }

  // TODO: Fancy status input like we did for the role
  return (
    <>
      {statusOpen ? (
        <>
          <input
            maxLength={100}
            ref={statusRef}
            value={statusInput}
            className="player__status--input"
            onChange={(e) => setStatusInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setStatusOpen(false);
                updateStatus();
              } else if (e.key === "Escape") {
                setStatusOpen(false);
              }
            }}
          />
          <button
            className="navbar__btn status__post"
            onClick={() => {
              setStatusOpen(false);
              updateStatus();
            }}
          >
            Post
          </button>
        </>
      ) : status ? (
        <span className="player__status" onClick={() => setStatusOpen(true)}>
          {status}
        </span>
      ) : (
        <span className="player__status" onClick={() => setStatusOpen(true)}>
          Click to say something to your team!
        </span>
      )}
    </>
  );
};

export default EditableStatus;
