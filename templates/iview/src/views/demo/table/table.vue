<template>
  <div>
    <Row class="query-bar" :gutter="14">
      <Col span="5">
        <label>商户订单号</label>
        <Input v-model="params.orderNo"></Input>
      </Col>
      <Col span="5">
        <label>交易类型</label>
        <Input v-model="params.transactionType"></Input>
      </Col>
      <Col span="5">
        <label>商户订单日期</label>
        <Input v-model="params.orderedDate"></Input>
      </Col>
      <Col span="4">
        <label>&nbsp;</label>
        <Button type="primary" :loading="loading" @click="query">
          <span v-if="!loading">查 询</span>
          <span v-else>loading...</span>
        </Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="data"></Table>
    <Page :total="100" show-elevator show-sizer></Page>
  </div>
</template>
<script>
  import { repeat } from 'utils';
  import columns  from './table-columns';
  export default {
    data () {
      return {
        loading: false,
        params: {
          orderNo: '',
          orderedDate: '',
          transactionType: '',
          reconcileDate: '',
          serialNo: '',
          amount: '',
          ealyAmount: '',
          fee: '',
          feeOwner: '',
          status: '',
          smsCount: '',
        },
        columns: columns,
        data: repeat({
          id: 1,
          orderNo: 'orderNo',
          orderedDate: 'orderedDate',
          transactionType: 'transactionType',
          reconcileDate: 'reconcileDate',
          serialNo: 'serialNo',
          amount: 'amount',
          ealyAmount: 'ealyAmount',
          fee: 'fee',
          feeOwner: 'feeOwner',
          status: 'status',
          smsCount: 'smsCount',
        },12)
      }
    },
    methods: {
      query () {
        this.loading = true;
      }
    }
  }
</script>
