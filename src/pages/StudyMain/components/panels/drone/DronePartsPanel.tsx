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
} from './DronePartsPanel.style';

export default function DronePartsPanel() {
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
