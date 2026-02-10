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
import { useObjectCategories } from '../../api/model/queries';

type StudyCardMeta = {
  title: string;
  description: string;
  image: string;
  model: string;
};

const CATEGORY_MAP: Record<string, StudyCardMeta> = {
  drone: {
    title: 'Drone',
    description: 'Drone 3D 모델입니다.',
    image: '/assets/models/drone.png',
    model: 'drone',
  },
  arm: {
    title: 'Robot Arm',
    description: 'Robot Arm 3D 모델입니다.',
    image: '/assets/models/robot-arm.png',
    model: 'arm',
  },
  gripper: {
    title: 'Robot Gripper',
    description: 'Robot Gripper 3D 모델입니다.',
    image: '/assets/models/robot-gripper.png',
    model: 'gripper',
  },
  suspension: {
    title: 'Suspension',
    description: 'Suspension 구조 모델입니다.',
    image: '/assets/models/suspension.png',
    model: 'suspension',
  },
};

export default function Study() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useObjectCategories();

  const handleSelectModel = (model: string) => {
    navigate('/study-main', {
      state: { model },
    });
  };

  if (isLoading) return null;
  if (isError || !data) return null;

  return (
    <PageWrapper>
      <Header />

      <TextContent>
        <Title>스터디</Title>
        <Explan>3D 모델을 선택하여 학습을 시작하세요</Explan>
      </TextContent>

      <CardWrapper>
        {data.categories.map((category) => {
          const meta = CATEGORY_MAP[category];
          if (!meta) return null;

          return (
            <StudyCard
              key={category}
              image={meta.image}
              title={meta.title}
              description={meta.description}
              onClick={() => handleSelectModel(meta.model)}
            />
          );
        })}
      </CardWrapper>
    </PageWrapper>
  );
}
