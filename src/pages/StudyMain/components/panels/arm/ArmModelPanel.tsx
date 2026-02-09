import ArmSvg from '../../../../../assets/images/arm.svg';

export default function ArmModelPanel() {
  return (
    <>
      {/* ===== HERO VISUAL ===== */}
      <HeroImage src={ArmSvg} alt="6-Axis Robot Arm" />

      {/* ===== TITLE ===== */}
      <TitleBlock
        title={
          <>
            6-Axis<br />Industrial Robot Arm
          </>
        }
      />

      {/* ===== SUMMARY ===== */}
      <Summary>
        본 모델은{' '}
        <Highlight>6축 다관절 구조</Highlight>를 기반으로 설계된
        산업·교육용 로봇 암으로, 복잡한 작업 경로와 정밀한
        위치 제어를 학습하기에 최적화된 시뮬레이션 모델입니다.
      </Summary>

      {/* ===== META INFO ===== */}
      <MetaGrid>
        <MetaLabel>TYPE</MetaLabel>
        <MetaValue>Articulated Robot Arm</MetaValue>

        <MetaLabel>FOCUS</MetaLabel>
        <MetaValue>Kinematics & Motion Control</MetaValue>

        <MetaLabel>USE</MetaLabel>
        <MetaValue>Automation & Robotics Education</MetaValue>
      </MetaGrid>

      {/* ===== DETAILS ===== */}
      <Section>
        <SectionTitle>Mechanical Structure</SectionTitle>
        <SectionText>
          회전 관절 기반의 6자유도 구조를 채택하여,
          작업 공간 전반에 걸친 유연한 자세 구성과
          복잡한 궤적 추종이 가능합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Precision & Payload</SectionTitle>
        <SectionText>
          최대 <Highlight>12kg</Highlight>의 페이로드를 안정적으로
          지지하며, 반복 정밀도는 약
          <Highlight> ±0.02mm</Highlight> 수준으로
          고정밀 작업 시뮬레이션에 적합합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Learning Objective</SectionTitle>
        <SectionText>
          관절별 운동 범위 분석, 역기구학 이해,
          제어 알고리즘 검증 및 공정 자동화
          시나리오 학습을 목적으로 설계되었습니다.
        </SectionText>
      </Section>
    </>
  );
}


function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: '100%', height: 180, marginBottom: 20 }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

function TitleBlock({ title }: { title: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.25 }}>
        {title}
      </div>
    </div>
  );
}

function Summary({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: 20 }}>
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

const MetaGrid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      gap: 12,
      marginBottom: 24,
    }}
  >
    {children}
  </div>
);

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
