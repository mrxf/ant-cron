/*
 * @Author: 苗壮
 * @Date: 2019-06-28 16:47:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-07-12 10:43:56
 */
import React, { PureComponent } from "react";
import {Radio, InputNumber, Row, Col, Select, List, Checkbox} from "antd";
const {Group} = Radio;
export default class Week extends PureComponent {
	weekOptions=[{
		label: "星期一",
		value: "1"
	}, {
		label: "星期二",
		value: "2"
	}, {
		label: "星期三",
		value: "3"
	}, {
		label: "星期四",
		value: "4"
	}, {
		label: "星期五",
		value: "5"
	}, {
		label: "星期六",
		value: "6"
	}, {
		label: "星期日",
		value: "7"
	}]

	getWeekOptions() {
		return this.weekOptions.map(item=>{
			return <Select.Option value={item.value}>
				{item.label}
			</Select.Option>;
		});
	}

	changeParams(type, value) {
		const state = {...this.props.week};
		state[type] = value;
		this.props.onChange(state);
	}

	render() {
		const {week: {type, start, end, some, begin, beginEvery, last}} = this.props;
		return (
			<div >
				<Group value={type} onChange={(e)=>{
					const state = {...this.props.week};
					if (e.target.value === "some") {
						state.some = ["1"];
					}
					state.type = e.target.value;
					this.props.onChange(state);
				}} >
					<List size="small" bordered >
						<List.Item>
							<Radio value="*">每周</Radio>
						</List.Item>
						<List.Item>
							<Radio value="?">不指定</Radio>
						</List.Item>
						<List.Item style={{marginBottom: 5}}>
							<Radio value="period">周期</Radio>
						从 <Select style={{width: 80}} defaultValue={"1"} placeholder="周" size="small" value={start} onChange={(value)=>{this.changeParams("start", value);}} >
								{this.getWeekOptions()}
							</Select> 到{" "}
							 <Select style={{width: 80}}  defaultValue={"2"} placeholder="周" value={end} size="small" onChange={(value)=>{this.changeParams("end", value);}} >
								{this.getWeekOptions()}
							</Select>
						</List.Item>
						<List.Item>
							<Radio value="beginInterval"></Radio>
							第{" "}<InputNumber min={1} defaultValue={1} placeholder="周" size="small" value={begin} onChange={(value)=>{this.changeParams("begin", value);}} />{" "}周的
							{" "}<Select style={{width: 80}} defaultValue={"1"} placeholder="星期" value={beginEvery} size="small" onChange={(value)=>{this.changeParams("beginEvery", value);}} >
								{this.getWeekOptions()}
							</Select>
						</List.Item>
						<List.Item style={{marginBottom: 5}}>
							<Radio value="last"></Radio>
						本月最后一个<Select style={{width: 80}} defaultValue={1}  placeholder="星期" size="small" value={last} onChange={(value)=>{this.changeParams("last", value);}} >
								{this.getWeekOptions()}
							</Select>
						</List.Item>
						<List.Item>
							<Radio value="some">指定</Radio>
							<Checkbox.Group value={some} defaultValue="1"  onChange={(value)=>{this.changeParams("some", value);}} options={this.weekOptions} />
						</List.Item>
					</List>
				</Group>
			</div>
		);
	}
}
