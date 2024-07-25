import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
    font-size: 24px;
    color: #333;
`;

interface CooldownTimerProps {
    initialTime: number;
    cooldownDuration: number;
    onCooldownEnd?: () => void;
}

const CooldownTimer: React.FC<CooldownTimerProps> = ({ initialTime, cooldownDuration, onCooldownEnd }) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (remainingTime === 0 && onCooldownEnd) {
            onCooldownEnd();
        }
    }, [remainingTime, onCooldownEnd]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <TimerContainer>
            Cooldown: {formatTime(remainingTime)}
        </TimerContainer>
    );
};

export default CooldownTimer;
