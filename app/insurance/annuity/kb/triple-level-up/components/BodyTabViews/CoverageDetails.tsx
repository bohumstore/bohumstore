import React from 'react';

export default function CoverageDetails() {
  return (
    <div className="space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6">
      <div className="space-y-4">
        <h2 className="product-page-title">보장내용</h2>

        <div className="space-y-4">
          <h3 className="product-section-title">연금개시전 보험기간</h3>
          <div className="product-info-box">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="product-table text-[10px] sm:text-xs md:text-sm">
                  <colgroup>
                    <col className="w-[20%]" />
                    <col className="w-[45%]" />
                    <col className="w-[35%]" />
                  </colgroup>
                  <thead>
                    <tr className="product-table-header">
                      <th className="product-table-th">급부명</th>
                      <th className="product-table-th">지급사유</th>
                      <th className="product-table-th">지급금액</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-primary">
                    <tr>
                      <td className="product-table-td">고도재해장해 급여금</td>
                      <td className="product-table-td">
                        &quot;연금개시전 보험기간&quot; 중 피보험자가 장해분류표 중 동일한 재해로 여러 신체부위의
                        장해지급률을 더하여 80% 이상인 장해상태가 되었을 경우(다만, 최초 1회에 한하여
                        지급)
                      </td>
                      <td className="product-table-td-center">
                        매월 <span className="font-bold text-product-primary">40</span>만원(36회 지급)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>
                  주1) 고도재해장해급여금은 매월 보험금 지급사유 발생해당일에 드리며, 최초의 보험금
                  지급사유 발생해당일부터 3년을 고도재해장해급여금의 지급기간으로 합니다. 다만, 해당월에
                  보험금 지급사유 발생해당일이 없는 경우 해당월의 마지막 날을 보험금 지급사유 발생해당일로
                  봅니다.
                </p>
                <p>
                  주2) 피보험자가 연금개시전 보험기간 중 사망하였을 경우에는 사망당시의 연금계약
                  계약자적립액과 최저사망적립액 중 큰 금액을 지급하여 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="product-section-title">연금개시후 보험기간</h3>
          <p className="mb-2 text-text-secondary">
            - 계약자는 해당 약관에 따라 연금지급개시전에 연금지급형태 및 연금지급형태의 구성비율,
            생활설계자금선택비율을 변경할수 있습니다.
          </p>
          <div className="product-info-box">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="product-table text-[10px] sm:text-xs md:text-sm">
                  <colgroup>
                    <col className="w-[20%]" />
                    <col className="w-[45%]" />
                    <col className="w-[35%]" />
                  </colgroup>
                  <thead>
                    <tr className="product-table-header">
                      <th className="product-table-th">급부명</th>
                      <th className="product-table-th">지급사유</th>
                      <th className="product-table-th">지급금액</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-primary">
                    <tr>
                      <td className="product-table-td">생활설계자금</td>
                      <td className="product-table-td">피보험자가 연금지급개시일에 살아 있을 때</td>
                      <td className="product-table-td">
                        연금지급개시시점의 연금계약 계약자적립액에 &quot;생활설계자금 선택비율&quot;을 곱한 금액을
                        기준으로 계산한 금액
                      </td>
                    </tr>
                    <tr>
                      <td className="product-table-td">종신연금형</td>
                      <td className="product-table-td">
                        피보험자가 매년 보험계약해당일에 살아 있을 때 (20년보증, 100세보증 또는
                        기대여명보증지급)
                      </td>
                      <td className="product-table-td">
                        연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을
                        기준으로 계산한 연금액 지급
                      </td>
                    </tr>
                    <tr>
                      <td className="product-table-td">확정연금형</td>
                      <td className="product-table-td">
                        「연금개시후 보험기간」 중 매년 보험계약 해당일
                      </td>
                      <td className="product-table-td">
                        연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을
                        기준으로 계산한 연금액을 확정 연금지급기간 (5년, 10년, 15년, 20년) 동안 지급
                      </td>
                    </tr>
                    <tr>
                      <td className="product-table-td">상속연금형</td>
                      <td className="product-table-td">
                        「연금개시후 보험기간」 중 피보험자가 매년 보험계약해당일에 살아있을 때
                      </td>
                      <td className="product-table-td">
                        연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을
                        기준으로 공시이율에 의하여 계산한 연금액을 지급 (다만, 피보험자 사망시에는
                        사망시점의 연금계약 계약자적립액을 연금수익자에게 지급)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 text-sm text-text-secondary">
                <p>
                  주1) &quot;생활설계자금 선택비율&quot; 이란 생활설계자금의 인출을 위해 계약자가 회사가 정하는 범위
                  이내에서 선택한 비율을 말합니다. 다만, &quot;생활설계자금 선택비율&quot; 을 별도로 지정하지 않은
                  경우에는 &quot;생활설계자금 선택비율&quot; 을 0%로 하며, 이 경우 생활설계자금을 인출할 수 없고,
                  연금지급개시시점의 연금계약 계약자적립액 전액을 기준으로 보험료 및 해약환급금
                  산출방법서에 따라 연금액이 산출됩니다. 다만, 기본보험료를 5년(60회)이상 납입하지 않고
                  연금지급형태를 종신연금형으로 할 경우 생활설계자금 선택비율은 0%로 합니다.
                </p>
                <p>
                  주2) 종신연금형의 경우 연금지급개시 후 보증지급기간 안에 피보험자가 사망하더라도
                  보증지급기간중의 미지급된 각 연금액을 연금지급일에 드립니다.
                </p>
                <p>
                  주3) 종신연금형(100세 보증)은 &quot;100세-연금개시나이&quot; 횟수만큼 연금연액이 보증지급됩니다.
                </p>
                <p>
                  주4) 확정연금형으로 변경한 경우 연금지급개시 후 해당 확정 연금지급기간(5년, 10년, 15년,
                  20년) 동안에 피보험자가 사망하더라도 각 확정 연금지급기간(5년, 10년, 15년, 20년)까지의
                  지급되지 않은 연금액을 각 연금지급일에 드립니다.
                </p>
                <p>
                  주5) 연금액은 「공시이율」을 적용하여 계산되므로 「공시이율」이 변경되면 매년 지급되는
                  연금액도 변경됩니다.
                </p>
                <p>
                  주6) 종신연금형의 경우 연금지급개시 후 보증지급횟수까지 지급되지 않은 각 연금액을,
                  확정연금형의 경우 연금지급개시 후 확정 연금지급기간(5년, 10년, 15년, 20년)까지 지급되지
                  않은 각 연금액을 보험료 및 해약환급금 산출방법서에 따라 공시이율로 할인하여 선지급할 수
                  있습니다.
                </p>
                <p>
                  주7) 연금액을 매월, 3개월, 6개월로 나누어 보험료 및 해약환급금 산출방법서에 따라
                  지급받을 수 있습니다.
                </p>
                <p>
                  주8) 2가지 이상의 연금지급 형태를 선택한 경우에는 연금지급형태의 구성비율에 따라 계산된
                  각 연금액의 합계액을 매년 지급하여 드립니다. 다만, 기본보험료를 5년(60회)이상 납입하지
                  않고 연금지급형태 중 종신연금형을 선택한 경우, 확정연금형 또는 상속연금형은 종신연금형과
                  동시에 선택할 수 없습니다.
                </p>
                <p>
                  주9) 종신연금형의 경우 연금지급 개시전 연금사망률의 개정 등에 따라 생존연금이 증가하게
                  되는 경우 연금개시 당시의 연금사망률 및 연금계약 계약자적립액을 기준으로 산출한
                  생존연금을 지급하여 드립니다.
                </p>
                <p>
                  주10) 상속연금형의 「계약자적립액」이란 연금개시시점의 연금계약 계약자적립액을
                  &quot;공시이율&quot;로 적립한 금액에서 상속연금형의 연금액 발생분(납입후 계약관리비용 포함)을 뺀
                  나머지 금액을 공시이율로 적립한 금액으로 &quot;보험료 및 해약환급금 산출방법서&quot;에서 정한 바에
                  따라 계산됩니다.
                </p>
                <p className="text-status-red">
                  * 추가납입 보험료는 트리플 레벨업 보증 기준금액에서 제외됩니다.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
