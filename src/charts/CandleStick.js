import React from 'react';
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";

class CandleStick extends React.Component {
    
    render() {
        const { type, width, data, ratio } = this.props;
		const xAccessor = d => d.date;
		//const end = xAccessor(data[data.length - 100]);
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [
			xAccessor(last(data)),				// start
            end
        ];

        return(
            <ChartCanvas height={500}
					ratio={ratio}
					width={width}
					margin={{ left: 30, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					xScale={scaleTime()}
					xExtents={xExtents}>

				<Chart id={1}
						yExtents={[d => [d.high, d.low]]}
						padding={{ top: 40, bottom: 20 }}>
					<XAxis axisAt="bottom" orient="bottom"  ticks={6}/>
					<YAxis axisAt="right" orient="right"   ticks={6}/>

					<MouseCoordinateX
						rectWidth={60}
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%H:%M:%S")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<CandlestickSeries />

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

					<OHLCTooltip origin={[0, 0]} xDisplayFormat={timeFormat("%Y-%m-%d %H:%M:%S")}/>
				</Chart>
				
			</ChartCanvas>
        );
    }
}

CandleStick.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStick.defaultProps = {
	type: "svg",
};
CandleStick = fitWidth(CandleStick);

export default CandleStick;