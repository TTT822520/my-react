import React, { Component } from 'react';
import { List } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import { Toast } from 'antd-mobile';
import './list.css'
const Item = List.Item;
const Brief = Item.Brief;
@withRouter
class NavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navlist: this.props.navList,
            header:""
        }
    }
    handClickItem(row,index){
        console.log(row)
        if(row.callBack && typeof row.callBack == 'function'){
            row.callBack(row);
        }else if(!row.callBack && row.isLigin){
            alert(1)
            Toast.info(row.info || "请登录再操作")
        }
    }

    render() {
        return (
            //renderHeader={() => this.state.header || ""} style={{height:this.state.header ? '' : '0px'}}
            <List   className="my-list">
                { this.state.navlist.map(((item,index) => {
                    return <Item
                        thumb={item.thumb}
                        arrow="horizontal"
                        onClick={() => {
                            this.handClickItem(item,index);
                        }}
                        key={index}
                        >
                        {item.title}{item.Brief ? <Brief>{item.Brief}</Brief> : ""}
                    </Item>
                }))}
            </List>
        );
    }
}


export default NavList;