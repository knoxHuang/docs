<!DOCTYPE html>
<html lang="zh">
  {{ partial('partial/head') }}

  {#<body class="{% if is_home() %}home{% endif %}">#}
    <div id="full-wrap">
      <div class="container-fluid">
        {{ partial('partial/header') }}
      </div>
      <div class="container sidebar">
        {{ partial('partial/sidebar') }}
      </div>
      <div class="container-fluid content-wrap">
        {{ body }}
      </div>
    </div>
    {{ partial('partial/after_footer') }}
  </body>
</html>
