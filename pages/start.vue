<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-purple-light p-6 mb-8">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <span class="font-semibold text-xl tracking-tight">Wheel of Life</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-purple-lighter border-purple-lighter hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-purple-lightest hover:text-white mr-4">
            Docs
          </a>
          <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-purple-lightest hover:text-white mr-4">
            Examples
          </a>
          <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-purple-lightest hover:text-white">
            Blog
          </a>
        </div>
        <div>
          <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple hover:bg-white mt-4 lg:mt-0">Download</a>
        </div>
      </div>
    </nav>

    <section class="container mx-auto">
      <h2
      v-if="steps[currentStep] != undefined"
      class="text-center text-2xl md:text-3xl mb-4"
      >{{ steps[currentStep].title }}</h2>

      <p class="text-center text-xl mb-4">How would you rate this area of your life?</p>

      <div class="text-center mb-4 lg:mb-8">
        <Number v-for="score in 10" @click.native="submitScore(score)">{{ score }}</Number>
      </div>

      <svg :width="width" :height="height">
        <g :transform="`translate(${width / 2}, ${height / 2})`">

          <path
          v-for="step in steps"
          :fill="step.color"
          class="solidArc"
          stroke="white"
          :d="step.solidArc"
          >

          </path>

          <transition-group name="fade" tag="g">
            <text
            v-for="step in steps"
            v-if="step.score >= 1"
            :key="step.id"
            :transform="`translate(${step.textTranslateValue.x}, ${step.textTranslateValue.y})`"
            :style="`text-anchor: ${step.textAnchor}`"
            >
              <tspan>{{ step.title }} </tspan> <tspan style="font-weight: bold;">{{ step.score }}</tspan>
            </text>
          </transition-group>
        </g>
      </svg>
    </section>

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
          },
          'textAnchor': 'middle'
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
          },
          'textAnchor': 'start'
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
          },
          'textAnchor': 'start'
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
          },
          'textAnchor': 'middle'
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
          },
          'textAnchor': 'middle'
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
          },
          'textAnchor': 'end'
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
          },
          'textAnchor': 'end'
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
          },
          'textAnchor': 'middle'
        }
      ]
    }
  },

  computed: {

  },

  methods: {
    onResize () {
      this.width = this.$el.offsetWidth
      // this.height = this.$el.offsetHeight
    },

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
          return (that.radius - that.innerRadius) * (that.steps[i].score / 12.0) + that.innerRadius
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

    window.addEventListener('resize', this.onResize)
    this.onResize()

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
