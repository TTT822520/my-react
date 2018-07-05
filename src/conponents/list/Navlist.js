import React, { Component } from 'react';
import { List } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import ReactDOM from "react-dom"
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
            header:"",
            toolWidth:0,
            defauleOption:{
                transform:"translate3d(0, 0px, 0px)",
                transformtool:"translate3d(100%, 0px, 0px)",
            },
            arr:[{
                transform:"translate3d(0, 0px, 0px)",
                transformtool:"translate3d(100%, 0px, 0px)%",
            },{
                transform:"translate3d(0, 0px, 0px)",
                transformtool:"translate3d(100%, 0px, 0px)%",
            }]
        }
    }

    

    handClickItem(row,index){
        if(row.callBack && typeof row.callBack == 'function'){
            row.callBack(row);
        }else if(!row.callBack && row.isLigin){
            Toast.info(row.info || "请登录再操作")
        }
    }

    touchStart(e,item,index){
        this.firstX = e.touches[0].pageX;
        this.setState({
            toolWidth:e.target.parentNode.nextSibling.clientWidth
        })
        
        
    }

    touchEnd(e,item,index){
        var count = this.state.arr.filter((item) => {
            return item.isOpen
        })
        if(count.length == 0){
            console.log(1)
        }else{
            this.setOtherClose(index)
        }
    }

    touchMove(e,item,index){
        if(!this.setAlldefault(index)){
            return false;
        }
        let _curPageX = e.touches[0].pageX;
        this._curPageX = _curPageX;
        //左滑
        if((this.firstX - _curPageX) > 0){
            if(item.isOpen){
                return;
            }
            if((this.firstX - _curPageX) > this.props.threshold*50 && !item.isOpen){
                this.setState({
                    arr:this.getopen(index,_curPageX)
                })
                return false;
            }
        }else{
            let _arr = [];
            _arr = this.state.arr.map((item) => {
                item = this.state.defauleOption;
                item.isOpen = false;
                return item;
            })
            this.setState({
                arr:_arr
            })
        }
    }

    getopen(_index,_curPageX){
        let _arr = [];
        let itemObj = {
            transform:`translate3d(-${this.firstX - _curPageX > this.props.threshold*50 ? this.props.threshold*50 : this.firstX - _curPageX}px, 0px, 0px)`,
            transformtool:`translate3d(-${this.firstX - _curPageX > this.props.threshold*50 ? 0 : this.firstX - _curPageX}px, 0px, 0px)`
        };
        this.state.arr.forEach((item,index) => {
            if(_index == index ){
                item = itemObj
                if(this.firstX - _curPageX > this.props.threshold*50 ){
                    item.isOpen = true;
                }
            }
            _arr.push(item);
        })
        return _arr;
    }

    setOtherClose(touchIndex){
        let _arr = [];
        let count = 0;
        let isTouchCurIndex = false;
        this.state.arr.forEach((item,index) => {
            if(item.isOpen){
                if(touchIndex == index && this._curPageX){
                    isTouchCurIndex = true;
                    this._curPageX = "";
                }else if(!this._curPageX){
                    isTouchCurIndex = false;
                    item = this.state.defauleOption;
                }
                count++;
            }else{
                item = this.state.defauleOption;
            }
            _arr.push(item);
        })
        this.setState({
            arr:_arr
        })
       
        
        return count == 0 ? true : false;
    }

    setAlldefault(touchIndex){
        let _arr = [];
        let count = 0;
        this.state.arr.forEach((item,index) => {
            if(item.isOpen == true && touchIndex != index){
                item = this.state.defauleOption;
                item.isOpen = false;
                count++;
            }
            _arr.push(item);
        })
        return count > 0 ? false : true;
    }


    render() {
        return (
            //renderHeader={() => this.state.header || ""} style={{height:this.state.header ? '' : '0px'}}
            
            <div>
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
                <ul className="list-ul-content">
                    {this.state.arr.map((item,index) =>{
                        return ( <li key={index} className="list-ul-item" onTouchStart={(e) => {this.touchStart(e,item,index)}} onTouchEnd={(e) => {this.touchEnd(e,item,index)}}  onTouchMove={(e) => {this.touchMove(e,item,index)}}>
                            <div className="list-con" style={{transform:item.transform}}>
                                <div className="list-con-box">12313</div>
                            </div>
                            <div className="slider-right" style={{transform:item.transformtool}}>
                                <a className="del">删除</a>
                                {/* <a className="del">删除</a> */}
                            </div>
                        </li>)
                    })}
                   
                </ul>
            </div>
            
        );
    }
}


NavList.defaultProps = {
    threshold:1.5
}

export default NavList;