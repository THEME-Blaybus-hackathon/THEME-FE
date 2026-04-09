import { useContext } from 'react';
import { StateContext, DispatchContext } from './context';

export function useStudyMainState() {
  const state = useContext(StateContext);
  if (!state) throw new Error('useStudyMainState must be used within StudyMainProvider');
  return state;
}

export function useStudyMainDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('useStudyMainDispatch must be used within StudyMainProvider');
  return dispatch;
}
