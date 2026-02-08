import { useObjects } from '../../../../../api/part/queries';
import type { ObjectPart } from '../../../../../api/part/type';
import { useState } from 'react';
import { useObject } from '../../../../../api/part/queries';
import {
  Panel,
  PartItem,
  PartHeader,
  PartContent,
  Arrow,
  PartName,
} from '../../PartsPanel.style';

export default function SuspensionPartsPanel() {
  const { data, isLoading, error } = useObjects('suspension');
  const [openPartId, setOpenPartId] = useState<string | null>(null);
  const { data: selectedPart } = useObject(openPartId ?? '');
  if (isLoading) return <p>부품 불러오는 중...</p>;
  if (error) return <p>부품 정보를 불러오지 못했어요.</p>;

  return (
    <Panel>
      {data?.parts.map((part: ObjectPart) => {
        const isOpen = openPartId === String(part.id);

        return (
          <PartItem key={part.id}>
            <PartHeader
              $open={isOpen}
              $active={isOpen}
              onClick={() => setOpenPartId(isOpen ? null : String(part.id))}
            >
              <PartName>{part.name}</PartName>
              <Arrow $open={isOpen} $active={isOpen}>
                ▲
              </Arrow>
            </PartHeader>

            <PartContent $open={isOpen}>
              {isOpen && selectedPart?.description}
            </PartContent>
          </PartItem>
        );
      })}
    </Panel>
  );
}
