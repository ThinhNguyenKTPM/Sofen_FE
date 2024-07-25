import {useState, useEffect} from 'react';
import styled from 'styled-components';

const SlideContainer = styled.div`
    overflow: hidden;
    width: 100%;
    position: relative;
    border-radius: 12px;
`;

const Slide = styled.div<{ active: boolean }>`
    opacity: ${({active}) => (active ? 1 : 0)};
    transition: opacity 1s ease-in-out;
`;

const Image = styled.img`
    width: 100%;
`;


interface CarouselProps {
    images: string[];
    interval?: number;
}

export const Carousels = ({images, interval = 4000}: CarouselProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };


    useEffect(() => {
        const intervalId = setInterval(nextSlide, interval);
        return () => clearInterval(intervalId);
    }, [interval]);

    return (
        <SlideContainer>
            {images.map((image, index) => (
                <Slide key={index} active={index === currentImageIndex}>
                    {index === currentImageIndex && (
                        <Image src={image} alt={`Slide ${index + 1}`}/>
                    )}
                </Slide>
            ))}
        </SlideContainer>
    );
};

