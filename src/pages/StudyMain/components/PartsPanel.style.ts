import styled from 'styled-components';

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
