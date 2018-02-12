<template>
  <div>
    <h1>Wheel of Life</h1>

    <h2>{{ steps[currentStep].title }}</h2>

    <p>How would you rate this area of your life?</p>

    <div class="text-center">
      <Number v-for="score in 10" @click.native="submitScore(score)">{{ score }}</Number>
    </div>

    {{ steps }}

    <table>
      <thead>
        <tr>
          <th v-for="step in steps">
            {{ step.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="step in steps">
            {{ step.score }}
          </td>
        </tr>
      </tbody>
    </table>

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
      width: 0,
      height: 0,
      currentStep: 0,
      steps: [
        {
          'id': 0,
          'title': 'Health',
          'order': '5',
          'score': '3',
          'weight': '1',
          'color': '#FEC574'
        },
        {
          'id': 1,
          'title': 'Career',
          'order': '6',
          'score': '8',
          'weight': '1',
          'color': '#FAE38C'
        },
        {
          'id': 2,
          'title': 'Love',
          'order': '7.1',
          'score': '',
          'weight': '1',
          'color': '#EAF195'
        },
        {
          'id': 3,
          'title': 'Spirituality',
          'order': '7.3',
          'score': '',
          'weight': '1',
          'color': '#C7E89E'
        },
        {
          'id': 4,
          'title': 'Family',
          'order': '8.1',
          'score': '',
          'weight': '1',
          'color': '#9CD6A4'
        },
        {
          'id': 5,
          'title': 'Money',
          'order': '8.3',
          'score': '',
          'weight': '1',
          'color': '#6CC4A4'
        },
        {
          'id': 6,
          'title': 'Fun',
          'order': '9',
          'score': '',
          'weight': '1',
          'color': '#4D9DB4'
        },
        {
          'id': 7,
          'title': 'Friends',
          'order': '10.1',
          'score': '',
          'weight': '1',
          'color': '#4776B4'
        }
      ]
    }
  },

  methods: {
    onResize () {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight
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
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()

    var width = 500
    var height = 500
    var radius = Math.min(width, height) / 2
    var innerRadius = 0.1 * radius

    var pie = d3.pie()
      .sort(null)
      .value(function (d) { return d.width })

    var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(function (d) {
        return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius
      })

    var outlineArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)

    var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    this.steps.forEach(function (d) {
      d.order = d.order
      d.color = d.color
      d.weight = +d.weight
      d.score = +d.score
      d.width = +d.weight
    })
    // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }

    // eslint-disable-next-line no-unused-vars
    var path = svg.selectAll('.solidArc')
      .data(pie(this.steps))
      .enter().append('path')
      .attr('fill', function (d) { return d.data.color })
      .attr('class', 'solidArc')
      .attr('stroke', 'gray')
      .attr('d', arc)

    // eslint-disable-next-line no-unused-vars
    var outerPath = svg.selectAll('.outlineArc')
      .data(pie(this.steps))
      .enter().append('path')
      .attr('fill', 'none')
      .attr('stroke', 'none')
      .attr('class', 'outlineArc')
      .attr('d', outlineArc)

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
