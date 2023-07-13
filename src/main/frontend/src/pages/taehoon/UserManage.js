import React from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const UserManageBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: 20px;
    padding: 20px;

    .userManage {
        font-size: 15px;
        color : #FFCFDA;
        margin-right: 10px;
    }
    
    .logo img{
        width: 180px;
        height: 150px;
        margin-top: 10px;
        cursor: pointer;
    }

    p {
        color: #FFCFDA;
        font-weight: bolder;
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            align-items: center;
        }

        .box {
            margin: 20px 0;
        }

        .logo img {
            margin-top: 10px;
            width: 150px;
            height: 100px;
        }
    }
`;

const UserTable = styled.table`
  width: 50%;
  margin-left: 30px;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #dddddd;
    padding: 8px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: left;
  }
`;

const UserManage = () => {
    const navigate = useNavigate("");

    // 테스트용
    const users = [
        {
          id: 1,
          name: "안유진",
          points: 100,
          age: 21,
          gender: "Female",
          authority: "ROLE_MEMBER",
        },

        {
            id: 2,
            name: "장원영",
            points: 350,
            age: 20,
            gender: "Female",
            authority: "ROLE_USER",
          },

          {
            id: 3,
            name: "김지원",
            points: 200,
            age: 20,
            gender: "Male",
            authority: "ROLE_USER",
          },

          {
            id: 4,
            name: "김민지",
            points: 100,
            age: 20,
            gender: "Male",
            authority: "ROLE_USER",
          },

          {
            id: 5,
            name: "강해린",
            points: 600,
            age: 18,
            gender: "Male",
            authority: "Admin",
          },
        // 다른 사용자 데이터도 추가해주세요.
      ];

    const LogoClick = () => {
        navigate('/admininfo');
    }
    
    return(
        <UserManageBlock>
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            <div className="userManage">
                <h2>사용자 관리</h2>
            </div>

            <UserTable>
        <thead>
          <tr>
            <th>이름</th>
            <th>보유 포인트</th>
            <th>나이</th>
            <th>성별</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.points}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.authority}</td>
            </tr>
          ))}
        </tbody>
      </UserTable>
     </UserManageBlock>
    );
}

export default UserManage;