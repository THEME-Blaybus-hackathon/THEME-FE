// components/tooltip/PartTooltip.tsx
import { Html } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  position: THREE.Vector3;
  title: string;
  description: string;
};

export default function PartTooltip({ position, title, description }: Props) {
  return (
    <Html
      position={[position.x, position.y + 1.6, position.z]}
      center
      distanceFactor={9}
      style={{ pointerEvents: 'none' }}
    >
      <div className="part-tooltip">
        <div className="part-tooltip-title">{title}</div>
        <div className="part-tooltip-desc">{description}</div>

        <style>
          {`
            .part-tooltip {
            min-width: 1000px;
              padding: 100px;
              background: rgba(20, 25, 40, 0.92);
              border-radius: 40px;
              box-shadow: 0 12px 30px rgba(0,0,0,0.35);
              color: #fff;
              font-size: 80px;
              line-height: 1.5;
              transform: translateY(6px);
              opacity: 0;
              animation: tooltipFadeIn 0.25s ease forwards;
            }

            .part-tooltip-title {
              font-weight: 700;
              font-size: 100px;
              margin-bottom: 6px;
            }

            .part-tooltip-desc {
              opacity: 0.9;
            }

            @keyframes tooltipFadeIn {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
    </Html>
  );
}
