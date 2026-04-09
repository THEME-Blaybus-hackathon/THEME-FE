import { useNavigate } from 'react-router-dom';
import StudyCard from './StudyCard';
import Header from '@/widgets/header/ui/Header';
import {
  PageWrapper,
  CardWrapper,
  TextContent,
  Title,
  Explan,
} from './StudyPage.style';
import { useObjectCategories } from '@/entities/model/api/queries';

type StudyCardMeta = {
  title: string;
  description: string;
  model: string;
};

const CATEGORY_MAP: Record<string, StudyCardMeta> = {
  drone: {
    title: 'Drone',
    description: 'Drone 3D 모델입니다.',
    model: 'drone',
  },
  arm: {
    title: 'Robot Arm',
    description: 'Robot Arm 3D 모델입니다.',
    model: 'arm',
  },
  gripper: {
    title: 'Robot Gripper',
    description: 'Robot Gripper 3D 모델입니다.',
    model: 'gripper',
  },
  suspension: {
    title: 'Suspension',
    description: 'Suspension 구조 모델입니다.',
    model: 'suspension',
  },
};

export default function StudyPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useObjectCategories();

  const handleSelectModel = (model: string) => {
    navigate('/study-main', { state: { model } });
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
