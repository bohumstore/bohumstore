type SurrenderRow = {
  period: string
  premium: string
  maleRefund: string
  maleRefundRate: string
  maleAccumulated: string
  maleAccumulatedRate: string
  femaleRefund: string
  femaleRefundRate: string
  femaleAccumulated: string
  femaleAccumulatedRate: string
}

type SurrenderScenario = {
  title: string
  rows: SurrenderRow[]
}

type SurrenderSection = {
  title: string
  criteria: string
  scenarios: SurrenderScenario[]
  notes?: string[]
}

const parseRows = (text: string): SurrenderRow[] =>
  text
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [period, premium, maleRefund, maleRefundRate, maleAccumulated, maleAccumulatedRate, femaleRefund, femaleRefundRate, femaleAccumulated, femaleAccumulatedRate] = line.split('|').map((value) => value.trim())

      return {
        period,
        premium,
        maleRefund,
        maleRefundRate,
        maleAccumulated,
        maleAccumulatedRate,
        femaleRefund,
        femaleRefundRate,
        femaleAccumulated,
        femaleAccumulatedRate,
      }
    })

const surrenderData = parseRows(`
  3개월 | 72,900.00 | 67,489.88 | 92.57% | 58,664.18 | 80.47% | 56,226.40 | 77.12%
  6개월 | 72,900.00 | 68,235.93 | 93.60% | 59,541.09 | 81.67% | 56,798.05 | 77.91%
  9개월 | 72,900.00 | 68,991.95 | 94.63% | 60,431.48 | 82.89% | 57,376.84 | 78.70%
  1년 | 72,900.00 | 69,758.11 | 95.69% | 61,335.61 | 84.13% | 57,962.87 | 79.51%
  2년 | 72,900.00 | 72,927.37 | 100.03% | 65,094.90 | 89.29% | 60,381.61 | 82.82%
  3년 | 72,900.00 | 76,272.32 | 104.62% | 69,096.00 | 94.78% | 62,925.23 | 86.31%
  4년 | 72,900.00 | 79,804.60 | 109.47% | 73,357.98 | 100.62% | 65,601.40 | 89.98%
  5년 | 72,900.00 | 83,536.58 | 114.59% | 77,901.45 | 106.86% | 68,418.25 | 93.85%
  6년 | 72,900.00 | 87,823.40 | 120.47% | 83,051.09 | 113.92% | 71,591.99 | 98.20%
  7년 | 72,900.00 | 92,388.93 | 126.73% | 88,597.45 | 121.53% | 74,960.60 | 102.82%
  8년 | 72,900.00 | 97,251.64 | 133.40% | 94,572.42 | 129.72% | 78,536.05 | 107.73%
  9년 | 72,900.00 | 102,431.25 | 140.50% | 101,010.43 | 138.56% | 82,331.02 | 112.93%
  10년 | 72,900.00 | 120,341.76 | 165.07% | 120,341.76 | 165.07% | 120,341.76 | 165.07%
`)

