import React from 'react';
import { Tabs, Radio, Space } from 'antd';

const { TabPane } = Tabs;

export default class Demo extends React.Component {
    state = {
        tabPosition: 'left',
    };

    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };

    render() {
        const { tabPosition } = this.state;
        return (
            <>

                <Tabs tabPosition={tabPosition}>
                    <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" />} key="1">
                            
                    </TabPane>
                    <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" />} key="2">
                        Content of Tab 2
                    </TabPane>
                    <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" />} key="3">
                        Content of Tab 3
                    </TabPane>
                </Tabs>
            </>
        );
    }
}

