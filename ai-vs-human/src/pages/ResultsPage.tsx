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
        backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(34, 197, 94, 0.8)'],
        borderColor: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)'],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
      }
    }
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
        width: '100%',
        maxWidth: 600
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '2.2rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          marginBottom: 16
        }}>
          당신의 선택은...
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          marginBottom: 32,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          총 {total_rounds}개의 라운드 중, AI 이미지를 {ai_count}번 선택했습니다.
        </p>
        <div style={{ 
          maxWidth: 360, 
          margin: '32px auto',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
          padding: 24,
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Doughnut data={data} options={options} />
        </div>
        <button 
          onClick={handleReflect}
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 16,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
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
          성찰로 넘어가기
        </button>
      </div>
    </main>
  )
}


