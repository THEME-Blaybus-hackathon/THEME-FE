import React, { useState } from 'react';

// 디자인을 위한 스타일
const styles = {
  container: { height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' as const, backgroundColor: '#0f172a', color: '#f1f5f9', fontFamily: 'sans-serif' },
  header: { height: '60px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', backgroundColor: '#1e293b' },
  main: { flex: 1, display: 'flex', overflow: 'hidden' },
  viewport: { flex: 3, position: 'relative' as const, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #334155' },
  sidebar: { width: '350px', display: 'flex', flexDirection: 'column' as const, backgroundColor: '#1e293b' },
  tabGroup: { display: 'flex', padding: '10px', gap: '10px', borderBottom: '1px solid #334155' },
  tab: (active: boolean) => ({ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const, backgroundColor: active ? '#3b82f6' : '#334155', color: 'white' }),
  content: { flex: 1, padding: '20px', overflowY: 'auto' as const },
  inputArea: { padding: '15px', borderTop: '1px solid #334155' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }
};

const App: React.FC = () => {
  const [tab, setTab] = useState<'AI' | 'NOTES'>('AI');

  return (
    <div style={styles.container}>
      {/* 상단 헤더 */}
      <header style={styles.header}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#60a5fa' }}>SIMVEX</div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <span>HOME</span>
          <span style={{ color: '#60a5fa', borderBottom: '2px solid #60a5fa' }}>STUDY</span>
          <span>CAD</span>
          <span>LAB</span>
        </div>
        <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#475569' }}></div>
      </header>

      <main style={styles.main}>
        {/* 3D 뷰포트 */}
        <section style={styles.viewport}>
          <div style={{ color: '#475569', textAlign: 'center' }}>
            <p>[ 3D MODEL VIEWPORT ]</p>
            <p style={{ fontSize: '12px' }}>마우스로 회전하고 줌할 수 있는 영역</p>
          </div>
          
          {/* 하단 슬라이더 바 */}
          <div style={{ position: 'absolute', bottom: '30px', width: '60%', backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: '15px', borderRadius: '15px' }}>
            <div style={{ fontSize: '10px', marginBottom: '5px' }}>EXPLODE VIEW</div>
            <input type="range" style={{ width: '100%' }} />
          </div>
        </section>

        {/* 우측 사이드바 (AI & 메모장) */}
        <aside style={styles.sidebar}>
          <div style={styles.tabGroup}>
            <button style={styles.tab(tab === 'AI')} onClick={() => setTab('AI')}>AI ASSISTANT</button>
            <button style={styles.tab(tab === 'NOTES')} onClick={() => setTab('NOTES')}>MY NOTES</button>
          </div>

          <div style={styles.content}>
            {tab === 'AI' ? (
              <div>
                <div style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '12px', fontSize: '14px', marginBottom: '10px' }}>
                  메모..
                </div>
              </div>
            ) : (
              <textarea 
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent', border: 'none', color: 'white', outline: 'none', resize: 'none' }}
                placeholder="학습한 내용을 여기에 기록해..."
              />
            )}
          </div>

          {tab === 'AI' && (
            <div style={styles.inputArea}>
              <input style={styles.input} type="text" placeholder="질문을 입력하세요..." />
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default App;