const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h2>{user.name}</h2>
      <p>{user.role}</p>

      <button
        onClick={() => onEdit(user)}
        style={{
          padding: "6px 12px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(user.id)}
        style={{
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;