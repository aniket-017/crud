import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register} from "../../actions/userAction";
import "./Page.css";

const Page = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        first: "",
        last:"",
        email: "",
        phone:"",
        password: "",
    });

    const { first, last, email, phone, password } = user;

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("first", first);
        myForm.set("last", last);
        myForm.set("email", email);
        myForm.set("phone", phone);
        myForm.set("password", password);

        dispatch(register(myForm));
        console.log("submitted");
    };

    const registerDataChange = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="body">
            <div className="container">
                <div className="title">Registration</div>
                <form onSubmit={registerSubmit}>
                    <div className="user_details">
                        <div className="input_pox">
                            <span className="datails">Full Name</span>
                            <input type="text" placeholder="Venue name" required value={first} onChange={registerDataChange} name="first" />
                        </div>
                        <div className="input_pox">
                            <span className="datails">Username</span>
                            <input type="text" placeholder="enter your Username" required value={last} onChange={registerDataChange} name="last" />
                        </div>
                        <div className="input_pox">
                            <span className="datails">Email</span>
                            <input type="text" placeholder="enter your Email" required value={email} onChange={registerDataChange} name="email" />
                        </div>
                        <div className="input_pox">
                            <span className="datails">Phone Number</span>
                            <input type="text" placeholder="enter your Phone" required value={phone} onChange={registerDataChange} name="phone" />
                        </div>
                        <div className="input_pox">
                            <span className="datails">Password</span>
                            <input type="password" placeholder="enter your Password" required value={password} onChange={registerDataChange} name="password" />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
