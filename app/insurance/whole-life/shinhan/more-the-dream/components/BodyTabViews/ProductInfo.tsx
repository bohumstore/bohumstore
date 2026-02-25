import React from 'react';
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6">
      <h2 className="product-page-title">가입안내</h2>

      <div className="space-y-4">
        <h3 className="product-section-title">보험종류</h3>
        <div className="product-info-box">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="product-table">
                <thead>
                  <tr className="product-table-header">
                    <th className="product-table-th">구분</th>
                    <th className="product-table-th">명칭</th>
                    <th className="product-table-th">보험종목</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr>
                    <td className="product-table-td-center">주계약</td>
                    <td className="product-table-td-center">
                      신한(간편가입)모아더드림Plus종신보험
                      <br />
                      (무배당, 해약환급금 일부지급형) / <br />
                      신한(간편가입)모아더드림Plus종신보험(무배당)
                    </td>
                    <td className="product-table-td-center">
                      해약환급금 일부지급형/일반형
                      <br />
                      일반심사형/간편심사형
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>
                주1) 다만, &quot;일반형&quot;의 경우 &quot;해약환급금 일부지급형&quot;과 동일한 보장내용으로 해지율을
                적용하지 않은 상품이며, 당사에서 판매하지 않고 &quot;해약환급금 일부지급형&quot;과 비교·안내를
                위한 종목으로 운영합니다.
              </p>
              <p>주2) &quot;간편심사형&quot;의 경우 상품명 신한 다음에 &quot;(간편가입)&quot;을 부가합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">보험기간, 납입기간 및 피보험자 가입나이</h3>
        <div className="product-info-box">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="product-table">
                <thead>
                  <tr className="product-table-header">
                    <th className="product-table-th">구분</th>
                    <th className="product-table-th">내용</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr>
                    <td className="product-table-td-center font-semibold">보험기간</td>
                    <td className="product-table-td-center">종신</td>
                  </tr>
                  <tr>
                    <td className="product-table-td-center font-semibold">납입기간</td>
                    <td className="product-table-td-center">
                      5년, 10년, 15년, 20년, 25년, 30년, 전기납(종신납)
                    </td>
                  </tr>
                  <tr>
                    <td className="product-table-td-center font-semibold">피보험자 가입나이</td>
                    <td className="product-table-td-center">
                      만 20세 ~ 만 75세
                      <br />
                      (간편심사형: 만 40세 ~ 만 75세)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">보험료 납입주기</h3>
        <div className="product-info-box">
          <div className="overflow-x-auto">
            <table className="product-table">
              <tbody className="text-text-primary">
                <tr>
                  <td className="product-table-td w-24 font-bold md:w-40">납입주기</td>
                  <td className="product-table-td-center">월납</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">가입한도</h3>
        <div className="product-info-box">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="product-table">
                <thead>
                  <tr className="product-table-header">
                    <th className="product-table-th">구분</th>
                    <th className="product-table-th">가입한도</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr>
                    <td className="product-table-td-center">일반심사형</td>
                    <td className="product-table-td-center">1,000만원 ~ 30억원</td>
                  </tr>
                  <tr>
                    <td className="product-table-td-center">간편심사형</td>
                    <td className="product-table-td-center">1,000만원 ~ 20억원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-sm text-status-red">
              * 다만, 주계약 가입한도는 회사가 별도로 정한 기준에 따라 적용하며, 기존에 가입한 보험
              가입내용 및 가입경로 등에 따라 주계약 가입한도는 조정될 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">건강진단 여부</h3>
        <div className="product-info-box">
          <p className="text-base leading-relaxed">
            <span className="text-product-primary">
              신한(간편가입)모아더드림종신보험(무배당, 해약환급금 일부지급형)
            </span>
            의 경우 기존 다른 보험 상품의가입유무, 나이, 청약서의 계약 전 알릴 의무 사항에 따라
            건강진단을 시행할 수 있으며, 그 결과에따라 보험가입 가능여부를 판정할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
