import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import styled from "styled-components"
import { motion } from 'framer-motion';
import { CookiesProvider, useCookies } from "react-cookie";

// assets
import character from "../assets/character.svg"
import language from "../assets/language.svg"

// Styles
import styles from "./SignIn.module.css"

// Functions
import { validate } from '../helpers/validate';
import { notify } from "../helpers/toast"
import { Link } from 'react-router-dom';

const SignUp = () => {

    const Language = styled(motion.img)`
        width: 60px ;
        position: absolute;
        left: 20px;
        top: 20px;
        border: 2px solid #8e8e8e;
        border-radius: 50%;
        transform: rotate(0deg)
        transition:4s;
        `

    const [data, setData] = useState({

        phoneNumber: "",
        password: "",

    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [rotationAnimation, setRotationAnimation] = useState(true);
    const [cookies, setCookie] = useCookies(["user"]);


    useEffect(() => {
        setErrors(validate(data, "signin"))
    }, [data, touched])


    const focusHandler = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const changeHandler = (event) => {
            setData({ ...data, [event.target.name]: event.target.value })
        
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
                axios.post('', data).then((response) => {notify("با موفقیت ثبت نام شدید", "success");
                const expiration = new Date(Date.now() + 1800000);
                setCookie("user", response ,{ expires: expiration });
                })
             .catch (error => {notify("خطا در ارسال اطلاعات به سرور", "error");
            })  
        } else {
            notify("اطلاعات به درستی وارد نشده است!", "error")
            setTouched({
                phoneNumber: true,
                password: true,
            })
            console.log(errors)
        }
    }
    const rotationAnim = () => {
        setRotationAnimation(!rotationAnimation)
    }


    return (
        <>
            <div className={styles.container}>
            <Language src={language} alt="language" whileTap={{rotate: rotationAnimation ? 360 : -360}} onClick={() => rotationAnim()} />
                <form onSubmit={submitHandler} className={styles.formContainer}>
                <img src={character} alt="test" className={styles.character}/>

                    <div className={styles.formField}>
                        <input placeholder='شماره تماس' type="text" value={data.phoneNumber} name='phoneNumber' onChange={changeHandler} onFocus={focusHandler} className={(errors.phoneNumber && touched.phoneNumber) ? styles.uncompleted : styles.formInput} />
                        
                    </div>
                    <div className={styles.formField}>
                        <input placeholder='رمز عبور' type="text" value={data.password} name='password' onChange={changeHandler} onFocus={focusHandler} className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput} />
                       
                    </div>                    
                    <div className={styles.formButtons}>
                        <button type="submit">ورود</button>
                    </div>
                    <Link to="/signup" className={styles.subtitle}>هنوز اکانت ندارید؟ کلیک کنید</Link>
                </form>
                <ToastContainer />
            </div>


        </>
    );
};

export default SignUp;