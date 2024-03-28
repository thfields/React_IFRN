import { Layout, Menu, Flex } from "antd";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/ifrn-logo.jpg";

const { Sider, Content } = Layout;

function Base() {
    return (
        <Layout>
            <Sider theme="light">
                <Flex justify="center" style={{margin : 10}}>
                    <img src={logo} alt="Logo do IFRN" style={{width : 160}}/>
                </Flex>
                <Menu mode="inline">
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="turmas">
                        <Link to="/turmas">Turmas</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content style={{ minHeight: "80vh", margin: "10px" }}>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default Base;