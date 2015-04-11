<!DOCTYPE html>
<html lang="zh">
  {{ partial('partial/head') }}

  {#<body class="{% if is_home() %}home{% endif %}">#}
    <div id="full-wrap">
      <div class="container-fluid">
        {{ partial('partial/header') }}
      </div>
      <div class="container">
        {{ body }}
      </div>
    </div>
    {{ partial('partial/after_footer') }}
  </body>
</html>
