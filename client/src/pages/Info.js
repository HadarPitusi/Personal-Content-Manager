// Info.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserLogin } from '../utils/auth';
import '../css/info.css';

const Info = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkIfUserLogin(navigate, setUser)
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="info_container">
      <h2 className="info_title">Personal Information</h2>
      <hr className="info_hr" />
      <p className="info_line"><strong>Full Name:</strong> {user.user.name}</p>
      <p className="info_line"><strong>Username:</strong> {user.user.username}</p>
      <p className="info_line"><strong>Email:</strong> {user.user.email}</p>
      <p className="info_line"><strong>Phone:</strong> {user.user.phone}</p>
      <p className="info_line"><strong>Website:</strong> {user.website}</p>

      <h3 className="info_subtitle">Address</h3>
      <p className="info_line">{user.user.address.street}, {user.user.address.suite}</p>
      <p className="info_line">{user.user.address.city}</p>

      <h3 className="info_subtitle">Company</h3>
      <p className="info_line"><strong>Name:</strong> {user.user.company.name}</p>
      <p className="info_line"><strong>Catch Phrase:</strong> {user.user.company.catchPhrase}</p>

      <div className="info_db">
        <h3 className="info_subtitle">Post info</h3>
        <h4><strong>You have</strong></h4>
        <p>{user.posts?.length ?? 0} posts</p>
        <p>{user.albums?.length ?? 0} albums</p>
        <p>{user.todos?.length ?? 0} todos</p>
      </div>

      <button
        className="info_back_button"
        onClick={() => navigate(`/users/${user.user.id}/home`)
}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default Info;
