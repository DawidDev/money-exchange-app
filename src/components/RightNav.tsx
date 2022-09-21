import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Style dla komponentów
const RightNavContainer = styled.div<Props>`
  display: none;
  @media (max-width: 767px) {
    opacity: ${(props) => (props.open ? "1" : "0")};
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    height: 100vh;
    position: fixed;
    top: 0;
    left: ${(props) => (props.open ? "0%" : "100%")};
    transition: 0.25s;
    background-color: #fff;
    z-index: 1;
    padding-top: 12rem;
    padding-left: 3rem;
    padding-right: 3rem;
    overflow: auto;

    ul {
      list-style-type: none;
      margin-top: 2rem;
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 1.75rem;

      li {
        width: 100%;
        transition: 0.15s;

        a {
          text-decoration: none;
          color: #4e5255;
        }

        .active {
          color: #29b35e;
          transition: 0.15s;
        }
      }
    }
  }
`;

const TitleMenuRWD = styled.div`
  width: 100%;
  font-size: 2.25rem;
  height: 5rem;

  h2 {
    font-family: "Times New Roman", sans-serif;
    font-weight: 700;
    color: #4e5255;
  }
`;

type Props = {
  open: boolean;
  handleMenu: any;
};

const RightNav = ({ open, handleMenu }: Props) => {
  const closeMenu = () => handleMenu()

  return (
    <>
      <RightNavContainer open={open} handleMenu={handleMenu}>
        <TitleMenuRWD>
          <h2>Menu</h2>
        </TitleMenuRWD>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Start
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-courses"
              className={(navData) => (navData.isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Wszystkie kursy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watched-courses"
              className={(navData) => (navData.isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Obserwowane kursy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={(navData) => (navData.isActive ? "active" : "")}
              onClick={closeMenu}
            >
              FAQ
            </NavLink>
          </li>
        </ul>
      </RightNavContainer>
    </>
  );
};

export default RightNav;