const surrenderSections: SurrenderSection[] = [
  {
    title: '2형 거치형, 10년 이율확정형 2종 연금강화형',
    criteria: '기준 : 일시납보험료 US$ 72,900, 나이 55세, 65세 연금개시, 가입시점 공시이율 연복리 6.14%',
    scenarios: [
      {
        title: '',
        rows: surrenderData,
      },
    ],
    notes: [
      '**해약환급금이 적은 이유 및 설계 시 유의사항**',
      '주1) 현재 공시이율 이율확정기간 연복리 6.14% 가정(해지시 연복리 6.14% 및 MVA 반영), 이율확정기간 이후 연복리 3.8% 가정 (2026년09월17일 현재)',
      '주2) 공시이율 1.5%p 상승시 이율확정기간 연복리 6.14% 가정(해지시 연복리 6.14%+1.5%p 및 MVA 반영), 이율확정기간 이후 연복리 3.8% 가정 (2026년09월17일 현재)',
      '주3) 최저해약환급금 이율확정기간 연복리 6.14% 가정(해지시 최고 MVA값 20% 반영), 이율확정기간 이후 연복리 0.5% 가정(2026년09월17일 현재)',
      '**※ 상기 예시는 계약자의 이해를 돕기 위해 가정한 각 적립이율을 월할계산하여 작성된 것으로, 실제 계약 내용 및 공시이율 변동 등에 따라 달라질 수 있습니다.**',
      '**※ 해약환급금이 납입보험료보다 적은 이유** : 계약자가 납입한 보험료 중 일부는 불의의 사고를 당한 다른 가입자에게 보험금으로 지급되며, 또 다른 일부는 보험회사 운영에 필요한 경비로 사용되므로 중도해지시 지급되는 해약환급금은 납입한 보험료보다 적거나 없을 수 있습니다.',
      '※ 이 보험계약이 보험계약일로부터 이율확정기간(계약일부터 10년으로 하며, 이하 "이율확정기간"이라 합니다)이 경과하기 전에 해지하는 경우에는 연금계약 적립액에 (1-시장가격조정률(MVA: Market Value Adjustment))을 곱하여 계산한 금액을 해약환급금으로 지급합니다. 다만, 생활자금형(1형)의 경우 해지시점까지 발생한 생활자금에 대하여는 시장가격조정률(MVA)을 적용하지 않습니다.',
      '* 해약환급금 = 해지 시점의 연금계약 적립액 * (1-MVA) - 해약공제액',
      '* MVA (Market Value Adjustment: 시장가격조정률)=1-[(1+A)/(1+B+0.5%)]^(n/12) (A: 가입시점의 공시이율, B: 이율확정기간 중 해약환급금 계산시점의 공시이율, n: 잔여월수)',
      '※ 이율확정기간 중 해지시 가입시점의 공시이율보다 해지시점의 공시이율이 높은 경우, 시장가격조정률(최대 20%)이 적용되어 해약환급금이 감소할수 있습니다. 이율확정기간 이후에는 공시이율 변동에 따라 해약환급금의 차이가 발생합니다.',
      '※ 상기 예시된 "현재 공시이율 가정시"의 해약환급금은 이율확정기간 중 해지시 공시이율 2026년09월17일 현재 연복리 6.14%을 가정하에 MVA값을 반영하여 계산된 금액이며, 이율확정기간 이후 해지시 공시이율(연복리 3.8% 가정 (2026년09월17일))을 가정하여 계산된 금액입니다.',
      '※ 상기 예시된 "공시이율 1.5%p상승시"의 해약환급금은 이율확정기간 중 해지시 해지시점의 공시이율이 가입시점의 공시이율 보다 1.5%p 높다는 가정하에 MVA값을 반영하여 계산한 금액이며, 이율확정기간 이후 해지시 공시이율(연복리 3.8% 가정 (2026년09월17일))을 가정하여 계산된 금액입니다.',
      '※ 상기 예시된 최저해약환급금은 이율확정기간 동안은 가입시 확정된 공시이율로 적립하고 이율확정기간 중 해지시 최고 MVA값 20%를 적용하여 산출한 금액이며, 이율확정기간 이후에는 최저보증이율 연복리 0.5%를 적용하였습니다.',
      '※ 상기 예시된 경과기간별 해약환급금(률)은 달러기준 환급금(률)이며, 이 보험계약을 중도 해지할 경우 해약환급금은 납입한 보험료에서 경과된 기간의 위험보험료, 사업비, 해약공제금액 등을 차감하므로 납입보험료보다 적을 수도 있습니다.',
      '※ 상기 예시된 금액에 적용된 이율확정기간의 공시이율은 2026년09월17일 현재 연복리 6.14%로 하며, 이율확정기간 이후에는 연복리 3.8% (2026년09월17일 현재)이며, 공시이율의 최저보증이율은 이율확정기간에는 연복리 1.0%로 하며, 이율확정기간 이후에는 0.5%로 합니다. 공시이율의 변동에 따라 실제 해약환급금은 상기 예시된 금액과 상이할 수 있습니다.',
      '※ 상기 환급률은 계약자가 납입한 보험료 대비 해약환급금의 비율입니다.',
      '※ 상기 예시된 금액은 세전 금액을 의미합니다.',
      '※ 상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.',
      '※ 상기 해약환급금은 각 해당연도 말에 해당하는 금액입니다.',
      '※ 연금강화형의 경우 연금강화보너스 발생 계약해당일의 전일 기준 해약환급금에 연금강화보너스를 더한 금액으로 예시되어 있습니다. 보너스 발생일이 도래하기 전에 해지하는 경우 보너스 금액은 지급하지 않습니다. 단 연금개시전 연금개시나이가 변경되는 경우에는 변경된 시점부터 변경 후 연금개시나이를 기준으로 연금강화보너스를 계산합니다.',
      '※ 유지보너스의 경우 유지보너스 발생 계약해당일의 전일기준 해약환급금에 유지보너스를 더한 금액으로 예시되어 있습니다. 보너스 발생 도래하기 전에 해지하는 경우 보너스 금액은 지급하지 않습니다.',
    ],
  },
]

