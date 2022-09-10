import React, { useState } from "react";
import styled from "styled-components";

// Import komponentów
import CurrencyBox from "../components/CurrencyBox";
import RenderTitle from "../components/RenderTitle";

const MainContainer = styled.div`
  margin-top: 2rem;

  .line-searching {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;

    .line-box {
      width: 15rem;
      margin-right: 10rem;
    }

    p {
      color: #4e5255;
    }

    span {
      color: #29b35e;
    }
  }

  @media (max-width: 767px) {
    .line-searching {
      justify-content: center;
      width: 50%;
      margin: 2rem auto;

      .line-box {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;

const SearchBox = styled.div<Props>`
  background-color: ${(props) =>
    props.warning === "warningYes"
      ? "#F9C9C9"
      : props.warning === "isOkSearching"
      ? "#C9F9DC"
      : "#F4F2EE"};
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
  margin-top: 0.5rem;

  input {
    font-size: 1.15rem;
    color: #4e5255;
    width: 80%;
    padding: 0.25rem 1rem;
    border: none;
    border-bottom: 1px solid #4e5255;
    background-color: transparent;
    outline: none;
  }
`;

const ErrorSearchingInfo = styled.div`
  text-align: center;
`;

const exampleTabMoney = [
  {
    id: 1,
    name: "Frank Szwajcarski",
    shortName: "CHF",
    sell: 4.69,
    buy: 4.89,
  },
  {
    id: 2,
    name: "Euro",
    shortName: "TO",
    sell: 4.69,
    buy: 4.89,
  },
  {
    id: 3,
    name: "Dolar",
    shortName: "TO",
    sell: 4.69,
    buy: 4.89,
  },
  {
    id: 4,
    name: "Rub5le",
    shortName: "CHF",
    sell: 4.69,
    buy: 4.89,
  },
];

// Typ dla propsów przesyłanych do stylowanych komponentów
type Props = {
  warning: string;
};
type handleSearchType = (e: any) => void;
type warningType = 'noSearching' | 'warningYes' | 'isOkSearching';

const AllCourses = () => {
  const [search, setSearch] = useState<string>("");
  const handleSearch: handleSearchType = (e: any) => {
    setSearch(e.target.value);
  };

  // Kopia tablicy pobranej z API
  const localTab = [...exampleTabMoney];
  // Tablica przefiltrowana na podstawie poszukiwanej nazwy
  const searchingTab = localTab.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.shortName.toLowerCase().includes(search.toLowerCase())
  );

  // Tablica ostateczna. Jeśli nie ma nic w wyszukiwaniu oddaje oryginalną tablice.
  let warning:warningType = "noSearching";
  // DomyślniE jeśli nic nie ma w tablicy wyszukiwań to oddaje oryginalną tablicę
  let readyToDisplayTab = searchingTab.length > 0 ? searchingTab : localTab;

  // Funkcja obsługująca zaawansowaną obsługę filtrowania wraz z ustawieniem ostrzeżenia
  const searchingHandle = () => {
    if (search.length > 0 && searchingTab.length === 0) {
      readyToDisplayTab = [];
      warning = "warningYes";
    } else if (search.length > 0 && searchingTab.length > 0) {
      readyToDisplayTab = searchingTab;
      warning = "isOkSearching";
    } else {
      readyToDisplayTab = localTab;
      warning = "noSearching";
    }
  };
  searchingHandle();

  // Montowanie komponentów na podstawie tablicy ostatecznej
  const displayCurrencyBox = readyToDisplayTab.map((item) => (
    <CurrencyBox
      key={item.id}
      id={item.id}
      name={item.name}
      shortName={item.shortName}
      sell={item.sell}
      buy={item.buy}
    />
  ));

  // Decyzja: wyświetlamy listę czy komunikat o błędzie wyszukiwania
  const endResult =
    displayCurrencyBox.length > 0 ? (
      displayCurrencyBox
    ) : (
      <ErrorSearchingInfo>Brak. Spróbuj ponownie!</ErrorSearchingInfo>
    );

  return (
    <MainContainer>
        <RenderTitle textDark={'Kursy wszystkich'} textGreen={'walut'} />
      <div className="line-searching">
        <div className="line-box">
          <p>
            Wyszukaj <span>walutę</span>
          </p>
          <SearchBox warning={warning}>
            <input type="text" value={search} onChange={handleSearch} />
          </SearchBox>
        </div>
      </div>
      {endResult}
    </MainContainer>
  );
};

export default AllCourses;
