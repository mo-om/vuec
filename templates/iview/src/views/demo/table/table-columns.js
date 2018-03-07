const columns = [{
  title: '商户订单号',
  key: 'orderNo',
  sortable: true,
  fixed: 'left',
  width: 150,
  render: (h, params) => {
    return h('div', {}, parseInt(Math.random()*89999+10000));
  }
},{
  title: '商户订单日期',
  key: 'orderedDate',
  width: 150,
},{
  title: '交易类型',
  key: 'transactionType',
  sortable: true,
  width: 150,
},{
  title: '对账日期',
  key: 'reconcileDate',
  width: 150,
},{
  title: '交易平台流水号',
  key: 'serialNo',
  width: 150,
},{
  title: '交易金额',
  key: 'amount',
  width: 150,
},{
  title: '原交易金额',
  key: 'ealyAmount',
  width: 150,
},{
  title: '手续费',
  key: 'fee',
  width: 150,
},{
  title: '手续费承担方类型',
  key: 'feeOwner',
  width: 150,
},{
  title: '交易状态',
  key: 'status',
  width: 150,
},{
  title: '短信个数',
  key: 'smsCount',
  width: 150,
}]

export default columns
