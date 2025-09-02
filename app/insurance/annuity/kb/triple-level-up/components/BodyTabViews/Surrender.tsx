import React from 'react'

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <div className="mb-2">
        <div className="text-[#1e3a8a] text-2xl md:text-3xl font-extrabold mb-1">■ 해약환급금 예시표</div>
        <div className="w-full h-1 bg-[#1e3a8a] mb-3" />
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-[#1e3a8a] text-lg md:text-xl font-bold leading-tight">연금개시전 보험기간</span>
          <span className="text-[#ff8c1a] text-lg md:text-xl font-bold leading-tight">보증형</span>
        </div>
        <div className="text-xs text-gray-600 text-right ml-2 pb-0.5 mt-2">
          기준 : 주계약, 남자 40세, 보증형, 5년납, 60세 연금개시, 월보험료 50만원, 단위 : 만원
        </div>
      </div>
      {/* 표 */}
      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs md:text-sm table-fixed">
          <colgroup>
            <col className="w-[10%]" />
            <col className="w-[8%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[9%]" />
            <col className="w-[15%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[10%]" />
          </colgroup>
          <thead>
            <tr className="bg-[#1e3a8a] text-white align-middle">
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>경과기간</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>나이</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>납입보험료<br/>누계 (A)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>최저보증이율</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>평균공시이율<br/>(2.75%)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>공시이율<br/>(2.47%)</th>
            </tr>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급금(B)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br/>(B/A)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급금(C)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br/>(C/A)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급금(D)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br/>(D/A)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3개월</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">150</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.0%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6개월</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">300</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">52</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17.4%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">52</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17.6%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">52</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17.6%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9개월</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">450</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">120</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26.8%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">122</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">27.1%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">122</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">27.1%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">41</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">600</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">188</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">31.5%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">191</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">31.9%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">191</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">31.9%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,200</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">461</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">38.5%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">470</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">39.2%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">470</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">39.2%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">43</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,800</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">733</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40.7%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">751</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">41.8%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">751</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">41.8%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,400</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,003</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">41.8%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,035</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">43.1%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,035</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">43.1%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">45</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,272</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42.4%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,322</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.1%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,322</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.1%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">46</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,259</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,331</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.4%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,331</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.4%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.0%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">48</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,974</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">99.2%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,025</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.8%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,025</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.8%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,949</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">98.3%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,051</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">101.7%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,051</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">101.7%</td></tr>
            <tr className="bg-red-50">
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">10년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">50</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">3,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">3,900</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">130.0%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">3,900</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">130.0%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">3,900</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm bg-red-50">130.0%</td>
            </tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">11년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">51</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,858</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">128.6%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,934</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">131.1%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,934</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">131.1%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">52</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,817</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">127.2%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,968</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">132.3%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,968</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">132.3%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">13년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,776</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">125.9%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,003</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">133.4%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,003</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">133.4%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">54</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,736</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">124.5%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,038</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">134.6%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,038</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">134.6%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">55</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,696</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">123.2%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,073</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">135.8%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,073</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">135.8%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">56</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,656</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">121.9%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,109</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">137.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,109</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">137.0%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">57</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,617</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">120.6%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,145</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">138.2%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,145</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">138.2%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">18년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">58</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,578</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">119.3%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,181</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">139.4%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,181</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">139.4%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">59</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,539</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">118.0%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,218</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">140.6%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,218</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">140.6%</td></tr>
            <tr><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">60</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,000</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,501</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">116.7%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,255</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">141.9%</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,255</td><td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">141.9%</td></tr>
          </tbody>
        </table>
      </div>
      {/* 주석 */}
      <ol className="text-xs md:text-sm text-gray-800 space-y-1 pl-4 list-decimal">
        <li>계약일부터 경과기간이 지난 말 시점의 예시이며 나이는 경과기간에 따른 주계약 피보험자의 나이로 보험나이와 차이가 있습니다.</li>
        <li>상기 예시금액은 감독규정 제 1-2조 제13호에 따른 현재 평균공시이율 2.75%, 현재 (2025년09월)의 공시이율 2.47%을 기준으로 계산한 금액입니다.</li>
        <li>실제 해약환급금은 공시이율을 적용하여 계산되며, 공시이율 변동시 해약환급금도 변동됩니다.</li>
        <li>이 보험계약을 중도해지할 경우 해약환급금은 납입한 보험료에서 경과된 기간의 위험보험료, 사업비(해약공제금액 포함), 최저사망적립액 보증비용, 트리플 레벨업 보증비용 등이 차감되므로 납입한 보험료보다 적거나 없을 수도 있습니다.</li>
        <li>공시이율은 매1개월마다 변동될 수 있으며 최저보증이율은 계약 후 경과기간 5년 미만은 연복리 1.0%, 5년 이상 10년 미만은 연복리 0.75%, 10년 이상은 연복리 0.5% 입니다.</li>
        <li>상기 환급률은 최저보증이율 및 현재 적용이율이 경과기간동안 유지된다고 가정하였을 때 계약자가 납입한 보험료 대비 해약환급금의 비율입니다.</li>
        <li>상기 예시된 금액 및 환급률은 세금을 공제하지 않은 금액입니다.</li>
        <li>상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</li>
        <li>평균공시이율(감독규정 제1-2조 제13호)은 감독원장이 정하는 바에 따라 산정한 전체 보험회사 공시이율의 평균으로, 2025년09월 현재 2.75%입니다.</li>
        <li>상기 예시된 금액 및 환급률은 <span className='text-[#e11d48]'>7년 및 10년 경과 시점의 트리플 레벨업 보증을 반영한 금액</span>이며, <span className='text-[#e11d48]'>계약해당일이 도래하기 이전에 해지 시 예시된 금액과 다를 수 있습니다.</span><br/>다만, 연금개시시점 트리플 레벨업 보증은 연금을 개시하는 경우에 한하여 보증해드리므로, <span className='text-[#e11d48]'>연금개시시점 트리플 레벨업 보증은 반영하기 전 금액</span>입니다.</li>
        <li>트리플 레벨업 보증은 감액 또는 중도인출이 발생한 경우 <span className='text-[#e11d48]'>기본보험료 계약자적립액에 비례하여 감소</span>하며, <span className='text-[#e11d48]'>중도인출금액을 재납입하더라도 원복되지 않습니다.</span></li>
      </ol>
      {/* 두 번째 해약환급금 예시표 헤더 */}
      <div className="mt-16 mb-2">
        <div className="text-[#1e3a8a] text-2xl md:text-3xl font-extrabold mb-1">■ 연금지급액 예시표</div>
        <div className="w-full h-1 bg-[#1e3a8a] mb-3" />
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-[#222] text-lg md:text-xl font-bold leading-tight">연금개시후 보험기간</span>
          <span className="text-[#ff8c1a] text-lg md:text-xl font-bold leading-tight">보증형</span>
        </div>
        <div className="text-xs text-gray-600 text-right ml-2 pb-0.5 mt-2">
          기준 : 주계약, 남자 40세, 보증형, 5년납, 60세 연금개시, 월보험료 50만원, 단위 : 원
        </div>
      </div>
      {/* 연금지급액 예시표 표 */}
      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>구분</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">최저보증이율</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2025년09월<br/>평균공시이율2.75%가정<br/>[공시이율(2.47%)을 상한으로 함]</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2025년09월<br/>현재공시이율(2.47%)</th>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>연금개시시점 계약자적립액</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">45,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">45,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">45,000,000</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm font-bold" rowSpan={3}>종신연금형</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년 보증</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,350,092</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,861,273</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,861,273</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100세 보증</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,181,618</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,684,947</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,684,947</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">기대여명보증</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,340,697</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,849,406</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,849,406</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm font-bold" rowSpan={4}>확정연금형</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5년 확정</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8,999,999</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,350,957</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,350,957</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10년 확정</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,556,106</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,960,328</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,960,328</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15년 확정</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,075,116</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,504,020</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,504,020</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년 확정</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,334,851</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,781,251</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,781,251</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm font-bold" colSpan={2}>상속연금형</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">221,664</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,073,968</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,073,968</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 연금지급액 예시표 주석 */}
      <ol className="text-xs md:text-sm text-gray-800 space-y-1 pl-4 list-decimal mt-2">
        <li>상기 예시금액은 최저보증이율, 평균공시이율 2.75%(현재공시이율 상한) 및 현재 <span className='text-[#e11d48]'>2025년09월</span>의 공시이율 <span className='text-[#e11d48]'>2.47</span>%을 기준으로 계산한 금액입니다.</li>
        <li>실제 연금액은 공시이율을 적용하여 계산되며, 공시이율 변동시 연금액도 변경됩니다.</li>
        <li>연금을 매월, 3개월, 6개월로 분할하여 지급할 경우 생존연금은「공시이율」로 부리한 금액을 더하여 드립니다.</li>
        <li>공시이율은 매1개월마다 변동될 수 있으며, 최저보증이율은 경과기간 5년 미만은 연복리 1.0%, 경과기간 5년 이상 10년미만은 연복리 0.75%, 경과기간 10년이상은 연복리 0.5% 입니다.</li>
        <li>계약체결시 연금지급형태는 '종신연금형'으로 정해지고, 계약자는 연금개시전에 연금지급방법 및 연금개시 시기를 변경할 수 있습니다.</li>
        <li>상기 연금개시시점 계약자적립액은 <span className='text-[#e11d48]'>연금개시시점 트리플 레벨업 보증을 반영하여 예시한 금액</span>입니다.</li>
        <li>연금개시시점의 트리플 레벨업 보증은 연금을 개시할 경우에만 적용되며, <span className='text-[#e11d48]'>연금을 개시하지 않을 경우 보증되지 않습니다.</span></li>
        <li>상기 연금연액이 미래의 수익을 보장하는 것은 아니며, 향후 공시이율의 변경, 연급지급 개시 당시 연금사망률 적용 등에 따라 변동될 수 있습니다.</li>
      </ol>
    </div>
  )
}
