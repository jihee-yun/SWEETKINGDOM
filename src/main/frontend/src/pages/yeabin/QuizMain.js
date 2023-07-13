import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "./Api/AxiosApi";

const Container = styled.div`
  text-align: center;
  margin-top: 80px;
`;

const QuizBox = styled.div`
  h2 {
    margin: 20px 0 60px 0;
  }

  h3 {
    margin-top: 30px;
    margin-bottom: 40px;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style: none;
  }

  button {
    width: 300px;
    height: 60px;
    margin: 20px;
    font-size: 1.1rem;
    font-weight: bolder;
    border: none;
    background-color: #FFCFDA;
    /* border-radius: 20px; */
  }

  p{
    margin-top: 40px;
    font-size: 1.1rem;
    font-weight: bolder;
  }
`;

const QuizMain = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = '세계 최초로 카페를 연 나라는 어디일까요?';
  const options = ['이탈리아', '콜롬비아', '터키', '프랑스'];
  const answer = '터키';
  const amount = 10;

  const handleClick = async (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      setIsCorrect(option === answer);

      if (option === answer && option === answer) {
        AxiosApi.quizPoint(amount);
      }
    }
  };
  
  return (
    <Container>
      <QuizBox>
        <div>
          <h2>오늘의 퀴즈</h2>
          <h3>{question}</h3>
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleClick(option)} disabled={isAnswered}>{option}</button>
              </li> 
            ))}
          </ul>
          {isAnswered && (
            <p>{isCorrect ? `정답! ${amount} 포인트가 적립됩니다.` : '땡! 아쉽지만 내일 다시 도전해주세요.'}</p>
          )}
        </div>
      </QuizBox>
    </Container>    
  );
};

export default QuizMain;
