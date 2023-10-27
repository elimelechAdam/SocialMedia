import { useState } from "react";
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  let auth = localStorage.getItem("userToken");
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <header className="bg-white p-3 shadow-lg">
        <nav className="flex items-center justify-between">
          <h1 className="p-2 underline underline-offset-4 text-xl border-l-2 border-custom-black text-custom-black">
            SocialMedia
          </h1>
          {!auth ? (
            <div className="hidden sm:flex gap-3">
              <button className="borderBtn">Sign in</button>
              <button className="borderBtn">Sign up</button>
            </div>
          ) : (
            <div className="hidden sm:flex gap-3">
              <button
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="borderBtn"
                type="button"
                onClick={openModal}
              >
                Profile
              </button>
              <button className="borderBtn" onClick={logout}>
                Logout
              </button>
            </div>
          )}
          <div className="cursor-pointer sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
            </svg>
          </div>
        </nav>
      </header>
      <Profile isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
