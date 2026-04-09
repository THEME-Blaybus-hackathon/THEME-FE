import { createContext } from 'react';
import type { StudyMainState, StudyMainAction } from './types';

export const StateContext = createContext<StudyMainState | null>(null);
export const DispatchContext = createContext<((action: StudyMainAction) => void) | null>(null);
