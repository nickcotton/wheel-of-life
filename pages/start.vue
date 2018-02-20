<template>
  <div>
    <h1>Wheel of Life</h1>

    <h2 v-if="steps[currentStep] != undefined">{{ steps[currentStep].title }}</h2>

    <p>How would you rate this area of your life?</p>

    <div class="text-center">
      <Number v-for="score in 10" @click.native="submitScore(score)">{{ score }}</Number>
    </div>

    <svg :width="width" :height="height">
      <g :transform="`translate(${width / 2}, ${height / 2})`">

        <path
        v-for="step in steps"
        :fill="step.color"
        class="solidArc"
        stroke="gray"
        :d="step.solidArc"
        >

        </path>

        <text
        v-for="step in steps"
        v-if="step.score >= 1"
        :transform="`translate(${step.textTranslateValue.x}, ${step.textTranslateValue.y})`"
        >
          <tspan>{{ step.title }} </tspan> <tspan style="font-weight: bold;">{{ step.score }}</tspan>
        </text>
      </g>
    </svg>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Number from '~/components/Number.vue'
import * as d3 from 'd3'
// import TWEEN from 'tween.js'

export default {
  components: {
    Logo,
    Number
  },

  data: function () {
    return {
      width: 500,
      height: 500,
      radius: 0,
      innerRadius: 0,
      currentStep: 0,
      steps: [
        {
          'id': 0,
          'title': 'Health',
          'score': 0.5,
          'weight': '1',
          'color': '#FEC574',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 1,
          'title': 'Career',
          'score': 0.5,
          'weight': '1',
          'color': '#FAE38C',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 2,
          'title': 'Love',
          'score': 0.5,
          'weight': '1',
          'color': '#EAF195',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 3,
          'title': 'Spirituality',
          'score': 0.5,
          'weight': '1',
          'color': '#C7E89E',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 4,
          'title': 'Family',
          'score': 0.5,
          'weight': '1',
          'color': '#9CD6A4',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 5,
          'title': 'Money',
          'score': 0.5,
          'weight': '1',
          'color': '#6CC4A4',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 6,
          'title': 'Fun',
          'score': 0.5,
          'weight': '1',
          'color': '#4D9DB4',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        },
        {
          'id': 7,
          'title': 'Friends',
          'score': 0.5,
          'weight': '1',
          'color': '#4776B4',
          'solidArc': '',
          'textTranslateValue': {
            'x': 0,
            'y': 0
          }
        }
      ]
    }
  },

  computed: {

  },

  methods: {
    // onResize () {
    //   this.width = this.$el.offsetWidth
    //   this.height = this.$el.offsetHeight
    // },

    submitScore: function (score) {
      this.updateChart(score)
      this.nextStep()
    },

    nextStep: function () {
      this.currentStep++
    },

    updateChart: function (score) {
      this.steps[this.currentStep].score = score

      this.something()
    },

    something: function () {
      const that = this

      this.steps.forEach(function (d) {
        d.color = d.color
        d.weight = +d.weight
        d.score = +d.score
        d.width = +d.weight
      })

      // var pie = d3.pie()
      //   .sort(null)
      //   .value(function (d) { return d.weight })

      var segments = this.steps.map(function (d) { return d.weight })

      var pieData = d3.pie()(segments)

      pieData.forEach(function (arcItem, i) {
        var outerRadius = function () {
          return (that.radius - that.innerRadius) * (that.steps[i].score / 20.0) + that.innerRadius
        }

        var arc = d3.arc()
          .innerRadius(25)
          .outerRadius(outerRadius())
          .startAngle(arcItem.startAngle)
          .endAngle(arcItem.endAngle)

        that.steps[i].solidArc = arc()

        that.steps[i].textTranslateValue.x = (that.radius - 12) * Math.sin(((arcItem.endAngle - arcItem.startAngle) / 2) + arcItem.startAngle)

        that.steps[i].textTranslateValue.y = (-1 * (that.radius - 12) * Math.cos(((arcItem.endAngle - arcItem.startAngle) / 2) + arcItem.startAngle))

        // var testArc = d3.arc()
        //   .innerRadius(25)
        //   .outerRadius(250)
        //   .startAngle(5.497787143782138)
        //   .endAngle(6.283185307179586)

        // console.log(testArc())
      })
    }

  },

  mounted () {
    // window.addEventListener('resize', this.onResize)
    // this.onResize()

    this.radius = Math.min(this.width, this.height) / 2

    this.innerRadius = 0.1 * this.radius

    this.something()

    // var pie = d3.pie()
    //   .sort(null)
    //   .value(function (d) { return d.width })

    // var arc = d3.arc()
    //   .innerRadius(innerRadius)
    //   .outerRadius(function (d) {
    //     return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius
    //   })

    // var svg = d3.select('svg g')
    // .attr('width', width)
    // .attr('height', height)
    // .append('g')
    // .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    // this.steps.forEach(function (d) {
    //   d.color = d.color
    //   d.weight = +d.weight
    //   d.score = +d.score
    //   d.width = +d.weight
    // })
    // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }

    // eslint-disable-next-line no-unused-vars
    // var path = d3.select('svg g')
    //   .selectAll('.solidArc')
    //   .data(pie(this.steps))
    //   .enter().append('path')
    //   .attr('fill', function (d) { return d.data.color })
    //   .attr('class', 'solidArc')
    //   .attr('stroke', 'gray')
    //   .attr('d', d3.arc()
    //     .innerRadius(this.innerRadius)
    //     .outerRadius(function (d) {
    //       return (this.radius - this.innerRadius) * (d.data.score / 100.0) + this.innerRadius
    //     })
    //   )

    // // calculate the weighted mean score
    // var score =
    //   this.steps.reduce(function (a, b) {
    //     // console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //     return a + (b.score * b.weight)
    //   }, 0) /
    //   this.steps.reduce(function (a, b) {
    //     return a + b.weight
    //   }, 0)

    // svg.append('svg:text')
    //   .attr('class', 'aster-score')
    //   .attr('dy', '.35em')
    //   .attr('text-anchor', 'middle') // text-align: right
    //   .text(Math.round(score))
  }
}
</script>

<style>
  body {
    font: 10px sans-serif;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .bar {
    fill: orange;
  }

  .solidArc:hover {
    fill: orangered ;
  }

  .solidArc {
      -moz-transition: all 0.3s;
      -o-transition: all 0.3s;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
  }

  .x.axis path {
    display: none;
  }

  .aster-score {
    line-height: 1;
    font-weight: bold;
    font-size: 500%;
  }
</style>
