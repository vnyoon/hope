<template>
  <div>
    my test app
    <hr>

    按需引入：
    <br>
    <Button type="primary" />
    <br>
    <Input /> 
  
    <Icon />

    <hr>

    全局引入：<h-button /> <h-input />
  </div>
</template>

<script lang="ts" setup>
import { Button, Input, Icon } from "@hope/components";
</script>