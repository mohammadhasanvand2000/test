import React, {useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// assets
import language from "../assets/language.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/aie.png"
import character from "../assets/character.svg"

// styles
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  
    const Language = styled(motion.img)`
        width: 40px ;
        position: absolute;
        left: 20px;
        top: 20px;
        border: 2px solid #8e8e8e;
        border-radius: 50%;
        transform: rotate(0deg)
        transition:4s;
    `

    const [rotationAnimation, setRotationAnimation] = useState(true);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [search, setSearch] = useState("");
    const [searchButton, setSearchButton] = useState(false)

        


        const updateMenu = () => {
            setIsMenuClicked(!isMenuClicked)
        }

        const rotationAnim = () => {
            setRotationAnimation(!rotationAnimation)
        }


        const changeHandler = (event) => {
          setSearch(event.target.value)
        }

        const searchHandler = () => {
          setSearchButton(true)
        }


  return (
    <>
      <div className={styles.header}>
        <div className={styles.nav}>
          <Language
            src={language}
            alt="language"
            whileTap={{ rotate: rotationAnimation ? 360 : -360 }}
            onClick={() => rotationAnim()}
          />
          <div className={styles.buttons}>
                <Link to="/signup" className={styles.link}>ثبت نام </Link>
                <Link to="/signin" className={styles.link}>ورود</Link>
                <FontAwesomeIcon icon={faRightToBracket} className={styles.loginIcon}/>    
            </div>
            <div className={styles.burgerMenu} onClick={() => updateMenu()}>
                    <div className={!isMenuClicked ? styles.burgerBar : styles.clicked} ></div>
                    <div className={!isMenuClicked ? styles.burgerBar : styles.clicked} ></div>
                    <div className={!isMenuClicked ? styles.burgerBar : styles.clicked} ></div>
            </div>        
             <img src={logo} alt="logo" className={styles.headerLogo}/>
            <div className={isMenuClicked ? styles.menu : styles.hidden}>
               <img src={character} alt="character" className={styles.character}/>
               <span className={styles.wyl}>دنبال چی میگردی؟</span>
            <ul className={styles.list}>
              <li>صفحه اصلی</li>
              <li>دسته بندی</li>
              <li>درباره ما</li>
              <li>تماس با ما</li>
            </ul>
            <div >
               <input type="text" onChange={changeHandler} value={search} className={searchButton ? styles.searchClicked : styles.search}/>
               <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={() => searchHandler()}/>    
            </div>   
            </div>


        </div>
      </div>
    </>
  );
};

export default Landing;
