import type { ModelType, PanelTab } from '../../../types/model';
import ArmModelPanel from './panels/arm/ArmModelPanel';
import ArmNotesPanel from './panels/arm/ArmNotesPanel';
import ArmPartsPanel from './panels/arm/ArmPartsPanel';
import DroneModelPanel from './panels/drone/DroneModelPanel';
import DroneNotesPanel from './panels/drone/DroneNotesPanel';
import DronePartsPanel from './panels/drone/DronePartsPanel';
import GripperModelPanel from './panels/gripper/GripperModelPanel';
import GripperNotesPanel from './panels/gripper/GripperNotesPanel';
import GripperPartsPanel from './panels/gripper/GripperPartsPanel';
import SuspensionModelPanel from './panels/suspension/SuspensionModelPanel';
import SuspensionPartsPanel from './panels/suspension/SuspensionPartsPanel';

export const PANEL_MAP: Record<
  ModelType,
  Record<PanelTab, React.FC>
> = {
  Drone: {
    MODEL: DroneModelPanel,
    PARTS: DronePartsPanel,
    NOTES: DroneNotesPanel,
  },
  Arm: {
    MODEL: ArmModelPanel,
    PARTS: ArmPartsPanel,
    NOTES: ArmNotesPanel,
  },
  Gripper: {
    MODEL: GripperModelPanel,
    PARTS: GripperPartsPanel,
    NOTES: GripperNotesPanel,
  },
  Suspension: {
    MODEL: SuspensionModelPanel,
    PARTS: SuspensionPartsPanel,
    NOTES: SuspensionModelPanel,
  },
};
