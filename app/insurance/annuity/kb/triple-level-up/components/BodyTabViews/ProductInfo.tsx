import React from 'react';
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6">
      {/* 가입안내 제목 */}
      <h2 className="product-page-title">가입안내</h2>

      {/* 상품 구성 */}
      <div className="space-y-4">
        <h3 className="product-section-title">상품 구성</h3>
        <div className="rounded-lg border border-border-default bg-page-bg p-6">
          <div className="space-y-4">
            <div className="flex flex-col border-b border-border-default pb-4 md:flex-row md:items-center">
              <div className="w-32 font-bold text-product-primary">주계약</div>
              <div className="flex-1 space-y-1">
                <div className="">KB 트리플 레벨업 연금보험 무배당(보증형)</div>
                <div className="">KB 트리플 레벨업 연금보험 무배당(미보증형)</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="w-32 font-bold text-product-primary">제도성특약</div>
              <div>지정대리 청구서비스특약</div>
            </div>
          </div>
        </div>
      </div>

      {/* 연금지급형태, 연금개시나이, 보험기간 및 납입주기 */}
      <div className="space-y-4">
        <h3 className="product-section-title">연금지급형태, 연금개시나이, 보험기간 및 납입주기</h3>
        <div className="rounded-lg border border-border-default bg-page-bg p-6">
          <div className="space-y-6">
            <div className="flex flex-col border-b border-border-default pb-4 md:flex-row">
              <div className="w-32 font-bold text-product-primary">연금지급형태</div>
              <div className="flex-1">
                종신연금형
                <br />- 20년보증, 100세보증 또는 기대여명보증
              </div>
            </div>
            <div className="flex flex-col border-b border-border-default pb-4 md:flex-row">
              <div className="w-32 font-bold text-product-primary">연금개시나이</div>
              <div>45세 ~ 85세</div>
            </div>
            <div className="flex flex-col border-b border-border-default pb-4 md:flex-row">
              <div className="w-32 font-bold text-product-primary">보험기간</div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="font-bold">연금개시전 보험기간</div>
                  <div>보장개시일부터 연금지급개시 계약해당일 전일까지</div>
                </div>
                <div>
                  <div className="font-bold">연금개시후 보험기간</div>
                  <div>
                    연금지급개시 계약해당일부터 종신까지 (확정연금형의 경우 최종연금지급일까지)
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-32 font-bold text-product-primary">보험료납입주기</div>
              <div>월납</div>
            </div>
          </div>
        </div>
        <div className="product-info-box">
          <p>
            주1) 보험가입시점의 연금지급형태는 종신연금형으로 정해지며, 계약자는 연금지급개시전까지
            약관에 따라 연금지급형태를 변경할 수 있습니다.
          </p>
          <p>
            주2) '기대여명’은 통계법 제18조(통계작성의 승인)에 의해 통계청장이 승인하여 고시하는
            가입시점 통계표에 따른 피보험자의 성별ㆍ연령별 기대여명연수(소수점 이하는 버림)를
            말하며, 피보험자의 연금개시나이를 기준으로 산출합니다. 다만, 기대여명이 5년 미만일 경우
            기대여명은 5년으로 하며, 이 경우에는 관련 세제혜택이 제한될 수 있습니다.
          </p>
        </div>
      </div>

      {/* 보험료 납입기간, 최소거치기간 및 가입나이 */}
      <div className="space-y-4">
        <h3 className="product-section-title">보험료 납입기간, 최소거치기간 및 가입나이</h3>
        <div className="overflow-x-auto">
          <table className="product-table text-xs md:text-sm">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th">보험료납입기간</th>
                <th className="product-table-th">최소거치기간</th>
                <th className="product-table-th">가입나이</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr className="">
                <td className="product-table-td-center">5년납</td>
                <td className="product-table-td-center">10년</td>
                <td className="product-table-td-center" rowSpan={3}>
                  0세 ~ MIN [연금개시나이- 15, 70] 세
                </td>
              </tr>
              <tr className="">
                <td className="product-table-td-center">7년납</td>
                <td className="product-table-td-center">8년</td>
              </tr>
              <tr className="">
                <td className="product-table-td-center">10년납</td>
                <td className="product-table-td-center">5년</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="product-caption">
          ※ 최소거치기간 : 보험료 납입완료후 연금지급개시시점까지의 최소기간
        </p>
      </div>

      {/* 보험료에 관한 사항 */}
      <div className="space-y-6">
        <h3 className="product-section-title">보험료에 관한 사항</h3>
        {/* 기본보험료 */}
        <div className="space-y-4">
          <h4 className="product-sub-title border-b border-product-primary pb-2 text-product-primary">
            기본보험료
          </h4>
          <table className="product-table text-xs md:text-sm">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th">보험료납입기간</th>
                <th className="product-table-th">가입나이</th>
                <th className="product-table-th">최소보험료(1구좌당)</th>
                <th className="product-table-th">최대보험료(1구좌당)</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr className="">
                <td className="product-table-td-center">5년납</td>
                <td className="product-table-td-center">0세 ~ 70세</td>
                <td className="product-table-td-center">30만원</td>
                <td className="product-table-td-center" rowSpan={3}>
                  100만원
                </td>
              </tr>
              <tr className="">
                <td className="product-table-td-center">7년납</td>
                <td className="product-table-td-center">0세 ~ 70세</td>
                <td className="product-table-td-center">20만원</td>
              </tr>
              <tr className="">
                <td className="product-table-td-center">10년납</td>
                <td className="product-table-td-center">0세 ~ 70세</td>
                <td className="product-table-td-center">10만원</td>
              </tr>
            </tbody>
          </table>
          <p className="product-caption">
            ※ 구좌란 보험금과 보장내용 등을 관리하기 위한 계약의 단위를 의미하며, 구좌당 최소ㆍ최대
            보험료 등은 보험 상품마다 차이가 있으므로 자세한 내용은 약관을 참고해 주시길 바랍니다.
          </p>
        </div>

        {/* 추가납입보험료 */}
        <div className="space-y-4">
          <h4 className="product-sub-title border-b border-product-primary pb-2 text-product-primary">
            추가납입보험료
          </h4>
          <div className="product-info-box space-y-4">
            <p>
              (1) 추가납입보험료는 해당월까지 납입 가능한 기본보험료 납입총액(선납 포함)의 200%를
              한도로 납입할 수 있으며, 중도인출에 관한 사항에 의한 인출금액이 있을 경우에는 그
              금액만큼 추가로 납입가능합니다.
            </p>
            <p>
              (2) 추가납입보험료는 해당월까지 기본보험료가 납입된 경우에 한하여 납입할 수 있으며,
              기본보험료와 같이 자동이체 서비스를 이용하여 추가납입을 하는 경우에는 기본보험료의
              200%를 한도로 납입해야 합니다.
            </p>
            <p>
              (3) 중도인출에 관한 사항에 의한 인출금액이 있을 경우, 그 금액만큼 재납입하는 경우에도
              추가납입보험료로 합니다.
            </p>
          </div>

          <div className="space-y-3 rounded-lg bg-bg-blue p-6">
            <div className="text-status-red">[보험료 추가납입제도 안내]</div>
            <div className="space-y-2 text-status-red">
              <p>
                - 이 보험계약은 기본보험료 이외에 보험기간중에 추가로 납입할 수 있는 추가적립보험료
                납입제도를 운영하고 있으며, 이미 보유하고 있는 저축성보험에 추가납입 하실 경우
                사업비 절감효과로 새로운 저축성보험에 추가가입하는 것 보다 해약환급률 및
                만기환급률을 높일 수 있습니다.
              </p>
              <p>
                - 다만, 추가납입한도 및 횟수, 납입가능 기간 등은 해당상품에 따라 제한될 수 있습니다.
              </p>
              <p>- 자세한 사항은 약관내용을 참조하시기 바랍니다.</p>
            </div>
          </div>
        </div>

        {/* 중도인출에 관한 사항 */}
        <div className="space-y-4">
          <h4 className="product-sub-title border-b border-product-primary pb-2 text-product-primary">
            중도인출에 관한 사항
          </h4>
          <div className="product-info-box space-y-4">
            <p>
              (1) 연금개시전 보험기간 중 보험년도 기준 년12회(일 또는 월 횟수 제한 없음)에 한하여
              1회당 인출신청시점 해약환급금(보험계약대출원금과 이자를 차감한 금액)의 80%범위
              이내에서 연금계약 계약자적립액의 일부를 인출할 수 있습니다. 단, 인출금액은 10만원 이상
              만원 단위로 인출할 수 있습니다.
            </p>
            <p>
              (2) 연금계약 계약자적립액의 일부를 인출하기 위해서는 인출후 연금계약
              계약자적립액(보험계약대출원금과 이자를 차감한 금액)이 1구좌당 300만원 이상이어야
              합니다.
            </p>
            <p>
              (3) 계약일로부터 10년 이내에 연금계약 계약자적립액의 일부를 인출하는 경우 각
              인출시점까지의 인출금액 총합계는 이미 납입한 보험료를 초과할 수 없습니다.
            </p>
            <p>
              (4) 중도인출은 추가납입보험료 계약자적립액에서 우선적으로 가능하며, 추가납입보험료
              계약자적립액이 부족한 경우에 한하여 기본보험료 계약자적립액에서 인출할 수 있습니다.
            </p>
            <p>
              (5) 연금계약 계약자적립액의 일부를 인출하는 경우 수수료는 없으며, 인출된 금액은
              연금계약의 계약자적립액에서 차감합니다.
            </p>
            <p className="text-status-red">
              (6) 연금계약 계약자적립액 인출 시 인출금액 및 인출금액에 적립되는 이자만큼 연금계약
              계약자적립액에서 차감하여 지급하므로 연금액 및 해약환급금이 감소할 수 있습니다.
            </p>
            <p>
              (7) 계약자적립액을 인출한 경우 '이미 납입한 보험료'와 '기준 기본보험료'가
              재계산되므로,{' '}
              <span className="text-status-red">
                인출금액보다 트리플 레벨업 보증이 현저하게 감소할 수 있습니다.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 최저사망적립액에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="product-section-title">최저사망적립액에 관한 사항</h3>
        <div className="rounded-lg border border-border-default bg-page-bg p-6">
          <p>
            최저사망적립액이라 함은 「연금개시전 보험기간」 동안 피보험자 사망시 공시이율로 부리한
            계약자적립액과 관계없이 보장하는 최저한도의 계약자적립액으로서 사망시점의 이미 납입한
            보험료를 말합니다.
          </p>
        </div>
      </div>

      {/* 트리플 레벨업 보증에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="product-section-title">트리플 레벨업 보증에 관한 사항(보증형에 한함)</h3>
        <div className="rounded-lg border border-border-default bg-page-bg p-3 sm:p-6">
          <p className="mb-4 text-sm leading-tight sm:mb-6 sm:text-base sm:leading-relaxed">
            트리플 레벨업 보증이라 함은 공시이율로 부리한 계약자적립액과 관계없이 트리플 레벨업
            보증시점에 보장하는 최저한도의 기본보험료 계약자적립액 보증으로서, 이 보험의 「보험료 및
            해약환급금 산출방법서」에서 정한 방법에 따라 계산한 금액으로 합니다.
          </p>

          <div className="rounded-lg bg-bg-blue p-3 sm:p-6">
            <div className="mb-3 text-center text-sm font-bold leading-tight text-product-primary sm:mb-4 sm:text-base sm:leading-normal">
              트리플 레벨업 보증금액 = 트리플 레벨업 보증 기준금액 X 트리플 레벨업 보증비율
            </div>
            <table className="product-table text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="product-table-header">
                  <th className="product-table-th w-[22%] leading-tight sm:w-[20%]">
                    트리플 레벨업
                    <br />
                    보증시점
                  </th>
                  <th className="product-table-th w-[23%] leading-tight sm:w-[25%]">
                    트리플 레벨업
                    <br />
                    보증 기준금액
                  </th>
                  <th className="product-table-th" colSpan={3}>
                    트리플 레벨업 보증비율
                  </th>
                </tr>
                <tr className="product-table-header">
                  <th className="product-table-th" colSpan={2}></th>
                  <th className="product-table-th w-[18%] sm:w-[18%]">5년납</th>
                  <th className="product-table-th w-[18%] sm:w-[18%]">7년납</th>
                  <th className="product-table-th w-[19%] sm:w-[19%]">10년납</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-table-td leading-tight">
                    계약일부터 7년
                    <br />
                    경과시점의 연계약해당일
                  </td>
                  <td className="product-table-td-center leading-tight" rowSpan={2}>
                    보증시점 전일까지의
                    <br />
                    "기준 기본보험료"
                  </td>
                  <td className="product-table-td-center font-bold">100%</td>
                  <td className="product-table-td-center font-bold">100%</td>
                  <td className="product-table-td-center font-bold">100%</td>
                </tr>
                <tr>
                  <td className="product-table-td leading-tight">
                    계약일부터 10년
                    <br />
                    경과시점의 연계약해당일
                  </td>
                  <td className="product-table-td-center font-bold text-status-red">130%</td>
                  <td className="product-table-td-center font-bold text-status-red">125%</td>
                  <td className="product-table-td-center font-bold text-status-red">120%</td>
                </tr>
                <tr>
                  <td className="product-table-td">연금개시시점</td>
                  <td className="product-table-td-center leading-tight" colSpan={4}>
                    계약일부터 10년 경과시점의 트리플 레벨업 보증비율
                    <br />+ ("연금개시전 보험기간" - 10(년)) × 2%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 space-y-1.5 text-xs sm:mt-4 sm:space-y-2 sm:text-sm">
            <p>
              단, “트리플 레벨업 보증시점” 마다 각 시점까지 납입하기로 약정한 기본보험료 납입이
              완료되지 않은 경우, “트리플 레벨업 보증시점”은 해당 기본보험료의 납입이 완료된 날로
              하며, “트리플 레벨업 보증 기준금액”은 해당 기본보험료의 납입이 완료된 날까지의 “기준
              기본보험료”를 말합니다.
            </p>
            <p className="text-status-red">
              ※ 트리플 레벨업 보증 기준금액은 감액 또는 중도인출이 발생한 경우 기본보험료
              계약자적립액에 비례하여 감소하며, 중도인출금액을 재납입하더라도 원복되지 않습니다.
            </p>
            <p className="text-status-red">
              ※ 연금개시시점의 트리플 레벨업 보증은 연금을 개시할 경우에만 적용되며, 연금을 개시하지
              않을 경우 보증되지 않습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 연금지급개시시점의 연금계약 계약자적립액에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="product-section-title">
          연금지급개시시점의 연금계약 계약자적립액에 관한 사항
        </h3>
        <div className="space-y-3 rounded-lg border border-border-default bg-page-bg p-3 sm:space-y-4 sm:p-6">
          <p className="text-sm leading-tight sm:text-base sm:leading-relaxed">
            (1) 보증형 : 연금지급개시시점의 기본보험료 계약자적립액이 트리플 레벨업 보증에 관한
            사항(보증형에 한함)에 의한 연금개시시점 트리플 레벨업 보증금액 이하일 경우 연금개시시점
            트리플 레벨업 보증금액을 기본보험료 계약자적립액으로 합니다.
          </p>
          <p className="text-sm leading-tight sm:text-base sm:leading-relaxed">
            (2) 미보증형 : 연금지급개시시점의 연금계약 계약자적립액이 「이미 납입한 보험료(연금계약
            계약자적립액의 인출이 있었을 때에는 이를 차감한 금액) + 1,000원」이하일 경우 「이미
            납입한 보험료(연금계약 계약자적립액의 인출이 있었을 때에는 이를 차감한 금액) +
            1,000원」으로 합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
