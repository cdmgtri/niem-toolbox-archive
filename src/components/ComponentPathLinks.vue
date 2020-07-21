
<template>
  <span>
    <b-row v-if="path.length > 0">
      <b-col>
        <span>Path: </span>
        <small>
          <span v-for="(segment, index) in path" :key="segment.label">
            <b-link :to="segment.link">{{ segment.label }}</b-link>
            <span v-if="index < path.length - 1"> / </span>
          </span>
        </small>
       </b-col>
    </b-row>
  </span>
</template>

<script>
export default {

  name: "ComponentPathLinks",

  props: {
    path: {
      type: Array,
      default: () => []
    }
  }
}
</script>
