import styled from "@emotion/styled";
import classNames from "classnames";
import _ from "lodash";
import React, { useCallback } from "react";

export const defaultPart = 1;
export type Part = 1 | 2;

type Props = {
    color: string;
    selectedPart: Part;
    onClick: (part: Part) => void;
}

const PartSelector = ({color, selectedPart, onClick}: Props) => {
    const handleClick = useCallback((part: Part) => {
        onClick(part);
    }, []);

    return (
        <Container>
            <Text>PART</Text>
            <Circles color={color}>
                {_.map([1,2], (part: Part) => <Circle color={color} onClick={() => handleClick(part)} className={classNames({selected: part === selectedPart})}>{part}</Circle>)}
            </Circles>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24px;
    margin: 24px 0;
`;

const Text = styled.div`
    color: white;
    font-weight: 700;
`;

const Circles = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 15px;
`;

const Circle = styled.div<{color: string}>`
    color: ${props => props.color};
    background-color: rgba(255,255,255,0.5);
    border-radius: 50%;
    margin: 0 5px;

    width: 45px;
    height: 45px;

    line-height: 45px;
    text-align: center;
    font-weight: 800;

    cursor: pointer;

    &:hover, &.selected {
        background-color: white;
    }
`;

export default PartSelector;