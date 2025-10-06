import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../store/useSessionStore'

type ItemType = 'AI' | 'HUMAN'

type ImageMeta = {
  id: string
  title: string
  author_or_model: string
  source_url: string
  license: string
  alt_text: string
  type: ItemType
  url: string
}

type Pair = {
  left: ImageMeta
  right: ImageMeta
}

const mock_pairs: Pair[] = [
  {
    left: {
      id: '01_ai',
      title: 'AI 01',
      author_or_model: 'Model',
      source_url: '#',
      license: 'Local',
      alt_text: 'AI가 생성한 이미지 01',
      type: 'AI',
      url: `${import.meta.env.BASE_URL}assets/ai/AI01.webp`,
    },
    right: {
      id: '01_human',
      title: 'Human 01',
      author_or_model: 'Painter',
      source_url: '#',
      license: 'Local',
      alt_text: '인간 작가의 이미지 01',
      type: 'HUMAN',
      url: `${import.meta.env.BASE_URL}assets/human/human01.webp`,
    },
  },
  {
    left: {
      id: '02_ai',
      title: 'AI 02',
      author_or_model: 'Model',
      source_url: '#',
      license: 'Local',
      alt_text: 'AI가 생성한 이미지 02',
      type: 'AI',
      url: `${import.meta.env.BASE_URL}assets/ai/AI02.webp`,
    },
    right: {
      id: '02_human',
      title: 'Human 02',
      author_or_model: 'Painter',
      source_url: '#',
      license: 'Local',
      alt_text: '인간 작가의 이미지 02',
      type: 'HUMAN',
      url: `${import.meta.env.BASE_URL}assets/human/human02.webp`,
    },
  },
  {
    left: {
      id: '03_ai',
      title: 'AI 03',
      author_or_model: 'Model',
      source_url: '#',
      license: 'Local',
      alt_text: 'AI가 생성한 이미지 03',
      type: 'AI',
      url: `${import.meta.env.BASE_URL}assets/ai/AI03.webp`,
    },
    right: {
      id: '03_human',
      title: 'Human 03',
      author_or_model: 'Painter',
      source_url: '#',
      license: 'Local',
      alt_text: '인간 작가의 이미지 03',
      type: 'HUMAN',
      url: `${import.meta.env.BASE_URL}assets/human/human03.webp`,
    },
  },
  {
    left: {
      id: '04_ai',
      title: 'AI 04',
      author_or_model: 'Model',
      source_url: '#',
      license: 'Local',
      alt_text: 'AI가 생성한 이미지 04',
      type: 'AI',
      url: `${import.meta.env.BASE_URL}assets/ai/AI04.webp`,
    },
    right: {
      id: '04_human',
      title: 'Human 04',
      author_or_model: 'Painter',
      source_url: '#',
      license: 'Local',
      alt_text: '인간 작가의 이미지 04',
      type: 'HUMAN',
      url: `${import.meta.env.BASE_URL}assets/human/human04.webp`,
    },
  },
  {
    left: {
      id: '05_ai',
      title: 'AI 05',
      author_or_model: 'Model',
      source_url: '#',
      license: 'Local',
      alt_text: 'AI가 생성한 이미지 05',
      type: 'AI',
      url: `${import.meta.env.BASE_URL}assets/ai/AI05.webp`,
    },
    right: {
      id: '05_human',
      title: 'Human 05',
      author_or_model: 'Painter',
      source_url: '#',
      license: 'Local',
      alt_text: '인간 작가의 이미지 05',
      type: 'HUMAN',
      url: `${import.meta.env.BASE_URL}assets/human/human05.webp`,
    },
  },
]

function shufflePair(pair: Pair): Pair {
  return Math.random() < 0.5 ? pair : { left: pair.right, right: pair.left }
}

/**
 * 라운드 화면 컴포넌트
 * - 두 이미지 중 하나를 선택하고 다음 라운드로 진행
 * - 총 5라운드(데모), 좌우 무작위 배치
 */
