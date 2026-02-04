import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DroneModel from './components/DroneModel';

import {
  Container,
  Header,
  HeaderTitle,
  Nav,
  NavItem,
  Avatar,
  Main,
  Viewport,
  Sidebar,
  TabGroup,
  TabButton,
  Content,
  InputArea,
  Input,
  ExplodeBox,
  ExplodeLabel,
} from './StudyMain.style';

export default function StudyPlan() {
  const [tab, setTab] = useState<'AI' | 'NOTES'>('AI');
  const [explode, setExplode] = useState(0);

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <HeaderTitle>SIMVEX</HeaderTitle>

        <Nav>
          <NavItem>HOME</NavItem>
          <NavItem active>STUDY</NavItem>
          <NavItem>CAD</NavItem>
          <NavItem>LAB</NavItem>
        </Nav>

        <Avatar />
      </Header>

      <Main>
        {/* 3D VIEWPORT */}
        <Viewport>
          <Canvas camera={{ position: [0, 10, 45], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 15, 10]} intensity={1.5} />

            <group position={[0, -7.5, 0]}>
              <DroneModel explode={explode} />
            </group>

            <OrbitControls
              enablePan={false}
              minDistance={25}
              maxDistance={80}
            />
          </Canvas>

          <ExplodeBox>
            <ExplodeLabel>EXPLODE VIEW</ExplodeLabel>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={explode}
              onChange={(e) => setExplode(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </ExplodeBox>
        </Viewport>

        {/* SIDEBAR */}
        <Sidebar>
          <TabGroup>
            <TabButton active={tab === 'AI'} onClick={() => setTab('AI')}>
              AI ASSISTANT
            </TabButton>
            <TabButton active={tab === 'NOTES'} onClick={() => setTab('NOTES')}>
              MY NOTES
            </TabButton>
          </TabGroup>

          <Content>
            {tab === 'AI' ? (
              <div
                style={{
                  backgroundColor: '#334155',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                }}
              >
                드론 구조를 설명하거나 질문해보세요.
              </div>
            ) : (
              <textarea
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  outline: 'none',
                  resize: 'none',
                }}
                placeholder="학습한 내용을 여기에 기록해..."
              />
            )}
          </Content>

          {tab === 'AI' && (
            <InputArea>
              <Input placeholder="질문을 입력하세요..." />
            </InputArea>
          )}
        </Sidebar>
      </Main>
    </Container>
  );
}
