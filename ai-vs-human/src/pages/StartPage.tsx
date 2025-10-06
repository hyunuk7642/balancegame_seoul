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
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1>AI vs. Human: 진짜 가치는 어디에 있을까요?</h1>
      <p>
        잠시 후, AI가 그린 그림과 실제 화가가 그린 그림이 제시됩니다. 당신의 눈에는 어떤
        그림이 더 가치 있어 보이나요?
      </p>
      <button onClick={handleStart} aria-label="시작하기">시작하기</button>
    </main>
  )
}


