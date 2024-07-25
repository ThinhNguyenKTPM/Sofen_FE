import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Flex, Typography} from 'antd';

const { Title } = Typography;

interface CardProps {
    icon: ReactNode;  // Assuming usage of react-icons or similar
    quantity: number | string;
    title: string;
}


const CustomCard: React.FC<CardProps> = ({ icon: Icon, quantity, title }) => (
    <StyledCard gap={12}>
            <StyledIconCol>
                {Icon}
            </StyledIconCol>
            <Flex vertical={true}>
                <Title level={4}>{quantity}</Title>
                <Title level={5}>{title}</Title>
            </Flex>
    </StyledCard>
);

export default CustomCard;


const StyledCard = styled(Flex)`
    width: 300px;
    height: 100px;
    margin: 6px;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    align-items: center;
`;

const StyledIconCol = styled.div`
    font-size: 24px;
    text-align: center;
    border: 1px solid #1890ff;
    border-radius: 6px;
    color: #1890ff;
    margin-right: 10px;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;    
`;
