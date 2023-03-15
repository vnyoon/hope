<template>
  <div>
    my test app
    <hr>

    按需引入：<Button type="primary" /> <Input />

    <hr>

    全局引入：<h-button /> <h-input />
  </div>
</template>

<script lang="ts" setup>
import { Button, Input } from "@hope/components";
</script>