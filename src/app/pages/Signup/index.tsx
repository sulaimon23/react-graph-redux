import React, { useState } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import GreyDot from "../../../assets/elipse-gray.svg";
import GreenDot from "../../../assets/elipse-green.svg";
import PasswordShowHide from "../../components/PasswordShowHide";
import { useAppDispatch } from "../../hooks";
import authService from "../../services/authServices";
import { setUserData } from "../../services/dataSlice";
import { toast } from "react-toastify";
import { AuthData } from "../../services/types";

//

const actionDispatch = (dispatch: Dispatch) => ({
    setUser: (page: any) => dispatch(setUserData(page)),
});

export function SignUpPage() {
    const { setUser } = actionDispatch(useAppDispatch());

    const signUp = async (props: AuthData) => {
        setLoading(true);
        await authService
            .signup({ ...props })
            .then((response) => {
                toast.success("Sign up successful");
                setUser(response);
                localStorage.setItem("token", response.token);
            })
            .catch((e) => {
                toast.error("User exists");
            })
            .finally(() => setLoading(false));
    };

    const [long, longEnough] = useState(false);
    const [number, hasNumber] = useState(false);
    const [symbol, hasSymbol] = useState(false);
    const [letters, hasLetters] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <Wrapper>
            <div className="box">
                <span className="head">
                    <h1>Create an Account</h1>
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </span>

                <Formik
                    initialValues={{
                        first_name: "",
                        last_name: "",
                        password: "",
                        email: "",
                    }}
                    validate={(values) => {
                        values.password.length < 8
                            ? longEnough(false)
                            : longEnough(true);
                        !/\d/.test(values.password)
                            ? hasNumber(false)
                            : hasNumber(true);

                        if (values.password.length > 0) {
                            /^[a-zA-Z0-9]+$/g.test(values.password)
                                ? hasSymbol(false)
                                : hasSymbol(true);
                        } else {
                            hasSymbol(false);
                        }

                        if (values.password.length > 0) {
                            !/[A-Z]/g.test(values.password)
                                ? hasLetters(false)
                                : hasLetters(true);
                        } else {
                            hasLetters(false);
                        }

                        const errors: any = {};
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        if (
                            values.email ||
                            values.password ||
                            values.last_name ||
                            values.first_name
                        ) {
                            signUp(values);
                        }
                    }}
                >
                    {({
                        errors,
                        touched,
                        values,
                        handleChange,
                        handleBlur,
                        isValid,
                        dirty,
                    }) => (
                        <Form>
                            <div className="em-box">
                                <div className="names">
                                    <div className="name__a">
                                        <label htmlFor="email">
                                            First Name{" "}
                                        </label>
                                        <Field
                                            name="first_name"
                                            className="s-input"
                                        />
                                        {errors.first_name &&
                                        touched.first_name ? (
                                            <div>{errors.first_name}</div>
                                        ) : null}
                                    </div>

                                    <div className="name__a">
                                        <label htmlFor="email">Last Name</label>
                                        <Field
                                            name="last_name"
                                            className="s-input"
                                        />
                                        {errors.last_name &&
                                        touched.last_name ? (
                                            <div>{errors.last_name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="es-box">
                                    <div style={{ marginBottom: 8 }}>
                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                    </div>
                                    <div>
                                        <Field
                                            name="email"
                                            placeholder="Type here"
                                            type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="l-input"
                                        />
                                        {errors.email && touched.email && (
                                            <div className="err">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="ps-box">
                                <div style={{ marginBottom: 8 }}>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div>
                                    <Field
                                        placeholder="Type your password here"
                                        name="password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className="l-input"
                                        component={PasswordShowHide}
                                    />
                                </div>
                                <CheckPassword>
                                    {long ? (
                                        <span>
                                            <img src={GreenDot} alt="img" />{" "}
                                            <p style={{ color: "green" }}>
                                                Contains eight characters
                                            </p>
                                        </span>
                                    ) : (
                                        <span>
                                            <img src={GreyDot} alt="img" />
                                            <p>Contains eight characters</p>
                                        </span>
                                    )}

                                    {letters ? (
                                        <span>
                                            <img src={GreenDot} alt="img" />{" "}
                                            <p style={{ color: "green" }}>
                                                Contains at least one uppercase
                                                letter
                                            </p>
                                        </span>
                                    ) : (
                                        <span>
                                            <img src={GreyDot} alt="img" />
                                            <p>
                                                Contains at least one uppercase
                                                letter
                                            </p>
                                        </span>
                                    )}

                                    {number ? (
                                        <span>
                                            <img src={GreenDot} alt="img" />{" "}
                                            <p style={{ color: "green" }}>
                                                Contains at least one number
                                            </p>
                                        </span>
                                    ) : (
                                        <span>
                                            <img src={GreyDot} alt="img" />{" "}
                                            <p>Contains at least one number</p>
                                        </span>
                                    )}

                                    {symbol ? (
                                        <span>
                                            <img src={GreenDot} alt="img" />{" "}
                                            <p style={{ color: "green" }}>
                                                Contains at least one symbol
                                            </p>
                                        </span>
                                    ) : (
                                        <span>
                                            <img src={GreyDot} alt="img" />{" "}
                                            <p>Contains at least one symbol</p>
                                        </span>
                                    )}
                                </CheckPassword>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={
                                        !(isValid && dirty) ||
                                        loading ||
                                        !long ||
                                        !number ||
                                        !symbol ||
                                        !letters
                                    }
                                >
                                    {loading ? "Loading" : "Sign up"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
    .box {
        width: 720px;
        min-height: 373px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 32px 40px;
        gap: 31px;
        background: #ffffff;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            .es-box {
                margin-top: 24px;
            }
            .ps-box {
                margin-top: 23px;
            }
            .err {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 15px;
                /* identical to box height */
                color: #f41e10;
            }
            button {
                width: 100%;
                height: 36px;
                background: #555658;
                border-radius: 4px;
                border: none;
                outline: none;
                margin-top: 40px;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                /* identical to box height */
                color: #ffffff;
            }
            button:disabled,
            button[disabled] {
                background: #b7bcc4;
            }
            #password {
            }
        }
        input {
            background: #ffffff;
            border: 1px solid #e1e1e1;
            padding: 10px 12px;
            border-radius: 4px;
        }
        .names {
            display: flex;
            gap: 16px;
        }
        .name__a {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .s-input {
            /* width: calc(50% - 26px); */
        }
        .l-input {
            width: calc(100% - 26px);
        }
        input:focus {
            background: #fafafa;
            color: #000000;
        }
        label {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            margin-bottom: 8px;
            color: #1a1a1a;
        }
        .head {
            h1 {
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 600;
                font-size: 24px;
                line-height: 29px;
                text-align: center;
                color: #000000;
            }
            p {
                font-weight: 400;
                font-size: 16px;
                line-height: 20px;
                /* identical to box height */
                text-align: center;
                color: #777777;
            }
        }
        input::placeholder {
            color: #cacaca;
            opacity: 1;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
        }
        input:-ms-input-placeholder {
            color: #cacaca;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
        }
        input::-ms-input-placeholder {
            color: #cacaca;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
        }
    }

    @media (max-width: 768px) {
        .box {
            width: 80%;
        }
    }
`;

const CheckPassword = styled.div`
    span {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            /* identical to box height, or 150% */
            color: #999b9f;
        }
    }
`;
