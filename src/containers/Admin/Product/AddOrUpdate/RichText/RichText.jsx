// 富文本编辑器组件

import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// 引入样式文件
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichText extends Component {
  state = {
    editorState: EditorState.createEmpty(),  // 创建一个文本编辑器的初始状态
  }

  // 获取输入的商品详情数据的函数
  getDetail = () => {
    const { editorState } = this.state;
    // 得到编辑器中输入的文本转换后的HTML标签
    let result = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    return result
  }

  // 设置编辑器中的文本用于数据回显
  setDetail = (detailHtml) => {
    // 用于为传入的HTML标签做安全检查,排除恶意标签及代码
    const contentBlock = htmlToDraft(detailHtml)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      })
    }
  }

  // 编辑器中用户输入发生改变的回调
  onEditorStateChange = (editorState) => {
      
    this.setState({  // 更新编辑器状态
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperStyle={{minWidth:'800px'}}  // wrapper区域样式
          editorStyle={{  // editor区域样式
            border:'1px solid black',
            paddingLeft: '8px',
            lineHeight: '8px',
            minHeight: '130px'
          }} 
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
