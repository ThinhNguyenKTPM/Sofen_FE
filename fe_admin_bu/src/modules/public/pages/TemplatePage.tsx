// import {Chart} from "react-google-charts";
import styled from "styled-components";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
];

export const options = {
    title: "Company Performance",
    curveType: "function",
    legend: {position: "bottom"},
};
export const TemplatePage = () => {


    return (
        <StyledTemplatePage>  {/*<Chart*/}
            {/*    chartType="LineChart"*/}
            {/*    width="100%"*/}
            {/*    height="400px"*/}
            {/*    data={data}*/}
            {/*    options={options}*/}
            {/*    legendToggle*/}
            {/*/>
          */}
        </StyledTemplatePage>
    );
}
const StyledTemplatePage = styled.div`
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 1000px;
`;
