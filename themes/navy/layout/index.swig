<div id="content-wrap">
  <div class="wrapper">
    <div id="content-inner">
        <div class="row-12">
            <div class="col-9">
                {{ page.content }}
                <div class="row-12">
                    <div class="col-4"><a href="{{ url_for(site.data.menu["新手教程"]) }} ) %>"> {{ site.data.menu["新手教程"] }}</a></div>
                    <div class="col-4"><a href="{{ url_for(site.data.menu["用户手册"]) }} ) %>"> {{ site.data.menu["用户手册"] }}</a></div>
                    <div class="col-4"><a href="{{ url_for(site.data.menu["API"]) }} ) %>"> {{ site.data.menu["API"] }}</a></div>
                </div>
            </div>
            <div class="col-3">
                sidebar
            </div>
        </div>
    </div>
  </div>
</div>

