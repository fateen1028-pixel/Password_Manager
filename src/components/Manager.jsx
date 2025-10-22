import React, { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setform] = useState({
    id: "",
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
     let req = await fetch("http://localhost:3000/")
     let passwords = await req.json()
     console.log(passwords);
      setpasswordArray(passwords);
  }
  
  useEffect(() => {
    getPasswords()
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const savePassword = async () => {
  let newPassword = { ...form };

  if (!newPassword.site || !newPassword.username || !newPassword.password) {
    toast.warn("All fields are required!");
    return;
  }

  if (newPassword.id) {
    // Update existing entry
    await fetch(`http://localhost:3000/${newPassword.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassword),
    });
    toast.info('Password updated!');
  } else {
    // Create new entry
    newPassword.id = uuidv4();
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassword),
    });
    toast.success('Password saved!');
  }

  setform({ id: "", site: "", username: "", password: "" });
  getPasswords();
};


  const deletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete this password?")
    if (c) {
      // 1. Send DELETE request to the server
      await fetch(`http://localhost:3000/${id}`, {
          method: "DELETE",
      });
      
      // 2. Re-fetch the updated list from the server
      getPasswords();

      toast.info('Password deleted!');
    }
  };

  const editPassword = (id) => {
  const selected = passwordArray.find(item => item.id === id);
  setform(selected);
  toast.info('Password ready for editing!');
};


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("🦄 Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* ADDED RESPONSIVE PADDING AND MAX-WIDTH to mycontainer for better general layout */}
      <div className="mycontainer mx-auto p-4 max-w-4xl"> 
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700 text-2xl">&lt;</span>
          <span className="text-2xl">Pass</span>
          <span className="text-green-700 text-2xl">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className=" flex flex-col p-4 text-black gap-4 md:gap-8 items-center"> {/* Reduced mobile gap to 4 */}
          <input
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="bg-white rounded-full border border-green-500 w-full px-4 py-1"
          />
          {/* Mobile: flex-col (stacked). Medium screens and up: md:flex-row (side-by-side) */}
          <div className="flex w-full **flex-col md:flex-row** gap-4 md:gap-8">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="bg-white rounded-full border border-green-500 w-full px-4 py-1"
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                name="password"
                className="bg-white rounded-full border border-green-500 w-full px-4 py-1 pr-12"
              />

              <span
                className="absolute right-0 my-1.5 cursor-pointer mx-3"
                onClick={togglePasswordVisibility} 
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className=" flex w-fit text-black hover:text-white justify-center gap-3 items-center bg-green-400 rounded-full px-8 py-2 hover:bg-green-300  cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          
          {/* ADDED overflow-x-auto to make the table horizontally scrollable on small screens */}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto"> 
            <table className="table-auto w-full **min-w-max** rounded-md overflow-hidden ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2 px-2">Site</th>
                  <th className="py-2 px-2">Username</th>
                  <th className="py-2 px-2">Password</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => {
                  return (
                    
                      <tr key={item.id}>
                        {/* REMOVED fixed width: w-32 */}
                        <td className="text-center py-2 px-2 border border-white whitespace-nowrap">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <i
                            className="fa-solid fa-copy cursor-pointer px-4 "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          ></i>
                        </td>
                        {/* REMOVED fixed width: w-32 */}
                        <td className="text-center py-2 px-2 border border-white whitespace-nowrap">
                          {item.username}
                          <i
                            className="fa-solid fa-copy cursor-pointer px-4 "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          ></i>
                        </td>
                        {/* REMOVED fixed width: w-32 */}
                        <td className="text-center py-2 px-2 border border-white whitespace-nowrap">
                          {item.password}
                          <i
                            className="fa-solid fa-copy cursor-pointer px-4 "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          ></i>
                        </td>
                        {/* REMOVED fixed width: w-32 */}
                        <td className="text-center py-2 px-2 border border-white whitespace-nowrap">
                          <span>
                            {" "}
                            <i
                              className="fa-solid fa-pen-to-square mx-1 cursor-pointer"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            ></i>
                            <i
                              className="fa-solid fa-trash mx-1 cursor-pointer"
                              onClick={()=>{deletePassword(item.id)}}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;