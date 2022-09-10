import React from 'react'
import styled from "styled-components";

const TitleContainer = styled.div`
    font-size: 2.5rem;
    font-family: "Times New Roman", sans-serif;
    color: #4E5255;
    margin: 2rem;
    margin-bottom: 1rem;

    span {
        color: #29B35E;
    }

    @media (max-width: 767px) {
        font-size: 2rem;
    }
`

type Props = {
    textDark: string;
    textGreen: string;
}

const RenderTitle = (props: Props) => {
    return(
        <TitleContainer>
            <h2>{props.textDark} <span>{props.textGreen}</span></h2>
        </TitleContainer>
    )
}

export default RenderTitle;