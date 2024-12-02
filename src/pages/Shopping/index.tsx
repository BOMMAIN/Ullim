import '../../index.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@routes/path';
import { useState } from 'react';

const Shopping = () => {
  // 제품 리스트 정의
  const products = [
    {
      name: '오메가3 플러스',
      details: 'EPA/DHA 고함량\n혈행 개선, 중성지방 감소',
      price: '45,000원',
      image: '/images/상품1.png',
      link: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=+%EC%B9%BC%EC%8A%98+%EB%A7%88%EA%B7%B8%EB%84%A8&oquery=%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4+%ED%98%88%EC%95%95+%EC%B8%A1%EC%A0%95%EA%B8%B0&tqi=i0rX6lqVOsCss5z1I30ssssssz0-198827'
    },
    {
      name: '코엔자임 Q10',
      details: '일본산 고순도\n심장 에너지 생성 지원',
      price: '38,000원',
      image: '/images/상품2.png',
      link: 'https://smartstore.naver.com/buymedi/products/10739831374?NaPm=ct%3Dm441yaqo%7Cci%3D0A80000GVyDB7yB8JvoS%7Ctr%3Dpla%7Chk%3Db7c11969075e236f006bd91e233ea50589d662b6%7Cnacn%3DLuRqBMgb8lkA'
    },
    {
      name: '혈압 측정기',
      details: '블루투스 연동\n앱 연동 자동 기록',
      price: '128,000원',
      image: '/images/상품3.png',
      link: 'https://kingchobocoding.tistory.com/57'
    },
    {
      name: '칼슘 마그네슘',
      details: '하루 1정\n혈압 관리 영양소',
      price: '32,000원',
      image: '/images/상품4.png',
      link: 'https://wrtn.ai/coding-task'
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
                  <BuyButton as="a" href={product.link} target="_blank" rel="noopener noreferrer">
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
            모든 제품은 전문가 검증을 거쳤습니다. 앱 사용자 대상 특별 할인이 적용됩니다.
            구매하신 제품은 앱과 연동하여 관리하실 수 있습니다.
          </li>
        </ul>
      </Footer>
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
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
	  display:none /* Chrome , Safari , Opera */
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
  background-color: #FFFCFC;
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
  border-bottom: 1px solid #EBBFB7;
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
  background-color: #E87C6C;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #FFCE81; /* 호버 시 배경색 변경 */
  }
`;

const Footer = styled.div`
  width: 100%;
  max-width: 768px;
  margin-top: 20px;
  font-size: 10px;
  color: #666;
  text-align: right;
`;

export default Shopping;
