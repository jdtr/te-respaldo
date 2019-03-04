$(function () {
    //Navigation 
    var win = $(window);
        header = $("#header-main"),
        headerHeight = header.innerHeight(),
        nav = $("#nav-main"),
        navHeight = nav.innerHeight(),
        isActive = "is-active"; 

    //Functions
    function tabs (tab, elmScroll) {
        var hrefTab,
            firstTab = $(tab).first(),
            firstCont = firstTab.attr("href");
        
        firstTab.addClass(isActive);
        $(firstCont).addClass(isActive);

        $(tab).on("click", function (e) {
            e.preventDefault();
            hrefTab = $(this).attr("href");
            console.log($(hrefTab))
            $(".tab-content").removeClass(isActive);
            $(hrefTab).addClass(isActive)
            $(tab).removeClass(isActive);
            $(this).addClass(isActive);
            $("html, body").animate({ scrollTop: $(elmScroll).offset().top - 100}, 500);
        });
    }
    function tabsMob (selector, elmScroll) {
        var valTab,
            firstTab = $(selector + " option").first(),
            firstCont = firstTab.val();
        
        firstTab.prop("selected", true);
        $(firstCont).addClass(isActive);

        $(selector + " select").on("change", function () {
            valTab = $(this).val();
            console.log(valTab)
            $(".tab-content").removeClass(isActive);
            $(valTab).addClass(isActive);
            $("html, body").animate({ scrollTop: $(elmScroll).offset().top - 100}, 500);
        });
    }
    function accordion (selector) {
        $(selector).on("click", function (e) {
            e.preventDefault();

            if( $(this).hasClass(isActive) ) {
                $(this).removeClass(isActive);
                $(this).next().slideUp();
            } else {
                $(selector).removeClass(isActive)
                $(selector).next().slideUp();
                $(this).addClass(isActive);
                $(this).next().slideDown();
            }
        });
    }

    //Elementos fijos
    if( win.outerWidth() < 992 ) {
        win.on("scroll", function () {
            if ( win.scrollTop() > headerHeight ) {
                header.addClass("is-active");
                $("body").css("padding-top", headerHeight);
            } else {
                header.removeClass("is-active");
                $("body").css("padding-top", 0);
            }
        });
    } else {
        win.on("scroll", function () {
            if ( win.scrollTop() > (headerHeight + navHeight) ) {
                nav.addClass("is-fixed");
                header.css("margin-bottom", navHeight);
            } else {
                nav.removeClass("is-fixed");
                header.css("margin-bottom", 0);
            }
        });
    }

    //Menu mobile
    $("#nav-mobile").on("click", function (e) {
        e.preventDefault();
        if( $(this).hasClass(isActive) ) {
            $(this).removeClass(isActive);
            nav.removeClass(isActive);
            $("body").removeClass("overflow-hidden-mob");
        }
        else {
            $(this).addClass(isActive);
            nav.addClass(isActive);
            $("body").addClass("overflow-hidden-mob");
            $("#search-mobile").removeClass(isActive);
            $(".search-main--mob").removeClass(isActive);
        }
    });

    $("#search-mobile").on("click", function (e) {
        e.preventDefault();
        if( $(this).hasClass(isActive) ) {
            $(this).removeClass(isActive);
            $(".search-main--mob").removeClass(isActive);
        }
        else {
            $(this).addClass(isActive);
            nav.removeClass(isActive);
            $("#nav-mobile").removeClass(isActive);
            $(".search-main--mob").addClass(isActive); 
        }
    });

    //Banner Home
    var mySwiper = new Swiper('.swiper-container--banner', {
        pagination: {
            el: '.swiper-pagination--banner',
            clickable: true,
        }
    });

    //wow
    new WOW().init();

    //Quote fixed
    $("#quote-fixed_close").on("click", function (e) {
        e.preventDefault();
        $("#quote-fixed").addClass("is-hide");
    })

    //Tabs  
    tabs(".tabs-faq_item a", "#cont-accordion");
    tabsMob("#tabs-faq-mob", "#cont-accordion");
    accordion(".accordion-faq dt");

    tabs (".m-tabs_item a", ".cont-tabs");
    tabsMob(".m-tabs--mob", ".cont-tabs");
})