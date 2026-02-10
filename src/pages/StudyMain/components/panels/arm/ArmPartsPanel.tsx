import { useState } from 'react';
import { useObjects, useObject } from '../../../../../api/part/queries';
import type { ObjectPart } from '../../../../../api/part/type';
import {
  Panel,
  PartItem,
  PartHeader,
  PartContent,
  Arrow,
  PartName,
} from '../../PartsPanel.style';

type Props = {
  selectedMeshName: string | null;
  onSelectMesh: (meshName: string | null) => void;
};

export default function ArmPartsPanel({
  selectedMeshName,
  onSelectMesh,
}: Props) {
  const { data, isLoading, error } = useObjects('arm');
  const [openPartId, setOpenPartId] = useState<string | null>(null);
  const { data: selectedPart } = useObject(openPartId ?? '');

  if (isLoading) return <p>부품 불러오는 중...</p>;
  if (error) return <p>부품 정보를 불러오지 못했어요.</p>;

  return (
    <Panel>
      {data?.parts.map((part: ObjectPart) => {
        const isOpen = openPartId === String(part.id);
        const isActive = selectedMeshName === part.name;

        return (
          <PartItem key={part.id}>
            <PartHeader
              $open={isOpen}
              $active={isActive}
              onClick={() => {
                setOpenPartId(isOpen ? null : String(part.id));

                onSelectMesh(isActive ? null : part.name);
              }}
            >
              <PartName>{part.name}</PartName>
              <Arrow $open={isOpen} $active={isActive}>
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
