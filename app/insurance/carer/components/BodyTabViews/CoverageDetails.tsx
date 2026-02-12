import React from 'react';

export default function CoverageDetails() {
  return (
    <div className="space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6">
      {/* 주계약 */}
      <div className="space-y-4">
        <h2 className="border-b-2 border-[#1e3a8a] pb-2 text-2xl font-bold text-[#1e3a8a]">
          보험금 지급기준
        </h2>
        <h3 className="mt-4 text-lg font-semibold text-text-secondary">· 주계약 (보장형 계약)</h3>
        <div className="mb-1 flex justify-end">
          <p className="text-xs text-text-secondary">기준: 보험가입금액 5천만원</p>
        </div>

        {/* 보장내용표 */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-border-default p-2 text-center md:p-3">급부명</th>
                <th className="border border-border-default p-2 text-center md:p-3">지급사유</th>
                <th className="border border-border-default p-2 text-center md:p-3">기간</th>
                <th className="border border-border-default p-2 text-center md:p-3">지급금액</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              <tr>
                <td
                  className="border border-border-default p-2 text-center font-semibold md:p-3"
                  rowSpan={3}
                >
                  사망보험금
                </td>
                <td className="border border-border-default p-2 text-center md:p-3" rowSpan={3}>
                  피보험자가 보험기간중 사망하였을 때
                </td>
                <td className="border border-border-default p-2 text-center md:p-3">
                  계약일~
                  <br />
                  계약일부터 1년경과시점 계약해당일 전일까지
                </td>
                <td className="border border-border-default p-2 text-center md:p-3">5,000만원</td>
              </tr>
              <tr>
                <td className="border border-border-default p-2 text-center md:p-3">
                  계약일부터 1년경과시점 계약해당일~
                  <br />
                  계약일부터 11년경과시점 계약해당일 전일까지
                </td>
                <td className="border border-border-default p-2 text-center md:p-3">
                  보험가입금액에 계약일로부터 1년이 지난
                  <br />
                  계약해당일부터 매1년마다 '보험가입금액의 5%'를 더한 금액
                </td>
              </tr>
              <tr>
                <td className="border border-border-default p-2 text-center md:p-3">
                  계약일부터 11년경과시점 계약해당일~
                  <br />
                  종신까지
                </td>
                <td className="border border-border-default p-2 text-center md:p-3">7,500만원</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 주의사항 */}
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            1. 보험료 납입기간 중 피보험자가 장해분류표 중 동일한 재해 또는 재해 이외의 동일한
            원인으로 여러 신체부위의 장해지급률을 더하여 50%이상의 장해상태가 되었을 경우에는 다음
            회 이후의 보험료 납입을 면제하여 드립니다.
          </p>
          <p>
            2. 피보험자가 보험기간 중 사망하였을 경우에 이 계약은 더 이상 효력이 없으며, 사망시점의
            유지보너스에 의한 계약자적립액 및 추가납입보험료에 의한 적립액을 사망보험금에 더하여
            지급합니다.
          </p>
        </div>

        {/* 사망보험금 예시 */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-bold text-[#1e3a8a]">&lt;사망보험금 예시&gt;</h3>
          <p className="mb-2 text-right text-xs text-text-secondary">
            기준: 가입나이 40세, 보험가입금액 5천만원
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-border-default p-2 text-center md:p-3">
                    가입 후 경과기간
                  </th>
                  <th className="border border-border-default p-2 text-center md:p-3">
                    사망보험금
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    1년경과 계약해당일 전일까지
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    50,000,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    1년 이상~2년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    52,500,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    2년 이상~3년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    55,000,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    3년 이상~4년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    57,500,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    4년 이상~5년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    60,000,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    5년 이상~6년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    62,500,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    6년 이상~7년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    65,000,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    7년 이상~8년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    67,500,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    8년 이상~9년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    70,000,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    9년 이상~10년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    72,500,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    10년 이상~11년 미만
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    75,000,000원
                  </td>
                </tr>
                <tr>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    11년 이상~보험기간 종료일까지
                  </td>
                  <td className="border border-border-default p-2 text-center md:p-3">
                    75,000,000원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 특약 */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-text-secondary">· 특약</h3>
        <h2 className="text-base font-bold text-black">(무)3대질병진단 보험료환급특약</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-border-default p-2 text-center md:p-3">급부명</th>
                <th className="border border-border-default p-2 text-center md:p-3">지급사유</th>
                <th className="border border-border-default p-2 text-center md:p-3">지급금액</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              <tr>
                <td className="border border-border-default p-2 text-center font-semibold md:p-3">
                  3대질병진단
                  <br />
                  보험료환급금
                </td>
                <td className="border border-border-default p-2 md:p-3">
                  <p>
                    피보험자가 이 특약의 보험기간 중 암보장개시일 이후에 '일반암'으로 진단이
                    확정되거나
                  </p>
                  <p>
                    피보험자가 이 특약의 보험기간 중 '뇌출혈' 또는 '급성심근경색증'으로 진단이
                    확정된 경우
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    (계약일부터 1년미만 진단확정시 50%지급, 최초 1회한함)
                  </p>
                </td>
                <td className="border border-border-default p-2 text-center md:p-3">
                  보험료환급
                  <br />
                  대상계약의 총보험료
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            1. 이 특약의 보험료 납입기간 중 주계약의 보험료 납입이 면제된 때에는 이 특약의 다음 회
            이후의 납입을 면제하여 드립니다.
          </p>
          <p>
            2. 이 특약의 보험료 납입기간 중 피보험자가 장해분류표 중 동일한 재해 또는 재해 이외의
            동일한 원인으로 여러 신체부위의 장해지급률을 더하여 50%이상인 장해상태가 되었을 때에는
            다음 회 이후의 보험료 납입을 면제하여 드립니다.
          </p>
          <p>
            3. 이 특약의 암보장개시일은 계약일(부활(효력회복)일)부터 그 날을 포함하여 90일이 되는
            날의 다음날로 합니다.
          </p>
          <p>
            4. C77(림프절의 이차성 및 상세불명의 악성신생물(암)), C78(호흡 및 소화기관의 이차성
            악성신생물(암)), C79(기타 및 상세불명 부위의 이차성 악성신생물(암)), C80(부위의 명시가
            없는 악성신생물(암))의 경우 원발부위(최초 발생한 부위)를 기준으로 분류합니다. 따라서,
            기타피부암, 중증 이외 갑상선암, 유방암 및 남녀생식기암 등이 전이되어 이차성암으로
            진단받는 경우에도 보장여부를 원발부위 기준으로 분류합니다.
          </p>
          <p>
            5. 보험료환급 대상계약의 총보험료는 계약체결시점의 보험료환급 대상계약의 보험료
            납입기간동안 납입하기로한 보험료의 합계로 사업방법서에 따라 할인을 적용하는 경우 할인전
            보험료를 기준으로 계산합니다.
          </p>
          <p>
            6. 3대질병은 일반암(약관에서 정한 암(기타피부암,중증 이외 갑상선암 및 대장점막내암 제외)
            중에서 유방암 및 남녀생식기암을 제외한 암), 뇌출혈, 급성심근경색증을 말합니다.
          </p>
        </div>
      </div>

      {/* (무)3대질병 납입면제특약 */}
      <div className="mt-8 space-y-4">
        <h2 className="text-base font-bold text-black">(무)3대질병 납입면제특약</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            회사는 피보험자가 보험기간 중 암보장개시일 이후에 암(기타피부암, 중증 이외 갑상선암,
            대장점막내암 제외)으로 진단이 확정되거나, 피보험자가 이 특약의 보험기간 중 뇌출혈 또는
            급성심근경색증으로 진단이 확정되었을 경우에는 다음 회 이후 주계약의 보험료 및 이 특약의
            보험료의 납입을 면제하여 드립니다.
          </p>
          <p className="mt-2 text-xs text-text-secondary">
            * 암보장개시일: 계약일(부활(효력회복)일)부터 그 날을 포함하여 90일이 지난날의 다음날
          </p>
        </div>
      </div>
    </div>
  );
}
