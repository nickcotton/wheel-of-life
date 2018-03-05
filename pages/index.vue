<template>
  <div>
    <div class="header flex items-center h-screen">
      <section class="container mx-auto text-center">
        <div class="bg-white p-4 inline-block">
          <h1>Wheel of Life</h1>

          <button @click="$router.push('/start')" class="bg-purple mt-4 hover:bg-purple-dark text-white font-bold py-2 px-4 rounded">Start</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .header {
    padding: 400px 0;
    background-image: url(~/assets/images/flower.jpg);
    background-size: cover;
    background-position: 50% 50%;
  }
</style>
