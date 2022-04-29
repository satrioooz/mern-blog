import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeRegister,
  setPostRegis,
} from "../../../React-redux/Reducer/ReducerOauth/ReduxAuth";

const Register = () => {
  const dispatch = useDispatch();
  const formRegis = useSelector((state) => state.Oauth.user);
  const { nama, password, email, confirmPassword } = formRegis;

  // ==== USE STATE ====
  const [wrong, setWrong] = useState(false);

  const submitRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setWrong(true);
    } else {
      setWrong(false);
      let data = {
        nama: nama,
        password: password,
        email: email,
      };
      dispatch(setPostRegis(data));
    }
  };
  return (
    <div className="flex bg-slate-700 items-center w-full h-screen">
      <div className="flex w-full items-center justify-center">
        <form
          onSubmit={submitRegister}
          className="flex  justify-center flex-col lg:w-[30%] sm:w-[50%] rounded-md p-3 lg:h-[65vh] bg-slate-200"
        >
          <h1 className="text-center text-semibold text-[1.2rem] text-black">
            Register
          </h1>
          <div className="flex flex-col mb-3">
            <label className="text-black text-sm">Username</label>
            <input
              value={nama}
              onChange={(e) =>
                dispatch(setChangeRegister("nama", e.target.value))
              }
              className="bg-gray-800 w-full h-10 px-3 py-2 rounded-lg text-white placeholder:text-slate-400"
              type="text"
              placeholder="Enter you username"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-black text-sm">Email</label>
            <input
              value={email}
              onChange={(e) =>
                dispatch(setChangeRegister("email", e.target.value))
              }
              className="bg-gray-800 w-full h-10 px-3 py-2 rounded-lg text-white placeholder:text-slate-400"
              type="email"
              placeholder="Enter you email"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-black text-sm ">Password</label>
            <input
              value={password}
              onChange={(e) =>
                dispatch(setChangeRegister("password", e.target.value))
              }
              className="bg-gray-800 w-full h-10 px-3 py-2 rounded-lg text-white placeholder:text-slate-400 "
              type="password"
              placeholder="Enter you password"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-black text-sm">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                dispatch(setChangeRegister("confirmPassword", e.target.value));
              }}
              className="bg-gray-800 w-full h-10 px-3 py-2 peer text-white placeholder:text-slate-400 rounded-lg"
              type="password"
              placeholder="Enter you password"
            />
            {wrong && (
              <p className=" peer-invalid:visible pl-2 pt-2 text-sm text-red-500">
                ! Ups confirm password not same
              </p>
            )}
          </div>

          <input
            className="bg-blue-300 rounded-full hover:bg-blue-400 hover:text-white h-[40px]"
            type="submit"
            placeholder="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
