import "../../index.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "@routes/path";
import { useState } from "react";
import Menubar from "@components/features/Menubar";

const Shopping = () => {
  // 제품 리스트 정의
  const products = [
    {
      name: "오메가3 플러스",
      details: "EPA/DHA 고함량\n혈행 개선, 중성지방 감소",
      price: "49,900원",
      image: "/images/상품1.png",
      link: "https://brand.naver.com/koreaeundanhc/products/9669821031?n_media=27758&n_query=%ED%93%A8%EC%96%B4%EC%95%8C%ED%8B%B0%EC%A7%80%EC%98%A4%EB%A9%94%EA%B0%803&n_rank=1&n_ad_group=grp-a001-01-000000045791465&n_ad=nad-a001-01-000000327538429&n_keyword_id=nkw-a001-01-000006613183912&n_keyword=%ED%93%A8%EC%96%B4%EC%95%8C%ED%8B%B0%EC%A7%80%EC%98%A4%EB%A9%94%EA%B0%803&n_campaign_type=1&n_ad_group_type=1&n_match=1&NaPm=ct%3Dm46um6m8%7Cci%3D0yS0002uuyPBocuEouY%5F%7Ctr%3Dsa%7Chk%3D4519bc8dc3af417af26786f3a3f6a3f42d098e27%7Cnacn%3DLuRqBMgb8lkA",
    },
    {
      name: "코엔자임 Q10",
      details: "일본산 고순도\n심장 에너지 생성 지원",
      price: "116,000원",
      image: "/images/상품2.png",
      link: " https://brand.naver.com/nutricore/products/9953772226?n_media=27758&n_query=%EC%BD%94%EC%97%94%EC%9E%90%EC%9E%84Q10&n_rank=2&n_ad_group=grp-a001-02-000000038880056&n_ad=nad-a001-02-000000294752058&n_campaign_type=2&n_mall_id=nutricore&n_mall_pid=9953772226&n_ad_group_type=2&n_match=3&NaPm=ct%3Dm46uphg0%7Cci%3D0AK0000UuOPBJUmNh0Yi%7Ctr%3Dpla%7Chk%3D6c34eeb8eb400df3068a607b33221db515eb8120%7Cnacn%3DLuRqBMgb8lkA",
    },
    {
      name: "혈압 측정기",
      details: "블루투스 연동\n앱 연동 자동 기록",
      price: "49,800원",
      image: "/images/상품3.png",
      link: "https://smartstore.naver.com/buymedi/products/10739831374?NaPm=ct%3Dm46uquts%7Cci%3D0zi0001UuOPByd8k2vlJ%7Ctr%3Dpla%7Chk%3D481a4183bd79913d934781106ce87b09b8ccdd9a%7Cnacn%3DLuRqBMgb8lkA",
    },
    {
      name: "칼슘 마그네슘",
      details: "하루 1정\n혈압 관리 영양소",
      price: "29,000원",
      image: "/images/상품4.png",
      link: "https://brand.naver.com/apharmhealth/products/5747756364?n_media=27758&n_query=%EC%81%98%EB%9D%A0%EC%95%A4%EA%B5%AD%EB%AF%BC%EC%B9%BC%EB%A7%88%EB%94%94&n_rank=2&n_ad_group=grp-a001-02-000000028286230&n_ad=nad-a001-02-000000192939608&n_campaign_type=2&n_mall_id=apharmhealth&n_mall_pid=5747756364&n_ad_group_type=2&n_match=3&NaPm=ct%3Dm46usqq8%7Cci%3D0yq0003guOPBzlJgD1kN%7Ctr%3Dpla%7Chk%3D7991d065344d0f41c8a4c59557b6b02792d91e41%7Cnacn%3DLuRqBMgb8lkA",
    },
  ];

  return (
    <Container>
      <Header>제품 구매 전 담당 의료진과 상담하시는 것을 권장합니다.</Header>
      <ShoppingListContainer>
        <Title>심장 건강 추천 제품</Title>
        <ProductList>
          {/* 제품 리스트 순회 */}
          {products.map((product, index) => (
            <Product key={index}>
              <ProductContainer>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <Price>{product.price}</Price>
                  {/* 버튼에 링크를 추가 */}
                  <BuyButton
                    as="a"
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    구매하기
                  </BuyButton>
                </ProductInfo>
              </ProductContainer>
              <ProductCenter>
                <ProductName>{product.name}</ProductName>
                <ProductDetails>{product.details}</ProductDetails>
              </ProductCenter>
            </Product>
          ))}
        </ProductList>
      </ShoppingListContainer>

      <Footer>
        제품 구매 전 읽어보세요
        <ul>
          <li>
            모든 제품은 전문가 검증을 거쳤습니다. 앱 사용자 대상 특별 할인이
            적용됩니다. 구매하신 제품은 앱과 연동하여 관리하실 수 있습니다.
          </li>
        </ul>
      </Footer>

      <Menubar />
    </Container>
  );
};

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  min-height: 100vh; /* 화면 전체 높이를 차지 */
  padding: 20px;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }
`;

const ShoppingListContainer = styled.div`
  width: 100%;
  max-width: 768px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  width: 100%;
  max-width: 768px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 12px;
  color: #666;
  background-color: #fffcfc;
  border-radius: 8px;
  padding: 10px;
`;

const Title = styled.h2`
  width: 100%;
  max-width: 768px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const ProductList = styled.div`
  width: 100%;
  max-width: 768px;
`;

// 개별 제품을 감싸는 컨테이너
const Product = styled.div`
  display: flex;
  flex-direction: column; /* 제품 정보를 세로로 배치 */
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #ebbfb7;
  margin-bottom: 10px;
`;

// 이미지와 가격, 버튼을 가로로 배치하는 컨테이너
const ProductContainer = styled.div`
  display: flex;
  align-items: center; /* 이미지와 가격/버튼을 수직으로 가운데 정렬 */
  margin-bottom: 10px;
`;

// 가격과 버튼을 세로로 배치하는 컨테이너
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column; /* 가격과 버튼을 세로로 배치 */
  margin-left: 38px; /* 이미지와 정보 사이에 간격 추가 */
`;

const ProductCenter = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ProductDetails = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
`;

const Price = styled.div`
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

// 구매 버튼을 스타일링
const BuyButton = styled.button`
  width: 100px;
  height: 40px;
  padding: 8px 16px;
  background-color: #e87c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ffce81; /* 호버 시 배경색 변경 */
  }
`;

const Footer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 20px 0 40px;
  font-size: 10px;
  color: #666;
  text-align: right;
`;

export default Shopping;
