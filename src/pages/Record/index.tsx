import { useState } from "react";
import styled from "styled-components";
import Menubar from "@components/features/Menubar";

const FilteredRecommendations = () => {
  const [filter, setFilter] = useState<"workout" | "diet">("workout"); // Filter 상태 관리

  // Sample data
  const workouts = [
    {
      title: "요가 스트레칭",
      effect: "유연성을 향상시키고 스트레스를 줄입니다.",
    },
    { title: "30분 걷기", effect: "심혈관 건강과 칼로리 소모에 효과적입니다." },
    { title: "푸쉬업", effect: "상체 근력을 강화합니다." },
  ];

  const diets = [
    {
      title: "오트밀",
      effect: "포만감을 오래 유지하고 소화를 돕습니다.",
    },
    {
      title: "닭가슴살 샐러드",
      effect: "단백질 섭취에 좋고 칼로리가 낮습니다.",
    },
    {
      title: "미역국",
      effect:
        "당뇨, 고혈압, 고지혈증 같은 대사 질환을 관리할 수 있는 식단입니다",
    },
    {
      title: "연어구이",
      effect: "오메가-3가 풍부하여 심혈관 건강에 좋습니다.",
    },
  ];

  // 필터 클릭 핸들러
  const handleFilterChange = (newFilter: "workout" | "diet") => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Top>
        <div>기록</div>
        <FilterBox>
          <StyledButton
            onClick={() => handleFilterChange("workout")}
            isActive={filter === "workout"}
          >
            운동
          </StyledButton>
          <StyledButton
            onClick={() => handleFilterChange("diet")}
            isActive={filter === "diet"}
          >
            식단
          </StyledButton>
        </FilterBox>
      </Top>
      <Contents>
        {filter === "workout" && (
          <div>
            {workouts.map((workout) => (
              <ItemBox>
                <Title>{workout.title}</Title>
                <Effect>{workout.effect}</Effect>
              </ItemBox>
            ))}
          </div>
        )}

        {filter === "diet" && (
          <div>
            {diets.map((diet) => (
              <ItemBox>
                <Title>{diet.title}</Title>
                <Effect>{diet.effect}</Effect>
              </ItemBox>
            ))}
          </div>
        )}
      </Contents>
      <Menubar />
    </div>
  );
};

export default FilteredRecommendations;

const FilterBox = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #e87c6c;
`;

const Top = styled.div`
  width: 430px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  text-align: start;
  div {
    display: flex;
    align-items: center;
  }
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "#E87C6C" : "#fff")};
  color: #000;
  cursor: pointer;
  height: 25px;
  width: 50px;
  font-size: 12px;
  border-radius: 20px;
`;

const Contents = styled.div`
  margin: 10px 15px 0;
`;

const ItemBox = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.div`
  width: 20%;
  padding-right: 10px;
  font-size: 13px;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
`;

const Effect = styled.div`
  width: 80%;
  color: #e87c6c;
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
`;
