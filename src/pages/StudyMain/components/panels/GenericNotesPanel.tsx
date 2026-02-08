import { useState } from "react";
import {
  useMemoData,
  useCreateMemo,
  useUpdateMemo,
  useDeleteMemo,
} from "../../../../api/note/queries";
import styled from "styled-components";

interface Memo {
  id: number;
  title: string;
  content: string;
  partName: string;
  createdAt?: string;
}

export default function GenericNotesPanel({ partName }: { partName: string }) {
  const { data: memos, isLoading } = useMemoData(partName);
  const createMutation = useCreateMemo();
  const updateMutation = useUpdateMemo();
  const deleteMutation = useDeleteMemo();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreate = () => {
    if (!newContent) return alert("내용을 입력해주세요.");
    createMutation.mutate({
      partName,
      content: newContent,
      title: newTitle || "새로운 메모",
    });
    setNewTitle("");
    setNewContent("");
  };

  const startEdit = (memo: Memo) => {
    setEditId(memo.id);
    setEditTitle(memo.title || "");
    setEditContent(memo.content || "");
  };

  const handleUpdate = (id: number) => {
    updateMutation.mutate({
      id,
      title: editTitle,
      content: editContent,
      partName,
    });
    setEditId(null);
  };

  const sortedMemos = memos
    ? [...memos].sort((a: Memo, b: Memo) => a.id - b.id)
    : [];

  if (isLoading) return <LoadingText>Loading...</LoadingText>;

  return (
    <Container>
      <WriteSection>
        <WriteHeader>
          <span>메모 작성</span>
          <MiniSaveBtn onClick={handleCreate}>저장</MiniSaveBtn>
        </WriteHeader>
        <TitleInput
          placeholder="메모 제목을 입력하세요."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <DateText>2026. 02. 08</DateText>
        <Divider />
        <ContentInput
          placeholder="메모 내용을 입력하세요."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </WriteSection>

      <ListSection>
        {sortedMemos.map((memo: Memo) => {
          const isExpanded = expandedId === memo.id;
          const isEditing = editId === memo.id;

          return (
            <MemoItem key={memo.id} isExpanded={isExpanded}>
              <ItemHeader
                onClick={() => {
                  setExpandedId(isExpanded ? null : memo.id);
                  if (isEditing) setEditId(null);
                }}
              >
                <div className="info">
                  {isEditing ? (
                    <InlineTitleInput
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <strong>{memo.title || "제목 없음"}</strong>
                  )}
                  <span className="date">
                    {memo.createdAt?.split("T")[0].replace(/-/g, ". ") ||
                      "2026. 01. 01"}
                  </span>
                </div>

                <ActionGroup onClick={(e) => e.stopPropagation()}>
                  {isExpanded &&
                    (isEditing ? (
                      <TextBtn onClick={() => handleUpdate(memo.id)}>
                        완료
                      </TextBtn>
                    ) : (
                      <IconButton onClick={() => startEdit(memo)}>
                        ✏️
                      </IconButton>
                    ))}
                  <IconButton
                    onClick={() =>
                      window.confirm("삭제하시겠습니까?") &&
                      deleteMutation.mutate({ id: memo.id, partName })
                    }
                  >
                    🗑️
                  </IconButton>
                </ActionGroup>
              </ItemHeader>

              {isExpanded && (
                <ItemBody>
                  <Divider />
                  {isEditing ? (
                    <InlineContentInput
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  ) : (
                    <p>{memo.content}</p>
                  )}
                </ItemBody>
              )}
            </MemoItem>
          );
        })}
      </ListSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const WriteSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
`;
const WriteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
`;
const MiniSaveBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  padding: 3px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
const TitleInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 15px;
  outline: none;
  width: 100%;
  font-weight: bold;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;
const DateText = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-size: 11px;
  margin-top: 4px;
`;
const ContentInput = styled.textarea`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  outline: none;
  resize: none;
  width: 100%;
  min-height: 40px;
  margin-top: 10px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;
const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const MemoItem = styled.div<{ isExpanded: boolean }>`
  background: ${(props) =>
    props.isExpanded
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(255, 255, 255, 0.06)"};
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
`;
const ItemHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  strong {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
  .date {
    color: rgba(255, 255, 255, 0.3);
    font-size: 11px;
  }
`;
const ItemBody = styled.div`
  padding: 0 15px 15px 15px;
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    line-height: 1.6;
    margin-top: 10px;
    white-space: pre-wrap;
  }
`;
const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 10px;
`;
const InlineTitleInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 4px;
  padding: 2px 5px;
  font-size: 14px;
  outline: none;
`;
const InlineContentInput = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  width: 100%;
  min-height: 80px;
  outline: none;
  margin-top: 10px;
  resize: none;
`;
const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
const TextBtn = styled.button`
  background: #2f54eb;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 10px;
  cursor: pointer;
`;
const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  padding: 20px;
  font-size: 13px;
`;
