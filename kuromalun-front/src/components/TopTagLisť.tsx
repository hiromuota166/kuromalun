import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const TopTabList = () => {
  return (
    <Tabs variant='soft-rounded' colorScheme='green'>
      <TabList>
        <Tab sx={{
          _selected: {
            bg: 'white', // 選択されたタブの背景色を白に設定
            color: 'black', // 選択されたタブの文字色を黒に設定
          },
        }}>Tab 1</Tab>
        <Tab sx={{
          _selected: {
            bg: 'white', // 選択されたタブの背景色を白に設定
            color: 'black', // 選択されたタブの文字色を黒に設定
          },
        }}>Tab 2</Tab>
      </TabList>
      <TabPanels>
        {/* <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel> */} 
        {/* 後々選択したタグに紐づいたものを表示するように変更する */}
      </TabPanels>
    </Tabs>
  );
};

export default TopTabList;
