import { useNavigate } from 'react-router-dom'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useSessionStore } from '../store/useSessionStore'

ChartJS.register(ArcElement, Tooltip, Legend)

/**
 * 결과 화면 컴포넌트
 * - 데모: 임시 비율 데이터로 도넛 차트 표시
 */
export default function ResultsPage() {
  const navigate = useNavigate()
  const { choices, total_rounds } = useSessionStore()
  const ai_count = choices.filter((c) => c.item_type === 'AI').length
  const human_count = choices.filter((c) => c.item_type === 'HUMAN').length

  const data = {
    labels: ['AI 선택', '인간 선택'],
    datasets: [
      {
        label: '선택 수',
        data: [ai_count, human_count],
        backgroundColor: ['#6366f1', '#22c55e'],
        borderWidth: 0,
      },
    ],
  }

  const handleReflect = () => {
    try {
      navigate('/reflect')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('navigation_error', error)
      alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h2>당신의 선택은...</h2>
      <p>총 {total_rounds}개의 라운드 중, AI 이미지를 {ai_count}번 선택했습니다.</p>
      <div style={{ maxWidth: 360, margin: '24px auto' }}>
        <Doughnut data={data} />
      </div>
      <button onClick={handleReflect}>성찰로 넘어가기</button>
    </main>
  )
}


