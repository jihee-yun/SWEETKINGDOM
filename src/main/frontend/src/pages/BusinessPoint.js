import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SideMenuForBusiness from "../component/SideMenuForBusiness";
import ChatBot from "../component/ChatBot";
import MyPoint from "./MyPoint"

const BusinessPoint = () => {


  return(
    <MyPoint/>
  );
};
export default BusinessPoint;