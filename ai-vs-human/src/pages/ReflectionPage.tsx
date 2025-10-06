import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../store/useSessionStore'

/**
 * 성찰/토론 화면 컴포넌트
 * - 결과 요약(총 라운드/AI 선택 수)
 * - AI 선택 수에 따른 분기 피드백 표시(@feedback.md 내용 반영)
 */
export default function ReflectionPage() {
  const navigate = useNavigate()
  const { choices, total_rounds } = useSessionStore()

  const ai_count = choices.filter((c) => c.item_type === 'AI').length
  const is_ai_preference = ai_count >= 3

  const handleRestart = () => {
    try {
      navigate('/')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('navigation_error', error)
      alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <main style={{ maxWidth: 840, margin: '0 auto', padding: 24 }}>
      <h2>결과 요약</h2>
      <p>총 {total_rounds}개의 라운드 중, AI 이미지를 {ai_count}번 선택했습니다.</p>

      {is_ai_preference ? (
        <section style={{ marginTop: 24 }}>
          <h3>새로운 시대의 미(美)를 발견하셨군요!</h3>
          <p>
            당신은 AI가 생성한 그림에 더 많이 마음이 끌렸습니다. 이는 당신이 기술적으로 정교하고,
            색감이 화려하며, 상상력이 돋보이는 작품에 높은 가치를 부여하고 있다는 의미일 수 있습니다.
          </p>
          <p>
            놀랍지 않으신가요? AI는 수억 개의 데이터를 학습하여 인간이 좋아하는 미적 패턴을 완벽에 가깝게 재현하거나,
            때로는 인간의 상상을 뛰어넘는 새로운 조합을 만들어냅니다. 당신의 선택은 바로 그 지점을 정확히 포착한 것입니다.
          </p>
          <p>
            이는 더 이상 '인간의 감성을 기계가 흉내 낸다'는 차원을 넘어, AI가 우리의 심미적 기준 자체를 확장시킬 수 있는 강력한
            도구가 되었음을 의미합니다.
          </p>
          <h4 style={{ marginTop: 16 }}>핵심 질문</h4>
          <p>
            그렇다면, AI가 만들어낸 '완벽한 아름다움'과 인간의 '서투른 진심' 중, 우리는 미래에 어떤 가치를 더 중요하게 생각하게 될까요?
          </p>
          <h4 style={{ marginTop: 16 }}>마무리</h4>
          <p>
            결국 중요한 것은 기술이 아닌, 그 기술을 통해 무엇을 표현하고 이야기하려는 우리의 의도와 철학입니다. 당신의 선택은 AI 시대에
            '가치'란 무엇인지 다시 한번 생각하게 만드는 소중한 첫걸음입니다.
          </p>
        </section>
      ) : (
        <section style={{ marginTop: 24 }}>
          <h3>그림에 담긴 '사람의 흔적'을 찾아내셨네요.</h3>
          <p>
            당신은 실제 화가가 그린 그림에 더 높은 가치를 부여했습니다. 이는 당신이 작품에 담긴 작가의 고유한 경험, 서투르지만 솔직한 감정 표현,
            그리고 그림 너머의 이야기에 더 깊이 공감하고 있다는 의미일 수 있습니다.
          </p>
          <p>
            AI는 수많은 데이터를 학습해 '가장 그럴듯한' 답을 찾지만, 한 인간의 삶 전체가 담긴 독창적인 세계관이나 의도를 온전히 담아내기는 아직 어렵습니다.
            당신은 바로 그 인간 고유의 숨결과 대체 불가능한 가치를 발견해낸 것입니다.
          </p>
          <p>
            이는 AI 기술이 아무리 발전하더라도, 인간의 창의성은 여전히 특별한 의미를 가지며 그 역할이 사라지지 않을 것임을 시사합니다.
          </p>
          <h4 style={{ marginTop: 16 }}>핵심 질문</h4>
          <p>
            그렇다면, 인간의 고유한 감성과 이야기가 AI라는 새로운 도구를 만났을 때, 예술은 어떤 모습으로 더 풍요롭게 진화하게 될까요?
          </p>
          <h4 style={{ marginTop: 16 }}>마무리</h4>
          <p>
            결국 중요한 것은 기술과의 대결이 아닌, 그 기술을 어떻게 활용하여 우리의 창의성을 확장시킬 것인가 하는 점입니다. 당신의 선택은 AI 시대에도
            변치 않는 인간의 가치가 무엇인지 다시 한번 생각하게 만드는 소중한 첫걸음입니다.
          </p>
        </section>
      )}

      <section style={{ marginTop: 32 }}>
        <h3>토론 질문</h3>
        <ul>
          <li>왜 이 이미지를 더 가치 있게 봤나요?</li>
          <li>저작권/출처는 어떻게 확인할 수 있을까요?</li>
        </ul>
      </section>

      <div style={{ marginTop: 24 }}>
        <button onClick={handleRestart}>처음으로</button>
      </div>
    </main>
  )
}


