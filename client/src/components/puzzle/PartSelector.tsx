import styled from "@emotion/styled";
import _ from "lodash";
import React from "react";

type Props = {
    color: string;
    onClick: (part: 1 | 2) => void;
}

const PartSelector = ({color, onClick}: Props) => {
    return (<Container>
        <Text>PART</Text>
        <Circles color={color}>
            {_.map([1,2], (part: 1 | 2) => <Circle color={color} onClick={() => onClick(part)}>{part}</Circle>)}
        </Circles>
    </Container>)
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
`;

const Text = styled.div`
    color: white;
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

    &:hover {
        background-color: white;
    }
`;

export default PartSelector;