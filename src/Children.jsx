import {ConnectButton, ShowProfileName, SetProfileName} from "./ConnectButton";
import Login from "./Login";
import { Row, Col, Space } from "antd";
export default function Children({}){
    return(
        <Row justify="center">
        <Col>
        <Space direction="vertical">
            <Login />
            <ConnectButton />
            <ShowProfileName />
            <SetProfileName />
        </Space>
        </Col>
        </Row>
    );
}
