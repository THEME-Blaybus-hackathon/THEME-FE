import { useReducer, type ReactNode } from 'react';
import type { ModelType } from '@/shared/types/model';
import { studyMainReducer } from './reducer';
import { StateContext, DispatchContext } from './context';

const EXPLODE_STORAGE_KEY = 'study-explodes';

function loadExplodes(): Record<ModelType, number> {
  const saved = sessionStorage.getItem(EXPLODE_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // 파싱 실패 시 기본값
    }
  }
  return { drone: 0, arm: 0, gripper: 0, suspension: 0 };
}

type Props = {
  initialModel: ModelType;
  children: ReactNode;
};

export function StudyMainProvider({ initialModel, children }: Props) {
  const [state, dispatch] = useReducer(studyMainReducer, {
    selectedModel: initialModel,
    rightTab: 'MODEL',
    panelOpen: true,
    selectedMeshName: null,
    explodes: loadExplodes(),
    aiPanelOpen: false,
    showSessionList: false,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
