import type { ModelType, PanelTab } from '../../../types/model';
import ArmModelPanel from './panels/arm/ArmModelPanel';
import ArmNotesPanel from './panels/arm/ArmNotesPanel';
import ArmPartsPanel from './panels/arm/ArmPartsPanel';
import ArmAIPanel from './panels/arm/ArmAIPanel';
import DroneModelPanel from './panels/drone/DroneModelPanel';
import DroneNotesPanel from './panels/drone/DroneNotesPanel';
import DronePartsPanel from './panels/drone/DronePartsPanel';
import DroneAIPanel from './panels/drone/DroneAIPanel';
import GripperModelPanel from './panels/gripper/GripperModelPanel';
import GripperNotesPanel from './panels/gripper/GripperNotesPanel';
import GripperPartsPanel from './panels/gripper/GripperPartsPanel';
import GripperAIPanel from './panels/gripper/GripperAIPanel';
import SuspensionModelPanel from './panels/suspension/SuspensionModelPanel';
import SuspensionNotesPanel from './panels/suspension/SuspensionNotesPanel';
import SuspensionPartsPanel from './panels/suspension/SuspensionPartsPanel';
import SuspensionAIPanel from './panels/suspension/SuspensionAIPanel';

export const PANEL_MAP: Record<ModelType, Record<PanelTab, React.FC>> = {
  drone: {
    MODEL: DroneModelPanel,
    PARTS: DronePartsPanel,
    NOTES: DroneNotesPanel,
    AI: DroneAIPanel,
  },
  arm: {
    MODEL: ArmModelPanel,
    PARTS: ArmPartsPanel,
    NOTES: ArmNotesPanel,
    AI: ArmAIPanel,
  },
  gripper: {
    MODEL: GripperModelPanel,
    PARTS: GripperPartsPanel,
    NOTES: GripperNotesPanel,
    AI: GripperAIPanel,
  },
  suspension: {
    MODEL: SuspensionModelPanel,
    PARTS: SuspensionPartsPanel,
    NOTES: SuspensionNotesPanel,
    AI: SuspensionAIPanel,
  },
};
