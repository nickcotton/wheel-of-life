<template>
  <div>
    <div class="bg-grad-4">
      <Navbar></Navbar>
      <div class="h-64 flex items-center justify-center text-white">
        <div class="text-center">
          <h1>Wheel of Life</h1>
          <h2 class="opacity-75">Interactive quiz</h2>
          <button @click="$router.push('/start')" class="bg-transparent mt-4 hover:bg-white text-white hover:text-purple-light border border-white hover:border-transparent font-semibold py-2 px-4 rounded">Get started</button>
        </div>

      </div>
      <div class="header-curve"></div>
    </div>
    <div class="container mx-auto py-8">
      <div class="w-1/2 mx-auto">
        <p class="mb-4">The Wheel of Life is a simple yet powerful visual representation of all areas of your life. It gives you a quick snapshot of the areas that are flourishing and the areas that may need more focus and attention.</p>
        <p class="mb-4">Click get started to take the quiz, it will take you about a minute to complete the quiz and your results are automatically emailed to you.</p>
        <p class="mb-2">You will be asked to rate each major aspect of your life on a scale of 1 – 10, this includes:</p>
        <ul class="mb-4">
          <li>Health</li>
          <li>Career</li>
          <li>Family & Friends</li>
          <li>Significant Other/Romance</li>
          <li>Fun & Recreation</li>
          <li>Money</li>
          <li>Personal Development/Growth</li>
          <li>Physical Environment</li>
        </ul>
        <p class="mb-4">Your answers will be plotted on the wheel for you to review.</p>
        <p class="mb-4">What's great about this tool is that you can use it again and again to re-assess and monitor the improvement in areas you find challenging.</p>
        <button @click="$router.push('/start')" class="bg-purple mt-4 hover:bg-purple-dark text-white font-semibold py-2 px-4 rounded">Get started</button>
      </div>

    </div>

    <Footer></Footer>

  </div>
</template>

<style>
  .header-curve {
    display: block;
    padding-bottom: 3%;
    background-image: url(~/assets/images/round-edge.svg);
    width: 110%;
    margin-left: -5%;
    margin-bottom: -.625rem !important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
    position: relative;
    z-index: 90;
    top: 1px;
  }

  .bg-grad-4 {
    background-image: linear-gradient(45deg, #662d8c, #ed1e79);
  }
</style>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
