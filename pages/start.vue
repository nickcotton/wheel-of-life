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
            About
          </a>
        </div>
      </div>
    </nav>

    <section class="container mx-auto">
      <svg
      :width="width"
      :height="height"
      id="wheel">
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

    <section class="container mx-auto" v-if="steps[currentStep] != undefined">
      <h2
      class="text-center text-2xl md:text-3xl mb-4"
      >{{ steps[currentStep].title }}</h2>

      <p class="text-center text-xl mb-4">How would you rate this area of your life?</p>

      <div class="text-center mb-4 lg:mb-8">
        <Number v-for="score in 10" @click.native="submitScore(score)">{{ score }}</Number>
      </div>
    </section>

    <transition name="fade">
      <section class="container mx-auto" v-if="steps[currentStep] == undefined">
        <h2
        class="text-center text-2xl md:text-3xl mb-4"
        >Done!</h2>

        <p class="text-center text-xl mb-4">Have your wheel emailed to you.</p>

        <form class="w-full max-w-sm mx-auto">
          <div class="flex items-center border-b border-b-2 border-purple py-2">
            <input class="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2" type="email" placeholder="Email address" aria-label="Email address">
            <button class="flex-no-shrink bg-purple hover:bg-purple-light border-purple hover:border-purple-light text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Send
            </button>
          </div>
        </form>
      </section>
    </transition>

    <!-- <transition name="fade">
      <section class="container mx-auto" v-if="steps[currentStep] == undefined">
        <h2
        class="text-center text-2xl md:text-3xl mb-4"
        >Done!</h2>

        <p class="text-center text-xl mb-4">Download your wheel or have it emailed to you.</p>

        <div class="flex -mx-4">
          <div class="w-1/4 px-4">
            <div class="p-4 bg-grey-lighter">
              <h3 class="font-bold text-xl mb-2">Email</h3>
              <p class="text-grey-darker text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="w-1/4 px-4">
            <div class="p-4 bg-grey-lighter">
              <h3 class="font-bold text-xl mb-2">Download</h3>
              <p class="text-grey-darker text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="w-1/4 px-4">
            <div class="p-4 bg-grey-lighter">
              <h3 class="font-bold text-xl mb-2">Share</h3>
              <p class="text-grey-darker text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="w-1/4 px-4">
            <div class="p-4 bg-grey-lighter">
              <h3 class="font-bold text-xl mb-2">Print</h3>
              <p class="text-grey-darker text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </transition> -->

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Number from '~/components/Number.vue'
import * as d3 from 'd3'
import * as saveSvgAsPng from 'save-svg-as-png'
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

    savePng: function () {
      saveSvgAsPng.saveSvgAsPng(document.getElementById('wheel'), 'diagram.png')
    },

    something: function () {
      const that = this

      this.steps.forEach(function (d) {
        d.color = d.color
        d.weight = +d.weight
        d.score = +d.score
        d.width = +d.weight
      })

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
      })
    }

  },

  mounted () {
    this.radius = Math.min(this.width, this.height) / 2

    this.innerRadius = 0.1 * this.radius

    this.something()

    window.addEventListener('resize', this.onResize)
    this.onResize()
  }
}
</script>

<style>
  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .bar {
    fill: orange;
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
