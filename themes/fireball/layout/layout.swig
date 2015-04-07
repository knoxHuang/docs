<!DOCTYPE html>
<html lang="zh">
{{ partial('partial/head') }}
{#<body class="{% if is_home() %}home{% endif %}">#}
<div id="full-wrap">
<div class="container-fluid">
    {{ partial('partial/header') }}
</div>
  <div class="container content-wrap">
    {{ body }}
  </div>
<div class="container-fluid footer">
    {{ partial('partial/footer') }}
</div>
</div>
  {{ partial('partial/after_footer') }}
</body>
</html>