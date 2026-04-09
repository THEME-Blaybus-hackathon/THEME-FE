import type { ModelType, PanelTab } from '@/shared/types/model';

export type StudyMainState = {
  selectedModel: ModelType;
  rightTab: PanelTab | null;
  panelOpen: boolean;
  selectedMeshName: string | null;
  explodes: Record<ModelType, number>;
  aiPanelOpen: boolean;
  showSessionList: boolean;
};

export type StudyMainAction =
  | { type: 'SELECT_MODEL'; payload: ModelType }
  | { type: 'CLICK_TAB'; payload: PanelTab }
  | { type: 'CLOSE_PANEL' }
  | { type: 'CHANGE_EXPLODE'; payload: number }
  | { type: 'SELECT_MESH'; payload: string | null }
  | { type: 'TOGGLE_AI_PANEL' }
  | { type: 'CLOSE_AI_PANEL' }
  | { type: 'TOGGLE_SESSION_LIST' }
  | { type: 'CLOSE_SESSION_LIST' };
