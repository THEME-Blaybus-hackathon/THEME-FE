// components/panels/suspension/SuspensionModelPanel.tsx
import SuspensionSvg from '../../../../../assets/images/suspension.svg';
export default function SuspensionModelPanel() {
  return (
    <>
    <div
        style={{
          width: '100%',
          height: 160,
          marginBottom: 16,
        }}
      >
        <img
          src={SuspensionSvg}
          alt="Robot Arm"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.9,
          }}
        />
      </div>
      <p>
        본 서스펜션 모델은 차량 주행 안정성을 고려하여 설계된
        더블 위시본(Double Wishbone) 방식의 서스펜션 시스템입니다.
      </p>

      <p>
        <strong>구조적 특징</strong><br />
        상·하 위시본 암 구조를 통해 바퀴의 캠버 변화와
        노면 접지력을 효과적으로 제어할 수 있습니다.
      </p>

      <p>
        <strong>주행 성능</strong><br />
        노면 충격을 효율적으로 흡수하여 차체의 안정성을 향상시키며,
        고속 주행 및 코너링 상황을 가정한 시뮬레이션에 적합합니다.
      </p>

      <p>
        <strong>활용 목적</strong><br />
        차량 하부 구조 분석, 서스펜션 기구학 학습,
        부품 간 연결 관계 이해를 위한 교육·연구용 모델입니다.
      </p>
    </>
  );
}
