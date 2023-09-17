import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import PasswordStrengthBar from 'react-password-strength-bar';
import styled from "styled-components"
import {  motion } from 'framer-motion';

// assets
import character from "../assets/character.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import language from "../assets/language.svg"


// Styles
import styles from "./SignUp.module.css"

// Functions
import { validate } from '../helpers/validate';
import { notify } from "../helpers/toast"
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

       const Language = styled(motion.img)`
        width: 60px ;
        position: absolute;
        left: 20px;
        top: 20px;
        border: 2px solid #8e8e8e;
        border-radius: 50%;

    `
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [eye,setEye] = useState(true);
    const [passwordScore, setPasswordScore] = useState(0);
    const [rotationAnimation, setRotationAnimation] = useState(true)
    
    const navigate = useNavigate()
    
    if(passwordScore <= 2) {
        errors.password = "رمز ضعیف است"
    }

    useEffect(() => {
        setErrors(validate(data, "signup"));
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
            axios.post('../../../', data).then(() => {notify("با موفقیت ثبت نام شدید", "success");
            navigate("/signin")
        })
             .catch (error => {                notify("خطا در ارسال اطلاعات به سرور", "error");
            })  
        } else {
            notify("اطلاعات به درستی وارد نشده است!", "error")
            setTouched({
                name: true,
                email: true,
                phoneNumber: true,
                password: true,
                confirmPassword: true,
            })
        }
    }

    const eyeHandler = (e) => {
        setEye(e);
    }

    const handleChangeScore = (score) => {
        setPasswordScore(score);
      };

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
                        <input placeholder='نام و نام خانوادگی' type="text" value={data.name} name='name' onChange={changeHandler} onFocus={focusHandler} className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput} />
                    </div>
                    <div className={styles.formField}>
                        <input placeholder='ایمیل' type="text" value={data.email} name='email' onChange={changeHandler} onFocus={focusHandler} className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput} />
                       
                    </div>
                    <div className={styles.formField}>
                        <input placeholder='شماره تماس' type="text" value={data.phoneNumber} name='phoneNumber' onChange={changeHandler} onFocus={focusHandler} className={(errors.phoneNumber && touched.phoneNumber) ? styles.uncompleted : styles.formInput} />
                        
                    </div>
                    <div className={styles.formField}>
                        <div className={styles.eyeIcon} onClick={() => eyeHandler(!eye)}>
                        <FontAwesomeIcon icon={eye ? faEyeSlash : faEye} />
                        </div>
                        <input
                        placeholder='رمز عبور'
                        type={eye ? 'password' : 'text'}
                        value={data.password}
                        name='password'
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        className={
                            errors.password && touched.password
                            ? styles.uncompleted
                            : styles.formInput
                        }
                        />
                    </div>
                    <div className={styles.passCheck}>
                        <PasswordStrengthBar
                        password={data.password} 
                        scoreWords={['خیلی ضعیف', 'ضعیف', 'متوسط', 'قوی', 'خیلی قوی']}
                        minLength={8}
                        shortScoreWord="ضعیف"
                        scoreWordClassName={styles.customScoreWord}
                        minScore={2} 
                        onChangeScore={handleChangeScore} 
                                />
                    </div>    
                    <div className={styles.formField}>
                        <input placeholder='تکرار رمز عبور' type="password" value={data.confirmPassword} name='confirmPassword' onChange={changeHandler} onFocus={focusHandler} className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput} />
                        
                    </div>
                    <p className={styles.accept}>ثبت نام شما در اشمان به معنی پذیرش قوانین و ضوابط است</p>
                    
                    <div className={styles.formButtons}>
                        <button type="submit">ثبت نام</button>
                    </div>
                    <Link to="/signin" className={styles.subtitle}>آیا قبلا ثبت نام کرده اید؟</Link>
                </form>
                <ToastContainer />
            </div>


        </>
    );
};

export default SignUp;