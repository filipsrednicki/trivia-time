import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { logOut } from "../actions/userActions";
import Modal from "./Modal";
import Auth from "./Auth/Auth";

const Nav: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user } = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setShowModal(false);
    }
  }, [user]);

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/browse-sets">Browse</Link>
        {user && <Link to="/create-set">Create</Link>}
      </div>
      <div className="nav-btns">
        {!user ? (
          <button onClick={() => setShowModal(true)}>Log In</button>
        ) : (
          <button onClick={() => dispatch(logOut())}>Log Out</button>
        )}
      </div>
      <Modal
        closeModal={() => setShowModal(false)}
        isShown={showModal}
        closeButton={true}
      >
        <Auth />
      </Modal>
    </nav>
  );
};

export default Nav;
