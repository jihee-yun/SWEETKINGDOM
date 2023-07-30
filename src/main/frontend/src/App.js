import './App.css';
import UserStore from './context/UserStore';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cafe from './pages/Cafe';
import CafeReview from './pages/CafeReview';
import CafeReviewWrite from './pages/CafeReviewWrite';
import CafeReviewEdit from './pages/CafeReviewEdit';
import CafeMain from './pages/CafeMain';
import CafeDetail from './pages/CafeDetail';
import Guild from './pages/Guild';
import GuildDetail from './pages/GuildDetail';
import NewGuild from './pages/NewGuild';
import NewGuildSecond from './pages/NewGuildSecond';
import Event from './pages/Event';
import FindPw from './pages/FindPw';
import Admin from './pages/Admin';
import AdminInfo from './pages/AdminInfo';
import CouponStore from './pages/CouponStore';
import FindID from './pages/FindID';
import AdminReport from './pages/AdminReport';
import UserManage from './pages/UserManage';
import MyPage from './pages/MyPages';
import MyReview from './pages/MyReview';
import MyChallenge from './pages/MyChallenge';
import MyGuild from './pages/MyGuild';
import MyEvent from './pages/MyEvent';
import MyPoint from './pages/MyPoint';
import MyInformation from './pages/MyInformation';
import MyReport from './pages/MyReport';
import MemberLoginPage from './pages/MemberLoginPage';
import MemberSignUpPage from './pages/MemberSignUpPage';
import SignUpForm from './pages/SignUpForm';
import PaymentPage from './pages/PaymentPage';
import BusinessPage from './pages/BusinessPage';
import BusinessCafe from './pages/BusinessCafe';
import BusinessChallenge from './pages/BusinessChallenge';
import BusinessReport from './pages/BusinessReport';
import BusinessReview from './pages/BusinessReview';
import BusinessInformation from './pages/BusinessInformation';
import Report from './pages/Report';
import ChallengeMain from './pages/ChallengeMain';
import ManageReview from './pages/ManageReview';
import PayComplete from './pages/PayComplete';
import CouponPayment from './pages/CouponPayment';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ServiceCenter from './pages/ServiceCenter';
import ScrollToTop from './utils/ScrollToTop';
import AdminReg from './pages/AdminReg';
import PrivateRoute from './utils/PrivateRoute';
import CafeSearch from './pages/CafeSearch';
import ChangePw from './pages/ChangePw';
import QnaSearchList from './component/QnaSearchList';
import SweetkingdomPolicy from './pages/SweetkingdomPolicy'; 

function App() {
  return (
    <UserStore>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cafe" element={<Cafe/>}/>
        <Route path="/cafe/main/:category" element={<CafeMain/>}/>
        <Route path="/cafe/detail/:cafeNum" element={<CafeDetail/>}/>
        <Route path="/cafe/review" element={<CafeReview/>}/>
        <Route path="/cafe/review/write" element={<PrivateRoute element={<CafeReviewWrite />}/>}/>
        <Route path="/cafe/review/edit" element={<PrivateRoute element={<CafeReviewEdit />}/>}/>
        <Route path="/guild" element={<Guild/>}/>
        <Route path='/guild/detail/:guildNum' element={<GuildDetail/>}/>
        <Route path="/createguild" element={<PrivateRoute element={<NewGuild />}/>}/>
        <Route path="/createguild/second" element={<PrivateRoute element={<NewGuildSecond />}/>}/>
        <Route path='/event' element={<Event/>} />
        <Route path='/findpw' element={<FindPw/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/adminInfo' element={<AdminInfo />}/>
        <Route path='/couponStore' element={<CouponStore />}/>
        <Route path='/findId' element={<FindID/>}/>
        <Route path='/admin/report' element={<AdminReport />}/>
        <Route path='/admin/userManage' element={<UserManage />}/>
        <Route path='/mypage' element={<MyPage />}/>
        <Route path='/mypage/review' element={<MyReview />}/>
        <Route path='/mypage/challenge' element={<MyChallenge />}/>
        <Route path='/mypage/guild' element={<MyGuild />}/>
        <Route path='/mypage/event' element={<MyEvent />}/>
        <Route path='/mypage/point' element={<MyPoint />}/>
        <Route path='/mypage/information' element={<MyInformation />}/>
        <Route path='/mypage/report' element={<MyReport />}/>
        <Route path='/mypage/payment' element={<PaymentPage />}/>
        <Route path='/businesspage' element={<BusinessPage />}/>
        <Route path='/businesspage/cafe' element={<BusinessCafe />}/>
        <Route path='/businesspage/Challenge' element={<BusinessChallenge />}/>
        <Route path='/businesspage/report' element={<BusinessReport />}/>
        <Route path='/businesspage/review' element={<BusinessReview />}/>
        <Route path='/businesspage/information' element={<BusinessInformation />}/>
        <Route path='/memberlogin' element={<MemberLoginPage/>}/>
        <Route path='/membersignup' element={<MemberSignUpPage/>}/>
        <Route path='/signupform' element={<SignUpForm/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/challengeMain' element={<ChallengeMain/>}/>
        <Route path='/admin/manageReview' element={<ManageReview />}/>
        <Route path='/payComplete' element={<PayComplete />}/>
        <Route path='/couponPayment' element={<CouponPayment />}/>
        <Route path='/servicecenter' element={<ServiceCenter/>}/>
        <Route path='/admin/register' element={<AdminReg />}/>
        <Route path='/cafesearch/:keyword' element={<CafeSearch />}/>
        <Route path='/changepw' element={<ChangePw/>}/>
        <Route path='/qnasearch/:keyword' element={<QnaSearchList />}/>
        <Route path="/policy" element={<SweetkingdomPolicy/>}/>
      </Routes>
    </BrowserRouter>
    </UserStore>
  );
}

export default App;
