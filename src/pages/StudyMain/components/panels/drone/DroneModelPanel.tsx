// components/panels/drone/DroneModelPanel.tsx
import DroneSvg from '../../../../../assets/images/drone.svg';
export default function DroneModelPanel() {
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
          src={DroneSvg}
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
        본 드론 모델은 고기동성 멀티로터 구조를 기반으로 설계된 산업·연구용
        UAV입니다. 안정적인 비행 성능과 모듈화된 구조를 통해 다양한 환경에서의
        테스트 및 시뮬레이션에 최적화되어 있습니다.
      </p>

      <p>
        <strong>추진 시스템</strong><br />
        고출력 BLDC 모터 4기를 사용하여 빠른 응답성과 정밀한 자세 제어가
        가능하며, 각 모터는 독립적으로 제어되어 안정적인 호버링과 기동성을
        제공합니다.
      </p>

      <p>
        <strong>비행 성능</strong><br />
        최적화된 전력 분배 구조와 경량 프레임 설계를 통해 최대 약 25분의
        연속 비행이 가능하며, 실험 환경에 따라 다양한 페이로드 구성이
        가능합니다.
      </p>

      <p>
        <strong>활용 목적</strong><br />
        구조 분석, 부품 분해 학습, 제어 알고리즘 검증 등 시뮬레이션 기반
        학습을 목적으로 하며, 폭발도(Explode View)를 통해 내부 구조를
        직관적으로 확인할 수 있습니다.
      </p>
    </>
  );
}
