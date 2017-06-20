<template lang="html">
  <div>
    <p>Agency由于不涉及到太多的内容操作,所以不同专门针对其做太多的页面设计,能够在一个页面解决的问题就一个页面解决</p>
    <h1>This is Agency Page</h1>
    <h2>采取综合Table</h2>
    <ul>
      <li>Agencies List</li>
      <li>Agency create Form</li>
      <li>Agency Edit Form</li>
      <li>Agency Detailinfo</li>
      <li>Contacts Belongs To Agency</li>
      <li>Agency Sample, 这里显示的samples直接跳转到samples页面,链接为: /samples?agency=agencyId, 作为sampleList的prop填充过去,或者是直接在本页面显示,利用的是samples页面的sampleList组件</li>
      <li>同理,agency的clients也采取sampleList同样的显示技术</li>
      <p>*注明: 利用专门包装的api获取子项内容, getSampels(sampleQuery).then()</p>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
