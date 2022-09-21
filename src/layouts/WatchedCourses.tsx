import { TableHead } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

// Import komponentów
import CurrencyBox from "../components/CurrencyBox";
import RenderTitle from "../components/RenderTitle";
import TableHeaders from "../components/TableHeaders";

import { AppContext } from "../context/AppContext";

const MainContainer = styled.div`
  height: 100%;
  .information {
    margin: 4rem auto;
    text-align: center;
    width: 80%;
  }
`;

const WatchedCourses = () => {
  const [watchedData, setWatchedData] = useState([]);
  const MoneyGlobalTab = useContext(AppContext);

  const [refreshList, setRefreshList] = useState(false);
  const handleRefreshList = () => setRefreshList((prevValue) => !prevValue);

  let displayData: any = [];

  // Po zamontowaniu (.. pobraniu z kontekstu danych) aktualizuje lokalną tablicę (state)
  useEffect(() => {
    // Odczytywanie z localStorage danych
    if (localStorage.getItem("watchedList") === null) {
      localStorage.setItem("watchedList", "");
    }
    const localStorageList = localStorage.watchedList.split("-");

    // Sprawdzanie czy istnieje w danych z kontekstu taka wartość i dodaje ją do nowej tablicy
    let EndArray = localStorageList.map((nameLocalStorage: string) => {
      const filteredTab: any = MoneyGlobalTab.filter(
        (nameContextTab: any) => nameContextTab.code === nameLocalStorage
      );

      // Zabezpieczenie w przypadku duplikatu
      const uniqueValues =
        filteredTab.length > 1 ? new Set(filteredTab) : filteredTab;
      return uniqueValues[0];
    });
    setWatchedData(EndArray);
  }, [MoneyGlobalTab, refreshList]);

  //console.log(watchedData);

  if (watchedData[0]) {
    displayData = watchedData.map((item: any) => {
      if (typeof item !== "undefined")
        return (
          <CurrencyBox
            key={item.code}
            id={item.code}
            name={item.currency}
            shortName={item.code}
            buy={item.mid}
            refreshState={handleRefreshList}
            showDetails={true}
          />
        );
    });
  }

  const InfoBox = () => (
    <div className="information">
      <p>
        Nie obserwujesz aktualnie żadnych kursów walut. Aby dodać je tutaj
        przejdź do listy wszystkich kursów i kliknij w przycisk '+'.{" "}
      </p>
    </div>
  );

  const DisplayContent = () => (
    <>
      <TableHeaders />
      {displayData}
    </>
  )

  return (
    <div data-aos="fade-zoom-in">
      <MainContainer>
        <RenderTitle textDark="Obserwowane kursy" textGreen="walut" />
        <br/>
        {displayData.length > 0 ? <DisplayContent /> : <InfoBox />}
      </MainContainer>
    </div>
  );
};

export default WatchedCourses;
