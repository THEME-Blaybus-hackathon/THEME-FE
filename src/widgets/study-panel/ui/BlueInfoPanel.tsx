import type { ReactNode } from 'react';
import {
  BlueInfoPanel as Wrapper,
  PanelHeader,
  PanelTitle,
  CloseButton,
  InfoBody,
} from './StudyPanel.style';

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function BlueInfoPanel({ title, children, onClose }: Props) {
  return (
    <Wrapper>
      <PanelHeader>
        <span>3D OBJECT EXPLANATION</span>
        <CloseButton onClick={onClose}>×</CloseButton>
      </PanelHeader>

      <PanelTitle>{title}</PanelTitle>

      <InfoBody>{children}</InfoBody>
    </Wrapper>
  );
}
