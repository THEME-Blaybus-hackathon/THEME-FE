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
      {/* ===== HEADER (FIGMA STYLE) ===== */}
      <PanelHeader>
        <span>3D OBJECT EXPLANATION</span>
        <CloseButton onClick={onClose}>×</CloseButton>
      </PanelHeader>

      {/* ===== TITLE ===== */}
      <PanelTitle>{title}</PanelTitle>

      {/* ===== CONTENT ===== */}
      <InfoBody>{children}</InfoBody>
    </Wrapper>
  );
}
