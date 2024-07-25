import {Title} from "components/typhograpy/Title.tsx";
import {Spin} from "antd";

export const LoaderBig = ({message = '', spinner = true}) => {
    return (
        <div style={{textAlign: 'center', marginTop: '5em'}}>
            {spinner ? (
                <>
                    <Title level={2} type="secondary" style={{marginTop: '5em'}}>
                        Loading... &nbsp;
                    </Title>
                    <Spin size="large" spinning={true} tip={message}/>
                </>
            ) : (
                <div></div>
            )}
            <br/>
            {message && (
                <Title level={3} type="secondary" style={{marginTop: '1em'}}>
                    {message}
                </Title>
            )}
        </div>
    );
}