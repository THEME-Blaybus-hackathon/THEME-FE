import { Card, Tag, ImageWrapper, Description } from './StudyCard.style';

import suspensionImg from '../../../assets/images/suspension.svg';
import gripperImg from '../../../assets/images/gripper.svg';
import armImg from '../../../assets/images/arm.svg';
import droneImg from '../../../assets/images/drone.svg';

type StudyCardProps = {
  title: string;
  description: string;
  onClick?: () => void;
};

const IMAGE_MAP: Record<string, string> = {
  Suspension: suspensionImg,
  'Robot Gripper': gripperImg,
  'Robot Arm': armImg,
  Drone: droneImg,
};

export default function StudyCard({
  title,
  description,
  onClick,
}: StudyCardProps) {
  const imageSrc = IMAGE_MAP[title] ?? defaultImg;

  return (
    <Card onClick={onClick}>
      <Tag>{title}</Tag>

      <ImageWrapper>
        <img src={imageSrc} alt={title} />
      </ImageWrapper>

      <Description>{description}</Description>
    </Card>
  );
}
