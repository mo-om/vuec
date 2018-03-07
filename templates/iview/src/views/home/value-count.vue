<template>
  <Card
    class="value-count"
    :padding="0"
    :bordered="false"
    shadow
  >
    <div class="icon"><Icon size="48" :type="icon"></Icon></div>
    <div class="info">
      <div class="value">{{value}}</div>
      <div class="name">{{name}}</div>
    </div>
  </Card>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String
      },
      name: {
        type: String
      },
      value: {
        type: String|Number
      }
    }
  }
</script>
