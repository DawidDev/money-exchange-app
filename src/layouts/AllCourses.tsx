import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

// Import komponentów
import CurrencyBox from "../components/CurrencyBox";
import RenderTitle from "../components/RenderTitle";
import TableHeaders from "../components/TableHeaders";

// Import danych z kontekstu
import { AppContext, MoneyGlobalTab } from "../context/AppContext";

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
      width: 80%;
      margin: 3rem auto;

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

  @media (max-width: 767px) {
    height: 4rem;
    input {
      font-size: 1.5rem;
      text-align: center;
    }
  }
`;

const ErrorSearchingInfo = styled.div`
  text-align: center;
`;

// Typ dla propsów przesyłanych do stylowanych komponentów
type Props = {
  warning: string;
};
type handleSearchType = (e: any) => void;
type warningType = "noSearching" | "warningYes" | "isOkSearching";

const AllCourses = () => {
  //console.log('Komponent: ALL COURSES')
  // Pobranie z kontekstu danych o walutach
  const MoneyGlobalTab = useContext(AppContext);
  console.log(MoneyGlobalTab);

  // Wartość wyszukiwana
  const [search, setSearch] = useState<string>("");
  const handleSearch: handleSearchType = (e: any) => {
    setSearch(e.target.value);
  };

  // Kopia tablicy pobranej z API
  const localTab = MoneyGlobalTab;
  // Tablica przefiltrowana na podstawie poszukiwanej nazwy
  const searchingTab = localTab.filter(
    (item: any) =>
      item.currency.toLowerCase().includes(search.toLowerCase()) ||
      item.currency.toLowerCase().includes(search.toLowerCase())
  );

  // Tablica ostateczna. Jeśli nie ma nic w wyszukiwaniu oddaje oryginalną tablice.
  let warning: warningType = "noSearching";
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
  const displayCurrencyBox = readyToDisplayTab.map((item: any) => (
    <CurrencyBox
      key={item.id}
      id={item.id}
      name={item.currency}
      shortName={item.code}
      buy={item.mid}
      showDetails={true}
    />
  ));

  // Decyzja: wyświetlamy listę czy komunikat o błędzie wyszukiwania
  const displayResult =
    displayCurrencyBox.length > 0 ? (
      displayCurrencyBox
    ) : (
      <ErrorSearchingInfo>Brak. Spróbuj ponownie!</ErrorSearchingInfo>
    );

  return (
    <div data-aos="fade-zoom-in">
      <MainContainer>
        <RenderTitle textDark={"Kursy wszystkich"} textGreen={"walut"} />
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
        <TableHeaders />
        {displayResult}
      </MainContainer>
    </div>
  );
};

export default AllCourses;
