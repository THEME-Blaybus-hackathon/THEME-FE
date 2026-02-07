import { Card, Tag, ImageWrapper, Description } from './StudyCard.style';

type StudyCardProps = {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function StudyCard({
  image,
  title,
  description,
  onClick,
}: StudyCardProps) {
  return (
    <Card onClick={onClick}>
      <Tag>{title}</Tag>

      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>

      <Description>{description}</Description>
    </Card>
  );
}
