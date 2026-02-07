import { useState } from "react";
import { useMemoData, useSaveMemo } from "../../../../api/note/queries"; // 경로 주의!
import styled from "styled-components";

// 공통 타입을 정의합니다.
interface GenericNotesPanelProps {
  partName: string;
}

export default function GenericNotesPanel({
  partName,
}: GenericNotesPanelProps) {
  const { data: memoData, isLoading } = useMemoData(partName);
  const { mutate: saveMemo } = useSaveMemo();

  if (isLoading) return <p style={{ color: "white" }}>불러오는 중...</p>;

  return (
    <Container>
      <Title>노트</Title>
      <MemoInput
        key={partName} // 중요: 파트가 바뀔 때마다 내부 상태를 초기화합니다.
        initialValue={memoData?.content || ""}
        onSave={(val) => saveMemo({ partName, content: val })}
      />
    </Container>
  );
}

function MemoInput({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (val: string) => void;
}) {
  const [text, setText] = useState(initialValue);

  return (
    <>
      <NoteTextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메모를 입력하세요."
      />
      <SaveBtn onClick={() => onSave(text)}>저장하기</SaveBtn>
    </>
  );
}

// 스타일은 사용자님이 쓰시던 것 그대로 유지
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;
const Title = styled.h3`
  color: #fff;
  margin: 0;
`;
const NoteTextArea = styled.textarea`
  flex: 1;
  min-height: 200px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  resize: none;
  outline: none;
`;
const SaveBtn = styled.button`
  padding: 12px;
  background: #2f54eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #597ef7;
  }
`;
