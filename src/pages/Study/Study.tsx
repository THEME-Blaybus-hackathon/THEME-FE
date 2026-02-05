import { useNavigate } from 'react-router-dom';
import StudyCard from './components/StudyCard';
import Header from '../../components/Header';
import {
  PageWrapper,
  CardWrapper,
  TextContent,
  Title,
  Explan,
} from './Study.style';

export default function Study() {
  const navigate = useNavigate();

  const handleSelectModel = (model: string) => {
    navigate('/study/main', {
      state: { model },
    });
  };

  return (
    <PageWrapper>
      <Header />
      <TextContent>
        <Title>스터디</Title>
        <Explan>3D 모델을 선택하여 학습을 시작하세요</Explan>
      </TextContent>

      <CardWrapper>
        <StudyCard
          image="/assets/models/drone.png"
          title="Drone"
          description="Drone 3D 모델입니다."
          onClick={() => handleSelectModel('Drone')}
        />

        <StudyCard
          image="/assets/models/leaf-spring.png"
          title="Leaf Spring"
          description="Leaf Spring 3D 모델입니다."
          onClick={() => handleSelectModel('Suspension')}
        />

        <StudyCard
          image="/assets/models/machine-vice.png"
          title="Machine Vice"
          description="Machine Vice 3D 모델입니다."
          onClick={() => handleSelectModel('Gripper')}
        />

        <StudyCard
          image="/assets/models/robot-arm.png"
          title="Robot Arm"
          description="Robot Arm 3D 모델입니다."
          onClick={() => handleSelectModel('Arm')}
        />
      </CardWrapper>
    </PageWrapper>
  );
}
