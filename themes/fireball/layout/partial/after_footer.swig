<!-- Scripts -->
<!-- build:js build/js/main.js -->
<!-- endbuild -->
<script src="//cdnjs.cloudflare.com/ajax/libs/retina.js/1.3.0/retina.min.js" async></script>
{#{% if page.layout === 'plugins' %}#}
<!-- Plugin search -->
{#<script src="//cdn.jsdelivr.net/lunr/0.5.7/lunr.min.js"></script>#}
{#{% endif %}#}

<!--bootstrap -->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
{{ js("js/bootstrap.min.js") }}
{% if page.layout !== 'index' and page.layout !== 'category' %}
    {{ js('js/toc') }}
{% endif %}
<!-- Swiftype -->
{#<script type="text/javascript">#}
  {#(function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){#}
  {#(w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);#}
  {#e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);#}
  {#})(window,document,'script','//s.swiftypecdn.com/install/v1/st.js','_st');#}

  {#_st('install','{{ config.swiftype_key }}');#}
{#</script>#}