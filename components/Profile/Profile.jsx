import { useState, useEffect } from "react";
import MyProfile from "./MyProfile/MyProfile";
import MyEvents from "./MyEvents/MyEvents";
import MyDrawer from "./MyDrawer";
import Navbar from "./NavBar/NavBar";
import useUser from "../../hooks/useUser";
import UserRequests from "./MyProfile/Requests/UserRequests";
import Register from "./MyRegistration/Register";
import MyRegistration from "./MyRegistration/MyRegistration";
import HostRequests from "./MyRegistration/Requests/HostRequests";

const Drawer = ({ userData }) => {
  const displayName = userData ? userData.displayName : "";
  const photoURL = userData ? userData.photoURL : "";
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(768);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    const sidebarClose = document.querySelector(".sidebar-close");
    if (sidebarClose)
      sidebarClose.addEventListener("click", () => {
        setOpen(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* <div className="h-screen w-screen fixed profile-bg z-0 opacity-50"></div> */}
      {width <= 770 ? (
        <div
          className={`border-r shadow-lg fixed w-[16rem] bg-[#fff] h-screen min-h-max overflow-auto gap-10 overflow-x-hidden z-[200] ${
            open ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 sidebar`}
        >
          <MyDrawer
            photoURL={photoURL}
            displayName={displayName}
            register={register}
            setRegister={setRegister}
            admin={userData && userData.accountType === "admin"}
          />
        </div>
      ) : (
        <div
          className={`border-r shadow-lg fixed w-[16rem] bg-[#fff] h-screen min-h-max overflow-auto gap-10 overflow-x-hidden z-50 transition-all duration-300 hidden md:block sidebar`}
        >
          <MyDrawer
            photoURL={photoURL}
            displayName={displayName}
            register={register}
            setRegister={setRegister}
            admin={userData && userData.accountType === "admin"}
          />
        </div>
      )}

      <div className="md:ml-[16rem]">
        <div className="bg-blue-500 h-16 flex justify-between px-8 items-center">
          <Navbar displayName={displayName} setOpen={setOpen} />
        </div>
        <div>
          {!register ? (
            <>
              <MyProfile />
              <MyEvents />
              <UserRequests />
            </>
          ) : userData.accountType === "admin" ? (
            <>
              <Register />
              <MyRegistration />
              <HostRequests />
            </>
          ) : null}
        </div>
      </div>

      <div
        className={`sidebar-close ${
          open ? "h-screen w-screen" : "h-0 w-0"
        } bg-gray-900 opacity-10 fixed inset-0 z-[100] block md:hidden`}
      ></div>
    </div>
  );
};

const Profile = () => {
  const { user } = useUser();
  return (
    <>
      <Drawer userData={user} />
    </>
  );
};

export default Profile;
