import React from 'react';
import 'antd/dist/antd.min.css';
import { Select } from 'antd';
const { Option } = Select;


const onChangeData  = () =>  {
  console.log('SearchSelectComponent onChangeData')
}

export default function SearchSelectComponent(prop) {
 

    return (
      <Select
      showSearch
      style={{
        width: 200,
      }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => option.children.includes(input)}
      onChange={this.onChangeData.bind(this)}
      >
      {prop.list.map((k,i)=>{
           return <Option key={i} value={i}> {k}</Option>
      })}
    </Select>
      );
    
  }