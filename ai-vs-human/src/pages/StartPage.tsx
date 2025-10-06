import { useNavigate } from 'react-router-dom'

/**
 * 시작 화면 컴포넌트
 * - 활동 소개 및 시작 버튼 제공
 */
export default function StartPage() {
  const navigate = useNavigate()
  const handleStart = () => {
    try {
      navigate('/round')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('navigation_error', error)
      alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <main style={{ 
      maxWidth: 720, 
      margin: '0 auto', 
      padding: 24,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 24,
        padding: 48,
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: 600
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          marginBottom: 24,
          lineHeight: 1.2
        }}>
          AI vs. Human: 진짜 가치는 어디에 있을까요?
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.2rem',
          lineHeight: 1.6,
          marginBottom: 32,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          잠시 후, AI가 그린 그림과 실제 화가가 그린 그림이 제시됩니다. 당신의 눈에는 어떤
          그림이 더 가치 있어 보이나요?
        </p>
        <button 
          onClick={handleStart} 
          aria-label="시작하기"
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 16,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            minWidth: 160
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)'
            ;(e.target as HTMLElement).style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
            ;(e.target as HTMLElement).style.transform = 'scale(1)'
          }}
        >
          시작하기
        </button>
      </div>
    </main>
  )
}


