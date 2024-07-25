import { Col as AntdCol, ColProps as AntColProps } from "antd";

interface ColProps extends AntColProps{
    padding?: string;
}

const Col = ({ padding,...props} : ColProps) =>{
 return <AntdCol {...props} style={{
     padding: padding}}/>
}


export default Col;