import React from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const ManageGuildBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: 30px;
    padding: 20px;

    .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: -10px;
        cursor: pointer;
        margin-right: 30px;
    }

    .logo img {
        width: 150px;
        height: 130px;
    }

    h2 {
        color: #FFCFDA;
        font-weight: bolder;
        margin-top: -20px;
        margin-right: 60px;
    }
    .event-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(250px, 1fr));
        grid-gap: 20px;
    }

    .event-box {
        background-color: #F0F0F0;
        padding: 20px;
        width: 200px;
        height: 180px;
        border-radius: 8px;
        margin-bottom: 50px;
        cursor: pointer;
    }

    .event-box h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .event-box p {
        font-size: 14px;
        color: #666;
    }
`

const ManageGuild = () => {
    const navigate = useNavigate("");

    const LogoClick = () => {
        navigate('/admininfo');
    }
    return(
        <ManageGuildBlock>
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            <div className="guild">
                <h2>소모임 관리</h2>
            </div>

            <div className="event-list">
          <div className="event-box">
            <h3>소모임 1</h3>
            <p></p>
          </div>
          <div className="event-box">
            <h3>소모임 2</h3>
            <p></p>
          </div>
          <div className="event-box">
            <h3>소모임 3</h3>
            <p></p>
          </div>
          <div className="event-box">
            <h3>소모임 4</h3>
            <p></p>
          </div>
          <div className="event-box">
            <h3>소모임 5</h3>
            <p></p>
          </div>
          <div className="event-box">
            <h3>소모임 6</h3>
            <p></p>
          </div>
        </div>
        </ManageGuildBlock>
    );
}

export default ManageGuild;