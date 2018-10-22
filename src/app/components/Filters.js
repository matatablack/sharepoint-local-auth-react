import React, { Component } from "react";
import { Select, Row, Col } from "antd";
import { connect } from "../";

class Filters extends Component {
  state = {
    categoria: null,
    subcategoria: null,
    code: null
  };

  handleChange(field, value) {
    this.setState(
      {
        [field]: value
      },
      () => this.props.actions.filterData(this.state)
    );
  }
  handleBlur() {
    console.log("blur");
  }
  render() {
    const Option = Select.Option;

    const { store } = this.props;
    const { data } = store;

    return (
      <Row style={{ marginBottom: "20px" }}>
        {data.length !== 0 && (
          <Row gutter={16}>
            <Col span={8}>
              <Select
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={value => this.handleChange("categoria", value)}
                onBlur={this.handleBlur}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {data.categorias.map(cat => (
                  <Option value={cat} key={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder="Select subcategory"
                optionFilterProp="children"
                onChange={value => this.handleChange("subcategoria", value)}
                onBlur={this.handleBlur}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {data.subcategorias.map(sub => (
                  <Option value={sub} key={sub}>
                    {sub}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={value => this.handleChange("code", value)}
                onBlur={this.handleBlur}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {data.codes.map(({ code }) => (
                  <Option value={code} key={code}>
                    {code}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        )}
      </Row>
    );
  }
}

export default connect(Filters);