type ScenarioTableProps = {
  scenario: SurrenderScenario
}

const ScenarioTable = ({ scenario }: ScenarioTableProps) => {
  return (
    <div className="mb-6">
      {scenario.title && <h4 className="text-base md:text-lg font-bold mb-3 text-gray-800">{scenario.title}</h4>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap" rowSpan={2}>
                경과<br />기간
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap" rowSpan={2}>
                납입보험료<br />누계 (USD)
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold" colSpan={2}>
                ㉠ 현재 공시이율 가정시
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold" colSpan={2}>
                ㉡ 공시이율 1.5%p 상승시
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold" colSpan={2}>
                ㉢ 최저해약환급금
              </th>
            </tr>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap">
                해약환급금<br />(USD)
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap">
                해약<br />환급률(%)
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap">
                해약환급금<br />(USD)
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap">
                해약<br />환급률(%)
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap">
                해약환급금<br />(USD)
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-bold whitespace-nowrap">
                해약<br />환급률(%)
              </th>
            </tr>
          </thead>
          <tbody>
            {scenario.rows.map((row, index) => {
              const is10Year = row.period === '10년'
              return (
                <tr
                  key={index}
                  className={
                    is10Year
                      ? 'bg-gradient-to-r from-red-50 to-pink-50 border-l-8 border-l-red-500 border-2 border-red-300 shadow-xl'
                      : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }
                >
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-center whitespace-nowrap`}>{row.period}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.premium}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.maleRefund}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.maleRefundRate}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.femaleRefund}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.femaleRefundRate}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.maleAccumulated}</td>
                  <td className={`border border-gray-300 px-2 ${is10Year ? 'py-3 font-bold text-red-800' : 'py-2'} text-right whitespace-nowrap`}>{row.maleAccumulatedRate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Surrender2026() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">해약환급금</h2>
      {surrenderSections.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="border-l-4 border-[#1e3a8a] pl-3">
            <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-gray-500">{section.criteria}</p>
          </div>
          <div className="space-y-6">
            {section.scenarios.map((scenario, idx) => (
              <ScenarioTable key={idx} scenario={scenario} />
            ))}
          </div>
          {section.notes && section.notes.length > 0 && (
            <div className="text-xs text-gray-600 leading-relaxed">
              {section.notes.map((note, noteIndex) => {
                const isBold = note.startsWith('**') && note.endsWith('**')
                const displayText = isBold ? note.slice(2, -2) : note

                // 첫 번째 제목
                if (displayText === '해약환급금이 적은 이유 및 설계 시 유의사항') {
                  return (
                    <p key={noteIndex} className="font-bold text-sm text-gray-800 mb-3">
                      {displayText}
                    </p>
                  )
                }

                // 주1, 주2, 주3
                if (displayText.startsWith('주')) {
                  return (
                    <p key={noteIndex} className="mb-2">
                      {displayText}
                    </p>
                  )
                }

                // 상기 예시 문구
                if (displayText.startsWith('※ 상기 예시는 계약자의 이해를 돕기 위해')) {
                  return (
                    <p key={noteIndex} className="font-bold text-[13px] text-gray-700 mt-3 mb-2">
                      {displayText}
                    </p>
                  )
                }

                return (
                  <p key={noteIndex} className={isBold ? 'font-bold mb-2' : 'mb-1'}>
                    {displayText}
                  </p>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
