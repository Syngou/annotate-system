<template>
  <div>
    <span style="border-color: black;" class="highlight">
      <span class="bottom">
        <span
          :data-label="standardType"
          :style="{
            backgroundColor: standardColor,
            color: 'black',
          }"
          class="highlight__standard"
        ></span>
        <span class="highlight__content">{{ content }} </span>
        <span
          :data-label="predictType"
          :style="{
            backgroundColor: predictColor,
            color: 'black',
          }"
          class="highlight__label"
        />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
      required: true,
    },

    standardType: {
      type: String,
      default: "",
    },
    standardColor: {
      type: String,
      default: "64FFDA",
    },
    predictColor: {
      type: String,
      default: "64FFDA",
    },
    predictType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style scoped>


.highlight.bottom {
  display: block;
  white-space: normal;
}

.highlight {
  border: 2px solid;
  margin: 4px 6px 4px 3px;
  vertical-align: middle;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: default;
  min-width: 26px;
  line-height: 22px;
  display: flex;
}

.highlight:first-child {
  margin-left: 0;
}

.highlight__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2px 2px 0 6px;
}

.highlight.bottom .highlight__content::after {
  content: " ";
  padding-right: 3px;
}

.highlight__label {
  line-height: 14px;
  padding: 0 8px;
  padding-top: 1px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: white;
}

.highlight__label::after {
  content: attr(data-label);
  display: block;
  font-size: 14px;
  -webkit-font-smoothing: subpixel-antialiased;
  letter-spacing: 0.1em;
}

.highlight__standard {
  padding: 0 8px;
  line-height: 14px;
  padding-top: 1px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: white;
}

.highlight__standard::after {
  content: attr(data-label);
  display: block;
  font-size: 14px;
  -webkit-font-smoothing: subpixel-antialiased;
  letter-spacing: 0.1em;
}
</style>
