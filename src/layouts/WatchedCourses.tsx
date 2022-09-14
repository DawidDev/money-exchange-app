import React, { useState, useContext, useEffect } from "react";
import { isDoStatement } from "typescript";
import CurrencyBox from "../components/CurrencyBox";

import { AppContext } from "../context/AppContext";

const WatchedCourses = () => {
  const [watchedData, setWatchedData] = useState([]);
  const MoneyGlobalTab = useContext(AppContext);

  const [refreshList, setRefreshList] = useState(false);
  const handleRefreshList = () => setRefreshList(prevValue => !prevValue);

  let displayData: any = [];

  // Po zamontowaniu (.. pobraniu z kontekstu danych) aktualizuje lokalną tablicę (state)
  useEffect(() => {
    // Odczytywanie z localStorage danych
    if (localStorage.getItem("watchedList") === null) {
      localStorage.setItem("watchedList", '');
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

  console.log(watchedData);

  if (watchedData[0]) {
    displayData = watchedData.map((item: any) => {
      if (typeof(item) !== 'undefined')
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

  return <>{displayData.length > 0 ? displayData : "Brak obserwowanych kursów"}</>;
};

export default WatchedCourses;

// Poprawić sprawdzenie czy istnije tablica. Dodać typowanie
