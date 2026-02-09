import DroneSvg from '../../../../../assets/images/drone.svg';

export default function DroneModelPanel() {
  return (
    <>
      {/* ===== HERO VISUAL ===== */}
      <div
        style={{
          width: '100%',
          height: 180,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={DroneSvg}
          alt="Quad-Rotor Drone"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.95,
          }}
        />
      </div>

      {/* ===== TITLE ===== */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.08em',
            opacity: 0.65,
            marginBottom: 6,
          }}
        >
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.25 }}>
          Quad-Rotor<br />Educational Drone
        </div>
      </div>

      {/* ===== SUMMARY ===== */}
      <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: 20 }}>
        본 모델은 {' '}
         <Highlight>
    4-Rotor 멀티로터 구조
  </Highlight>를 기반으로 설계된  
        교육·연구용 UAV로, 비행 제어 시스템과 기계 구조의 상호작용을
        직관적으로 학습할 수 있도록 최적화되었습니다.
      </p>

      {/* ===== META INFO ===== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '72px 1fr',
          rowGap: 12,
          columnGap: 12,
          marginBottom: 24,
        }}
      >
        <MetaLabel>TYPE</MetaLabel>
        <MetaValue>Quad-Rotor Drone</MetaValue>

        <MetaLabel>FOCUS</MetaLabel>
        <MetaValue>Flight Control & Mechanical Structure</MetaValue>

        <MetaLabel>USE</MetaLabel>
        <MetaValue>Engineering & Robotics Education</MetaValue>
      </div>

      {/* ===== DETAIL SECTIONS ===== */}
      <Section>
        <SectionTitle>Propulsion System</SectionTitle>
        <SectionText>
          고출력 BLDC 모터 4기를 사용한 독립 구동 방식으로, 각 로터는
          개별 속도 제어가 가능하며 이를 통해 정밀한 자세 제어와
          안정적인 호버링 성능을 제공합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Flight Performance</SectionTitle>
        <SectionText>
          경량 프레임과 효율적인 전력 분배 구조를 기반으로 최대 약
          <strong> 25분</strong>의 연속 비행이 가능하며, 실험 목적에 따라
          다양한 페이로드 구성이 가능합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Learning Objective</SectionTitle>
        <SectionText>
          구조 분해 학습, 부품 간 연결 관계 분석, 비행 제어 알고리즘
          이해를 목적으로 설계되었으며, Explode View를 통해 내부
          메커니즘을 단계적으로 확인할 수 있습니다.
        </SectionText>
      </Section>
    </>
  );
}

/* ===== LOCAL STYLES ===== */

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: 'black',
        background: '#9BB2FF',
        padding: '6px 10px',
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
}

function MetaValue({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 15,
        fontWeight: 600,
        opacity: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 18 }}>{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 16,
        color :'#202059',
        fontWeight: 800,
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 14,
        lineHeight: 1.65,
        opacity: 0.9,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}


function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: '#202059',
        fontWeight: 800,
        background: 'rgba(155, 178, 255, 0.35)',
        padding: '2px 6px',
        borderRadius: 6,
        margin: '0 2px',
      }}
    >
      {children}
    </span>
  );
}