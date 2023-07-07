import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const AdminDeleteBlock = styled.div`
    justify-content: center;
    align-items: center;
    
    .logo {
        text-align: center;
        cursor: pointer;
    }

    .logo img {
        width: 150px;
        height: 150px;
        margin-top: 10px;
    }

    .form-container {
        display: flex;
        flex-wrap: wrap;
        margin-left: 200px;
    }

    .form-container form {
        box-sizing: border-box;
        padding: 10px;
        color: #FFCFDA;
        width: 500px;
        height: 200px;
        margin: 20px;
        margin-top: 30px;
        font-weight: bolder;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0 , 0, 0.1);
    }

    ul {
        padding : 10px;
        margin : 5px;
    }

    ul li {
        margin-bottom: 10px;
    }

    .delBtn {
        justify-content: center;
        margin-top: 20px;
    }

    .delBtn button {
        width: 150px;
        height: 30px;
        padding: 10px 20px;
        background-color: #FFCFDA;
        font-weight: bolder;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 450px;
    }

    @media (max-width : 768px) {
        .form-container {
            margin-left: 0;
            justify-content: center;
            align-items: center;
        }

        .form-container form {
            width: 90%;
        }

        .delBtn button {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
        }
    }
`;



const AdminDelete = () => {
    const navigate = useNavigate("");

    const LogoClick = () => {
        navigate('/admininfo');
    }
    
    return (
      <AdminDeleteBlock>
        <div className="logo">
            <img src={logo} alt="logo" className="logo"  onClick={LogoClick}/>
        </div>


        <div class="form-container">
            <form action="#" method="text">
                <fieldset>
                    <legend>작성 리뷰</legend>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </fieldset>
            </form>

            <form action="#" method="text">
                <fieldset>
                    <legend>이벤트</legend>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </fieldset>
            </form>

            <form action="#" method="text">
                <fieldset>
                    <legend>챌린지</legend>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </fieldset>
            </form>

            <form action="#" method="text">
                <fieldset>
                    <legend>소모임</legend>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </fieldset>
            </form>

            <div className="delBtn">
                <button>삭제</button>
            </div>
        </div>
        </AdminDeleteBlock>
    );
  };
  
  export default AdminDelete;