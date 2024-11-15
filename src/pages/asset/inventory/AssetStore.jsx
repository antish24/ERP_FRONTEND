import { Tabs } from 'antd';
import React from 'react'
import { MdCategory, MdScale, MdShelves } from 'react-icons/md';
import { RiFileList2Fill } from 'react-icons/ri';
import AssetStorePage from './AssetStorePage';
import AssetInventoryPage from './AssetInventoryPage';
import AssetBatchPage from './AssetBatchPage';
import AssetCategoryPage from './AssetCategoryPage';
import AssetUnitPage from './AssetUnitPage';

const AssetStore = () => {

    const tabs = [
        {
          key: '1',
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <MdShelves size={20} />Inventory
            </div>
          ),
          children: <AssetInventoryPage/>,
        },
        {
          key: '4',
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <RiFileList2Fill size={20} />Batch
            </div>
          ),
          children: <AssetBatchPage/>,
        },
        {
          key: '5',
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <MdShelves size={20} />Assets
            </div>
          ),
          children: <AssetStorePage/>,
        },
        {
          key: '2',
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <MdCategory size={20} />Category
            </div>
          ),
          children:<AssetCategoryPage/>,
        },
        {
          key: '3',
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <MdScale size={20} />Unit & Types
            </div>
          ),
          children: <AssetUnitPage/>,
        },
      ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={tabs} style={{width: '100%'}} />
    </div>
  )
}

export default AssetStore