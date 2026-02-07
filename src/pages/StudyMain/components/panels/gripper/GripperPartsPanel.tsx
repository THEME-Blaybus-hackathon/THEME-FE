import { useObjects } from '../../../../../api/part/queries';
import type { ObjectPart } from '../../../../../api/part/type';

export default function GripperPartsPanel() {
  const { data, isLoading, error } = useObjects('robot_gripper');

  if (isLoading) return <p>부품 불러오는 중...</p>;
  if (error) return <p>부품 정보를 불러오지 못했어요.</p>;

  return (
    <>
      <h3>주요 부품</h3>

      <ul>
        {data?.parts.map((part: ObjectPart) => (
          <li key={part.id}>{part.name}</li>
        ))}
      </ul>
    </>
  );
}
