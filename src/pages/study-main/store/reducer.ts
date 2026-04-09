import type { StudyMainState, StudyMainAction } from './types';

const EXPLODE_STORAGE_KEY = 'study-explodes';

export function studyMainReducer(
  state: StudyMainState,
  action: StudyMainAction,
): StudyMainState {
  switch (action.type) {
    case 'SELECT_MODEL':
      return { ...state, selectedModel: action.payload };

    case 'CLICK_TAB':
      return { ...state, rightTab: action.payload, panelOpen: true };

    case 'CLOSE_PANEL':
      return { ...state, panelOpen: false, rightTab: null };

    case 'CHANGE_EXPLODE': {
      const next = { ...state.explodes, [state.selectedModel]: action.payload };
      sessionStorage.setItem(EXPLODE_STORAGE_KEY, JSON.stringify(next));
      return { ...state, explodes: next };
    }

    case 'SELECT_MESH':
      return { ...state, selectedMeshName: action.payload };

    case 'TOGGLE_AI_PANEL':
      return { ...state, aiPanelOpen: !state.aiPanelOpen };

    case 'CLOSE_AI_PANEL':
      return { ...state, aiPanelOpen: false };

    case 'TOGGLE_SESSION_LIST':
      return { ...state, showSessionList: !state.showSessionList };

    case 'CLOSE_SESSION_LIST':
      return { ...state, showSessionList: false };

    default:
      return state;
  }
}
