<template>
  <transition name="loader">
    <div class="loader">
      <div class="loader__dash loader__dash_uno"></div>
      <div class="loader__dash loader__dash_dos"></div>
      <div class="loader__dash loader__dash_tres"></div>
      <div class="loader__dash loader__dash_cuatro"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoaderBlock"
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;

  &__dash {
    margin: 0 15px;
    width: 35px;
    height: 15px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 0 10px 0 #fce8b4;

    &_uno {
      margin-right: -18px;
      transform-origin: left center;
      animation: spin 3s linear infinite;
    }

    &_dos {
      transform-origin: right center;
      animation: spin2 3s linear infinite;
      animation-delay: .2s;
    }

    &_tres {
      transform-origin: right center;
      animation: spin3 3s linear infinite;
      animation-delay: .3s;
    }

    &_cuatro {
      transform-origin: right center;
      animation: spin4 3s linear infinite;
      animation-delay: .4s;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(360deg);
  }
  30% {
    transform: rotate(370deg);
  }
  35% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin2 {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-180deg);
  }
  35% {
    transform: rotate(-190deg);
  }
  40% {
    transform: rotate(-180deg);
  }
  78% {
    transform: rotate(-180deg);
  }
  95% {
    transform: rotate(-360deg);
  }
  98% {
    transform: rotate(-370deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes spin3 {
  0% {
    transform: rotate(0deg);
  }
  27% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(180deg);
  }
  45% {
    transform: rotate(190deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  80% {
    transform: rotate(370deg);
  }
  85% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin4 {
  0% {
    transform: rotate(0deg);
  }
  38% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-360deg);
  }
  65% {
    transform: rotate(-370deg);
  }
  75% {
    transform: rotate(-360deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
