import styled from "@emotion/styled";
import React from "react";
import _ from "lodash";
import { ReactSVG } from "react-svg";
import classNames from "classnames";
// import StarIcon from '../../css/icons/star-solid.svg';

type Props = {
    year: number;
    day: number;
    title: string;
    completedParts: 0 | 1 | 2;
    color: string;
}

const TitleBar = ({ year, day, title, completedParts, color }: Props) => {
    return (<Container>
        <Text color={color}>
            <Year>{year}</Year>
            <DayInfo>
                <Day>DAY {day}</Day>
                <Title>{title}</Title>
                <Stars>
                    {/* {_.map([1,2], (part) => <ReactSVG src={StarIcon} title={`Part ${part}`} className={classNames({ star: true, completed: completedParts >= part })} />)} */}
                </Stars>
            </DayInfo>
        </Text>
    </Container>)
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Text = styled.div<{color: string}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    color: ${props => props.color};
`;

const DayInfo = styled.div`
    display: flex;
    flex-direction: row;
    
    > div {
        padding: 10px 20px;
    }
`;

const Year = styled.div`
    background-color: rgba(255,255,255,0.5);
    width: 100px;
    padding: 10px 20px;
    text-align: center;
`;

const Day = styled.div`
    width: 100px;
    background-color: white;
    text-align: center;
`;

const Title = styled.div`
    background-color: rgba(255,255,255,0.5);
    flex-grow: 1;
`;

const Stars = styled.div`
    display: flex;
    flex-direction: row;

    .star {
        width: 34px;
        height: 34px;
        color: white;
        fill: white;
        margin: auto 6px;

        &:not(.completed) {
            opacity: 0.5;
        }
    }
`;


export default TitleBar;