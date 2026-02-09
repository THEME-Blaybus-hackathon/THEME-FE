import GripperSvg from '../../../../../assets/images/gripper.svg';

export default function GripperModelPanel() {
  return (
    <>
      <HeroImage src={GripperSvg} alt="Precision Gripper" />

      <TitleBlock
        title={
          <>
            Precision<br />Robotic Gripper
          </>
        }
      />

      <Summary>
        본 모델은 로봇 암의 엔드 이펙터로 사용되는
        <Highlight>정밀 파지용 그리퍼</Highlight> 시스템으로,
        다양한 형상의 물체를 안정적으로 취급할 수 있도록
        설계되었습니다.
      </Summary>

      <MetaGrid>
        <MetaLabel>TYPE</MetaLabel>
        <MetaValue>Parallel Jaw Gripper</MetaValue>

        <MetaLabel>FOCUS</MetaLabel>
        <MetaValue>Grasping Mechanism</MetaValue>

        <MetaLabel>USE</MetaLabel>
        <MetaValue>Assembly & Handling Simulation</MetaValue>
      </MetaGrid>

      <Section>
        <SectionTitle>Grasping Mechanism</SectionTitle>
        <SectionText>
          양측 대칭 구조와 균일한 힘 분배 메커니즘을 통해,
          파지 중 미끄러짐을 최소화하고
          안정적인 물체 고정을 제공합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Precision Handling</SectionTitle>
        <SectionText>
          소형 부품 조립, 전자 부품 취급 등
          <Highlight>고정밀 파지</Highlight>가 요구되는
          작업 환경을 가정한 시뮬레이션에 적합합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Learning Objective</SectionTitle>
        <SectionText>
          파지 알고리즘 테스트, 엔드 이펙터 구조 분석,
          로봇 암과의 연동 동작 이해를 위한
          교육·연구용 모델입니다.
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
