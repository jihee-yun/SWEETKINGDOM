import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";


const AdminReportBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: 30px;
    padding: 20px;

    h2 {
        color: #FFCFDA;
        font-weight: bolder;
        margin-top: -20px;
    }

    .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: -10px;
        cursor: pointer;
    }

    .logo img {
        width: 150px;
        height: 130px;
    }

    .board {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        margin-top: -5px;
        width: 45%;
        margin-left: 50px;
    }

    .board th,
    .board td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    .board th {
        background-color: #f2f2f2;
        text-align: center;
    }

    .board tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .board tr:hover {
        background-color: #ddd;
    }

    .number {
        width: 100px;
        height: 30px;
    }

    .title {
        width: 300px;
        height: 30px;
    }

    .user {
        width: 160px;
        height: 30px;
    }

    .date {
        width: 150px;
        height: 30px;
    }

    @media (max-width: 768px) {
        .board {
            width: 100%;
            margin-left: 0;
        }

        .title,
        .date {
            width: auto;
        }

        .logo img {
            width: 120px;
            height: 100px;
        }
    }
`;



const AdminReport = () => {
    const navigate = useNavigate("");

    const LogoClick = () => {
        navigate('/admininfo');
    }
    
    
    return(
        <AdminReportBlock>
            
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            
            <div className="report">
                <h2>신고 내역</h2>
            </div>
        
            <table className="board">
                <thead>
                    <tr>
                        <th class="number">번호</th>
                        <th class="user">작성자</th>
                        <th class="title">제목</th>
                        <th class="date">날짜</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
       
        </AdminReportBlock>
    );
}

export default AdminReport;