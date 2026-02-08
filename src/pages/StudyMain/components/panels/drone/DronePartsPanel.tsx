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

export default function DronePartsPanel({
  selectedMeshName,
  onSelectMesh,
}: Props) {
  const { data } = useObjects('drone');
  const [openPartId, setOpenPartId] = useState<string | null>(null);
  const { data: selectedPart } = useObject(openPartId ?? '');

  return (
    <Panel>
      {data?.parts.map((part: ObjectPart) => {
        const isOpen = openPartId === String(part.id);

        return (
          <PartItem key={part.id}>
            <PartHeader
              $open={isOpen}
              $active={isOpen}
              onClick={() => {
                setOpenPartId(isOpen ? null : String(part.id));

                onSelectMesh(selectedMeshName === part.name ? null : part.name);
              }}
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
