<template>
  <div>
    <Navbar></Navbar>
    <section id="container" class="container mx-auto">
      <svg
      :width="width"
      :height="height"
      id="wheel"
      class="block mx-auto"
      :viewBox="`0, 0, ${width}, ${height}`"
      perserveAspectRatio="xMinYMid">
        <g :transform="`translate(${width / 2}, ${transformY})`">

          <circle v-for="i in 5" cx="0" cy="0" :r="( ((radius - innerRadius) * (i*2/12)) + innerRadius)" fill="none" class="text-grey-light stroke-current" />

        </g>

        <rect
          :width="width - 16"
          height="76"
          rx="4"
          ry="4"
          x="8"
          :y="`${transformY + radius}`"
          fill="none"
          class="inline-block md:hidden text-grey-light stroke-current"
        >
        </rect>

        <g
          v-for="step in steps"
          class="legend inline-block md:hidden"
          :transform="`translate(${(Math.floor(step.id / 4) * radius) + 16}, ${(Math.floor(step.id % 4) * 15) + 10 + transformY + radius})`"
        >
            <rect
              width="10"
              height="10"
              :fill="step.color"
            >

            </rect>

            <text
              font-size="14px"
              x="16"
              y="10"
            >
              {{ step.shortTitle || step.title }}
            </text>
        </g>


        <g :transform="`translate(${width / 2}, ${transformY})`">

          <path
          v-for="step in steps"
          :fill="step.color"
          class="solidArc"
          :key="step.id"
          stroke="white"
          :d="step.solidArc"
          >

          </path>

          <transition-group name="fade" tag="g">
            <text
            v-for="step in steps"
            v-if="step.score >= 1"
            font-size="12px"
            :key="step.id"
            :transform="`translate(${step.textTranslateValue.x}, ${step.textTranslateValue.y})`"
            :style="`text-anchor: ${step.textAnchor}`"
            >
              <tspan class="hidden md:inline">{{ step.title }} </tspan> <tspan style="font-weight: bold;">{{ step.score }}</tspan>
            </text>
          </transition-group>
        </g>
      </svg>
    </section>

    <section class="container mx-auto mb-8" v-if="steps[currentStep] != undefined">
      <h2
      class="text-center text-2xl md:text-3xl mb-4"
      >{{ steps[currentStep].title }}</h2>

      <p class="text-center text-xl mb-4">How would you rate this area of your life?</p>

      <div class="flex flex-wrap md:block text-center mb-4 lg:mb-8">
        <Number
          v-for="score in 10"
          :key="score"
          @click.native="submitScore(score)"
        >
          {{ score }}
        </Number>
      </div>
    </section>

    <transition name="fade">
      <section class="container mx-auto mb-8" v-if="steps[currentStep] == undefined">
        <div class="sm:w-1/2 mx-auto bg-purple-lightest p-8 mt-8">
          <h2
          class="text-center text-2xl md:text-3xl mb-4"
          >Done!</h2>

          <p class="text-center text-xl mb-4">Have your results emailed to you.</p>

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

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Number from '~/components/Number.vue'
import Footer from '~/components/Footer.vue'
import * as d3 from 'd3'
import firebase from 'firebase'
import '@firebase/firestore'
import * as saveSvgAsPng from 'save-svg-as-png'

export default {
  components: {
    Navbar,
    Number,
    Footer
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
          'title': 'Family & Friends',
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
          'title': 'Significant Other/Romance',
          'shortTitle': 'S.O/Romance',
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
          'title': 'Fun & Recreation',
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
          'title': 'Personal Development',
          'shortTitle': 'Personal Dev.',
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
          'title': 'Physical Environment',
          'shortTitle': 'Physical Env.',
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
    compHeight () {
      if (this.$mq === 'sm') return this.width + 100
      if (this.$mq === 'md') return this.width + 80
      if (this.$mq === 'lg') return Math.min(this.width, 550)
      if (this.$mq === 'xl') return Math.min(this.width, 550)
    },
    transformY () {
      if (this.$mq === 'sm') return this.height / 2 - 40
      if (this.$mq === 'md') return this.height / 2 - 80
      if (this.$mq === 'lg') return this.height / 2
      if (this.$mq === 'xl') return this.height / 2
    }
  },

  methods: {
    onResize: function () {
      this.width = Math.min(document.getElementById('container').offsetWidth, 768)
      this.radius = Math.min(this.width / 2, 250)
      // this.height = Math.min(document.getElementById('container').offsetWidth, 500)
      this.height = this.compHeight
      this.innerRadius = 0.1 * this.radius
      this.something()
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

  .page-enter-active, .page-leave-active {
    transition: all .30s ease-out;
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }
</style>
