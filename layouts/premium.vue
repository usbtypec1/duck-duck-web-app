<template>
  <main class="px-3 py-4 bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 background-animate">
    <Toast class="max-w-64"/>
    <ConfirmDialog/>
    <slot/>
  </main>
</template>

<style scoped>
.background-animate {
  background-size: 400%;

  -webkit-animation: backgroundColorAnimation 6s ease infinite;
  -moz-animation: backgroundColorAnimation 6s ease infinite;
  animation: backgroundColorAnimation 6s ease infinite;
}

@keyframes backgroundColorAnimation {
  0%,
  100% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
