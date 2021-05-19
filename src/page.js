import React, { useState } from "react";
import Bg from "./icon/TEST/bg.jpg";
import AvatarNormal from "./icon/TEST/Group 441.svg";
import AvatarSignedIn from "./icon/TEST/Group 442.svg";
import HamburgurIcon from "./icon/TEST/Group 440.svg";
import CloseIcon from "./icon/TEST/Path 5616.svg";
import CompanyLogo from "./icon/TEST/logo-black.png";
import HeaderGradient from "./icon/TEST/Rectangle 1.svg";
function LoginModal({ config, onClose, login }) {
  if (!config?.open) return null;
  return (
    <div className="pointer-events-auto fixed inset-0 h-screen flex justify-center items-center">
      <div className="bg-white p-12 rounded-md w-96 flex flex-col relative">
        <div className="self-end flex items-center absolute top-0 mt-8">
          <button onClick={onClose}>
            <img alt="close" src={CloseIcon} />
          </button>
        </div>
        <div className="text-center font-bold text-3xl leading-none">Login</div>
        <div className="mt-5">
          <input
            className="bg-gray-F7 p-3 w-full rounded-lg text-sm focus:outline-none"
            placeholder="Your mail id"
          />
        </div>
        <div className="mt-5">
          <input
            type="password"
            className="bg-gray-F7 p-3 w-full rounded-lg text-sm focus:outline-none"
            placeholder="Enter password"
          />
        </div>
        <div className="text-right my-2 text-sm cursor-pointer">
          Forgot Password?
        </div>
        <div>
          <button
            className="w-full rounded-md text-white bg-blue-500 py-2 focus:outline-none"
            onClick={login}
          >
            Login
          </button>
        </div>
        <div>
          <button className="w-full rounded-md text-blue-500 border-blue-500 border mt-5 py-2 focus:outline-none">
            Login with gmail
          </button>
        </div>
        <div className="text-center text-sm mt-5">
          Not a member of iLRNU?{" "}
          <span className="text-blue-500 font-medium cursor-pointer">
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

function Menu({ items = [] }) {
  return (
    <div className="bg-white rounded-md absolute top-0 right-0 mt-16 w-64 py-3">
      {items.map((item) => {
        return (
          <div
            className="w-full py-3 px-5 hover:font-bold cursor-pointer"
            onClick={() => {
              if (typeof item.action === "function") {
                item.action();
              }
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}

function Test() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [dropdownBeforeLoginOpen, setDropdownBeforeLoginOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    open: false,
    type: "login",
  });
  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <img
        alt="gradient"
        src={HeaderGradient}
        className="absolute bg-contain w-full inset-x-0 top-0 z-0"
      />
      <header className="w-full flex justify-between px-8 py-2 relative z-10">
        <div>
          <img
            alt="logo"
            src={CompanyLogo}
            className="bg-contain w-40 md:w-56"
          />
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <button className="border-white rounded-md px-5 py-2 bg-transparent text-white border">
              Join as tutor
            </button>
          </div>
          <div
            className={`flex items-center relative ${
              isSignedIn ? "bg-white rounded-lg px-4 py-2 gap-4" : ""
            }`}
          >
            {isSignedIn ? (
              <>
                <button
                  onClick={() => {
                    setDropdownBeforeLoginOpen((e) => !e);
                  }}
                >
                  <img alt="avatar" src={HamburgurIcon} className="" />
                </button>
                <img alt="avatar" src={AvatarSignedIn} className="" />
              </>
            ) : (
              <button
                onClick={() => {
                  setDropdownBeforeLoginOpen((e) => !e);
                }}
              >
                <img alt="avatar" src={AvatarNormal} className="" />
              </button>
            )}

            {dropdownBeforeLoginOpen ? (
              <Menu
                items={[
                  ...(isSignedIn
                    ? [
                        {
                          name: "Sign out",
                          action: () => {
                            setIsSignedIn(false);
                            setDropdownBeforeLoginOpen(false);
                          },
                        },
                      ]
                    : [
                        {
                          name: "Log in",
                          action: () => {
                            setModalConfig({
                              open: true,
                              type: "login",
                            });
                            setDropdownBeforeLoginOpen(false);
                          },
                        },
                        { name: "Sign up", action: () => {} },
                      ]),
                  { name: "How online tutoring works", action: () => {} },
                  { name: "Help Center", action: () => {} },
                ]}
              />
            ) : null}
          </div>
        </div>
      </header>
      <LoginModal
        config={isSignedIn ? {} : modalConfig}
        login={() => {
          setIsSignedIn(true);
          setModalConfig({
            open: false,
            type: "login",
          });
        }}
        onClose={() => {
          setModalConfig({
            open: false,
            type: "login",
          });
        }}
      />
    </div>
  );
}

export default Test;
