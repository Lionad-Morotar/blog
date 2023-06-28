<template>
  <div>
    <div class="example-item">
      <h2>使用 @cybercloud/ui 组件</h2>
      <h3>default</h3>

      <c-button>默认按钮</c-button>
      <c-button type="success">成功按钮</c-button>
      <c-button type="warning">警告按钮</c-button>
      <c-button type="danger">错误按钮</c-button>

      <hr />

      <h3>plain</h3>

      <c-button plain>默认按钮</c-button>
      <c-button plain type="success">成功按钮</c-button>
      <c-button plain type="warning">警告按钮</c-button>
      <c-button plain type="danger">错误按钮</c-button>

      <h3>light</h3>
      <c-button light type="success"> 成功按钮 </c-button>
      <c-button light type="warning"> 警告按钮 </c-button>
      <c-button light type="danger"> 错误按钮 </c-button>

      <h3>text</h3>

      <c-button text> 默认按钮 </c-button>
      <c-button text type="success"> 成功按钮 </c-button>
      <c-button text type="warning"> 警告按钮 </c-button>
      <c-button text type="danger"> 错误按钮 </c-button>

      <h3>disabled</h3>

      <c-button disabled>default</c-button>
      <c-button disabled type="success">success</c-button>
      <c-button disabled type="warning">warning</c-button>
      <c-button disabled type="danger">error</c-button>
      <c-button disabled plain> 点我 </c-button>
      <c-button disabled plain type="success"> 点我 </c-button>
      <c-button disabled plain type="warning"> 点我 </c-button>
      <c-button disabled plain type="danger"> 点我 </c-button>
      <c-button disabled text> 点我 </c-button>
      <c-button disabled text type="success"> 点我 </c-button>
      <c-button disabled text type="warning"> 点我 </c-button>
      <c-button disabled text type="danger"> 点我 </c-button>

      <h3>size</h3>
      <c-button size="mini">mini</c-button>
      <c-button size="small">small</c-button>
      <c-button>default</c-button>
      <c-button size="large">large</c-button>

      <h3>loading</h3>

      <c-button loading>default</c-button>
      <c-button loading type="success">success</c-button>
      <c-button loading type="warning">warning</c-button>
      <c-button loading type="danger">error</c-button>
      <c-button loading plain> 点我 </c-button>
      <c-button loading plain type="success"> 点我 </c-button>
      <c-button loading plain type="warning"> 点我 </c-button>
      <c-button loading plain type="danger"> 点我 </c-button>
      <c-button loading text> 点我 </c-button>
      <c-button loading text type="success"> 点我 </c-button>
      <c-button loading text type="warning"> 点我 </c-button>
      <c-button loading text type="danger"> 点我 </c-button>
    </div>
    <div class="example-item">
      <c-button-group>
        <c-button>按钮</c-button>
        <c-button>按钮</c-button>
        <c-button>按钮</c-button>
        <c-button>按钮</c-button>
      </c-button-group>

      <c-button-group>
        <c-button plain>按钮</c-button>
        <c-button plain>按钮</c-button>
        <c-button plain>按钮</c-button>
        <c-button plain>按钮</c-button>
      </c-button-group>
    </div>
  </div>
</template>

<script>
const click = () => {
  alert("Click ");
};

export default {
  setup() {
    const handlers = {
      click,
    };
    return {
      handlers,
    };
  },
};
</script>

<style scoped lang="less">
.example-item {
  margin-bottom: 30px;
}
</style>
