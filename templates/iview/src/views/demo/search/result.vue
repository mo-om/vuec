<template>
  <div class="search-result">
    <Table border :columns="columns" :data="data"></Table>
    <Page :total="100" show-elevator show-sizer></Page>
    <Modal
      v-model="modal"
      title="更换银行卡"
      @on-ok="submit"
      @on-cancel="cancel"
    >
      <h2>旧卡号码: {{row.bankcardNo}}</h2>
      <br>
      <Input v-model="bankcardNo" placeholder="输入要更换的银行卡号码" autofocus />
    </Modal>
  </div>
</template>
<script>
  import { repeat } from 'utils';
  import { AppView } from 'components';
  export default {
    data () {
      return {
        bankcardNo: '',
        modal: false,
        row: {},
        columns: [{
          title: '姓名',
          key: 'name',
          sortable: true,
        },{
          title: '手机号',
          key: 'mobile',
        },{
          title: '银行卡号',
          key: 'bankcardNo',
          sortable: true
        },{
          title: '添加时间',
          key: 'updateAt',
          sortable: true
        },{
          title: '处理状态',
          key: 'status'
        },{
          title: '操作',
          key: 'operation',
          render: (h, params) => {
            const { id, name } = params.row;
            return h('Button', {
              props: { type:'warning', size:'small' },
              on: { click:() => this.openModal(params.row) }
            }, '换卡');
          }
        }],
        data: repeat({
          id: 1,
          name: 'name',
          mobile: '18902466666',
          bankcardNo: '6226000000000000',
          updateAt: '2017-11-11 12:00:00',
          status: 'status'
        },12)
      }
    },
    components: {

    },
    methods: {
      openModal (row) {
        this.row = row;
        this.modal = true;
      },
      submit () {
        // this.modal=false;
        this.$Notice.success({
          title: '操作成功',
          desc: '@@@@@@@@@@@@@@@@@'
        });
      },
      cancel () {}
    }
  }
</script>
