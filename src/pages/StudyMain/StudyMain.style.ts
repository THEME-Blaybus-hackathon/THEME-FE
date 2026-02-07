import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  color: #f1f5f9;
  font-family: sans-serif;
`;

export const Header = styled.header`
  height: 60px;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #1e293b;
`;

export const HeaderTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #60a5fa;
`;

export const Nav = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
`;

export const NavItem = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#60a5fa' : '#f1f5f9')};
  border-bottom: ${({ active }) => (active ? '2px solid #60a5fa' : 'none')};
`;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #475569;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

export const Viewport = styled.section`
  flex: 3;
  position: relative;
  background-color: #000;
  border-right: 1px solid #334155;
`;

export const Sidebar = styled.aside`
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: #1e293b;
`;

export const TabGroup = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  border-bottom: 1px solid #334155;
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ active }) => (active ? '#3b82f6' : '#334155')};
  color: white;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const InputArea = styled.div`
  padding: 15px;
  border-top: 1px solid #334155;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #475569;
  background-color: #0f172a;
  color: white;
`;

export const ExplodeBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  background-color: rgba(30, 41, 59, 0.85);
  padding: 15px;
  border-radius: 15px;
`;

export const ExplodeLabel = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
`;
