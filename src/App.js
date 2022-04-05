import './App.css';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3"

const initialData = [
  {name: "Car", value: 5},
  {name: "Food", value: 3},
  {name: "Telephone", value: 1},
  {name: "Art", value: 3},
  {name: "Electricity", value: 9},
  {name: "Cinema", value: 7},
  {name: "Dinosaur", value: 10},
];

const App = () => {

  const width = 500;
  const height = 200;
  const padding = 20;
  const maxValue = 40; // Maximum data value

  const [chartdata, setChartdata] = useState(initialData)

  const svgRef= useRef()


  /**
   * Random data generator and SVG canvas
   * @returns {({name: string, value: number}|{name: string, value: number}|{name: string, value: number}|{name: string, value: number}|{name: string, value: number})[]}
   */
  const generateNewData = () => chartdata.map(
    function (d) {
      d.value = Math.floor(
        Math.random() * (maxValue + 1)
      )
      return d
    }
  )


  useEffect(
    ()=>{

      /**
       * Generate xScale
       */
      const xScale = d3.scalePoint()
        .domain(chartdata.map( (d) => d.name ))
        .range([(padding),(width - padding)])
      console.log('Start - End',xScale('Car'),xScale('Cinema'))

      /**
       * Generate yScale
       */
      const yScale = d3.scaleLinear()
        .domain([0, d3.max( chartdata, function (d) {return d.value})])
        .range([(height - padding), (padding)])

      console.log('Start - End',yScale(0),yScale(10))

      /**
       * Define Line
       */
      const line = d3.line()
        .x((d)=> xScale(d.name))
        .y((d)=>yScale(d.value) )
        .curve(d3.curveMonotoneX)

      console.log('chart draw commands', line(chartdata) )

      /**
       * Display plot line
       */
      d3.select(svgRef.current)
        .select('path')
        .attr('d', () => line(chartdata))
        .attr('fill','none')
        .attr('stroke', 'white')
        .attr('stroke-width', 5)

      /**
       * Display X and Y Axes
       */
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      d3.select('#xaxis').remove()
      d3.select(svgRef.current)
        .append('g')
        .attr('transform',`translate(0,${height - padding})`)
        .attr('id','xaxis')
        .call(xAxis)

      d3.select('#yaxis').remove()
      d3.select(svgRef.current)
        .append('g')
        .attr('transform',`translate(${padding},0)`)
        .attr('id','yaxis')
        .call(yAxis)

    },[chartdata]
  )


  return (
    <div className="App">
      <header className="App-chart">

        {/* Generate chart */}
        <svg id="chart" ref={svgRef} viewBox="0 0 500 200">

          {/* Display plot line */}
          <path d="" />

        </svg>
        <p>
          <button type='button' onClick={()=> setChartdata(generateNewData())}>
            Click to refresh expenses data
          </button>
        </p>

      </header>
    </div>
  );
}

export default App;