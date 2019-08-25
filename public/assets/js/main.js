(function($) {
    $(function() {
        var jcarousel = $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        var setup = function(data) {
            var html = '<ul>';

            $.each(data.items, function() {
                html += '<li><img src="' + this.src + '" alt="' + this.title + '"></li>';
            });

            html += '</ul>';

            // Append items
            jcarousel
                .html(html);

            // Reload carousel
            jcarousel
                .jcarousel('reload');
        };

        $.getJSON('data.json', setup);
        return false;
    });
})(jQuery);

//<![CDATA[
    jQuery(document).ready(function() {
        $('#scroll_list_61').show();
        $('#scroll_list_61').jcarousel({
            vertical: false,
            size: 8,
            scroll: 4,
            animation: 'normal',
            easing: 'swing',
            auto: '3',
            autoDirection: 'prev',
            wrap: 'circular',
            initCallback: $.ceScrollerMethods.fn_scroller_init_callback,
            itemVisibleOutCallback: {onBeforeAnimation: $.ceScrollerMethods.fn_scroller_in_out_callback},
            item_width: 140,
            item_height: 219,
            clip_width: 560,
            clip_height: 219,
            item_count: 8
        });
    });
    //]]>
    