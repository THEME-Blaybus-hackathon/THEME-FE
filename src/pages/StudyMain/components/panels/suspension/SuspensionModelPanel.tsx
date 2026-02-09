import SuspensionSvg from '../../../../../assets/images/suspension.svg';

export default function SuspensionModelPanel() {
  return (
    <>
      <HeroImage src={SuspensionSvg} alt="Double Wishbone Suspension" />

      <TitleBlock
        title={
          <>
            Double Wishbone<br />Suspension System
          </>
        }
      />

      <Summary>
        본 모델은 차량 주행 안정성을 고려하여 설계된 {'\t\t'}
        <Highlight>더블 위시본 서스펜션</Highlight> 구조로,
        노면 조건에 따른 차체 거동을 분석하기 위한
        교육·연구용 시뮬레이션 모델입니다.
      </Summary>

      <MetaGrid>
        <MetaLabel>TYPE</MetaLabel>
        <MetaValue>Double Wishbone Suspension</MetaValue>

        <MetaLabel>FOCUS</MetaLabel>
        <MetaValue>Vehicle Dynamics</MetaValue>

        <MetaLabel>USE</MetaLabel>
        <MetaValue>Mechanical & Automotive Education</MetaValue>
      </MetaGrid>

      <Section>
        <SectionTitle>Structural Characteristics</SectionTitle>
        <SectionText>
          상·하 위시본 암 구조를 통해
          바퀴의 캠버 변화와 접지력을
          효과적으로 제어할 수 있습니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Driving Performance</SectionTitle>
        <SectionText>
          노면 충격을 효율적으로 흡수하여
          고속 주행 및 코너링 상황에서도
          안정적인 차체 거동을 유지합니다.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Learning Objective</SectionTitle>
        <SectionText>
          서스펜션 기구학 분석, 부품 간 연결 관계 이해,
          차량 동역학 시뮬레이션 학습을 목적으로 합니다.
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
