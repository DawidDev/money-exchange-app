import React from "react";
import styled from "styled-components";

// Import komponentów
import RenderTitle from "../components/RenderTitle";

const BoxInfo = styled.div`
  width: 90%;
  margin: 1.5rem auto;
  color: #4e5255;

  .green {
    color: #29b35e;
    font-weight: 6500;
  }

  a {
    text-decoration: none;
    color: #29b35e;
  }

  .title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
`;

const Faq = () => {
  return (
    <div data-aos="fade-zoom-in">
      <RenderTitle textDark={"FAQ"} textGreen={""} />
      <BoxInfo>
        <p className="title">
          Skąd aplikacja <span className="green">Money</span> pobiera
          informacje?
        </p>
        <p>
          Aplikacja pobiera dane o aktualnym kursie walut oraz historię zmiany
          kursu maksymalnie 30 dni wstecz z darmowego, dostępnego dla każdego
          API udostępnianego przez Narodowy Bank Polski (
          <a href="http://api.nbp.pl/">api.nbp.pl</a>).
        </p>
      </BoxInfo>
      <BoxInfo>
        <p className="title">Jak często aktualizowane są kursy walut?</p>
        <p>
          Wprost na żądanie użytkownika. Za każdym ponownym załadowaniem strony
          kursy są aktualizowane do najświeższych informacji udostępnianych
          przez źródło czyli Narodowy Bank Polski.
        </p>
      </BoxInfo>
      <BoxInfo>
        <p className="title">Gdzie aplikacja zapisuje dane?</p>
        <p>
          Ta strona internetowa nie używa cookies. Aby zachować większe
          bezpieczeństwo przez utratą danych, które użytkownik może zapisać
          (czyli dodać kursy do obserwowanych i mieć do nich szybki dostęp)
          aplikacja używa Local Storage (pamięć wewnętrzna) przeglądarki. Dane
          zachowywane są na urządzeniu tak długo aż zostaną ręcznie usunięte
          przez użytkownika.{" "}
        </p>
      </BoxInfo>
      <BoxInfo>
        <p className="title">Z jakich technologii korzysta aplikacja?</p>
        <p>
          <span className="green">Money </span> została zaprojektowana za pomocą
          frameworka React, TypeScript'u, biblioteki komponentów{" "}
          <a href="https://mui.com/">MUI</a>,{" "}
          <a href="https://recharts.org/en-US">Recharts</a>,{" "}
          <a href="https://react-select.com/home">React Select</a>, HTML, CSS.{" "}
        </p>
      </BoxInfo>
    </div>
  );
};

export default Faq;
