import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const LoginPage = ({ setIsAuth }) => {
  // google ile oturum aç
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setIsAuth(true);

        // sayfa yenilenince tekrar giriş yapmak zorunda olmasın diye localde tokenini saklıyoruz
        localStorage.setItem("token", res.user.refreshToken);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>

        <button onClick={handleClick}>
          <img width={30} src="g-logo.png" alt="" />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
