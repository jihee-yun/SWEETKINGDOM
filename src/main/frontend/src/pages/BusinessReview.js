import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ChatBot from "../component/ChatBot";
import MyReview from "./MyReview"

const BusinessReview = () => {


  return(
    <MyReview/>
  );
};
export default BusinessReview;