export default function RoundPage() {
  const navigate = useNavigate()
  const { round_index, incrementRound, addChoice, total_rounds, setTotalRounds } = useSessionStore()
  const [selected_side, set_selected_side] = useState<'left' | 'right' | null>(null)

  const rounds = useMemo(() => mock_pairs.map(shufflePair), [])
  useEffect(() => {
    setTotalRounds(rounds.length)
  }, [rounds, setTotalRounds])
  const current = rounds[round_index]

  useEffect(() => {
    set_selected_side(null)
  }, [round_index])

  const handleChoose = (side: 'left' | 'right') => {
    try {
      set_selected_side(side)
      const chosen = side === 'left' ? current.left : current.right
      addChoice({
        round_index,
        chosen_side: side,
        item_type: chosen.type,
        timestamp: Date.now(),
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('choose_error', error)
      alert('선택 처리 중 문제가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const handleNext = () => {
    try {
      if (round_index < total_rounds - 1) {
        incrementRound()
      } else {
        navigate('/results')
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('next_error', error)
      alert('다음 단계로 이동 중 문제가 발생했습니다. 다시 시도해주세요.')
    }
  }

  if (!current) {
    navigate('/results')
    return null
  }

  return (
    <main style={{ 
      maxWidth: 960, 
      margin: '0 auto', 
      padding: 24,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      <header style={{ 
        marginBottom: 32,
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 24,
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }} aria-live="polite">
        <strong style={{
          color: 'white',
          fontSize: '1.1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>{round_index + 1} / {total_rounds}</strong>
        <h2 style={{ 
          marginTop: 16, 
          textAlign: 'center', 
          fontSize: '1.4rem', 
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          margin: '16px 0 0 0'
        }}>
          어떤 그림이 더 화가의 그림같아 보이나요?
        </h2>
      </header>
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 24
      }}>
        <figure style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: selected_side === 'left' ? '2px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)', 
          borderRadius: 20, 
          padding: 20,
          boxShadow: selected_side === 'left' ? '0 12px 40px 0 rgba(31, 38, 135, 0.5)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          transform: selected_side === 'left' ? 'scale(1.02)' : 'scale(1)'
        }}>
          <img src={current.left.url} alt={current.left.alt_text} style={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: 12,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }} />
          <button 
            onClick={() => handleChoose('left')} 
            aria-pressed={selected_side === 'left'} 
            style={{ 
              marginTop: 16,
              width: '100%',
              padding: '12px 24px',
              background: selected_side === 'left' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 12,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              if (selected_side !== 'left') {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (selected_side !== 'left') {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            왼쪽 선택
          </button>
        </figure>
        <figure style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: selected_side === 'right' ? '2px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)', 
          borderRadius: 20, 
          padding: 20,
          boxShadow: selected_side === 'right' ? '0 12px 40px 0 rgba(31, 38, 135, 0.5)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          transform: selected_side === 'right' ? 'scale(1.02)' : 'scale(1)'
        }}>
          <img src={current.right.url} alt={current.right.alt_text} style={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: 12,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }} />
          <button 
            onClick={() => handleChoose('right')} 
            aria-pressed={selected_side === 'right'} 
            style={{ 
              marginTop: 16,
              width: '100%',
              padding: '12px 24px',
              background: selected_side === 'right' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 12,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              if (selected_side !== 'right') {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (selected_side !== 'right') {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            오른쪽 선택
          </button>
        </figure>
      </section>
      <div style={{ 
        marginTop: 32,
        textAlign: 'center'
      }}>
        <button 
          onClick={handleNext} 
          disabled={!selected_side}
          style={{
            padding: '16px 32px',
            background: selected_side 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 16,
            color: selected_side ? 'white' : 'rgba(255, 255, 255, 0.5)',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: selected_side ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            textShadow: selected_side ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
            boxShadow: selected_side ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.1)',
            minWidth: 120
          }}
        >
          다음
        </button>
      </div>
    </main>
  )
}


