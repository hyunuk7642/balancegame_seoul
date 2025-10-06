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
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 16 }} aria-live="polite">
        <strong>{round_index + 1} / {total_rounds}</strong>
      </header>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <figure style={{ border: selected_side === 'left' ? '3px solid #4f46e5' : '1px solid #ddd', borderRadius: 8, padding: 8 }}>
          <img src={current.left.url} alt={current.left.alt_text} style={{ width: '100%', height: 'auto' }} />
          <figcaption style={{ marginTop: 8 }}>{current.left.title}</figcaption>
          <button onClick={() => handleChoose('left')} aria-pressed={selected_side === 'left'} style={{ marginTop: 8 }}>왼쪽 선택</button>
        </figure>
        <figure style={{ border: selected_side === 'right' ? '3px solid #4f46e5' : '1px solid #ddd', borderRadius: 8, padding: 8 }}>
          <img src={current.right.url} alt={current.right.alt_text} style={{ width: '100%', height: 'auto' }} />
          <figcaption style={{ marginTop: 8 }}>{current.right.title}</figcaption>
          <button onClick={() => handleChoose('right')} aria-pressed={selected_side === 'right'} style={{ marginTop: 8 }}>오른쪽 선택</button>
        </figure>
      </section>
      <div style={{ marginTop: 16 }}>
        <button onClick={handleNext} disabled={!selected_side}>다음</button>
      </div>
    </main>
  )
}


