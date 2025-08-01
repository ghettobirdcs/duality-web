import React, { useRef, useEffect, useState } from "react";
import {
  updatePlayerRole,
  updatePlayerStatus,
} from "../../utils/playersService";
import EditableRole from "./EditableRole";
import EditableStatus from "./EditableStatus";

const PlayerItem = ({ player, index, currentUserId, fetchPlayers }) => {
  const isCurrentUser = player.id === currentUserId;

  const [status, setStatus] = useState(player.status || "Empty...");
  const [statusOpen, setStatusOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [newRole, setNewRole] = useState(player.role || "");

  const statusRef = useRef();

  useEffect(() => {
    if (statusOpen && statusRef.current) {
      statusRef.current.focus();
    }
  }, [statusOpen]);

  return (
    <li
      className="player__item"
      data-aos="flip-up"
      data-aos-delay={`${index * 100}`}
    >
      <p className="player__identifier">{isCurrentUser && "You"}</p>
      <div className="player__item--inner">
        <div className="player__gamertag--container">
          <div className="player__role--container">
            <EditableRole
              isEditing={isCurrentUser && editingRole}
              currentRole={player.role}
              newRole={newRole}
              setNewRole={setNewRole}
              onEdit={() => setEditingRole(true)}
              onSubmit={async () => {
                await updatePlayerRole(player.id, newRole);
                await fetchPlayers();
                setEditingRole(false);
              }}
              onCancel={() => setEditingRole(false)}
            />
          </div>
          <p className="player__gamertag">-&nbsp;{player.gamertag}</p>
        </div>
        <div className="player__status--container">
          <EditableStatus
            isCurrentUser={isCurrentUser}
            status={player.status}
            statusInput={status}
            setStatusInput={setStatus}
            statusOpen={statusOpen}
            setStatusOpen={setStatusOpen}
            updateStatus={async () => {
              await updatePlayerStatus(player.id, status);
              await fetchPlayers();
            }}
            placeholder={player.status}
          />
        </div>
      </div>
    </li>
  );
};

export default PlayerItem;
