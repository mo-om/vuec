<style>
  .search {
    position: relative;
    transform: translateY(200px);
    transition: all .45s;
  }
  .search.searched {
    transform: translateY(0);
  }
  .search .input {
    width: 33.33%;
    min-width: 300px;
    margin: 0 auto 2rem;
  }
</style>

<template>
  <div class="search" :class="{searched:searched}">
    <div class="input">
      <Input v-model="input" size="large" placeholder="请输入客户手机号或贷款申请号" autofocus>
        <Button slot="append" type="primary" @click="search">查 询</Button>
      </Input>
    </div>
    <result v-show="result"></result>
  </div>
</template>

<script>
  import { AppView } from 'components';
  import Result from './result';
  export default {
    data () {
      return {
        input: '',
        searched: false,
        result: false,
      }
    },
    components: {
      AppView,
      Result,
    },
    methods: {
      search () {
        this.result = true;
        this.searched = true;
      }
    }
  }
</script>
