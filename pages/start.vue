<template>
  <div>
    <Navbar></Navbar>
    <section id="container" class="container mx-auto">
      <svg
      :width="width"
      :height="height"
      id="wheel"
      class="block mx-auto">
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
        <div class="sm:w-1/2 mx-auto bg-purple-lightest p-8 mt-8">
          <h2
          class="text-center text-2xl md:text-3xl mb-4"
          >Done!</h2>

          <p class="text-center text-xl mb-4">Have your wheel emailed to you.</p>

          <form class="w-full max-w-sm mx-auto" @submit.prevent="handleEmailForm">
            <div class="flex items-center border-b border-b-2 border-purple py-2">
              <input
                class="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2"
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                v-model.trim="user.email"
              >
              <button
                class="flex-no-shrink bg-purple hover:bg-purple-light border-purple hover:border-purple-light text-sm border-4 text-white py-1 px-2 rounded"
                type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </transition>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Number from '~/components/Number.vue'
import * as d3 from 'd3'
import firebase from 'firebase'
import '@firebase/firestore'
import * as saveSvgAsPng from 'save-svg-as-png'
// import TWEEN from 'tween.js'

export default {
  components: {
    Navbar,
    Number
  },

  data: function () {
    return {
      width: 500,
      height: 500,
      radius: 0,
      innerRadius: 0,
      currentStep: 0,
      user: {
        email: '',
        image_url: ''
      },
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
      this.width = Math.min(document.getElementById('container').offsetWidth, 768)
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

    handleEmailForm: function () {
      const that = this

      var timeStamp = Math.floor(Date.now() / 1000)
      var imageName = `images/wheel-${timeStamp}`
      const imagesRef = firebase.storage().ref().child(imageName)
      const db = firebase.firestore()

      saveSvgAsPng.svgAsPngUri(document.getElementById('wheel'), {
        backgroundColor: 'white'
      }, function (uri) {
        imagesRef.putString(uri, 'data_url').then(function (snapshot) {
          console.log(`Uploaded! URL: ${snapshot.downloadURL}`)

          db.collection('users').add({
            email: that.user.email,
            image_url: snapshot.downloadURL
          })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        })
      })
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

    if (!firebase.apps.length) {
      firebase.initializeApp(
        {
          apiKey: process.env.APIKEY,
          authDomain: process.env.AUTHDOMAIN,
          databaseURL: process.env.DATABASEURL,
          projectId: process.env.PROJECTID,
          storageBucket: process.env.STORAGEBUCKET,
          messagingSenderId: process.env.MESSAGINGSENDERID
        }
      )
    }

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
