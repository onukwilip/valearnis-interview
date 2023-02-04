import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import css from "../styles/home/Home.module.scss";

const Home = () => {
  const [widget, setWidget] = useState("login");
  return (
    <section className={css.home}>
      <div className={css.overlay}></div>
      <div className={css.main}>
        <div className={css.left}>
          <div className={css["logo-container"]}>
            <img src="https://img.icons8.com/bubbles/100/000000/test-passed.png" />
            <em>GO Quiz</em>
          </div>
        </div>
        <div className={css.right}>
          {widget === "login" ? (
            <Login setWidget={setWidget} />
          ) : (
            <SignUp setWidget={setWidget} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
