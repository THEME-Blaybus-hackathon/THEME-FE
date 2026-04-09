import styled from 'styled-components';

export const BlueInfoPanel = styled.aside`
  position: absolute;
  left: 25px;
  top: 100px;
  z-index: 9;

  width: 400px;
  height: calc(100vh - 180px);

  background: #ffffff4d;
  backdrop-filter: blur(1px) saturate(400%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);

  border-radius: 20px;
  padding: 28px 28px 24px;

  display: flex;
  flex-direction: column;
  pointer-events: auto;

  border: 1px solid rgba(120, 160, 220, 0);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.02) 2%,
      rgba(0, 0, 0, 0.08)
    );

    pointer-events: none;
  }

  animation: panelIn 0.35s ease-out forwards;

  @keyframes panelIn {
    from {
      opacity: 0;
      transform: translateX(24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: rgba(160, 190, 240, 0.6);
`;

export const PanelTitle = styled.h2`
  margin: 0 0 18px 0;

  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;

  color: rgba(245, 248, 255, 0.96);
`;

export const CloseButton = styled.button`
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: none;

  background: rgba(120, 160, 220, 0.18);
  color: rgba(210, 225, 255, 0.8);

  font-size: 18px;
  font-weight: 700;
  line-height: 1;

  cursor: pointer;
  transition: all 160ms ease;

  &:hover {
    background: rgba(120, 160, 220, 0.32);
    color: #ffffff;
  }

  &:active {
    transform: scale(0.94);
  }
`;

export const InfoBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.65;

  color: rgba(225, 235, 255, 0.92);
  white-space: pre-wrap;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(120, 160, 220, 0.45);
    border-radius: 2px;
  }
`;

export const Panel = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 18px;
  color: #ffffff;
`;

export const PartItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`;

export const PartHeader = styled.button<{ $open: boolean; $active: boolean }>`
  width: 100%;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: none;

  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  color: white;
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  border-radius: ${({ $open }) => ($open ? '10px 10px 0 0' : '10px')};

  transition:
    background 0.2s ease,
    color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const PartName = styled.span`
  letter-spacing: 0.3px;
`;

export const Arrow = styled.span<{ $open: boolean; $active: boolean }>`
  font-size: 10px;
  transition:
    transform 0.2s ease,
    color 0.15s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  color: ${({ $active }) => ($active ? '#ffffff' : '#ffffff')};
`;

export const PartContent = styled.div<{ $open: boolean }>`
  overflow: hidden;

  max-height: ${({ $open }) => ($open ? '200px' : '0')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '-4px')});

  padding: ${({ $open }) => ($open ? '6px 4px 12px' : '0 4px')};

  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);

  transition:
    max-height 0.25s ease,
    opacity 0.2s ease,
    transform 0.2s ease,
    padding 0.2s ease;
`;
