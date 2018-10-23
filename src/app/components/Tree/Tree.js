import React from "react";
import { Tree, Input, Icon } from "antd";
import { connect } from "./../../index";

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

/* const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData); */

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onChange = e => {
    const value = e.target.value;
    const treeData = this.props.store.data.tree;
    const expandedKeys = this.props.store.data.dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    this.setState({
      expandedKeys: value ? expandedKeys : [],
      searchValue: value,
      autoExpandParent: true
    });
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    const treeData = this.props.store.data.tree;

    const loop = data => {
      return data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "#f50" }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.key}
            title={
              <a href={`https://partner.coca-cola.com${item.url}`} download target="_blank">
                {title}
              </a>
            }
            isLeaf
            selectable={false}
            /* icon={({ selected }) => <Icon type={selected ? "frown" : "frown-o"} />} */
          />
        );
      });
    };
    return (
      <div className="document-tree">
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        {this.props.store.isLoading ? (
          ""
        ) : (
          <Tree.DirectoryTree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(treeData)}
          </Tree.DirectoryTree>
        )}
      </div>
    );
  }
}

export default connect(SearchTree);