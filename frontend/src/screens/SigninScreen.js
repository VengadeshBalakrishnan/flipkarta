import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";

export default function SigninScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
  
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
  
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signin(email, password));
    };
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]); 

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> Sign In</h1>
        </div>
        <div>
          <label htmlFor="email"> Email Address </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer ? <Link to="/register"> Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
