import React from 'react';
import { Col, ConfigProvider, Layout, Menu, MenuProps, Row, Space, theme } from 'antd';
import { HomeOutlined } from "@ant-design/icons";
import { connectChain, connectWallet, Wallet, Web3, } from "./@coinx/web3/index";

import "./App.scss";
const { Header, Footer, Sider, Content } = Layout;


const CHAINS = require("./@coinx/web3/CHAINS.json");
const ERC20 = require("./@coinx/web3/ERC20.json");
const { log, warn, error } = console;

type AppState = {
  tokenaddress: string,
  myWallet?: Wallet,
  balance?: Number,
  chain?: Web3,
}

class App extends React.Component {

  state: AppState = {
    tokenaddress: "0xA705237C2A2c228d4C275D4f686EB40f9D9bd510",
  };

  componentDidMount(): void {
    let { tokenaddress, } = this.state

    var chain = connectChain("ethers", CHAINS[5])

    chain?.on("connected", async ({ provider, network }) => {
      let myWallet = connectWallet("ethers", "0xe81e12929f5dd44c5563efb8beb9adda67a11ffad44fdd74c53f13524651f91a")
      myWallet.connect(chain)
      await myWallet.getBalance()

      if (myWallet?.address)
        this.setState({ myWallet, chain })

      let token = chain?.connectContract(tokenaddress, ERC20);
    })

  }

  onMenuSelected(item: any) {

  }

  render(): React.ReactNode {
    let { chain, myWallet, tokenaddress, balance, } = this.state

    let _balance = chain ? (Number(myWallet?.balance) / Number(chain?.decimals)).toString() + chain?.symbol : myWallet?.balance?.toString() + " wei";

    const items: MenuProps['items'] = [
      {
        label: <a href='/'>Home</a>,
        key: 'mail',
        icon: <HomeOutlined />,
      },
    ]

    return (<ConfigProvider theme={{ algorithm: theme.darkAlgorithm, }}>

      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Header>
            <Menu onClick={this.onMenuSelected.bind(this)} mode="horizontal" items={items} />
          </Header>

          <Layout hasSider>
            {/* <Sider>Sider</Sider> */}
            <Content>
              <Row>
                <Col>my address {myWallet?.getAddress()}: <b>{_balance}</b></Col>
                <Col>d</Col>
              </Row>

            </Content>
          </Layout>

          <Footer>Footer</Footer>
        </Layout>
      </Space>
    </ConfigProvider>);
  }
}

export default App;
