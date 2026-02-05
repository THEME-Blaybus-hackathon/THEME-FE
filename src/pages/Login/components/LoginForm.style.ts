import styled from 'styled-components';

export const KakaoButton = styled.div`
  background-color: #fee500;
  color: black;
  height: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
`;

export const NaverButton = styled.div`
  background-color: #03c75a;
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
`;

export const GoogleButton = styled.div`
  background-color: #131314;
  border: 1px solid #e3e3e3;
  color: #e3e3e3;
  font-family: 'Roboto-medium', sans-serif;
  height: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
`;

export const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1vh;
`;

export const CompanyLogo = styled.img`
  width: 2vh;
  height: auto;
`;
