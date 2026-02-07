// components/panels/BlueInfoPanel.tsx
// components/panels/BlueInfoPanel.tsx
import type { ReactNode } from 'react';
import {
  BlueInfoPanel as Wrapper,
  PanelHeader,
  PanelTitle,
  CloseButton,
  InfoBody,
} from '../../StudyMain.style';

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function BlueInfoPanel({ title, children, onClose }: Props) {
  return (
    <Wrapper>
      <PanelHeader>
        <span></span>
        <CloseButton onClick={onClose}>×</CloseButton>
      </PanelHeader>

      <PanelTitle>{title}</PanelTitle>
      <InfoBody>{children}</InfoBody>
    </Wrapper>
  );
}
