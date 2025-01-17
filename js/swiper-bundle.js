var Swiper = function() {
    "use strict";
    function s(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function r(t, a) {
        void 0 === t && (t = {}),
        void 0 === a && (a = {}),
        Object.keys(a).forEach(e => {
            void 0 === t[e] ? t[e] = a[e] : s(a[e]) && s(t[e]) && 0 < Object.keys(a[e]).length && r(t[e], a[e])
        }
        )
    }
    const t = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null
        },
        querySelectorAll() {
            return []
        },
        getElementById() {
            return null
        },
        createEvent() {
            return {
                initEvent() {}
            }
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return []
                }
            }
        },
        createElementNS() {
            return {}
        },
        importNode() {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function A() {
        var e = "undefined" != typeof document ? document : {};
        return r(e, t),
        e
    }
    const y = {
        document: t,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return ""
                }
            }
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {}
        },
        requestAnimationFrame(e) {
            return "undefined" == typeof setTimeout ? (e(),
            null) : setTimeout(e, 0)
        },
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function L() {
        var e = "undefined" != typeof window ? window : {};
        return r(e, y),
        e
    }
    function T(e, t) {
        return void 0 === t && (t = 0),
        setTimeout(e, t)
    }
    function g() {
        return Date.now()
    }
    function z(e, t) {
        void 0 === t && (t = "x");
        var a = L();
        let s, r, i;
        e = function(e) {
            var t = L();
            let a;
            return a = (a = !(a = t.getComputedStyle ? t.getComputedStyle(e, null) : a) && e.currentStyle ? e.currentStyle : a) || e.style
        }(e);
        return a.WebKitCSSMatrix ? (6 < (r = e.transform || e.webkitTransform).split(",").length && (r = r.split(", ").map(e => e.replace(",", ".")).join(", ")),
        i = new a.WebKitCSSMatrix("none" === r ? "" : r)) : (i = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
        s = i.toString().split(",")),
        "x" === t && (r = a.WebKitCSSMatrix ? i.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])),
        (r = "y" === t ? a.WebKitCSSMatrix ? i.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5]) : r) || 0
    }
    function o(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }
    function u(e) {
        var t, a = Object(arguments.length <= 0 ? void 0 : e);
        const s = ["__proto__", "constructor", "prototype"];
        for (let e = 1; e < arguments.length; e += 1) {
            var r = e < 0 || arguments.length <= e ? void 0 : arguments[e];
            if (null != r && (t = r,
            !("undefined" != typeof window && void 0 !== window.HTMLElement ? t instanceof HTMLElement : t && (1 === t.nodeType || 11 === t.nodeType)))) {
                var i = Object.keys(Object(r)).filter(e => s.indexOf(e) < 0);
                for (let e = 0, t = i.length; e < t; e += 1) {
                    var l = i[e]
                      , n = Object.getOwnPropertyDescriptor(r, l);
                    void 0 !== n && n.enumerable && (o(a[l]) && o(r[l]) ? r[l].__swiper__ ? a[l] = r[l] : u(a[l], r[l]) : o(a[l]) || !o(r[l]) || (a[l] = {},
                    r[l].__swiper__) ? a[l] = r[l] : u(a[l], r[l]))
                }
            }
        }
        return a
    }
    function V(e, t, a) {
        e.style.setProperty(t, a)
    }
    function S(e) {
        let {swiper: a, targetPosition: s, side: r} = e;
        const i = L()
          , l = -a.translate;
        let n = null, o;
        const d = a.params.speed
          , p = (a.wrapperEl.style.scrollSnapType = "none",
        i.cancelAnimationFrame(a.cssModeFrameID),
        s > l ? "next" : "prev")
          , c = (e, t) => "next" === p && t <= e || "prev" === p && e <= t
          , u = () => {
            o = (new Date).getTime(),
            null === n && (n = o);
            var e = Math.max(Math.min((o - n) / d, 1), 0)
              , e = .5 - Math.cos(e * Math.PI) / 2;
            let t = l + e * (s - l);
            c(t, s) && (t = s),
            a.wrapperEl.scrollTo({
                [r]: t
            }),
            c(t, s) ? (a.wrapperEl.style.overflow = "hidden",
            a.wrapperEl.style.scrollSnapType = "",
            setTimeout( () => {
                a.wrapperEl.style.overflow = "",
                a.wrapperEl.scrollTo({
                    [r]: t
                })
            }
            ),
            i.cancelAnimationFrame(a.cssModeFrameID)) : a.cssModeFrameID = i.requestAnimationFrame(u)
        }
        ;
        u()
    }
    function l(e) {
        return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e
    }
    function F(e, t) {
        return void 0 === t && (t = ""),
        [...e.children].filter(e => e.matches(t))
    }
    function M(e, t) {
        void 0 === t && (t = []);
        e = document.createElement(e);
        return e.classList.add(...Array.isArray(t) ? t : [t]),
        e
    }
    function I(e) {
        var t = L()
          , a = A()
          , s = e.getBoundingClientRect()
          , a = a.body
          , r = e.clientTop || a.clientTop || 0
          , a = e.clientLeft || a.clientLeft || 0
          , i = e === t ? t.scrollY : e.scrollTop
          , t = e === t ? t.scrollX : e.scrollLeft;
        return {
            top: s.top + i - r,
            left: s.left + t - a
        }
    }
    function _(e, t) {
        return L().getComputedStyle(e, null).getPropertyValue(t)
    }
    function C(e) {
        let t = e, a;
        if (t) {
            for (a = 0; null !== (t = t.previousSibling); )
                1 === t.nodeType && (a += 1);
            return a
        }
    }
    function k(e, t) {
        var a = [];
        let s = e.parentElement;
        for (; s; )
            t && !s.matches(t) || a.push(s),
            s = s.parentElement;
        return a
    }
    function f(a, s) {
        s && a.addEventListener("transitionend", function e(t) {
            t.target === a && (s.call(a, t),
            a.removeEventListener("transitionend", e))
        })
    }
    function j(e, t, a) {
        var s = L();
        return a ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
    }
    let a;
    function c() {
        var e, t;
        return a = a || (e = L(),
        {
            smoothScroll: (t = A()).documentElement && t.documentElement.style && "scrollBehavior"in t.documentElement.style,
            touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        })
    }
    let i;
    function D(e) {
        return void 0 === e && (e = {}),
        i = i || function(e) {
            var e = (void 0 === e ? {} : e)["userAgent"]
              , t = c()
              , a = (i = L()).navigator.platform
              , e = e || i.navigator.userAgent
              , s = {
                ios: !1,
                android: !1
            }
              , r = i.screen.width
              , i = i.screen.height
              , l = e.match(/(Android);?[\s\/]+([\d.]+)?/);
            let n = e.match(/(iPad).*OS\s([\d_]+)/);
            var o = e.match(/(iPod)(.*OS\s([\d_]+))?/)
              , d = !n && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
              , p = "Win32" === a
              , a = "MacIntel" === a;
            return !n && a && t.touch && 0 <= ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(r + "x" + i) && (n = (n = e.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"]),
            l && !p && (s.os = "android",
            s.android = !0),
            (n || d || o) && (s.os = "ios",
            s.ios = !0),
            s
        }(e)
    }
    let e;
    function G() {
        return e = e || function() {
            const t = L();
            let e = !1;
            function a() {
                var e = t.navigator.userAgent.toLowerCase();
                return 0 <= e.indexOf("safari") && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }
            var s, r;
            return a() && (s = String(t.navigator.userAgent)).includes("Version/") && ([s,r] = s.split("Version/")[1].split(" ")[0].split(".").map(e => Number(e)),
            e = s < 16 || 16 === s && r < 2),
            {
                isSafari: e || a(),
                needPerspectiveFix: e,
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
            }
        }()
    }
    const n = (t, e) => {
        if (t && !t.destroyed && t.params) {
            const a = e.closest(t.isElement ? "swiper-slide" : "." + t.params.slideClass);
            if (a) {
                let e = a.querySelector("." + t.params.lazyPreloaderClass);
                !e && t.isElement && (a.shadowRoot ? e = a.shadowRoot.querySelector("." + t.params.lazyPreloaderClass) : requestAnimationFrame( () => {
                    a.shadowRoot && (e = a.shadowRoot.querySelector("." + t.params.lazyPreloaderClass)) && e.remove()
                }
                )),
                e && e.remove()
            }
        }
    }
      , p = (e, t) => {
        e.slides[t] && (e = e.slides[t].querySelector('[loading="lazy"]')) && e.removeAttribute("loading")
    }
      , m = a => {
        if (a && !a.destroyed && a.params) {
            var t = a.params.lazyPreloadPrevNext
              , s = a.slides.length;
            if (s && t && !(t < 0)) {
                t = Math.min(t, s);
                const n = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : Math.ceil(a.params.slidesPerView);
                var r = a.activeIndex;
                if (a.params.grid && 1 < a.params.grid.rows) {
                    const o = r
                      , d = [o - t];
                    d.push(...Array.from({
                        length: t
                    }).map( (e, t) => o + n + t)),
                    void a.slides.forEach( (e, t) => {
                        d.includes(e.column) && p(a, t)
                    }
                    )
                } else {
                    var i = r + n - 1;
                    if (a.params.rewind || a.params.loop)
                        for (let e = r - t; e <= i + t; e += 1) {
                            var l = (e % s + s) % s;
                            (l < r || i < l) && p(a, l)
                        }
                    else
                        for (let e = Math.max(r - t, 0); e <= Math.min(i + t, s - 1); e += 1)
                            e !== r && (e > i || e < r) && p(a, e)
                }
            }
        }
    }
    ;
    function H(e) {
        var {swiper: e, runCallbacks: t, direction: a, step: s} = e
          , {activeIndex: r, previousIndex: i} = e;
        let l = a;
        l = l || (i < r ? "next" : r < i ? "prev" : "reset"),
        e.emit("transition" + s),
        t && r !== i && ("reset" === l ? e.emit("slideResetTransition" + s) : (e.emit("slideChangeTransition" + s),
        "next" === l ? e.emit("slideNextTransition" + s) : e.emit("slidePrevTransition" + s)))
    }
    function X(s, e) {
        return function e(t) {
            var a;
            return t && t !== A() && t !== L() && ((a = (t = t.assignedSlot || t).closest(s)) || t.getRootNode) ? a || e(t.getRootNode().host) : null
        }(e = void 0 === e ? this : e)
    }
    function $() {
        const e = this;
        var t, a, s, r, {params: i, el: l} = e;
        l && 0 === l.offsetWidth || (i.breakpoints && e.setBreakpoint(),
        {allowSlideNext: l, allowSlidePrev: t, snapGrid: a} = e,
        s = e.virtual && e.params.virtual.enabled,
        e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        r = s && i.loop,
        !("auto" === i.slidesPerView || 1 < i.slidesPerView) || !e.isEnd || e.isBeginning || e.params.centeredSlides || r ? e.params.loop && !s ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
        e.autoplay.resizeTimeout = setTimeout( () => {
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
        }
        , 500)),
        e.allowSlidePrev = t,
        e.allowSlideNext = l,
        e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow())
    }
    let N = !1;
    function Y() {}
    const B = (e, t) => {
        var a = A()
          , {params: s, el: r, wrapperEl: i, device: l} = e
          , n = !!s.nested
          , o = "on" === t ? "addEventListener" : "removeEventListener";
        r[o]("pointerdown", e.onTouchStart, {
            passive: !1
        }),
        a[o]("pointermove", e.onTouchMove, {
            passive: !1,
            capture: n
        }),
        a[o]("pointerup", e.onTouchEnd, {
            passive: !0
        }),
        a[o]("pointercancel", e.onTouchEnd, {
            passive: !0
        }),
        a[o]("pointerout", e.onTouchEnd, {
            passive: !0
        }),
        a[o]("pointerleave", e.onTouchEnd, {
            passive: !0
        }),
        a[o]("contextmenu", e.onTouchEnd, {
            passive: !0
        }),
        (s.preventClicks || s.preventClicksPropagation) && r[o]("click", e.onClick, !0),
        s.cssMode && i[o]("scroll", e.onScroll),
        s.updateOnWindowResize ? e[t](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", $, !0) : e[t]("observerUpdate", $, !0),
        r[o]("load", e.onLoad, {
            capture: !0
        })
    }
    ;
    const R = (e, t) => e.grid && t.grid && 1 < t.grid.rows;
    var q = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopedSlides: null,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
    const d = {
        eventsEmitter: {
            on(e, t, a) {
                const s = this;
                if (s.eventsListeners && !s.destroyed && "function" == typeof t) {
                    const r = a ? "unshift" : "push";
                    e.split(" ").forEach(e => {
                        s.eventsListeners[e] || (s.eventsListeners[e] = []),
                        s.eventsListeners[e][r](t)
                    }
                    )
                }
                return s
            },
            once(s, r, e) {
                const i = this;
                return !i.eventsListeners || i.destroyed || "function" != typeof r ? i : (l.__emitterProxy = r,
                i.on(s, l, e));
                function l() {
                    i.off(s, l),
                    l.__emitterProxy && delete l.__emitterProxy;
                    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                        t[a] = arguments[a];
                    r.apply(i, t)
                }
            },
            onAny(e, t) {
                var a = this;
                return a.eventsListeners && !a.destroyed && "function" == typeof e && (t = t ? "unshift" : "push",
                a.eventsAnyListeners.indexOf(e) < 0) && a.eventsAnyListeners[t](e),
                a
            },
            offAny(e) {
                var t = this;
                return t.eventsListeners && !t.destroyed && t.eventsAnyListeners && 0 <= (e = t.eventsAnyListeners.indexOf(e)) && t.eventsAnyListeners.splice(e, 1),
                t
            },
            off(e, s) {
                const r = this;
                return r.eventsListeners && !r.destroyed && r.eventsListeners && e.split(" ").forEach(a => {
                    void 0 === s ? r.eventsListeners[a] = [] : r.eventsListeners[a] && r.eventsListeners[a].forEach( (e, t) => {
                        (e === s || e.__emitterProxy && e.__emitterProxy === s) && r.eventsListeners[a].splice(t, 1)
                    }
                    )
                }
                ),
                r
            },
            emit() {
                const r = this;
                if (r.eventsListeners && !r.destroyed && r.eventsListeners) {
                    let e, a, s;
                    for (var t = arguments.length, i = new Array(t), l = 0; l < t; l++)
                        i[l] = arguments[l];
                    s = "string" == typeof i[0] || Array.isArray(i[0]) ? (e = i[0],
                    a = i.slice(1, i.length),
                    r) : (e = i[0].events,
                    a = i[0].data,
                    i[0].context || r),
                    a.unshift(s),
                    (Array.isArray(e) ? e : e.split(" ")).forEach(t => {
                        r.eventsAnyListeners && r.eventsAnyListeners.length && r.eventsAnyListeners.forEach(e => {
                            e.apply(s, [t, ...a])
                        }
                        ),
                        r.eventsListeners && r.eventsListeners[t] && r.eventsListeners[t].forEach(e => {
                            e.apply(s, a)
                        }
                        )
                    }
                    )
                }
                return r
            }
        },
        update: {
            updateSize: function() {
                var e = this;
                let t, a;
                var s = e.el;
                t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : s.clientWidth,
                a = void 0 !== e.params.height && null !== e.params.height ? e.params.height : s.clientHeight,
                0 === t && e.isHorizontal() || 0 === a && e.isVertical() || (t = t - parseInt(_(s, "padding-left") || 0, 10) - parseInt(_(s, "padding-right") || 0, 10),
                a = a - parseInt(_(s, "padding-top") || 0, 10) - parseInt(_(s, "padding-bottom") || 0, 10),
                Number.isNaN(t) && (t = 0),
                Number.isNaN(a) && (a = 0),
                Object.assign(e, {
                    width: t,
                    height: a,
                    size: e.isHorizontal() ? t : a
                }))
            },
            updateSlides: function() {
                const s = this;
                function r(e) {
                    return s.isHorizontal() ? e : {
                        width: "height",
                        "margin-top": "margin-left",
                        "margin-bottom ": "margin-right",
                        "margin-left": "margin-top",
                        "margin-right": "margin-bottom",
                        "padding-left": "padding-top",
                        "padding-right": "padding-bottom",
                        marginRight: "marginBottom"
                    }[e]
                }
                function i(e, t) {
                    return parseFloat(e.getPropertyValue(r(t)) || 0)
                }
                const l = s.params
                  , {wrapperEl: e, slidesEl: a, size: n, rtlTranslate: t, wrongRTL: X} = s;
                var o = s.virtual && l.virtual.enabled
                  , d = (o ? s.virtual : s).slides.length;
                const p = F(a, `.${s.params.slideClass}, swiper-slide`);
                var c = (o ? s.virtual.slides : p).length;
                let u = [];
                const m = [];
                var h = [];
                let v = l.slidesOffsetBefore
                  , f = ("function" == typeof v && (v = l.slidesOffsetBefore.call(s)),
                l.slidesOffsetAfter);
                "function" == typeof f && (f = l.slidesOffsetAfter.call(s));
                var g = s.snapGrid.length
                  , $ = s.slidesGrid.length;
                let w = l.spaceBetween
                  , b = -v
                  , y = 0
                  , E = 0;
                if (void 0 !== n) {
                    "string" == typeof w && 0 <= w.indexOf("%") ? w = parseFloat(w.replace("%", "")) / 100 * n : "string" == typeof w && (w = parseFloat(w)),
                    s.virtualSize = -w,
                    p.forEach(e => {
                        t ? e.style.marginLeft = "" : e.style.marginRight = "",
                        e.style.marginBottom = "",
                        e.style.marginTop = ""
                    }
                    ),
                    l.centeredSlides && l.cssMode && (V(e, "--swiper-centered-offset-before", ""),
                    V(e, "--swiper-centered-offset-after", ""));
                    var x = l.grid && 1 < l.grid.rows && s.grid;
                    x && s.grid.initSlides(c);
                    let a;
                    var S, T, M, C, P, L, z, A, I, N = "auto" === l.slidesPerView && l.breakpoints && 0 < Object.keys(l.breakpoints).filter(e => void 0 !== l.breakpoints[e].slidesPerView).length;
                    for (let t = 0; t < c; t += 1) {
                        a = 0;
                        let e;
                        p[t] && (e = p[t]),
                        x && s.grid.updateSlide(t, e, c, r),
                        p[t] && "none" === _(e, "display") || ("auto" === l.slidesPerView ? (N && (p[t].style[r("width")] = ""),
                        A = getComputedStyle(e),
                        S = e.style.transform,
                        T = e.style.webkitTransform,
                        S && (e.style.transform = "none"),
                        T && (e.style.webkitTransform = "none"),
                        a = l.roundLengths ? s.isHorizontal() ? j(e, "width", !0) : j(e, "height", !0) : (M = i(A, "width"),
                        C = i(A, "padding-left"),
                        P = i(A, "padding-right"),
                        L = i(A, "margin-left"),
                        z = i(A, "margin-right"),
                        (A = A.getPropertyValue("box-sizing")) && "border-box" === A ? M + L + z : ({clientWidth: A, offsetWidth: I} = e,
                        M + C + P + L + z + (I - A))),
                        S && (e.style.transform = S),
                        T && (e.style.webkitTransform = T),
                        l.roundLengths && (a = Math.floor(a))) : (a = (n - (l.slidesPerView - 1) * w) / l.slidesPerView,
                        l.roundLengths && (a = Math.floor(a)),
                        p[t] && (p[t].style[r("width")] = a + "px")),
                        p[t] && (p[t].swiperSlideSize = a),
                        h.push(a),
                        l.centeredSlides ? (b = b + a / 2 + y / 2 + w,
                        0 === y && 0 !== t && (b = b - n / 2 - w),
                        0 === t && (b = b - n / 2 - w),
                        Math.abs(b) < .001 && (b = 0),
                        l.roundLengths && (b = Math.floor(b)),
                        E % l.slidesPerGroup == 0 && u.push(b),
                        m.push(b)) : (l.roundLengths && (b = Math.floor(b)),
                        (E - Math.min(s.params.slidesPerGroupSkip, E)) % s.params.slidesPerGroup == 0 && u.push(b),
                        m.push(b),
                        b = b + a + w),
                        s.virtualSize += a + w,
                        y = a,
                        E += 1)
                    }
                    if (s.virtualSize = Math.max(s.virtualSize, n) + f,
                    t && X && ("slide" === l.effect || "coverflow" === l.effect) && (e.style.width = s.virtualSize + w + "px"),
                    l.setWrapperSize && (e.style[r("width")] = s.virtualSize + w + "px"),
                    x && s.grid.updateWrapperSize(a, u, r),
                    !l.centeredSlides) {
                        var k = [];
                        for (let t = 0; t < u.length; t += 1) {
                            let e = u[t];
                            l.roundLengths && (e = Math.floor(e)),
                            u[t] <= s.virtualSize - n && k.push(e)
                        }
                        u = k,
                        1 < Math.floor(s.virtualSize - n) - Math.floor(u[u.length - 1]) && u.push(s.virtualSize - n)
                    }
                    if (o && l.loop) {
                        var O = h[0] + w;
                        if (1 < l.slidesPerGroup) {
                            var Y = Math.ceil((s.virtual.slidesBefore + s.virtual.slidesAfter) / l.slidesPerGroup)
                              , B = O * l.slidesPerGroup;
                            for (let e = 0; e < Y; e += 1)
                                u.push(u[u.length - 1] + B)
                        }
                        for (let e = 0; e < s.virtual.slidesBefore + s.virtual.slidesAfter; e += 1)
                            1 === l.slidesPerGroup && u.push(u[u.length - 1] + O),
                            m.push(m[m.length - 1] + O),
                            s.virtualSize += O
                    }
                    if (0 === u.length && (u = [0]),
                    0 !== w) {
                        const D = s.isHorizontal() && t ? "marginLeft" : r("marginRight");
                        p.filter( (e, t) => !(l.cssMode && !l.loop) || t !== p.length - 1).forEach(e => {
                            e.style[D] = w + "px"
                        }
                        )
                    }
                    if (l.centeredSlides && l.centeredSlidesBounds) {
                        let t = 0;
                        h.forEach(e => {
                            t += e + (w || 0)
                        }
                        );
                        const G = (t -= w) - n;
                        u = u.map(e => e <= 0 ? -v : e > G ? G + f : e)
                    }
                    if (l.centerInsufficientSlides) {
                        let t = 0;
                        if (h.forEach(e => {
                            t += e + (w || 0)
                        }
                        ),
                        (t -= w) < n) {
                            const H = (n - t) / 2;
                            u.forEach( (e, t) => {
                                u[t] = e - H
                            }
                            ),
                            m.forEach( (e, t) => {
                                m[t] = e + H
                            }
                            )
                        }
                    }
                    if (Object.assign(s, {
                        slides: p,
                        snapGrid: u,
                        slidesGrid: m,
                        slidesSizesGrid: h
                    }),
                    l.centeredSlides && l.cssMode && !l.centeredSlidesBounds) {
                        V(e, "--swiper-centered-offset-before", -u[0] + "px"),
                        V(e, "--swiper-centered-offset-after", s.size / 2 - h[h.length - 1] / 2 + "px");
                        const R = -s.snapGrid[0]
                          , q = -s.slidesGrid[0];
                        s.snapGrid = s.snapGrid.map(e => e + R),
                        s.slidesGrid = s.slidesGrid.map(e => e + q)
                    }
                    c !== d && s.emit("slidesLengthChange"),
                    u.length !== g && (s.params.watchOverflow && s.checkOverflow(),
                    s.emit("snapGridLengthChange")),
                    m.length !== $ && s.emit("slidesGridLengthChange"),
                    l.watchSlidesProgress && s.updateSlidesOffset(),
                    o || l.cssMode || "slide" !== l.effect && "fade" !== l.effect || (d = l.containerModifierClass + "backface-hidden",
                    g = s.el.classList.contains(d),
                    c <= l.maxBackfaceHiddenSlides ? g || s.el.classList.add(d) : g && s.el.classList.remove(d))
                }
            },
            updateAutoHeight: function(e) {
                const t = this
                  , a = []
                  , s = t.virtual && t.params.virtual.enabled;
                let r = 0, i;
                "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                var l, n = e => s ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
                if ("auto" !== t.params.slidesPerView && 1 < t.params.slidesPerView)
                    if (t.params.centeredSlides)
                        (t.visibleSlides || []).forEach(e => {
                            a.push(e)
                        }
                        );
                    else
                        for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                            var o = t.activeIndex + i;
                            if (o > t.slides.length && !s)
                                break;
                            a.push(n(o))
                        }
                else
                    a.push(n(t.activeIndex));
                for (i = 0; i < a.length; i += 1)
                    void 0 !== a[i] && (l = a[i].offsetHeight,
                    r = l > r ? l : r);
                !r && 0 !== r || (t.wrapperEl.style.height = r + "px")
            },
            updateSlidesOffset: function() {
                var t = this
                  , a = t.slides
                  , s = t.isElement ? t.isHorizontal() ? t.wrapperEl.offsetLeft : t.wrapperEl.offsetTop : 0;
                for (let e = 0; e < a.length; e += 1)
                    a[e].swiperSlideOffset = (t.isHorizontal() ? a[e].offsetLeft : a[e].offsetTop) - s - t.cssOverflowAdjustment()
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                var r = this;
                const i = r.params;
                var {slides: l, rtlTranslate: n, snapGrid: o} = r;
                if (0 !== l.length) {
                    void 0 === l[0].swiperSlideOffset && r.updateSlidesOffset();
                    let a = n ? e : -e
                      , s = (l.forEach(e => {
                        e.classList.remove(i.slideVisibleClass)
                    }
                    ),
                    r.visibleSlidesIndexes = [],
                    r.visibleSlides = [],
                    i.spaceBetween);
                    "string" == typeof s && 0 <= s.indexOf("%") ? s = parseFloat(s.replace("%", "")) / 100 * r.size : "string" == typeof s && (s = parseFloat(s));
                    for (let t = 0; t < l.length; t += 1) {
                        var d = l[t];
                        let e = d.swiperSlideOffset;
                        i.cssMode && i.centeredSlides && (e -= l[0].swiperSlideOffset);
                        var p = (a + (i.centeredSlides ? r.minTranslate() : 0) - e) / (d.swiperSlideSize + s)
                          , c = (a - o[0] + (i.centeredSlides ? r.minTranslate() : 0) - e) / (d.swiperSlideSize + s)
                          , u = -(a - e)
                          , m = u + r.slidesSizesGrid[t];
                        (0 <= u && u < r.size - 1 || 1 < m && m <= r.size || u <= 0 && m >= r.size) && (r.visibleSlides.push(d),
                        r.visibleSlidesIndexes.push(t),
                        l[t].classList.add(i.slideVisibleClass)),
                        d.progress = n ? -p : p,
                        d.originalProgress = n ? -c : c
                    }
                }
            },
            updateProgress: function(e) {
                var t = this
                  , a = (void 0 === e && (a = t.rtlTranslate ? -1 : 1,
                e = t && t.translate && t.translate * a || 0),
                t.params)
                  , s = t.maxTranslate() - t.minTranslate();
                let {progress: r, isBeginning: i, isEnd: l, progressLoop: n} = t;
                var o, d, p, c = i, u = l;
                0 == s ? (r = 0,
                i = !0,
                l = !0) : (r = (e - t.minTranslate()) / s,
                s = Math.abs(e - t.minTranslate()) < 1,
                o = Math.abs(e - t.maxTranslate()) < 1,
                i = s || r <= 0,
                l = o || 1 <= r,
                s && (r = 0),
                o && (r = 1)),
                a.loop && (s = t.getSlideIndexByData(0),
                o = t.getSlideIndexByData(t.slides.length - 1),
                s = t.slidesGrid[s],
                o = t.slidesGrid[o],
                d = t.slidesGrid[t.slidesGrid.length - 1],
                p = Math.abs(e),
                1 < (n = s <= p ? (p - s) / d : (p + d - o) / d)) && --n,
                Object.assign(t, {
                    progress: r,
                    progressLoop: n,
                    isBeginning: i,
                    isEnd: l
                }),
                (a.watchSlidesProgress || a.centeredSlides && a.autoHeight) && t.updateSlidesProgress(e),
                i && !c && t.emit("reachBeginning toEdge"),
                l && !u && t.emit("reachEnd toEdge"),
                (c && !i || u && !l) && t.emit("fromEdge"),
                t.emit("progress", r)
            },
            updateSlidesClasses: function() {
                var t = this;
                const {slides: a, params: s, slidesEl: r, activeIndex: i} = t;
                var e = t.virtual && s.virtual.enabled
                  , l = e => F(r, `.${s.slideClass}${e}, swiper-slide` + e)[0];
                a.forEach(e => {
                    e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
                }
                );
                let n;
                if (e)
                    if (s.loop) {
                        let e = i - t.virtual.slidesBefore;
                        (e = e < 0 ? t.virtual.slides.length + e : e) >= t.virtual.slides.length && (e -= t.virtual.slides.length),
                        n = l(`[data-swiper-slide-index="${e}"]`)
                    } else
                        n = l(`[data-swiper-slide-index="${i}"]`);
                else
                    n = a[i];
                if (n) {
                    n.classList.add(s.slideActiveClass);
                    let e = function(e, t) {
                        for (var a = []; e.nextElementSibling; ) {
                            var s = e.nextElementSibling;
                            (!t || s.matches(t)) && a.push(s),
                            e = s
                        }
                        return a
                    }(n, `.${s.slideClass}, swiper-slide`)[0]
                      , t = ((e = s.loop && !e ? a[0] : e) && e.classList.add(s.slideNextClass),
                    function(e, t) {
                        for (var a = []; e.previousElementSibling; ) {
                            var s = e.previousElementSibling;
                            (!t || s.matches(t)) && a.push(s),
                            e = s
                        }
                        return a
                    }(n, `.${s.slideClass}, swiper-slide`)[0]);
                    (t = s.loop && 0 === !t ? a[a.length - 1] : t) && t.classList.add(s.slidePrevClass)
                }
                t.emitSlidesClasses()
            },
            updateActiveIndex: function(t) {
                const a = this;
                var e = a.rtlTranslate ? a.translate : -a.translate
                  , {snapGrid: s, params: r, activeIndex: i, realIndex: l, snapIndex: n} = a;
                let o = t, d;
                if (t = e => {
                    let t = e - a.virtual.slidesBefore;
                    return (t = t < 0 ? a.virtual.slides.length + t : t) >= a.virtual.slides.length && (t -= a.virtual.slides.length),
                    t
                }
                ,
                void 0 === o && (o = function(e) {
                    var {slidesGrid: t, params: a} = e
                      , s = e.rtlTranslate ? e.translate : -e.translate;
                    let r;
                    for (let e = 0; e < t.length; e += 1)
                        void 0 !== t[e + 1] ? s >= t[e] && s < t[e + 1] - (t[e + 1] - t[e]) / 2 ? r = e : s >= t[e] && s < t[e + 1] && (r = e + 1) : s >= t[e] && (r = e);
                    return r = a.normalizeSlideIndex && (r < 0 || void 0 === r) ? 0 : r
                }(a)),
                (d = 0 <= s.indexOf(e) ? s.indexOf(e) : (e = Math.min(r.slidesPerGroupSkip, o)) + Math.floor((o - e) / r.slidesPerGroup)) >= s.length && (d = s.length - 1),
                o === i)
                    d !== n && (a.snapIndex = d,
                    a.emit("snapIndexChange")),
                    a.params.loop && a.virtual && a.params.virtual.enabled && (a.realIndex = t(o));
                else {
                    let e;
                    e = a.virtual && r.virtual.enabled && r.loop ? t(o) : a.slides[o] ? parseInt(a.slides[o].getAttribute("data-swiper-slide-index") || o, 10) : o,
                    Object.assign(a, {
                        previousSnapIndex: n,
                        snapIndex: d,
                        previousRealIndex: l,
                        realIndex: e,
                        previousIndex: i,
                        activeIndex: o
                    }),
                    a.initialized && m(a),
                    a.emit("activeIndexChange"),
                    a.emit("snapIndexChange"),
                    (a.initialized || a.params.runCallbacksOnInit) && (l !== e && a.emit("realIndexChange"),
                    a.emit("slideChange"))
                }
            },
            updateClickedSlide: function(e, t) {
                var a = this;
                const s = a.params;
                let r = e.closest(`.${s.slideClass}, swiper-slide`), i = (!r && a.isElement && t && 1 < t.length && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach(e => {
                    !r && e.matches && e.matches(`.${s.slideClass}, swiper-slide`) && (r = e)
                }
                ),
                !1), l;
                if (r)
                    for (let e = 0; e < a.slides.length; e += 1)
                        if (a.slides[e] === r) {
                            i = !0,
                            l = e;
                            break
                        }
                r && i ? (a.clickedSlide = r,
                a.virtual && a.params.virtual.enabled ? a.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : a.clickedIndex = l,
                s.slideToClickedSlide && void 0 !== a.clickedIndex && a.clickedIndex !== a.activeIndex && a.slideToClickedSlide()) : (a.clickedSlide = void 0,
                a.clickedIndex = void 0)
            }
        },
        translate: {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                var {params: t, rtlTranslate: a, translate: s, wrapperEl: r} = this;
                if (t.virtualTranslate)
                    return a ? -s : s;
                if (t.cssMode)
                    return s;
                let i = z(r, e);
                return i += this.cssOverflowAdjustment(),
                (i = a ? -i : i) || 0
            },
            setTranslate: function(e, t) {
                var a = this
                  , {rtlTranslate: s, params: r, wrapperEl: i, progress: l} = a;
                let n = 0
                  , o = 0;
                a.isHorizontal() ? n = s ? -e : e : o = e,
                r.roundLengths && (n = Math.floor(n),
                o = Math.floor(o)),
                a.previousTranslate = a.translate,
                a.translate = a.isHorizontal() ? n : o,
                r.cssMode ? i[a.isHorizontal() ? "scrollLeft" : "scrollTop"] = a.isHorizontal() ? -n : -o : r.virtualTranslate || (a.isHorizontal() ? n -= a.cssOverflowAdjustment() : o -= a.cssOverflowAdjustment(),
                i.style.transform = `translate3d(${n}px, ${o}px, 0px)`);
                let d;
                s = a.maxTranslate() - a.minTranslate(),
                (d = 0 == s ? 0 : (e - a.minTranslate()) / s) !== l && a.updateProgress(e),
                a.emit("setTranslate", a.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(e, t, a, s, r) {
                void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0),
                void 0 === s && (s = !0);
                const i = this;
                var {params: l, wrapperEl: n} = i;
                if (i.animating && l.preventInteractionOnTransition)
                    return !1;
                var o = i.minTranslate()
                  , d = i.maxTranslate();
                let p;
                if (p = s && o < e ? o : s && e < d ? d : e,
                i.updateProgress(p),
                l.cssMode) {
                    o = i.isHorizontal();
                    if (0 === t)
                        n[o ? "scrollLeft" : "scrollTop"] = -p;
                    else {
                        if (!i.support.smoothScroll)
                            return S({
                                swiper: i,
                                targetPosition: -p,
                                side: o ? "left" : "top"
                            }),
                            !0;
                        n.scrollTo({
                            [o ? "left" : "top"]: -p,
                            behavior: "smooth"
                        })
                    }
                } else
                    0 === t ? (i.setTransition(0),
                    i.setTranslate(p),
                    a && (i.emit("beforeTransitionStart", t, r),
                    i.emit("transitionEnd"))) : (i.setTransition(t),
                    i.setTranslate(p),
                    a && (i.emit("beforeTransitionStart", t, r),
                    i.emit("transitionStart")),
                    i.animating || (i.animating = !0,
                    i.onTranslateToWrapperTransitionEnd || (i.onTranslateToWrapperTransitionEnd = function(e) {
                        i && !i.destroyed && e.target === this && (i.wrapperEl.removeEventListener("transitionend", i.onTranslateToWrapperTransitionEnd),
                        i.onTranslateToWrapperTransitionEnd = null,
                        delete i.onTranslateToWrapperTransitionEnd,
                        a) && i.emit("transitionEnd")
                    }
                    ),
                    i.wrapperEl.addEventListener("transitionend", i.onTranslateToWrapperTransitionEnd)));
                return !0
            }
        },
        transition: {
            setTransition: function(e, t) {
                this.params.cssMode || (this.wrapperEl.style.transitionDuration = e + "ms",
                this.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""),
                this.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                var a = this["params"];
                a.cssMode || (a.autoHeight && this.updateAutoHeight(),
                H({
                    swiper: this,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                var a = this["params"];
                this.animating = !1,
                a.cssMode || (this.setTransition(0),
                H({
                    swiper: this,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
            }
        },
        slide: {
            slideTo: function(e, t, a, s, r) {
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0),
                "string" == typeof (e = void 0 === e ? 0 : e) && (e = parseInt(e, 10));
                const i = this;
                let l = e;
                l < 0 && (l = 0);
                const {params: n, snapGrid: o, slidesGrid: d, previousIndex: p, activeIndex: c, rtlTranslate: u, wrapperEl: m, enabled: h} = i;
                if (i.animating && n.preventInteractionOnTransition || !h && !s && !r)
                    return !1;
                let v = (e = Math.min(i.params.slidesPerGroupSkip, l)) + Math.floor((l - e) / i.params.slidesPerGroup);
                var f = -o[v = v >= o.length ? o.length - 1 : v];
                if (n.normalizeSlideIndex)
                    for (let e = 0; e < d.length; e += 1) {
                        var g = -Math.floor(100 * f)
                          , w = Math.floor(100 * d[e])
                          , b = Math.floor(100 * d[e + 1]);
                        void 0 !== d[e + 1] ? w <= g && g < b - (b - w) / 2 ? l = e : w <= g && g < b && (l = e + 1) : w <= g && (l = e)
                    }
                if (i.initialized && l !== c) {
                    if (!i.allowSlideNext && (u ? f > i.translate && f > i.minTranslate() : f < i.translate && f < i.minTranslate()))
                        return !1;
                    if (!i.allowSlidePrev && f > i.translate && f > i.maxTranslate() && (c || 0) !== l)
                        return !1
                }
                l !== (p || 0) && a && i.emit("beforeSlideChangeStart"),
                i.updateProgress(f);
                let y;
                if (y = l > c ? "next" : l < c ? "prev" : "reset",
                u && -f === i.translate || !u && f === i.translate)
                    return i.updateActiveIndex(l),
                    n.autoHeight && i.updateAutoHeight(),
                    i.updateSlidesClasses(),
                    "slide" !== n.effect && i.setTranslate(f),
                    "reset" !== y && (i.transitionStart(a, y),
                    i.transitionEnd(a, y)),
                    !1;
                if (n.cssMode) {
                    const E = i.isHorizontal()
                      , x = u ? f : -f;
                    if (0 === t) {
                        r = i.virtual && i.params.virtual.enabled;
                        r && (i.wrapperEl.style.scrollSnapType = "none",
                        i._immediateVirtual = !0),
                        r && !i._cssModeVirtualInitialSet && 0 < i.params.initialSlide ? (i._cssModeVirtualInitialSet = !0,
                        requestAnimationFrame( () => {
                            m[E ? "scrollLeft" : "scrollTop"] = x
                        }
                        )) : m[E ? "scrollLeft" : "scrollTop"] = x,
                        r && requestAnimationFrame( () => {
                            i.wrapperEl.style.scrollSnapType = "",
                            i._immediateVirtual = !1
                        }
                        )
                    } else {
                        if (!i.support.smoothScroll)
                            return S({
                                swiper: i,
                                targetPosition: x,
                                side: E ? "left" : "top"
                            }),
                            !0;
                        m.scrollTo({
                            [E ? "left" : "top"]: x,
                            behavior: "smooth"
                        })
                    }
                } else
                    i.setTransition(t),
                    i.setTranslate(f),
                    i.updateActiveIndex(l),
                    i.updateSlidesClasses(),
                    i.emit("beforeTransitionStart", t, s),
                    i.transitionStart(a, y),
                    0 === t ? i.transitionEnd(a, y) : i.animating || (i.animating = !0,
                    i.onSlideToWrapperTransitionEnd || (i.onSlideToWrapperTransitionEnd = function(e) {
                        i && !i.destroyed && e.target === this && (i.wrapperEl.removeEventListener("transitionend", i.onSlideToWrapperTransitionEnd),
                        i.onSlideToWrapperTransitionEnd = null,
                        delete i.onSlideToWrapperTransitionEnd,
                        i.transitionEnd(a, y))
                    }
                    ),
                    i.wrapperEl.addEventListener("transitionend", i.onSlideToWrapperTransitionEnd));
                return !0
            },
            slideToLoop: function(e, t, a, s) {
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0);
                var r = this;
                let i = e = "string" == typeof (e = void 0 === e ? 0 : e) ? parseInt(e, 10) : e;
                return r.params.loop && (r.virtual && r.params.virtual.enabled ? i += r.virtual.slidesBefore : i = r.getSlideIndexByData(i)),
                r.slideTo(i, t, a, s)
            },
            slideNext: function(e, t, a) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                const s = this;
                var {enabled: r, params: i, animating: l} = s;
                if (!r)
                    return s;
                let n = i.slidesPerGroup;
                "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (n = Math.max(s.slidesPerViewDynamic("current", !0), 1));
                const o = s.activeIndex < i.slidesPerGroupSkip ? 1 : n;
                if (r = s.virtual && i.virtual.enabled,
                i.loop) {
                    if (l && !r && i.loopPreventsSliding)
                        return !1;
                    if (s.loopFix({
                        direction: "next"
                    }),
                    s._clientLeft = s.wrapperEl.clientLeft,
                    s.activeIndex === s.slides.length - 1 && i.cssMode)
                        return requestAnimationFrame( () => {
                            s.slideTo(s.activeIndex + o, e, t, a)
                        }
                        ),
                        !0
                }
                return i.rewind && s.isEnd ? s.slideTo(0, e, t, a) : s.slideTo(s.activeIndex + o, e, t, a)
            },
            slidePrev: function(e, t, a) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                const s = this;
                var {params: r, snapGrid: i, slidesGrid: l, rtlTranslate: n, enabled: o, animating: d} = s;
                if (!o)
                    return s;
                if (o = s.virtual && r.virtual.enabled,
                r.loop) {
                    if (d && !o && r.loopPreventsSliding)
                        return !1;
                    s.loopFix({
                        direction: "prev"
                    }),
                    s._clientLeft = s.wrapperEl.clientLeft
                }
                function p(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                const c = p(n ? s.translate : -s.translate);
                d = i.map(e => p(e));
                let u = i[d.indexOf(c) - 1];
                if (void 0 === u && r.cssMode) {
                    let a;
                    i.forEach( (e, t) => {
                        c >= e && (a = t)
                    }
                    ),
                    void 0 !== a && (u = i[0 < a ? a - 1 : a])
                }
                let m = 0;
                return void 0 !== u && ((m = l.indexOf(u)) < 0 && (m = s.activeIndex - 1),
                "auto" === r.slidesPerView) && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (m = m - s.slidesPerViewDynamic("previous", !0) + 1,
                m = Math.max(m, 0)),
                r.rewind && s.isBeginning ? (o = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1,
                s.slideTo(o, e, t, a)) : r.loop && 0 === s.activeIndex && r.cssMode ? (requestAnimationFrame( () => {
                    s.slideTo(m, e, t, a)
                }
                ),
                !0) : s.slideTo(m, e, t, a)
            },
            slideReset: function(e, t, a) {
                return void 0 === e && (e = this.params.speed),
                this.slideTo(this.activeIndex, e, t = void 0 === t ? !0 : t, a)
            },
            slideToClosest: function(e, t, a, s) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === s && (s = .5);
                var r = this;
                let i = r.activeIndex;
                var l, n = (n = Math.min(r.params.slidesPerGroupSkip, i)) + Math.floor((i - n) / r.params.slidesPerGroup), o = r.rtlTranslate ? r.translate : -r.translate;
                return o >= r.snapGrid[n] ? (l = r.snapGrid[n],
                (r.snapGrid[n + 1] - l) * s < o - l && (i += r.params.slidesPerGroup)) : o - (l = r.snapGrid[n - 1]) <= (r.snapGrid[n] - l) * s && (i -= r.params.slidesPerGroup),
                i = Math.max(i, 0),
                i = Math.min(i, r.slidesGrid.length - 1),
                r.slideTo(i, e, t, a)
            },
            slideToClickedSlide: function() {
                const e = this;
                var t, {params: a, slidesEl: s} = e, r = "auto" === a.slidesPerView ? e.slidesPerViewDynamic() : a.slidesPerView;
                let i = e.clickedIndex;
                var l = e.isElement ? "swiper-slide" : "." + a.slideClass;
                a.loop ? e.animating || (t = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                a.centeredSlides ? i < e.loopedSlides - r / 2 || i > e.slides.length - e.loopedSlides + r / 2 ? (e.loopFix(),
                i = e.getSlideIndex(F(s, l + `[data-swiper-slide-index="${t}"]`)[0]),
                T( () => {
                    e.slideTo(i)
                }
                )) : e.slideTo(i) : i > e.slides.length - r ? (e.loopFix(),
                i = e.getSlideIndex(F(s, l + `[data-swiper-slide-index="${t}"]`)[0]),
                T( () => {
                    e.slideTo(i)
                }
                )) : e.slideTo(i)) : e.slideTo(i)
            }
        },
        loop: {
            loopCreate: function(e) {
                var {params: t, slidesEl: a} = this;
                !t.loop || this.virtual && this.params.virtual.enabled || (F(a, `.${t.slideClass}, swiper-slide`).forEach( (e, t) => {
                    e.setAttribute("data-swiper-slide-index", t)
                }
                ),
                this.loopFix({
                    slideRealIndex: e,
                    direction: t.centeredSlides ? void 0 : "next"
                }))
            },
            loopFix: function(r) {
                let {slideRealIndex: i, slideTo: l=!0, direction: n, setTranslate: o, activeSlideIndex: d, byController: p, byMousewheel: c} = void 0 === r ? {} : r;
                const u = this;
                if (u.params.loop) {
                    u.emit("beforeLoopFix");
                    const {slides: w, allowSlidePrev: b, allowSlideNext: y, slidesEl: E, params: x} = u;
                    if (u.allowSlidePrev = !0,
                    u.allowSlideNext = !0,
                    u.virtual && x.virtual.enabled)
                        l && (x.centeredSlides || 0 !== u.snapIndex ? x.centeredSlides && u.snapIndex < x.slidesPerView ? u.slideTo(u.virtual.slides.length + u.snapIndex, 0, !1, !0) : u.snapIndex === u.snapGrid.length - 1 && u.slideTo(u.virtual.slidesBefore, 0, !1, !0) : u.slideTo(u.virtual.slides.length, 0, !1, !0)),
                        u.allowSlidePrev = b,
                        u.allowSlideNext = y;
                    else {
                        r = "auto" === x.slidesPerView ? u.slidesPerViewDynamic() : Math.ceil(parseFloat(x.slidesPerView, 10));
                        let t = x.loopedSlides || r;
                        t % x.slidesPerGroup != 0 && (t += x.slidesPerGroup - t % x.slidesPerGroup),
                        u.loopedSlides = t;
                        var m = []
                          , h = [];
                        let e = u.activeIndex;
                        void 0 === d ? d = u.getSlideIndex(u.slides.filter(e => e.classList.contains(x.slideActiveClass))[0]) : e = d;
                        var r = "next" === n || !n
                          , v = "prev" === n || !n;
                        let a = 0
                          , s = 0;
                        if (d < t) {
                            a = Math.max(t - d, x.slidesPerGroup);
                            for (let e = 0; e < t - d; e += 1) {
                                var f = e - Math.floor(e / w.length) * w.length;
                                m.push(w.length - f - 1)
                            }
                        } else if (d > u.slides.length - 2 * t) {
                            s = Math.max(d - (u.slides.length - 2 * t), x.slidesPerGroup);
                            for (let e = 0; e < s; e += 1) {
                                var g = e - Math.floor(e / w.length) * w.length;
                                h.push(g)
                            }
                        }
                        if (v && m.forEach(e => {
                            u.slides[e].swiperLoopMoveDOM = !0,
                            E.prepend(u.slides[e]),
                            u.slides[e].swiperLoopMoveDOM = !1
                        }
                        ),
                        r && h.forEach(e => {
                            u.slides[e].swiperLoopMoveDOM = !0,
                            E.append(u.slides[e]),
                            u.slides[e].swiperLoopMoveDOM = !1
                        }
                        ),
                        u.recalcSlides(),
                        "auto" === x.slidesPerView && u.updateSlides(),
                        x.watchSlidesProgress && u.updateSlidesOffset(),
                        l && (0 < m.length && v ? void 0 === i ? (v = u.slidesGrid[e],
                        v = u.slidesGrid[e + a] - v,
                        c ? u.setTranslate(u.translate - v) : (u.slideTo(e + a, 0, !1, !0),
                        o && (u.touches[u.isHorizontal() ? "startX" : "startY"] += v,
                        u.touchEventsData.currentTranslate = u.translate))) : o && (u.slideToLoop(i, 0, !1, !0),
                        u.touchEventsData.currentTranslate = u.translate) : 0 < h.length && r && (void 0 === i ? (v = u.slidesGrid[e],
                        r = u.slidesGrid[e - s] - v,
                        c ? u.setTranslate(u.translate - r) : (u.slideTo(e - s, 0, !1, !0),
                        o && (u.touches[u.isHorizontal() ? "startX" : "startY"] += r,
                        u.touchEventsData.currentTranslate = u.translate))) : u.slideToLoop(i, 0, !1, !0))),
                        u.allowSlidePrev = b,
                        u.allowSlideNext = y,
                        u.controller && u.controller.control && !p) {
                            const S = {
                                slideRealIndex: i,
                                direction: n,
                                setTranslate: o,
                                activeSlideIndex: d,
                                byController: !0
                            };
                            Array.isArray(u.controller.control) ? u.controller.control.forEach(e => {
                                !e.destroyed && e.params.loop && e.loopFix({
                                    ...S,
                                    slideTo: e.params.slidesPerView === x.slidesPerView && l
                                })
                            }
                            ) : u.controller.control instanceof u.constructor && u.controller.control.params.loop && u.controller.control.loopFix({
                                ...S,
                                slideTo: u.controller.control.params.slidesPerView === x.slidesPerView && l
                            })
                        }
                    }
                    u.emit("loopFix")
                }
            },
            loopDestroy: function() {
                var e = this;
                const {params: t, slidesEl: a} = e;
                if (!(!t.loop || e.virtual && e.params.virtual.enabled)) {
                    e.recalcSlides();
                    const s = [];
                    e.slides.forEach(e => {
                        var t = void 0 === e.swiperSlideIndex ? +e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                        s[t] = e
                    }
                    ),
                    e.slides.forEach(e => {
                        e.removeAttribute("data-swiper-slide-index")
                    }
                    ),
                    s.forEach(e => {
                        a.append(e)
                    }
                    ),
                    e.recalcSlides(),
                    e.slideTo(e.realIndex, 0)
                }
            }
        },
        grabCursor: {
            setGrabCursor: function(e) {
                const t = this;
                var a;
                !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode || (a = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl,
                t.isElement && (t.__preventObserver__ = !0),
                a.style.cursor = "move",
                a.style.cursor = e ? "grabbing" : "grab",
                t.isElement && requestAnimationFrame( () => {
                    t.__preventObserver__ = !1
                }
                ))
            },
            unsetGrabCursor: function() {
                const e = this;
                e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
                e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
                e.isElement && requestAnimationFrame( () => {
                    e.__preventObserver__ = !1
                }
                ))
            }
        },
        events: {
            attachEvents: function() {
                var e = this
                  , t = A()
                  , a = e["params"];
                e.onTouchStart = function(s) {
                    var r = this
                      , i = A()
                      , l = L()
                      , n = r.touchEventsData
                      , {params: o, touches: d, enabled: p} = (n.evCache.push(s),
                    r);
                    if (p && (o.simulateTouch || "mouse" !== s.pointerType) && (!r.animating || !o.preventInteractionOnTransition)) {
                        !r.animating && o.cssMode && o.loop && r.loopFix();
                        let t = s
                          , a = (t = t.originalEvent ? t.originalEvent : t).target;
                        if (("wrapper" !== o.touchEventsTarget || r.wrapperEl.contains(a)) && !("which"in t && 3 === t.which || "button"in t && 0 < t.button || n.isTouched && n.isMoved)) {
                            var p = !!o.noSwipingClass && "" !== o.noSwipingClass
                              , c = s.composedPath ? s.composedPath() : s.path
                              , p = (p && t.target && t.target.shadowRoot && c && (a = c[0]),
                            o.noSwipingSelector || "." + o.noSwipingClass)
                              , c = !(!t.target || !t.target.shadowRoot);
                            if (o.noSwiping && (c ? X(p, a) : a.closest(p)))
                                r.allowClick = !0;
                            else if (!o.swipeHandler || a.closest(o.swipeHandler)) {
                                d.currentX = t.pageX,
                                d.currentY = t.pageY;
                                var c = d.currentX
                                  , p = d.currentY
                                  , u = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection
                                  , m = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
                                if (u && (c <= m || c >= l.innerWidth - m)) {
                                    if ("prevent" !== u)
                                        return;
                                    s.preventDefault()
                                }
                                Object.assign(n, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0
                                }),
                                d.startX = c,
                                d.startY = p,
                                n.touchStartTime = g(),
                                r.allowClick = !0,
                                r.updateSize(),
                                r.swipeDirection = void 0,
                                0 < o.threshold && (n.allowThresholdMove = !1);
                                let e = !0;
                                a.matches(n.focusableElements) && (e = !1,
                                "SELECT" === a.nodeName) && (n.isTouched = !1),
                                i.activeElement && i.activeElement.matches(n.focusableElements) && i.activeElement !== a && i.activeElement.blur();
                                l = e && r.allowTouchMove && o.touchStartPreventDefault;
                                !o.touchStartForcePreventDefault && !l || a.isContentEditable || t.preventDefault(),
                                o.freeMode && o.freeMode.enabled && r.freeMode && r.animating && !o.cssMode && r.freeMode.onTouchStart(),
                                r.emit("touchStart", t)
                            }
                        }
                    }
                }
                .bind(e),
                e.onTouchMove = function(e) {
                    var l = A()
                      , n = this
                      , o = n.touchEventsData
                      , {params: d, touches: p, rtlTranslate: c, enabled: t} = n;
                    if (t && (d.simulateTouch || "mouse" !== e.pointerType)) {
                        let i = e;
                        if (i.originalEvent && (i = i.originalEvent),
                        o.isTouched) {
                            t = o.evCache.findIndex(e => e.pointerId === i.pointerId),
                            e = (0 <= t && (o.evCache[t] = i),
                            1 < o.evCache.length ? o.evCache[0] : i),
                            t = e.pageX,
                            e = e.pageY;
                            if (i.preventedByNestedSwiper)
                                p.startX = t,
                                p.startY = e;
                            else if (n.allowTouchMove) {
                                if (d.touchReleaseOnEdges && !d.loop)
                                    if (n.isVertical()) {
                                        if (e < p.startY && n.translate <= n.maxTranslate() || e > p.startY && n.translate >= n.minTranslate())
                                            return o.isTouched = !1,
                                            void (o.isMoved = !1)
                                    } else if (t < p.startX && n.translate <= n.maxTranslate() || t > p.startX && n.translate >= n.minTranslate())
                                        return;
                                if (l.activeElement && i.target === l.activeElement && i.target.matches(o.focusableElements))
                                    o.isMoved = !0,
                                    n.allowClick = !1;
                                else if (o.allowTouchCallbacks && n.emit("touchMove", i),
                                !(i.targetTouches && 1 < i.targetTouches.length)) {
                                    p.currentX = t,
                                    p.currentY = e;
                                    var l = p.currentX - p.startX
                                      , u = p.currentY - p.startY;
                                    if (!(n.params.threshold && Math.sqrt(l ** 2 + u ** 2) < n.params.threshold))
                                        if (void 0 === o.isScrolling && (n.isHorizontal() && p.currentY === p.startY || n.isVertical() && p.currentX === p.startX ? o.isScrolling = !1 : 25 <= l * l + u * u && (m = 180 * Math.atan2(Math.abs(u), Math.abs(l)) / Math.PI,
                                        o.isScrolling = n.isHorizontal() ? m > d.touchAngle : 90 - m > d.touchAngle)),
                                        o.isScrolling && n.emit("touchMoveOpposite", i),
                                        void 0 !== o.startMoving || p.currentX === p.startX && p.currentY === p.startY || (o.startMoving = !0),
                                        o.isScrolling || n.zoom && n.params.zoom && n.params.zoom.enabled && 1 < o.evCache.length)
                                            o.isTouched = !1;
                                        else if (o.startMoving) {
                                            n.allowClick = !1,
                                            !d.cssMode && i.cancelable && i.preventDefault(),
                                            d.touchMoveStopPropagation && !d.nested && i.stopPropagation();
                                            let e = n.isHorizontal() ? l : u
                                              , t = n.isHorizontal() ? p.currentX - p.previousX : p.currentY - p.previousY;
                                            d.oneWayMovement && (e = Math.abs(e) * (c ? 1 : -1),
                                            t = Math.abs(t) * (c ? 1 : -1)),
                                            p.diff = e,
                                            e *= d.touchRatio,
                                            c && (e = -e,
                                            t = -t);
                                            var m = n.touchesDirection
                                              , l = (n.swipeDirection = 0 < e ? "prev" : "next",
                                            n.touchesDirection = 0 < t ? "prev" : "next",
                                            n.params.loop && !d.cssMode)
                                              , u = "next" === n.swipeDirection && n.allowSlideNext || "prev" === n.swipeDirection && n.allowSlidePrev;
                                            o.isMoved || (l && u && n.loopFix({
                                                direction: n.swipeDirection
                                            }),
                                            o.startTranslate = n.getTranslate(),
                                            n.setTransition(0),
                                            n.animating && (c = new window.CustomEvent("transitionend",{
                                                bubbles: !0,
                                                cancelable: !0
                                            }),
                                            n.wrapperEl.dispatchEvent(c)),
                                            o.allowMomentumBounce = !1,
                                            !d.grabCursor || !0 !== n.allowSlideNext && !0 !== n.allowSlidePrev || n.setGrabCursor(!0),
                                            n.emit("sliderFirstMove", i));
                                            let a, s = (o.isMoved && m !== n.touchesDirection && l && u && 1 <= Math.abs(e) && (n.loopFix({
                                                direction: n.swipeDirection,
                                                setTranslate: !0
                                            }),
                                            a = !0),
                                            n.emit("sliderMove", i),
                                            o.isMoved = !0,
                                            o.currentTranslate = e + o.startTranslate,
                                            !0), r = d.resistanceRatio;
                                            if (d.touchReleaseOnEdges && (r = 0),
                                            0 < e ? (l && u && !a && o.currentTranslate > (d.centeredSlides ? n.minTranslate() - n.size / 2 : n.minTranslate()) && n.loopFix({
                                                direction: "prev",
                                                setTranslate: !0,
                                                activeSlideIndex: 0
                                            }),
                                            o.currentTranslate > n.minTranslate() && (s = !1,
                                            d.resistance) && (o.currentTranslate = n.minTranslate() - 1 + (-n.minTranslate() + o.startTranslate + e) ** r)) : e < 0 && (l && u && !a && o.currentTranslate < (d.centeredSlides ? n.maxTranslate() + n.size / 2 : n.maxTranslate()) && n.loopFix({
                                                direction: "next",
                                                setTranslate: !0,
                                                activeSlideIndex: n.slides.length - ("auto" === d.slidesPerView ? n.slidesPerViewDynamic() : Math.ceil(parseFloat(d.slidesPerView, 10)))
                                            }),
                                            o.currentTranslate < n.maxTranslate()) && (s = !1,
                                            d.resistance) && (o.currentTranslate = n.maxTranslate() + 1 - (n.maxTranslate() - o.startTranslate - e) ** r),
                                            s && (i.preventedByNestedSwiper = !0),
                                            !n.allowSlideNext && "next" === n.swipeDirection && o.currentTranslate < o.startTranslate && (o.currentTranslate = o.startTranslate),
                                            !n.allowSlidePrev && "prev" === n.swipeDirection && o.currentTranslate > o.startTranslate && (o.currentTranslate = o.startTranslate),
                                            n.allowSlidePrev || n.allowSlideNext || (o.currentTranslate = o.startTranslate),
                                            0 < d.threshold) {
                                                if (!(Math.abs(e) > d.threshold || o.allowThresholdMove))
                                                    return void (o.currentTranslate = o.startTranslate);
                                                if (!o.allowThresholdMove)
                                                    return o.allowThresholdMove = !0,
                                                    p.startX = p.currentX,
                                                    p.startY = p.currentY,
                                                    o.currentTranslate = o.startTranslate,
                                                    void (p.diff = n.isHorizontal() ? p.currentX - p.startX : p.currentY - p.startY)
                                            }
                                            d.followFinger && !d.cssMode && ((d.freeMode && d.freeMode.enabled && n.freeMode || d.watchSlidesProgress) && (n.updateActiveIndex(),
                                            n.updateSlidesClasses()),
                                            d.freeMode && d.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
                                            n.updateProgress(o.currentTranslate),
                                            n.setTranslate(o.currentTranslate))
                                        }
                                }
                            } else
                                i.target.matches(o.focusableElements) || (n.allowClick = !1),
                                o.isTouched && (Object.assign(p, {
                                    startX: t,
                                    startY: e,
                                    prevX: n.touches.currentX,
                                    prevY: n.touches.currentY,
                                    currentX: t,
                                    currentY: e
                                }),
                                o.touchStartTime = g())
                        } else
                            o.startMoving && o.isScrolling && n.emit("touchMoveOpposite", i)
                    }
                }
                .bind(e),
                e.onTouchEnd = function(t) {
                    const l = this;
                    var e = l.touchEventsData
                      , a = e.evCache.findIndex(e => e.pointerId === t.pointerId);
                    if (0 <= a && e.evCache.splice(a, 1),
                    !["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(t.type) || ["pointercancel", "contextmenu"].includes(t.type) && (l.browser.isSafari || l.browser.isWebView)) {
                        var {params: n, touches: a, rtlTranslate: s, slidesGrid: o, enabled: r} = l;
                        if (r && (n.simulateTouch || "mouse" !== t.pointerType)) {
                            let i = t;
                            if (i.originalEvent && (i = i.originalEvent),
                            e.allowTouchCallbacks && l.emit("touchEnd", i),
                            e.allowTouchCallbacks = !1,
                            e.isTouched) {
                                n.grabCursor && e.isMoved && e.isTouched && (!0 === l.allowSlideNext || !0 === l.allowSlidePrev) && l.setGrabCursor(!1);
                                var r = g()
                                  , d = r - e.touchStartTime;
                                if (l.allowClick && (p = i.path || i.composedPath && i.composedPath(),
                                l.updateClickedSlide(p && p[0] || i.target, p),
                                l.emit("tap click", i),
                                d < 300) && r - e.lastClickTime < 300 && l.emit("doubleTap doubleClick", i),
                                e.lastClickTime = g(),
                                T( () => {
                                    l.destroyed || (l.allowClick = !0)
                                }
                                ),
                                e.isTouched && e.isMoved && l.swipeDirection && 0 !== a.diff && e.currentTranslate !== e.startTranslate) {
                                    e.isTouched = !1,
                                    e.isMoved = !1,
                                    e.startMoving = !1;
                                    let r;
                                    if (r = n.followFinger ? s ? l.translate : -l.translate : -e.currentTranslate,
                                    !n.cssMode)
                                        if (n.freeMode && n.freeMode.enabled)
                                            l.freeMode.onTouchEnd({
                                                currentPos: r
                                            });
                                        else {
                                            let t = 0
                                              , a = l.slidesSizesGrid[0];
                                            for (let e = 0; e < o.length; e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
                                                const c = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                                                void 0 !== o[e + c] ? r >= o[e] && r < o[e + c] && (t = e,
                                                a = o[e + c] - o[e]) : r >= o[e] && (t = e,
                                                a = o[o.length - 1] - o[o.length - 2])
                                            }
                                            let e = null
                                              , s = null;
                                            n.rewind && (l.isBeginning ? s = n.virtual && n.virtual.enabled && l.virtual ? l.virtual.slides.length - 1 : l.slides.length - 1 : l.isEnd && (e = 0));
                                            var p = (r - o[t]) / a;
                                            const c = t < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                                            d > n.longSwipesMs ? n.longSwipes ? ("next" === l.swipeDirection && (p >= n.longSwipesRatio ? l.slideTo(n.rewind && l.isEnd ? e : t + c) : l.slideTo(t)),
                                            "prev" === l.swipeDirection && (p > 1 - n.longSwipesRatio ? l.slideTo(t + c) : null !== s && p < 0 && Math.abs(p) > n.longSwipesRatio ? l.slideTo(s) : l.slideTo(t))) : l.slideTo(l.activeIndex) : n.shortSwipes ? l.navigation && (i.target === l.navigation.nextEl || i.target === l.navigation.prevEl) ? i.target === l.navigation.nextEl ? l.slideTo(t + c) : l.slideTo(t) : ("next" === l.swipeDirection && l.slideTo(null !== e ? e : t + c),
                                            "prev" === l.swipeDirection && l.slideTo(null !== s ? s : t)) : l.slideTo(l.activeIndex)
                                        }
                                } else
                                    e.isTouched = !1,
                                    e.isMoved = !1,
                                    e.startMoving = !1
                            } else
                                e.isMoved && n.grabCursor && l.setGrabCursor(!1),
                                e.isMoved = !1,
                                e.startMoving = !1
                        }
                    }
                }
                .bind(e),
                a.cssMode && (e.onScroll = function() {
                    var t = this
                      , {wrapperEl: a, rtlTranslate: s, enabled: r} = t;
                    if (r) {
                        t.previousTranslate = t.translate,
                        t.isHorizontal() ? t.translate = -a.scrollLeft : t.translate = -a.scrollTop,
                        0 === t.translate && (t.translate = 0),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses();
                        let e;
                        r = t.maxTranslate() - t.minTranslate();
                        (e = 0 == r ? 0 : (t.translate - t.minTranslate()) / r) !== t.progress && t.updateProgress(s ? -t.translate : t.translate),
                        t.emit("setTranslate", t.translate, !1)
                    }
                }
                .bind(e)),
                e.onClick = function(e) {
                    var t = this;
                    t.enabled && !t.allowClick && (t.params.preventClicks && e.preventDefault(),
                    t.params.preventClicksPropagation) && t.animating && (e.stopPropagation(),
                    e.stopImmediatePropagation())
                }
                .bind(e),
                e.onLoad = function(e) {
                    var t = this;
                    n(t, e.target),
                    t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
                }
                .bind(e),
                N || (t.addEventListener("touchstart", Y),
                N = !0),
                B(e, "on")
            },
            detachEvents: function() {
                B(this, "off")
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                const s = this
                  , {realIndex: e, initialized: t, params: r, el: a} = s;
                if ((l = r.breakpoints) && 0 !== Object.keys(l).length) {
                    var i = s.getBreakpoint(l, s.params.breakpointsBase, s.el);
                    if (i && s.currentBreakpoint !== i) {
                        const c = (i in l ? l[i] : void 0) || s.originalParams;
                        var l = R(s, r)
                          , n = R(s, c)
                          , o = r.enabled
                          , l = (l && !n ? (a.classList.remove(r.containerModifierClass + "grid", r.containerModifierClass + "grid-column"),
                        s.emitContainerClasses()) : !l && n && (a.classList.add(r.containerModifierClass + "grid"),
                        (c.grid.fill && "column" === c.grid.fill || !c.grid.fill && "column" === r.grid.fill) && a.classList.add(r.containerModifierClass + "grid-column"),
                        s.emitContainerClasses()),
                        ["navigation", "pagination", "scrollbar"].forEach(e => {
                            var t, a;
                            void 0 !== c[e] && (t = r[e] && r[e].enabled,
                            a = c[e] && c[e].enabled,
                            t && !a && s[e].disable(),
                            !t) && a && s[e].enable()
                        }
                        ),
                        c.direction && c.direction !== r.direction)
                          , n = r.loop && (c.slidesPerView !== r.slidesPerView || l)
                          , d = r.loop
                          , l = (l && t && s.changeDirection(),
                        u(s.params, c),
                        s.params.enabled)
                          , p = s.params.loop;
                        Object.assign(s, {
                            allowTouchMove: s.params.allowTouchMove,
                            allowSlideNext: s.params.allowSlideNext,
                            allowSlidePrev: s.params.allowSlidePrev
                        }),
                        o && !l ? s.disable() : !o && l && s.enable(),
                        s.currentBreakpoint = i,
                        s.emit("_beforeBreakpoint", c),
                        t && (n ? (s.loopDestroy(),
                        s.loopCreate(e),
                        s.updateSlides()) : !d && p ? (s.loopCreate(e),
                        s.updateSlides()) : d && !p && s.loopDestroy()),
                        s.emit("breakpoint", c)
                    }
                }
            },
            getBreakpoint: function(e, a, s) {
                if (void 0 === a && (a = "window"),
                e && ("container" !== a || s)) {
                    let t = !1;
                    var r = L();
                    const o = "window" === a ? r.innerHeight : s.clientHeight;
                    var i = Object.keys(e).map(e => {
                        var t;
                        return "string" == typeof e && 0 === e.indexOf("@") ? (t = parseFloat(e.substr(1)),
                        {
                            value: o * t,
                            point: e
                        }) : {
                            value: e,
                            point: e
                        }
                    }
                    );
                    i.sort( (e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < i.length; e += 1) {
                        var {point: l, value: n} = i[e];
                        "window" === a ? r.matchMedia(`(min-width: ${n}px)`).matches && (t = l) : n <= s.clientWidth && (t = l)
                    }
                    return t || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e, t = this, {isLocked: a, params: s} = t, r = s["slidesOffsetBefore"];
                r ? (e = t.slides.length - 1,
                e = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * r,
                t.isLocked = t.size > e) : t.isLocked = 1 === t.snapGrid.length,
                !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked),
                !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
                a && a !== t.isLocked && (t.isEnd = !1),
                a !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock")
            }
        },
        classes: {
            addClasses: function() {
                var {classNames: e, params: t, rtl: a, el: s, device: r} = this
                  , a = function(e, a) {
                    const s = [];
                    return e.forEach(t => {
                        "object" == typeof t ? Object.keys(t).forEach(e => {
                            t[e] && s.push(a + e)
                        }
                        ) : "string" == typeof t && s.push(a + t)
                    }
                    ),
                    s
                }(["initialized", t.direction, {
                    "free-mode": this.params.freeMode && t.freeMode.enabled
                }, {
                    autoheight: t.autoHeight
                }, {
                    rtl: a
                }, {
                    grid: t.grid && 1 < t.grid.rows
                }, {
                    "grid-column": t.grid && 1 < t.grid.rows && "column" === t.grid.fill
                }, {
                    android: r.android
                }, {
                    ios: r.ios
                }, {
                    "css-mode": t.cssMode
                }, {
                    centered: t.cssMode && t.centeredSlides
                }, {
                    "watch-progress": t.watchSlidesProgress
                }], t.containerModifierClass);
                e.push(...a),
                s.classList.add(...e),
                this.emitContainerClasses()
            },
            removeClasses: function() {
                var {el: e, classNames: t} = this;
                e.classList.remove(...t),
                this.emitContainerClasses()
            }
        }
    }
      , h = {};
    class v {
        constructor() {
            let e, t;
            for (var a = arguments.length, s = new Array(a), r = 0; r < a; r++)
                s[r] = arguments[r];
            1 === s.length && s[0].constructor && "Object" === Object.prototype.toString.call(s[0]).slice(8, -1) ? t = s[0] : [e,t] = s,
            t = u({}, t = t || {}),
            e && !t.el && (t.el = e);
            var i = A();
            if (t.el && "string" == typeof t.el && 1 < i.querySelectorAll(t.el).length) {
                const o = [];
                return i.querySelectorAll(t.el).forEach(e => {
                    e = u({}, t, {
                        el: e
                    });
                    o.push(new v(e))
                }
                ),
                o
            }
            const l = this
              , n = (l.__swiper__ = !0,
            l.support = c(),
            l.device = D({
                userAgent: t.userAgent
            }),
            l.browser = G(),
            l.eventsListeners = {},
            l.eventsAnyListeners = [],
            l.modules = [...l.__modules__],
            t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules),
            {});
            l.modules.forEach(e => {
                var s, r;
                e({
                    params: t,
                    swiper: l,
                    extendParams: (s = t,
                    r = n,
                    function(e) {
                        void 0 === e && (e = {});
                        var t = Object.keys(e)[0]
                          , a = e[t];
                        "object" == typeof a && null !== a && (!0 === s[t] && (s[t] = {
                            enabled: !0
                        }),
                        "navigation" === t && s[t] && s[t].enabled && !s[t].prevEl && !s[t].nextEl && (s[t].auto = !0),
                        0 <= ["pagination", "scrollbar"].indexOf(t) && s[t] && s[t].enabled && !s[t].el && (s[t].auto = !0),
                        t in s && "enabled"in a) && ("object" != typeof s[t] || "enabled"in s[t] || (s[t].enabled = !0),
                        s[t] || (s[t] = {
                            enabled: !1
                        })),
                        u(r, e)
                    }
                    ),
                    on: l.on.bind(l),
                    once: l.once.bind(l),
                    off: l.off.bind(l),
                    emit: l.emit.bind(l)
                })
            }
            );
            i = u({}, q, n);
            return l.params = u({}, i, h, t),
            l.originalParams = u({}, l.params),
            l.passedParams = u({}, t),
            l.params && l.params.on && Object.keys(l.params.on).forEach(e => {
                l.on(e, l.params.on[e])
            }
            ),
            l.params && l.params.onAny && l.onAny(l.params.onAny),
            Object.assign(l, {
                enabled: l.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return "horizontal" === l.params.direction
                },
                isVertical() {
                    return "vertical" === l.params.direction
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: l.params.allowSlideNext,
                allowSlidePrev: l.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: l.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    evCache: []
                },
                allowClick: !0,
                allowTouchMove: l.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            l.emit("_swiper"),
            l.params.init && l.init(),
            l
        }
        getSlideIndex(e) {
            var {slidesEl: t, params: a} = this
              , t = C(F(t, `.${a.slideClass}, swiper-slide`)[0]);
            return C(e) - t
        }
        getSlideIndexByData(t) {
            return this.getSlideIndex(this.slides.filter(e => +e.getAttribute("data-swiper-slide-index") === t)[0])
        }
        recalcSlides() {
            var {slidesEl: e, params: t} = this;
            this.slides = F(e, `.${t.slideClass}, swiper-slide`)
        }
        enable() {
            var e = this;
            e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
        }
        disable() {
            var e = this;
            e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
        }
        setProgress(e, t) {
            var a = this
              , s = (e = Math.min(Math.max(e, 0), 1),
            a.minTranslate())
              , r = a.maxTranslate();
            a.translateTo((r - s) * e + s, void 0 === t ? 0 : t),
            a.updateActiveIndex(),
            a.updateSlidesClasses()
        }
        emitContainerClasses() {
            const t = this;
            var e;
            t.params._emitClasses && t.el && (e = t.el.className.split(" ").filter(e => 0 === e.indexOf("swiper") || 0 === e.indexOf(t.params.containerModifierClass)),
            t.emit("_containerClasses", e.join(" ")))
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
        }
        emitSlidesClasses() {
            const a = this;
            if (a.params._emitClasses && a.el) {
                const s = [];
                a.slides.forEach(e => {
                    var t = a.getSlideClasses(e);
                    s.push({
                        slideEl: e,
                        classNames: t
                    }),
                    a.emit("_slideClass", e, t)
                }
                ),
                a.emit("_slideClasses", s)
            }
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"),
            void 0 === t && (t = !1);
            var {params: a, slides: s, slidesGrid: r, slidesSizesGrid: i, size: l, activeIndex: n} = this;
            let o = 1;
            if ("number" == typeof a.slidesPerView)
                return a.slidesPerView;
            if (a.centeredSlides) {
                let t = s[n] ? s[n].swiperSlideSize : 0, a;
                for (let e = n + 1; e < s.length; e += 1)
                    s[e] && !a && (t += s[e].swiperSlideSize,
                    o += 1,
                    t > l) && (a = !0);
                for (let e = n - 1; 0 <= e; --e)
                    s[e] && !a && (t += s[e].swiperSlideSize,
                    o += 1,
                    t > l) && (a = !0)
            } else if ("current" === e)
                for (let e = n + 1; e < s.length; e += 1)
                    (t ? r[e] + i[e] - r[n] < l : r[e] - r[n] < l) && (o += 1);
            else
                for (let e = n - 1; 0 <= e; --e)
                    r[n] - r[e] < l && (o += 1);
            return o
        }
        update() {
            const t = this;
            if (t && !t.destroyed) {
                var a, {snapGrid: s, params: r} = t;
                r.breakpoints && t.setBreakpoint(),
                [...t.el.querySelectorAll('[loading="lazy"]')].forEach(e => {
                    e.complete && n(t, e)
                }
                ),
                t.updateSize(),
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses();
                let e;
                function i() {
                    var e = t.rtlTranslate ? -1 * t.translate : t.translate
                      , e = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
                    t.setTranslate(e),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses()
                }
                r.freeMode && r.freeMode.enabled && !r.cssMode ? (i(),
                r.autoHeight && t.updateAutoHeight()) : (e = ("auto" === r.slidesPerView || 1 < r.slidesPerView) && t.isEnd && !r.centeredSlides ? (a = (t.virtual && r.virtual.enabled ? t.virtual : t).slides,
                t.slideTo(a.length - 1, 0, !1, !0)) : t.slideTo(t.activeIndex, 0, !1, !0)) || i(),
                r.watchOverflow && s !== t.snapGrid && t.checkOverflow(),
                t.emit("update")
            }
        }
        changeDirection(t, e) {
            void 0 === e && (e = !0);
            var a = this
              , s = a.params.direction;
            return (t = t || ("horizontal" === s ? "vertical" : "horizontal")) === s || "horizontal" !== t && "vertical" !== t || (a.el.classList.remove("" + a.params.containerModifierClass + s),
            a.el.classList.add("" + a.params.containerModifierClass + t),
            a.emitContainerClasses(),
            a.params.direction = t,
            a.slides.forEach(e => {
                "vertical" === t ? e.style.width = "" : e.style.height = ""
            }
            ),
            a.emit("changeDirection"),
            e && a.update()),
            a
        }
        changeLanguageDirection(e) {
            var t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.el.classList.add(t.params.containerModifierClass + "rtl"),
            t.el.dir = "rtl") : (t.el.classList.remove(t.params.containerModifierClass + "rtl"),
            t.el.dir = "ltr"),
            t.update())
        }
        mount(a) {
            const s = this;
            if (!s.mounted) {
                let e = a || s.params.el;
                if (!(e = "string" == typeof e ? document.querySelector(e) : e))
                    return !1;
                e.swiper = s,
                e.parentNode && e.parentNode.host && "SWIPER-CONTAINER" === e.parentNode.host.nodeName && (s.isElement = !0);
                const r = () => "." + (s.params.wrapperClass || "").trim().split(" ").join(".");
                let t = e && e.shadowRoot && e.shadowRoot.querySelector ? e.shadowRoot.querySelector(r()) : F(e, r())[0];
                !t && s.params.createElements && (t = M("div", s.params.wrapperClass),
                e.append(t),
                F(e, "." + s.params.slideClass).forEach(e => {
                    t.append(e)
                }
                )),
                Object.assign(s, {
                    el: e,
                    wrapperEl: t,
                    slidesEl: s.isElement && !e.parentNode.host.slideSlots ? e.parentNode.host : t,
                    hostEl: s.isElement ? e.parentNode.host : e,
                    mounted: !0,
                    rtl: "rtl" === e.dir.toLowerCase() || "rtl" === _(e, "direction"),
                    rtlTranslate: "horizontal" === s.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === _(e, "direction")),
                    wrongRTL: "-webkit-box" === _(t, "display")
                })
            }
            return !0
        }
        init(e) {
            const t = this;
            return t.initialized || !1 !== t.mount(e) && (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.params.loop && t.loopCreate(),
            t.attachEvents(),
            e = [...t.el.querySelectorAll('[loading="lazy"]')],
            t.isElement && e.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            e.forEach(e => {
                e.complete ? n(t, e) : e.addEventListener("load", e => {
                    n(t, e.target)
                }
                )
            }
            ),
            m(t),
            t.initialized = !0,
            m(t),
            t.emit("init"),
            t.emit("afterInit")),
            t
        }
        destroy(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            const a = this
              , {params: s, el: r, wrapperEl: i, slides: l} = a;
            if (void 0 !== a.params && !a.destroyed) {
                if (a.emit("beforeDestroy"),
                a.initialized = !1,
                a.detachEvents(),
                s.loop && a.loopDestroy(),
                t && (a.removeClasses(),
                r.removeAttribute("style"),
                i.removeAttribute("style"),
                l) && l.length && l.forEach(e => {
                    e.classList.remove(s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index")
                }
                ),
                a.emit("destroy"),
                Object.keys(a.eventsListeners).forEach(e => {
                    a.off(e)
                }
                ),
                !1 !== e) {
                    a.el.swiper = null;
                    {
                        t = a;
                        const n = t;
                        Object.keys(n).forEach(e => {
                            try {
                                n[e] = null
                            } catch (e) {}
                            try {
                                delete n[e]
                            } catch (e) {}
                        }
                        )
                    }
                }
                a.destroyed = !0
            }
            return null
        }
        static extendDefaults(e) {
            u(h, e)
        }
        static get extendedDefaults() {
            return h
        }
        static get defaults() {
            return q
        }
        static installModule(e) {
            v.prototype.__modules__ || (v.prototype.__modules__ = []);
            var t = v.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? e.forEach(e => v.installModule(e)) : v.installModule(e),
            v
        }
    }
    function P(a, s, r, i) {
        return a.params.createElements && Object.keys(i).forEach(t => {
            if (!r[t] && !0 === r.auto) {
                let e = F(a.el, "." + i[t])[0];
                e || ((e = M("div", i[t])).className = i[t],
                a.el.append(e)),
                r[t] = e,
                s[t] = e
            }
        }
        ),
        r
    }
    function O(e) {
        return "." + (e = void 0 === e ? "" : e).trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")
    }
    function b(e) {
        const {effect: a, swiper: s, on: t, setTranslate: r, setTransition: i, overwriteParams: l, perspective: n, recreateShadows: o, getEffectParams: d} = e;
        t("beforeInit", () => {
            var e;
            s.params.effect === a && (s.classNames.push("" + s.params.containerModifierClass + a),
            n && n() && s.classNames.push(s.params.containerModifierClass + "3d"),
            e = l ? l() : {},
            Object.assign(s.params, e),
            Object.assign(s.originalParams, e))
        }
        ),
        t("setTranslate", () => {
            s.params.effect === a && r()
        }
        ),
        t("setTransition", (e, t) => {
            s.params.effect === a && i(t)
        }
        ),
        t("transitionEnd", () => {
            s.params.effect === a && o && d && d().slideShadows && (s.slides.forEach(e => {
                e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => e.remove())
            }
            ),
            o())
        }
        );
        let p;
        t("virtualUpdate", () => {
            s.params.effect === a && (s.slides.length || (p = !0),
            requestAnimationFrame( () => {
                p && s.slides && s.slides.length && (r(),
                p = !1)
            }
            ))
        }
        )
    }
    function E(e, t) {
        var a = l(t);
        return a !== t && (a.style.backfaceVisibility = "hidden",
        a.style["-webkit-backface-visibility"] = "hidden"),
        a
    }
    function w(e) {
        let {swiper: a, duration: t, transformElements: s, allSlides: r} = e;
        const i = a["activeIndex"];
        if (a.params.virtualTranslate && 0 !== t) {
            let t = !1, e;
            (e = r ? s : s.filter(e => {
                var t, e = e.classList.contains("swiper-slide-transform") ? (t = e).parentElement || a.slides.filter(e => e.shadowRoot && e.shadowRoot === t.parentNode)[0] : e;
                return a.getSlideIndex(e) === i
            }
            )).forEach(e => {
                f(e, () => {
                    var e;
                    t || a && !a.destroyed && (t = !0,
                    a.animating = !1,
                    e = new window.CustomEvent("transitionend",{
                        bubbles: !0,
                        cancelable: !0
                    }),
                    a.wrapperEl.dispatchEvent(e))
                }
                )
            }
            )
        }
    }
    function x(e, t, a) {
        a = "swiper-slide-shadow" + (a ? "-" + a : "") + (e ? " swiper-slide-shadow-" + e : ""),
        e = l(t);
        let s = e.querySelector("." + a.split(" ").join("."));
        return s || (s = M("div", a.split(" ")),
        e.append(s)),
        s
    }
    return Object.keys(d).forEach(t => {
        Object.keys(d[t]).forEach(e => {
            v.prototype[e] = d[t][e]
        }
        )
    }
    ),
    v.use([function(e) {
        let {swiper: i, on: t, emit: a} = e;
        const s = L();
        let r = null
          , l = null;
        const n = () => {
            i && !i.destroyed && i.initialized && (a("beforeResize"),
            a("resize"))
        }
          , o = () => {
            i && !i.destroyed && i.initialized && a("orientationchange")
        }
        ;
        t("init", () => {
            i.params.resizeObserver && void 0 !== s.ResizeObserver ? i && !i.destroyed && i.initialized && (r = new ResizeObserver(a => {
                l = s.requestAnimationFrame( () => {
                    var {width: e, height: t} = i;
                    let s = e
                      , r = t;
                    a.forEach(e => {
                        var {contentBoxSize: e, contentRect: t, target: a} = e;
                        a && a !== i.el || (s = t ? t.width : (e[0] || e).inlineSize,
                        r = t ? t.height : (e[0] || e).blockSize)
                    }
                    ),
                    s === e && r === t || n()
                }
                )
            }
            )).observe(i.el) : (s.addEventListener("resize", n),
            s.addEventListener("orientationchange", o))
        }
        ),
        t("destroy", () => {
            l && s.cancelAnimationFrame(l),
            r && r.unobserve && i.el && (r.unobserve(i.el),
            r = null),
            s.removeEventListener("resize", n),
            s.removeEventListener("orientationchange", o)
        }
        )
    }
    , function(e) {
        let {swiper: s, extendParams: t, on: a, emit: r} = e;
        function i(e, t) {
            void 0 === t && (t = {});
            var a = new (n.MutationObserver || n.WebkitMutationObserver)(e => {
                var t;
                s.__preventObserver__ || (1 === e.length ? r("observerUpdate", e[0]) : (t = function() {
                    r("observerUpdate", e[0])
                }
                ,
                n.requestAnimationFrame ? n.requestAnimationFrame(t) : n.setTimeout(t, 0)))
            }
            );
            a.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            l.push(a)
        }
        const l = []
          , n = L();
        t({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }),
        a("init", () => {
            if (s.params.observer) {
                if (s.params.observeParents) {
                    var t = k(s.hostEl);
                    for (let e = 0; e < t.length; e += 1)
                        i(t[e])
                }
                i(s.hostEl, {
                    childList: s.params.observeSlideChildren
                }),
                i(s.wrapperEl, {
                    attributes: !1
                })
            }
        }
        ),
        a("destroy", () => {
            l.forEach(e => {
                e.disconnect()
            }
            ),
            l.splice(0, l.length)
        }
        )
    }
    ]),
    v.use([function(e) {
        let {swiper: P, extendParams: t, on: a, emit: L} = e;
        t({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        });
        let s;
        e = A(),
        P.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        };
        const r = e.createElement("div");
        function z(e, t) {
            var a = P.params.virtual;
            if (a.cache && P.virtual.cache[t])
                return P.virtual.cache[t];
            let s;
            return a.renderSlide ? "string" == typeof (s = a.renderSlide.call(P, e, t)) && (r.innerHTML = s,
            s = r.children[0]) : s = P.isElement ? M("swiper-slide") : M("div", P.params.slideClass),
            s.setAttribute("data-swiper-slide-index", t),
            a.renderSlide || (s.innerHTML = e),
            a.cache && (P.virtual.cache[t] = s),
            s
        }
        function l(t) {
            var {slidesPerView: e, slidesPerGroup: a, centeredSlides: s, loop: r} = P.params
              , {addSlidesBefore: i, addSlidesAfter: l} = P.params.virtual;
            const {from: n, to: o, slides: d, slidesGrid: p, offset: c} = P.virtual;
            P.params.cssMode || P.updateActiveIndex();
            var u = P.activeIndex || 0;
            let m;
            m = P.rtlTranslate ? "right" : P.isHorizontal() ? "left" : "top";
            let h, v, f = u - (v = s ? (h = Math.floor(e / 2) + a + l,
            Math.floor(e / 2) + a + i) : (h = e + (a - 1) + l,
            (r ? e : a) + i)), g = u + h, w = (r || (f = Math.max(f, 0),
            g = Math.min(g, d.length - 1)),
            (P.slidesGrid[f] || 0) - (P.slidesGrid[0] || 0));
            function b() {
                P.updateSlides(),
                P.updateProgress(),
                P.updateSlidesClasses(),
                L("virtualUpdate")
            }
            if (r && u >= v ? (f -= v,
            s || (w += P.slidesGrid[0])) : r && u < v && (f = -v,
            s) && (w += P.slidesGrid[0]),
            Object.assign(P.virtual, {
                from: f,
                to: g,
                offset: w,
                slidesGrid: P.slidesGrid,
                slidesBefore: v,
                slidesAfter: h
            }),
            n !== f || o !== g || t)
                if (P.params.virtual.renderExternal)
                    P.params.virtual.renderExternal.call(P, {
                        offset: w,
                        from: f,
                        to: g,
                        slides: function() {
                            var t = [];
                            for (let e = f; e <= g; e += 1)
                                t.push(d[e]);
                            return t
                        }()
                    }),
                    P.params.virtual.renderExternalUpdate ? b() : L("virtualUpdate");
                else {
                    var y = []
                      , E = []
                      , x = e => {
                        let t = e;
                        return e < 0 ? t = d.length + e : t >= d.length && (t -= d.length),
                        t
                    }
                    ;
                    if (t)
                        P.slides.filter(e => e.matches(`.${P.params.slideClass}, swiper-slide`)).forEach(e => {
                            e.remove()
                        }
                        );
                    else
                        for (let e = n; e <= o; e += 1)
                            if (e < f || e > g) {
                                const C = x(e);
                                P.slides.filter(e => e.matches(`.${P.params.slideClass}[data-swiper-slide-index="${C}"], swiper-slide[data-swiper-slide-index="${C}"]`)).forEach(e => {
                                    e.remove()
                                }
                                )
                            }
                    var S, l = r ? -d.length : 0, T = r ? 2 * d.length : d.length;
                    for (let e = l; e < T; e += 1)
                        e >= f && e <= g && (S = x(e),
                        void 0 === o || t ? E.push(S) : (e > o && E.push(S),
                        e < n && y.push(S)));
                    if (E.forEach(e => {
                        P.slidesEl.append(z(d[e], e))
                    }
                    ),
                    r)
                        for (let e = y.length - 1; 0 <= e; --e) {
                            var M = y[e];
                            P.slidesEl.prepend(z(d[M], M))
                        }
                    else
                        y.sort( (e, t) => t - e),
                        y.forEach(e => {
                            P.slidesEl.prepend(z(d[e], e))
                        }
                        );
                    F(P.slidesEl, ".swiper-slide, swiper-slide").forEach(e => {
                        e.style[m] = w - Math.abs(P.cssOverflowAdjustment()) + "px"
                    }
                    ),
                    b()
                }
            else
                P.slidesGrid !== p && w !== c && P.slides.forEach(e => {
                    e.style[m] = w - Math.abs(P.cssOverflowAdjustment()) + "px"
                }
                ),
                P.updateProgress(),
                L("virtualUpdate")
        }
        a("beforeInit", () => {
            if (P.params.virtual.enabled) {
                let e;
                var t;
                void 0 === P.passedParams.virtual.slides && (t = [...P.slidesEl.children].filter(e => e.matches(`.${P.params.slideClass}, swiper-slide`))) && t.length && (P.virtual.slides = [...t],
                e = !0,
                t.forEach( (e, t) => {
                    e.setAttribute("data-swiper-slide-index", t),
                    (P.virtual.cache[t] = e).remove()
                }
                )),
                e || (P.virtual.slides = P.params.virtual.slides),
                P.classNames.push(P.params.containerModifierClass + "virtual"),
                P.params.watchSlidesProgress = !0,
                P.originalParams.watchSlidesProgress = !0,
                l()
            }
        }
        ),
        a("setTranslate", () => {
            P.params.virtual.enabled && (P.params.cssMode && !P._immediateVirtual ? (clearTimeout(s),
            s = setTimeout( () => {
                l()
            }
            , 100)) : l())
        }
        ),
        a("init update resize", () => {
            P.params.virtual.enabled && P.params.cssMode && V(P.wrapperEl, "--swiper-virtual-size", P.virtualSize + "px")
        }
        ),
        Object.assign(P.virtual, {
            appendSlide: function(t) {
                if ("object" == typeof t && "length"in t)
                    for (let e = 0; e < t.length; e += 1)
                        t[e] && P.virtual.slides.push(t[e]);
                else
                    P.virtual.slides.push(t);
                l(!0)
            },
            prependSlide: function(t) {
                var e = P.activeIndex;
                let a = e + 1
                  , s = 1;
                if (Array.isArray(t)) {
                    for (let e = 0; e < t.length; e += 1)
                        t[e] && P.virtual.slides.unshift(t[e]);
                    a = e + t.length,
                    s = t.length
                } else
                    P.virtual.slides.unshift(t);
                if (P.params.virtual.cache) {
                    const r = P.virtual.cache
                      , i = {};
                    Object.keys(r).forEach(e => {
                        var t = r[e]
                          , a = t.getAttribute("data-swiper-slide-index");
                        a && t.setAttribute("data-swiper-slide-index", parseInt(a, 10) + s),
                        i[parseInt(e, 10) + s] = t
                    }
                    ),
                    P.virtual.cache = i
                }
                l(!0),
                P.slideTo(a, 0)
            },
            removeSlide: function(a) {
                if (null != a) {
                    let t = P.activeIndex;
                    if (Array.isArray(a))
                        for (let e = a.length - 1; 0 <= e; --e)
                            P.params.virtual.cache && (delete P.virtual.cache[a[e]],
                            Object.keys(P.virtual.cache).forEach(e => {
                                a < e && (P.virtual.cache[e - 1] = P.virtual.cache[e],
                                P.virtual.cache[e - 1].setAttribute("data-swiper-slide-index", e - 1),
                                delete P.virtual.cache[e])
                            }
                            )),
                            P.virtual.slides.splice(a[e], 1),
                            a[e] < t && --t,
                            t = Math.max(t, 0);
                    else
                        P.params.virtual.cache && (delete P.virtual.cache[a],
                        Object.keys(P.virtual.cache).forEach(e => {
                            a < e && (P.virtual.cache[e - 1] = P.virtual.cache[e],
                            P.virtual.cache[e - 1].setAttribute("data-swiper-slide-index", e - 1),
                            delete P.virtual.cache[e])
                        }
                        )),
                        P.virtual.slides.splice(a, 1),
                        a < t && --t,
                        t = Math.max(t, 0);
                    l(!0),
                    P.slideTo(t, 0)
                }
            },
            removeAllSlides: function() {
                P.virtual.slides = [],
                P.params.virtual.cache && (P.virtual.cache = {}),
                l(!0),
                P.slideTo(0, 0)
            },
            update: l
        })
    }
    , function(e) {
        let {swiper: g, extendParams: t, on: a, emit: w} = e;
        const b = A()
          , y = L();
        function s(t) {
            if (g.enabled) {
                var a = g["rtlTranslate"];
                let e = t;
                var t = (e = e.originalEvent ? e.originalEvent : e).keyCode || e.charCode
                  , s = g.params.keyboard.pageUpDown
                  , r = s && 33 === t
                  , s = s && 34 === t
                  , i = 37 === t
                  , l = 39 === t
                  , n = 38 === t
                  , o = 40 === t;
                if (!g.allowSlideNext && (g.isHorizontal() && l || g.isVertical() && o || s))
                    return !1;
                if (!g.allowSlidePrev && (g.isHorizontal() && i || g.isVertical() && n || r))
                    return !1;
                if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || b.activeElement && b.activeElement.nodeName && ("input" === b.activeElement.nodeName.toLowerCase() || "textarea" === b.activeElement.nodeName.toLowerCase()))) {
                    if (g.params.keyboard.onlyInViewport && (r || s || i || l || n || o)) {
                        let t = !1;
                        if (0 < k(g.el, `.${g.params.slideClass}, swiper-slide`).length && 0 === k(g.el, "." + g.params.slideActiveClass).length)
                            return;
                        var d = g.el
                          , p = d.clientWidth
                          , c = d.clientHeight
                          , u = y.innerWidth
                          , m = y.innerHeight
                          , h = I(d)
                          , v = (a && (h.left -= d.scrollLeft),
                        [[h.left, h.top], [h.left + p, h.top], [h.left, h.top + c], [h.left + p, h.top + c]]);
                        for (let e = 0; e < v.length; e += 1) {
                            var f = v[e];
                            0 <= f[0] && f[0] <= u && 0 <= f[1] && f[1] <= m && (0 === f[0] && 0 === f[1] || (t = !0))
                        }
                        if (!t)
                            return
                    }
                    g.isHorizontal() ? ((r || s || i || l) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1),
                    ((s || l) && !a || (r || i) && a) && g.slideNext(),
                    ((r || i) && !a || (s || l) && a) && g.slidePrev()) : ((r || s || n || o) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1),
                    (s || o) && g.slideNext(),
                    (r || n) && g.slidePrev()),
                    w("keyPress", t)
                }
            }
        }
        function r() {
            g.keyboard.enabled || (b.addEventListener("keydown", s),
            g.keyboard.enabled = !0)
        }
        function i() {
            g.keyboard.enabled && (b.removeEventListener("keydown", s),
            g.keyboard.enabled = !1)
        }
        g.keyboard = {
            enabled: !1
        },
        t({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }),
        a("init", () => {
            g.params.keyboard.enabled && r()
        }
        ),
        a("destroy", () => {
            g.keyboard.enabled && i()
        }
        ),
        Object.assign(g.keyboard, {
            enable: r,
            disable: i
        })
    }
    , function(e) {
        let {swiper: c, extendParams: t, on: a, emit: u} = e;
        const s = L();
        t({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null,
                noMousewheelClass: "swiper-no-mousewheel"
            }
        }),
        c.mousewheel = {
            enabled: !1
        };
        let m, r = g(), h;
        const v = [];
        function i() {
            c.enabled && (c.mouseEntered = !0)
        }
        function l() {
            c.enabled && (c.mouseEntered = !1)
        }
        function f(e) {
            c.params.mousewheel.thresholdDelta && e.delta < c.params.mousewheel.thresholdDelta || c.params.mousewheel.thresholdTime && g() - r < c.params.mousewheel.thresholdTime || 6 <= e.delta && g() - r < 60 || (e.direction < 0 ? c.isEnd && !c.params.loop || c.animating || (c.slideNext(),
            u("scroll", e.raw)) : c.isBeginning && !c.params.loop || c.animating || (c.slidePrev(),
            u("scroll", e.raw)),
            r = (new s.Date).getTime())
        }
        function n(s) {
            let r = s;
            if (c.enabled && !s.target.closest("." + c.params.mousewheel.noMousewheelClass)) {
                var i = c.params.mousewheel;
                c.params.cssMode && r.preventDefault();
                let e = c.el;
                var l = (e = "container" !== c.params.mousewheel.eventsTarget ? document.querySelector(c.params.mousewheel.eventsTarget) : e) && e.contains(r.target);
                if (!c.mouseEntered && !l && !i.releaseOnEdges)
                    return !0;
                r.originalEvent && (r = r.originalEvent);
                let t = 0;
                var l = c.rtlTranslate ? -1 : 1
                  , n = function(e) {
                    let t = 0
                      , a = 0
                      , s = 0
                      , r = 0;
                    return "detail"in e && (a = e.detail),
                    "wheelDelta"in e && (a = -e.wheelDelta / 120),
                    "wheelDeltaY"in e && (a = -e.wheelDeltaY / 120),
                    "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
                    "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = a,
                    a = 0),
                    s = 10 * t,
                    r = 10 * a,
                    "deltaY"in e && (r = e.deltaY),
                    "deltaX"in e && (s = e.deltaX),
                    e.shiftKey && !s && (s = r,
                    r = 0),
                    (s || r) && e.deltaMode && (1 === e.deltaMode ? (s *= 40,
                    r *= 40) : (s *= 800,
                    r *= 800)),
                    s && !t && (t = s < 1 ? -1 : 1),
                    r && !a && (a = r < 1 ? -1 : 1),
                    {
                        spinX: t,
                        spinY: a,
                        pixelX: s,
                        pixelY: r
                    }
                }(r);
                if (i.forceToAxis)
                    if (c.isHorizontal()) {
                        if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY)))
                            return !0;
                        t = -n.pixelX * l
                    } else {
                        if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX)))
                            return !0;
                        t = -n.pixelY
                    }
                else
                    t = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * l : -n.pixelY;
                if (0 === t)
                    return !0;
                i.invert && (t = -t);
                let a = c.getTranslate() + t * i.sensitivity;
                if ((a = a >= c.minTranslate() ? c.minTranslate() : a) <= c.maxTranslate() && (a = c.maxTranslate()),
                (!!c.params.loop || !(a === c.minTranslate() || a === c.maxTranslate())) && c.params.nested && r.stopPropagation(),
                c.params.freeMode && c.params.freeMode.enabled) {
                    const d = {
                        time: g(),
                        delta: Math.abs(t),
                        direction: Math.sign(t)
                    };
                    l = h && d.time < h.time + 500 && d.delta <= h.delta && d.direction === h.direction;
                    if (!l) {
                        h = void 0;
                        let e = c.getTranslate() + t * i.sensitivity;
                        var n = c.isBeginning
                          , o = c.isEnd;
                        if ((e = e >= c.minTranslate() ? c.minTranslate() : e) <= c.maxTranslate() && (e = c.maxTranslate()),
                        c.setTransition(0),
                        c.setTranslate(e),
                        c.updateProgress(),
                        c.updateActiveIndex(),
                        c.updateSlidesClasses(),
                        (!n && c.isBeginning || !o && c.isEnd) && c.updateSlidesClasses(),
                        c.params.loop && c.loopFix({
                            direction: d.direction < 0 ? "next" : "prev",
                            byMousewheel: !0
                        }),
                        c.params.freeMode.sticky) {
                            clearTimeout(m),
                            m = void 0,
                            15 <= v.length && v.shift();
                            n = v.length ? v[v.length - 1] : void 0,
                            o = v[0];
                            if (v.push(d),
                            n && (d.delta > n.delta || d.direction !== n.direction))
                                v.splice(0);
                            else if (15 <= v.length && d.time - o.time < 500 && 1 <= o.delta - d.delta && d.delta <= 6) {
                                const p = 0 < t ? .8 : .2;
                                h = d,
                                v.splice(0),
                                m = T( () => {
                                    c.slideToClosest(c.params.speed, !0, void 0, p)
                                }
                                , 0)
                            }
                            m = m || T( () => {
                                h = d,
                                v.splice(0),
                                c.slideToClosest(c.params.speed, !0, void 0, .5)
                            }
                            , 500)
                        }
                        if (l || u("scroll", r),
                        c.params.autoplay && c.params.autoplayDisableOnInteraction && c.autoplay.stop(),
                        i.releaseOnEdges && (e === c.minTranslate() || e === c.maxTranslate()))
                            return !0
                    }
                } else {
                    n = {
                        time: g(),
                        delta: Math.abs(t),
                        direction: Math.sign(t),
                        raw: s
                    },
                    o = (2 <= v.length && v.shift(),
                    v.length ? v[v.length - 1] : void 0);
                    if (v.push(n),
                    (!o || n.direction !== o.direction || n.delta > o.delta || n.time > o.time + 150) && f(n),
                    function(e) {
                        var t = c.params.mousewheel;
                        if (e.direction < 0) {
                            if (c.isEnd && !c.params.loop && t.releaseOnEdges)
                                return 1
                        } else if (c.isBeginning && !c.params.loop && t.releaseOnEdges)
                            return 1
                    }(n))
                        return !0
                }
                return r.preventDefault ? r.preventDefault() : r.returnValue = !1,
                !1
            }
        }
        function o(e) {
            let t = c.el;
            (t = "container" !== c.params.mousewheel.eventsTarget ? document.querySelector(c.params.mousewheel.eventsTarget) : t)[e]("mouseenter", i),
            t[e]("mouseleave", l),
            t[e]("wheel", n)
        }
        function d() {
            if (c.params.cssMode)
                c.wrapperEl.removeEventListener("wheel", n);
            else {
                if (c.mousewheel.enabled)
                    return !1;
                o("addEventListener"),
                c.mousewheel.enabled = !0
            }
            return !0
        }
        function p() {
            if (c.params.cssMode)
                c.wrapperEl.addEventListener(event, n);
            else {
                if (!c.mousewheel.enabled)
                    return !1;
                o("removeEventListener"),
                c.mousewheel.enabled = !1
            }
            return !0
        }
        a("init", () => {
            !c.params.mousewheel.enabled && c.params.cssMode && p(),
            c.params.mousewheel.enabled && d()
        }
        ),
        a("destroy", () => {
            c.params.cssMode && d(),
            c.mousewheel.enabled && p()
        }
        ),
        Object.assign(c.mousewheel, {
            enable: d,
            disable: p
        })
    }
    , function(e) {
        let {swiper: r, extendParams: t, on: a, emit: i} = e;
        t({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        }),
        r.navigation = {
            nextEl: null,
            prevEl: null
        };
        const l = e => (Array.isArray(e) ? e : [e]).filter(e => !!e);
        function n(e) {
            let t;
            return !(e && "string" == typeof e && r.isElement && (t = r.el.querySelector(e))) && (e && ("string" == typeof e && (t = [...document.querySelectorAll(e)]),
            r.params.uniqueNavElements) && "string" == typeof e && 1 < t.length && 1 === r.el.querySelectorAll(e).length && (t = r.el.querySelector(e)),
            e) && !t ? e : t
        }
        function s(e, t) {
            const a = r.params.navigation;
            (e = l(e)).forEach(e => {
                e && (e.classList[t ? "add" : "remove"](...a.disabledClass.split(" ")),
                "BUTTON" === e.tagName && (e.disabled = t),
                r.params.watchOverflow) && r.enabled && e.classList[r.isLocked ? "add" : "remove"](a.lockClass)
            }
            )
        }
        function o() {
            var {nextEl: e, prevEl: t} = r.navigation;
            r.params.loop ? (s(t, !1),
            s(e, !1)) : (s(t, r.isBeginning && !r.params.rewind),
            s(e, r.isEnd && !r.params.rewind))
        }
        function d(e) {
            e.preventDefault(),
            r.isBeginning && !r.params.loop && !r.params.rewind || (r.slidePrev(),
            i("navigationPrev"))
        }
        function p(e) {
            e.preventDefault(),
            r.isEnd && !r.params.loop && !r.params.rewind || (r.slideNext(),
            i("navigationNext"))
        }
        function c() {
            const a = r.params.navigation;
            if (r.params.navigation = P(r, r.originalParams.navigation, r.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }),
            a.nextEl || a.prevEl) {
                var e = n(a.nextEl)
                  , t = n(a.prevEl);
                Object.assign(r.navigation, {
                    nextEl: e,
                    prevEl: t
                }),
                e = l(e),
                t = l(t);
                const s = (e, t) => {
                    e && e.addEventListener("click", "next" === t ? p : d),
                    !r.enabled && e && e.classList.add(...a.lockClass.split(" "))
                }
                ;
                e.forEach(e => s(e, "next")),
                t.forEach(e => s(e, "prev"))
            }
        }
        function u() {
            var {nextEl: e, prevEl: t} = r.navigation
              , e = l(e)
              , t = l(t);
            const a = (e, t) => {
                e.removeEventListener("click", "next" === t ? p : d),
                e.classList.remove(...r.params.navigation.disabledClass.split(" "))
            }
            ;
            e.forEach(e => a(e, "next")),
            t.forEach(e => a(e, "prev"))
        }
        a("init", () => {
            (!1 === r.params.navigation.enabled ? m : (c(),
            o))()
        }
        ),
        a("toEdge fromEdge lock unlock", () => {
            o()
        }
        ),
        a("destroy", () => {
            u()
        }
        ),
        a("enable disable", () => {
            var {nextEl: e, prevEl: t} = r.navigation
              , e = l(e)
              , t = l(t);
            r.enabled ? o() : [...e, ...t].filter(e => !!e).forEach(e => e.classList.add(r.params.navigation.lockClass))
        }
        ),
        a("click", (e, t) => {
            var {nextEl: a, prevEl: s} = r.navigation
              , a = l(a)
              , s = l(s)
              , t = t.target;
            if (r.params.navigation.hideOnClick && !s.includes(t) && !a.includes(t) && (!(r.pagination && r.params.pagination && r.params.pagination.clickable) || r.pagination.el !== t && !r.pagination.el.contains(t))) {
                let e;
                a.length ? e = a[0].classList.contains(r.params.navigation.hiddenClass) : s.length && (e = s[0].classList.contains(r.params.navigation.hiddenClass)),
                !0 === e ? i("navigationShow") : i("navigationHide"),
                [...a, ...s].filter(e => !!e).forEach(e => e.classList.toggle(r.params.navigation.hiddenClass))
            }
        }
        );
        const m = () => {
            r.el.classList.add(...r.params.navigation.navigationDisabledClass.split(" ")),
            u()
        }
        ;
        Object.assign(r.navigation, {
            enable: () => {
                r.el.classList.remove(...r.params.navigation.navigationDisabledClass.split(" ")),
                c(),
                o()
            }
            ,
            disable: m,
            update: o,
            init: c,
            destroy: u
        })
    }
    , function(e) {
        let {swiper: h, extendParams: t, on: a, emit: v} = e;
        e = "swiper-pagination",
        t({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: e + "-bullet",
                bulletActiveClass: e + "-bullet-active",
                modifierClass: e + "-",
                currentClass: e + "-current",
                totalClass: e + "-total",
                hiddenClass: e + "-hidden",
                progressbarFillClass: e + "-progressbar-fill",
                progressbarOppositeClass: e + "-progressbar-opposite",
                clickableClass: e + "-clickable",
                lockClass: e + "-lock",
                horizontalClass: e + "-horizontal",
                verticalClass: e + "-vertical",
                paginationDisabledClass: e + "-disabled"
            }
        }),
        h.pagination = {
            el: null,
            bullets: []
        };
        let f, g = 0;
        const w = e => (Array.isArray(e) ? e : [e]).filter(e => !!e);
        function i() {
            return !h.params.pagination.el || !h.pagination.el || Array.isArray(h.pagination.el) && 0 === h.pagination.el.length
        }
        function b(e, t) {
            var a = h.params.pagination["bulletActiveClass"];
            (e = e && e[`${"prev" === t ? "previous" : "next"}ElementSibling`]) && (e.classList.add(a + "-" + t),
            e = e[`${"prev" === t ? "previous" : "next"}ElementSibling`]) && e.classList.add(a + `-${t}-` + t)
        }
        function s(e) {
            var t = e.target.closest(O(h.params.pagination.bulletClass));
            if (t) {
                e.preventDefault();
                e = C(t) * h.params.slidesPerGroup;
                if (h.params.loop) {
                    if (h.realIndex !== e) {
                        const s = h.realIndex
                          , r = h.getSlideIndexByData(e);
                        var t = h.getSlideIndexByData(h.realIndex)
                          , a = e => {
                            var t = h.activeIndex
                              , e = (h.loopFix({
                                direction: e,
                                activeSlideIndex: r,
                                slideTo: !1
                            }),
                            h.activeIndex);
                            t === e && h.slideToLoop(s, 0, !1, !0)
                        }
                        ;
                        r > h.slides.length - h.loopedSlides ? a(r > t ? "next" : "prev") : h.params.centeredSlides && (t = "auto" === h.params.slidesPerView ? h.slidesPerViewDynamic() : Math.ceil(parseFloat(h.params.slidesPerView, 10)),
                        r < Math.floor(t / 2)) && a("prev"),
                        h.slideToLoop(e)
                    }
                } else
                    h.slideTo(e)
            }
        }
        function r() {
            var r = h.rtl;
            const l = h.params.pagination;
            if (!i()) {
                var n = h.pagination.el
                  , n = w(n);
                let i, t;
                var o = (h.virtual && h.params.virtual.enabled ? h.virtual : h).slides.length;
                const c = h.params.loop ? Math.ceil(o / h.params.slidesPerGroup) : h.snapGrid.length;
                if (h.params.loop ? (t = h.previousRealIndex || 0,
                i = 1 < h.params.slidesPerGroup ? Math.floor(h.realIndex / h.params.slidesPerGroup) : h.realIndex) : void 0 !== h.snapIndex ? (i = h.snapIndex,
                t = h.previousSnapIndex) : (t = h.previousIndex || 0,
                i = h.activeIndex || 0),
                "bullets" === l.type && h.pagination.bullets && 0 < h.pagination.bullets.length) {
                    var d = h.pagination.bullets;
                    let a, s, e;
                    if (l.dynamicBullets && (f = j(d[0], h.isHorizontal() ? "width" : "height", !0),
                    n.forEach(e => {
                        e.style[h.isHorizontal() ? "width" : "height"] = f * (l.dynamicMainBullets + 4) + "px"
                    }
                    ),
                    1 < l.dynamicMainBullets && void 0 !== t && ((g += i - (t || 0)) > l.dynamicMainBullets - 1 ? g = l.dynamicMainBullets - 1 : g < 0 && (g = 0)),
                    a = Math.max(i - g, 0),
                    s = a + (Math.min(d.length, l.dynamicMainBullets) - 1),
                    e = (s + a) / 2),
                    d.forEach(e => {
                        var t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => "" + l.bulletActiveClass + e)].map(e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e).flat();
                        e.classList.remove(...t)
                    }
                    ),
                    1 < n.length)
                        d.forEach(e => {
                            var t = C(e);
                            t === i ? e.classList.add(...l.bulletActiveClass.split(" ")) : h.isElement && e.setAttribute("part", "bullet"),
                            l.dynamicBullets && (t >= a && t <= s && e.classList.add(...(l.bulletActiveClass + "-main").split(" ")),
                            t === a && b(e, "prev"),
                            t === s) && b(e, "next")
                        }
                        );
                    else {
                        o = d[i];
                        if (o && o.classList.add(...l.bulletActiveClass.split(" ")),
                        h.isElement && d.forEach( (e, t) => {
                            e.setAttribute("part", t === i ? "bullet-active" : "bullet")
                        }
                        ),
                        l.dynamicBullets) {
                            var o = d[a]
                              , p = d[s];
                            for (let e = a; e <= s; e += 1)
                                d[e] && d[e].classList.add(...(l.bulletActiveClass + "-main").split(" "));
                            b(o, "prev"),
                            b(p, "next")
                        }
                    }
                    if (l.dynamicBullets) {
                        o = Math.min(d.length, l.dynamicMainBullets + 4);
                        const u = (f * o - f) / 2 - e * f
                          , m = r ? "right" : "left";
                        d.forEach(e => {
                            e.style[h.isHorizontal() ? m : "top"] = u + "px"
                        }
                        )
                    }
                }
                n.forEach( (s, e) => {
                    if ("fraction" === l.type && (s.querySelectorAll(O(l.currentClass)).forEach(e => {
                        e.textContent = l.formatFractionCurrent(i + 1)
                    }
                    ),
                    s.querySelectorAll(O(l.totalClass)).forEach(e => {
                        e.textContent = l.formatFractionTotal(c)
                    }
                    )),
                    "progressbar" === l.type) {
                        let e;
                        e = l.progressbarOpposite ? h.isHorizontal() ? "vertical" : "horizontal" : h.isHorizontal() ? "horizontal" : "vertical";
                        var r = (i + 1) / c;
                        let t = 1
                          , a = 1;
                        "horizontal" === e ? t = r : a = r,
                        s.querySelectorAll(O(l.progressbarFillClass)).forEach(e => {
                            e.style.transform = `translate3d(0,0,0) scaleX(${t}) scaleY(${a})`,
                            e.style.transitionDuration = h.params.speed + "ms"
                        }
                        )
                    }
                    "custom" === l.type && l.renderCustom ? (s.innerHTML = l.renderCustom(h, i + 1, c),
                    0 === e && v("paginationRender", s)) : (0 === e && v("paginationRender", s),
                    v("paginationUpdate", s)),
                    h.params.watchOverflow && h.enabled && s.classList[h.isLocked ? "add" : "remove"](l.lockClass)
                }
                )
            }
        }
        function l() {
            const s = h.params.pagination;
            if (!i()) {
                var e = (h.virtual && h.params.virtual.enabled ? h.virtual : h).slides.length
                  , t = h.pagination.el
                  , t = w(t);
                let a = "";
                if ("bullets" === s.type) {
                    let t = h.params.loop ? Math.ceil(e / h.params.slidesPerGroup) : h.snapGrid.length;
                    h.params.freeMode && h.params.freeMode.enabled && t > e && (t = e);
                    for (let e = 0; e < t; e += 1)
                        s.renderBullet ? a += s.renderBullet.call(h, e, s.bulletClass) : a += `<${s.bulletElement} ${h.isElement ? 'part="bullet"' : ""} class="${s.bulletClass}"></${s.bulletElement}>`
                }
                "fraction" === s.type && (a = s.renderFraction ? s.renderFraction.call(h, s.currentClass, s.totalClass) : `<span class="${s.currentClass}"></span>` + " / " + `<span class="${s.totalClass}"></span>`),
                "progressbar" === s.type && (a = s.renderProgressbar ? s.renderProgressbar.call(h, s.progressbarFillClass) : `<span class="${s.progressbarFillClass}"></span>`),
                h.pagination.bullets = [],
                t.forEach(e => {
                    "custom" !== s.type && (e.innerHTML = a || ""),
                    "bullets" === s.type && h.pagination.bullets.push(...e.querySelectorAll(O(s.bulletClass)))
                }
                ),
                "custom" !== s.type && v("paginationRender", t[0])
            }
        }
        function n() {
            h.params.pagination = P(h, h.originalParams.pagination, h.params.pagination, {
                el: "swiper-pagination"
            });
            const t = h.params.pagination;
            if (t.el) {
                let e;
                (e = (e = (e = "string" == typeof t.el && h.isElement ? h.el.querySelector(t.el) : e) || "string" != typeof t.el ? e : [...document.querySelectorAll(t.el)]) || t.el) && 0 !== e.length && (h.params.uniqueNavElements && "string" == typeof t.el && Array.isArray(e) && 1 < e.length && 1 < (e = [...h.el.querySelectorAll(t.el)]).length && (e = e.filter(e => k(e, ".swiper")[0] === h.el)[0]),
                Array.isArray(e) && 1 === e.length && (e = e[0]),
                Object.assign(h.pagination, {
                    el: e
                }),
                (e = w(e)).forEach(e => {
                    "bullets" === t.type && t.clickable && e.classList.add(...(t.clickableClass || "").split(" ")),
                    e.classList.add(t.modifierClass + t.type),
                    e.classList.add(h.isHorizontal() ? t.horizontalClass : t.verticalClass),
                    "bullets" === t.type && t.dynamicBullets && (e.classList.add("" + t.modifierClass + t.type + "-dynamic"),
                    g = 0,
                    t.dynamicMainBullets < 1) && (t.dynamicMainBullets = 1),
                    "progressbar" === t.type && t.progressbarOpposite && e.classList.add(t.progressbarOppositeClass),
                    t.clickable && e.addEventListener("click", s),
                    h.enabled || e.classList.add(t.lockClass)
                }
                ))
            }
        }
        function o() {
            const t = h.params.pagination;
            var e;
            i() || ((e = h.pagination.el) && (e = w(e)).forEach(e => {
                e.classList.remove(t.hiddenClass),
                e.classList.remove(t.modifierClass + t.type),
                e.classList.remove(h.isHorizontal() ? t.horizontalClass : t.verticalClass),
                t.clickable && (e.classList.remove(...(t.clickableClass || "").split(" ")),
                e.removeEventListener("click", s))
            }
            ),
            h.pagination.bullets && h.pagination.bullets.forEach(e => e.classList.remove(...t.bulletActiveClass.split(" "))))
        }
        a("changeDirection", () => {
            if (h.pagination && h.pagination.el) {
                const t = h.params.pagination;
                var e = h.pagination["el"];
                (e = w(e)).forEach(e => {
                    e.classList.remove(t.horizontalClass, t.verticalClass),
                    e.classList.add(h.isHorizontal() ? t.horizontalClass : t.verticalClass)
                }
                )
            }
        }
        ),
        a("init", () => {
            (!1 === h.params.pagination.enabled ? d : (n(),
            l(),
            r))()
        }
        ),
        a("activeIndexChange", () => {
            void 0 === h.snapIndex && r()
        }
        ),
        a("snapIndexChange", () => {
            r()
        }
        ),
        a("snapGridLengthChange", () => {
            l(),
            r()
        }
        ),
        a("destroy", () => {
            o()
        }
        ),
        a("enable disable", () => {
            var e = h.pagination["el"];
            e && (e = w(e)).forEach(e => e.classList[h.enabled ? "remove" : "add"](h.params.pagination.lockClass))
        }
        ),
        a("lock unlock", () => {
            r()
        }
        ),
        a("click", (e, t) => {
            var t = t.target
              , a = w(h.pagination.el);
            h.params.pagination.el && h.params.pagination.hideOnClick && a && 0 < a.length && !t.classList.contains(h.params.pagination.bulletClass) && (h.navigation && (h.navigation.nextEl && t === h.navigation.nextEl || h.navigation.prevEl && t === h.navigation.prevEl) || (!0 === a[0].classList.contains(h.params.pagination.hiddenClass) ? v("paginationShow") : v("paginationHide"),
            a.forEach(e => e.classList.toggle(h.params.pagination.hiddenClass))))
        }
        );
        const d = () => {
            h.el.classList.add(h.params.pagination.paginationDisabledClass);
            var e = h.pagination["el"];
            e && (e = w(e)).forEach(e => e.classList.add(h.params.pagination.paginationDisabledClass)),
            o()
        }
        ;
        Object.assign(h.pagination, {
            enable: () => {
                h.el.classList.remove(h.params.pagination.paginationDisabledClass);
                var e = h.pagination["el"];
                e && (e = w(e)).forEach(e => e.classList.remove(h.params.pagination.paginationDisabledClass)),
                n(),
                l(),
                r()
            }
            ,
            disable: d,
            render: l,
            update: r,
            init: n,
            destroy: o
        })
    }
    , function(e) {
        let {swiper: n, extendParams: t, on: a, emit: i} = e;
        const l = A();
        let o = !1, d = null, p = null, c, u, m, s;
        function r() {
            if (n.params.scrollbar.el && n.scrollbar.el) {
                var {scrollbar: a, rtlTranslate: s} = n;
                const {dragEl: i, el: l} = a;
                var a = n.params.scrollbar
                  , r = n.params.loop ? n.progressLoop : n.progress;
                let e = u
                  , t = (m - u) * r;
                s ? 0 < (t = -t) ? (e = u - t,
                t = 0) : -t + u > m && (e = m + t) : t < 0 ? (e = u + t,
                t = 0) : t + u > m && (e = m - t),
                n.isHorizontal() ? (i.style.transform = `translate3d(${t}px, 0, 0)`,
                i.style.width = e + "px") : (i.style.transform = `translate3d(0px, ${t}px, 0)`,
                i.style.height = e + "px"),
                a.hide && (clearTimeout(d),
                l.style.opacity = 1,
                d = setTimeout( () => {
                    l.style.opacity = 0,
                    l.style.transitionDuration = "400ms"
                }
                , 1e3))
            }
        }
        function h() {
            var e, t, a;
            n.params.scrollbar.el && n.scrollbar.el && (e = n["scrollbar"],
            {dragEl: t, el: a} = e,
            t.style.width = "",
            t.style.height = "",
            m = n.isHorizontal() ? a.offsetWidth : a.offsetHeight,
            s = n.size / (n.virtualSize + n.params.slidesOffsetBefore - (n.params.centeredSlides ? n.snapGrid[0] : 0)),
            u = "auto" === n.params.scrollbar.dragSize ? m * s : parseInt(n.params.scrollbar.dragSize, 10),
            n.isHorizontal() ? t.style.width = u + "px" : t.style.height = u + "px",
            1 <= s ? a.style.display = "none" : a.style.display = "",
            n.params.scrollbar.hide && (a.style.opacity = 0),
            n.params.watchOverflow) && n.enabled && e.el.classList[n.isLocked ? "add" : "remove"](n.params.scrollbar.lockClass)
        }
        function v(e) {
            return n.isHorizontal() ? e.clientX : e.clientY
        }
        function f(e) {
            var {scrollbar: t, rtlTranslate: a} = n
              , t = t["el"];
            let s;
            s = (v(e) - I(t)[n.isHorizontal() ? "left" : "top"] - (null !== c ? c : u / 2)) / (m - u),
            s = Math.max(Math.min(s, 1), 0),
            a && (s = 1 - s);
            e = n.minTranslate() + (n.maxTranslate() - n.minTranslate()) * s;
            n.updateProgress(e),
            n.setTranslate(e),
            n.updateActiveIndex(),
            n.updateSlidesClasses()
        }
        function g(e) {
            var t = n.params.scrollbar
              , {scrollbar: a, wrapperEl: s} = n
              , {el: a, dragEl: r} = a;
            o = !0,
            c = e.target === r ? v(e) - e.target.getBoundingClientRect()[n.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            s.style.transitionDuration = "100ms",
            r.style.transitionDuration = "100ms",
            f(e),
            clearTimeout(p),
            a.style.transitionDuration = "0ms",
            t.hide && (a.style.opacity = 1),
            n.params.cssMode && (n.wrapperEl.style["scroll-snap-type"] = "none"),
            i("scrollbarDragStart", e)
        }
        function w(e) {
            var {scrollbar: t, wrapperEl: a} = n
              , {el: t, dragEl: s} = t;
            o && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            f(e),
            a.style.transitionDuration = "0ms",
            t.style.transitionDuration = "0ms",
            s.style.transitionDuration = "0ms",
            i("scrollbarDragMove", e))
        }
        function b(e) {
            var t = n.params.scrollbar
              , {scrollbar: a, wrapperEl: s} = n;
            const r = a["el"];
            o && (o = !1,
            n.params.cssMode && (n.wrapperEl.style["scroll-snap-type"] = "",
            s.style.transitionDuration = ""),
            t.hide && (clearTimeout(p),
            p = T( () => {
                r.style.opacity = 0,
                r.style.transitionDuration = "400ms"
            }
            , 1e3)),
            i("scrollbarDragEnd", e),
            t.snapOnRelease) && n.slideToClosest()
        }
        function y(e) {
            var t, {scrollbar: a, params: s} = n, a = a.el;
            a && (t = !!s.passiveListeners && {
                passive: !1,
                capture: !1
            },
            s = !!s.passiveListeners && {
                passive: !0,
                capture: !1
            },
            a = a) && (a[a = "on" === e ? "addEventListener" : "removeEventListener"]("pointerdown", g, t),
            l[a]("pointermove", w, t),
            l[a]("pointerup", b, s))
        }
        function E() {
            var {scrollbar: a, el: s} = n
              , r = (n.params.scrollbar = P(n, n.originalParams.scrollbar, n.params.scrollbar, {
                el: "swiper-scrollbar"
            }),
            n.params.scrollbar);
            if (r.el) {
                let e;
                e = (e = "string" == typeof r.el && n.isElement ? n.el.querySelector(r.el) : e) || "string" != typeof r.el ? e || r.el : l.querySelectorAll(r.el),
                (e = 0 < (e = n.params.uniqueNavElements && "string" == typeof r.el && 1 < e.length && 1 === s.querySelectorAll(r.el).length ? s.querySelector(r.el) : e).length ? e[0] : e).classList.add(n.isHorizontal() ? r.horizontalClass : r.verticalClass);
                let t;
                !e || (t = e.querySelector("." + n.params.scrollbar.dragClass)) || (t = M("div", n.params.scrollbar.dragClass),
                e.append(t)),
                Object.assign(a, {
                    el: e,
                    dragEl: t
                }),
                r.draggable && n.params.scrollbar.el && n.scrollbar.el && y("on"),
                e && e.classList[n.enabled ? "remove" : "add"](n.params.scrollbar.lockClass)
            }
        }
        function x() {
            var e = n.params.scrollbar
              , t = n.scrollbar.el;
            t && t.classList.remove(n.isHorizontal() ? e.horizontalClass : e.verticalClass),
            n.params.scrollbar.el && n.scrollbar.el && y("off")
        }
        t({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: "swiper-scrollbar-horizontal",
                verticalClass: "swiper-scrollbar-vertical"
            }
        }),
        n.scrollbar = {
            el: null,
            dragEl: null
        },
        a("init", () => {
            (!1 === n.params.scrollbar.enabled ? S : (E(),
            h(),
            r))()
        }
        ),
        a("update resize observerUpdate lock unlock", () => {
            h()
        }
        ),
        a("setTranslate", () => {
            r()
        }
        ),
        a("setTransition", (e, t) => {
            t = t,
            n.params.scrollbar.el && n.scrollbar.el && (n.scrollbar.dragEl.style.transitionDuration = t + "ms")
        }
        ),
        a("enable disable", () => {
            var e = n.scrollbar["el"];
            e && e.classList[n.enabled ? "remove" : "add"](n.params.scrollbar.lockClass)
        }
        ),
        a("destroy", () => {
            x()
        }
        );
        const S = () => {
            n.el.classList.add(n.params.scrollbar.scrollbarDisabledClass),
            n.scrollbar.el && n.scrollbar.el.classList.add(n.params.scrollbar.scrollbarDisabledClass),
            x()
        }
        ;
        Object.assign(n.scrollbar, {
            enable: () => {
                n.el.classList.remove(n.params.scrollbar.scrollbarDisabledClass),
                n.scrollbar.el && n.scrollbar.el.classList.remove(n.params.scrollbar.scrollbarDisabledClass),
                E(),
                h(),
                r()
            }
            ,
            disable: S,
            updateSize: h,
            setTranslate: r,
            init: E,
            destroy: x
        })
    }
    , function(e) {
        let {swiper: p, extendParams: t, on: a} = e;
        t({
            parallax: {
                enabled: !1
            }
        });
        const i = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          , l = (e, t) => {
            var a = p["rtl"]
              , a = a ? -1 : 1
              , s = e.getAttribute("data-swiper-parallax") || "0";
            let r = e.getAttribute("data-swiper-parallax-x")
              , i = e.getAttribute("data-swiper-parallax-y");
            var l = e.getAttribute("data-swiper-parallax-scale")
              , n = e.getAttribute("data-swiper-parallax-opacity")
              , o = e.getAttribute("data-swiper-parallax-rotate");
            r || i ? (r = r || "0",
            i = i || "0") : p.isHorizontal() ? (r = s,
            i = "0") : (i = s,
            r = "0"),
            r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t * a + "%" : r * t * a + "px",
            i = 0 <= i.indexOf("%") ? parseInt(i, 10) * t + "%" : i * t + "px",
            null != n && (s = n - (n - 1) * (1 - Math.abs(t)),
            e.style.opacity = s);
            let d = `translate3d(${r}, ${i}, 0px)`;
            null != l && (a = l - (l - 1) * (1 - Math.abs(t)),
            d += ` scale(${a})`),
            o && null != o && (d += ` rotate(${o * t * -1}deg)`),
            e.style.transform = d
        }
          , s = () => {
            const {el: e, slides: t, progress: s, snapGrid: r} = p;
            var a = F(e, i);
            p.isElement && a.push(...F(p.hostEl, i)),
            a.forEach(e => {
                l(e, s)
            }
            ),
            t.forEach( (e, t) => {
                let a = e.progress;
                1 < p.params.slidesPerGroup && "auto" !== p.params.slidesPerView && (a += Math.ceil(t / 2) - s * (r.length - 1)),
                a = Math.min(Math.max(a, -1), 1),
                e.querySelectorAll(i + ", [data-swiper-parallax-rotate]").forEach(e => {
                    l(e, a)
                }
                )
            }
            )
        }
        ;
        a("beforeInit", () => {
            p.params.parallax.enabled && (p.params.watchSlidesProgress = !0,
            p.originalParams.watchSlidesProgress = !0)
        }
        ),
        a("init", () => {
            p.params.parallax.enabled && s()
        }
        ),
        a("setTranslate", () => {
            p.params.parallax.enabled && s()
        }
        ),
        a("setTransition", (e, t) => {
            var a, s;
            p.params.parallax.enabled && ({el: t, hostEl: s} = (void 0 === (a = t) && (a = p.params.speed),
            p),
            t = [...t.querySelectorAll(i)],
            p.isElement && t.push(...s.querySelectorAll(i)),
            t.forEach(e => {
                let t = parseInt(e.getAttribute("data-swiper-parallax-duration"), 10) || a;
                0 === a && (t = 0),
                e.style.transitionDuration = t + "ms"
            }
            ))
        }
        )
    }
    , function(e) {
        let {swiper: u, extendParams: t, on: a, emit: s} = e;
        const m = L();
        t({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }),
        u.zoom = {
            enabled: !1
        };
        let h = 1, i = !1, r, l;
        const n = []
          , v = {
            originX: 0,
            originY: 0,
            slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            imageEl: void 0,
            imageWrapEl: void 0,
            maxRatio: 3
        }
          , f = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
        }
          , o = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
        };
        let d = 1;
        function p() {
            var e, t, a, s;
            return n.length < 2 ? 1 : (e = n[0].pageX,
            t = n[0].pageY,
            a = n[1].pageX,
            s = n[1].pageY,
            Math.sqrt((a - e) ** 2 + (s - t) ** 2))
        }
        function c(t) {
            var e = u.isElement ? "swiper-slide" : "." + u.params.slideClass;
            return t.target.matches(e) || 0 < u.slides.filter(e => e.contains(t.target)).length
        }
        function g(t) {
            if ("mouse" === t.pointerType && n.splice(0, n.length),
            c(t)) {
                var a = u.params.zoom;
                if (r = !1,
                l = !1,
                n.push(t),
                !(n.length < 2)) {
                    if (r = !0,
                    v.scaleStart = p(),
                    !v.slideEl) {
                        v.slideEl = t.target.closest(`.${u.params.slideClass}, swiper-slide`),
                        v.slideEl || (v.slideEl = u.slides[u.activeIndex]);
                        let e = v.slideEl.querySelector("." + a.containerClass);
                        if (e = e && e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0],
                        (v.imageEl = e) ? v.imageWrapEl = k(v.imageEl, "." + a.containerClass)[0] : v.imageWrapEl = void 0,
                        !v.imageWrapEl)
                            return void (v.imageEl = void 0);
                        v.maxRatio = v.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio
                    }
                    v.imageEl && ([a,t] = n.length < 2 ? {
                        x: null,
                        y: null
                    } : (t = v.imageEl.getBoundingClientRect(),
                    [(n[0].pageX + (n[1].pageX - n[0].pageX) / 2 - t.x - m.scrollX) / h, (n[0].pageY + (n[1].pageY - n[0].pageY) / 2 - t.y - m.scrollY) / h]),
                    v.originX = a,
                    v.originY = t,
                    v.imageEl.style.transitionDuration = "0ms"),
                    i = !0
                }
            }
        }
        function w(t) {
            var e, a, s;
            c(t) && (e = u.params.zoom,
            a = u.zoom,
            0 <= (s = n.findIndex(e => e.pointerId === t.pointerId)) && (n[s] = t),
            n.length < 2 || (l = !0,
            v.scaleMove = p(),
            v.imageEl && (a.scale = v.scaleMove / v.scaleStart * h,
            a.scale > v.maxRatio && (a.scale = v.maxRatio - 1 + (a.scale - v.maxRatio + 1) ** .5),
            a.scale < e.minRatio && (a.scale = e.minRatio + 1 - (e.minRatio - a.scale + 1) ** .5),
            v.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`)))
        }
        function b(t) {
            var e, a, s;
            !c(t) || "mouse" === t.pointerType && "pointerout" === t.type || (e = u.params.zoom,
            a = u.zoom,
            0 <= (s = n.findIndex(e => e.pointerId === t.pointerId)) && n.splice(s, 1),
            r && l && (r = !1,
            l = !1,
            v.imageEl) && (a.scale = Math.max(Math.min(a.scale, v.maxRatio), e.minRatio),
            v.imageEl.style.transitionDuration = u.params.speed + "ms",
            v.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`,
            h = a.scale,
            i = !1,
            1 < a.scale && v.slideEl ? v.slideEl.classList.add("" + e.zoomedSlideClass) : a.scale <= 1 && v.slideEl && v.slideEl.classList.remove("" + e.zoomedSlideClass),
            1 === a.scale) && (v.originX = 0,
            v.originY = 0,
            v.slideEl = void 0))
        }
        function y(e) {
            if (c(e) && (t = e,
            a = "." + u.params.zoom.containerClass,
            t.target.matches(a) || 0 < [...u.hostEl.querySelectorAll(a)].filter(e => e.contains(t.target)).length)) {
                var t, a = u.zoom;
                if (v.imageEl && f.isTouched && v.slideEl) {
                    f.isMoved || (f.width = v.imageEl.offsetWidth,
                    f.height = v.imageEl.offsetHeight,
                    f.startX = z(v.imageWrapEl, "x") || 0,
                    f.startY = z(v.imageWrapEl, "y") || 0,
                    v.slideWidth = v.slideEl.offsetWidth,
                    v.slideHeight = v.slideEl.offsetHeight,
                    v.imageWrapEl.style.transitionDuration = "0ms");
                    var s = f.width * a.scale
                      , r = f.height * a.scale;
                    if (!(s < v.slideWidth && r < v.slideHeight)) {
                        if (f.minX = Math.min(v.slideWidth / 2 - s / 2, 0),
                        f.maxX = -f.minX,
                        f.minY = Math.min(v.slideHeight / 2 - r / 2, 0),
                        f.maxY = -f.minY,
                        f.touchesCurrent.x = (0 < n.length ? n[0] : e).pageX,
                        f.touchesCurrent.y = (0 < n.length ? n[0] : e).pageY,
                        5 < Math.max(Math.abs(f.touchesCurrent.x - f.touchesStart.x), Math.abs(f.touchesCurrent.y - f.touchesStart.y)) && (u.allowClick = !1),
                        !f.isMoved && !i) {
                            if (u.isHorizontal() && (Math.floor(f.minX) === Math.floor(f.startX) && f.touchesCurrent.x < f.touchesStart.x || Math.floor(f.maxX) === Math.floor(f.startX) && f.touchesCurrent.x > f.touchesStart.x))
                                return void (f.isTouched = !1);
                            if (!u.isHorizontal() && (Math.floor(f.minY) === Math.floor(f.startY) && f.touchesCurrent.y < f.touchesStart.y || Math.floor(f.maxY) === Math.floor(f.startY) && f.touchesCurrent.y > f.touchesStart.y))
                                return void (f.isTouched = !1)
                        }
                        e.cancelable && e.preventDefault(),
                        e.stopPropagation(),
                        f.isMoved = !0;
                        var s = (a.scale - h) / (v.maxRatio - u.params.zoom.minRatio)
                          , {originX: r, originY: e} = v;
                        f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX + s * (f.width - 2 * r),
                        f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY + s * (f.height - 2 * e),
                        f.currentX < f.minX && (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** .8),
                        f.currentX > f.maxX && (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** .8),
                        f.currentY < f.minY && (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** .8),
                        f.currentY > f.maxY && (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** .8),
                        o.prevPositionX || (o.prevPositionX = f.touchesCurrent.x),
                        o.prevPositionY || (o.prevPositionY = f.touchesCurrent.y),
                        o.prevTime || (o.prevTime = Date.now()),
                        o.x = (f.touchesCurrent.x - o.prevPositionX) / (Date.now() - o.prevTime) / 2,
                        o.y = (f.touchesCurrent.y - o.prevPositionY) / (Date.now() - o.prevTime) / 2,
                        Math.abs(f.touchesCurrent.x - o.prevPositionX) < 2 && (o.x = 0),
                        Math.abs(f.touchesCurrent.y - o.prevPositionY) < 2 && (o.y = 0),
                        o.prevPositionX = f.touchesCurrent.x,
                        o.prevPositionY = f.touchesCurrent.y,
                        o.prevTime = Date.now(),
                        v.imageWrapEl.style.transform = `translate3d(${f.currentX}px, ${f.currentY}px,0)`
                    }
                }
            }
        }
        function E() {
            var e = u.zoom;
            v.slideEl && u.activeIndex !== u.slides.indexOf(v.slideEl) && (v.imageEl && (v.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
            v.imageWrapEl && (v.imageWrapEl.style.transform = "translate3d(0,0,0)"),
            v.slideEl.classList.remove("" + u.params.zoom.zoomedSlideClass),
            e.scale = 1,
            h = 1,
            v.slideEl = void 0,
            v.imageEl = void 0,
            v.imageWrapEl = void 0,
            v.originX = 0,
            v.originY = 0)
        }
        function x(r) {
            var i, l, n, o, d = u.zoom, p = u.params.zoom;
            if (!v.slideEl) {
                r && r.target && (v.slideEl = r.target.closest(`.${u.params.slideClass}, swiper-slide`)),
                v.slideEl || (u.params.virtual && u.params.virtual.enabled && u.virtual ? v.slideEl = F(u.slidesEl, "." + u.params.slideActiveClass)[0] : v.slideEl = u.slides[u.activeIndex]);
                let e = v.slideEl.querySelector("." + p.containerClass);
                e = e && e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0],
                (v.imageEl = e) ? v.imageWrapEl = k(v.imageEl, "." + p.containerClass)[0] : v.imageWrapEl = void 0
            }
            if (v.imageEl && v.imageWrapEl) {
                u.params.cssMode && (u.wrapperEl.style.overflow = "hidden",
                u.wrapperEl.style.touchAction = "none"),
                v.slideEl.classList.add("" + p.zoomedSlideClass);
                let e, t;
                let a, s;
                t = void 0 === f.touchesStart.x && r ? (e = r.pageX,
                r.pageY) : (e = f.touchesStart.x,
                f.touchesStart.y);
                var c = "number" == typeof r ? r : null;
                1 === h && c && (e = void 0,
                t = void 0),
                d.scale = c || v.imageWrapEl.getAttribute("data-swiper-zoom") || p.maxRatio,
                h = c || v.imageWrapEl.getAttribute("data-swiper-zoom") || p.maxRatio,
                !r || 1 === h && c ? (a = 0,
                s = 0) : (p = v.slideEl.offsetWidth,
                r = v.slideEl.offsetHeight,
                i = I(v.slideEl).left + m.scrollX,
                l = I(v.slideEl).top + m.scrollY,
                i = i + p / 2 - e,
                l = l + r / 2 - t,
                n = v.imageEl.offsetWidth,
                o = v.imageEl.offsetHeight,
                n = n * d.scale,
                o = o * d.scale,
                n = -(p = Math.min(p / 2 - n / 2, 0)),
                o = -(r = Math.min(r / 2 - o / 2, 0)),
                a = i * d.scale,
                s = l * d.scale,
                (a = a < p ? p : a) > n && (a = n),
                (s = s < r ? r : s) > o && (s = o)),
                c && 1 === d.scale && (v.originX = 0,
                v.originY = 0),
                v.imageWrapEl.style.transitionDuration = "300ms",
                v.imageWrapEl.style.transform = `translate3d(${a}px, ${s}px,0)`,
                v.imageEl.style.transitionDuration = "300ms",
                v.imageEl.style.transform = `translate3d(0,0,0) scale(${d.scale})`
            }
        }
        function S() {
            var e = u.zoom
              , t = u.params.zoom;
            if (!v.slideEl) {
                u.params.virtual && u.params.virtual.enabled && u.virtual ? v.slideEl = F(u.slidesEl, "." + u.params.slideActiveClass)[0] : v.slideEl = u.slides[u.activeIndex];
                let e = v.slideEl.querySelector("." + t.containerClass);
                e = e && e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0],
                (v.imageEl = e) ? v.imageWrapEl = k(v.imageEl, "." + t.containerClass)[0] : v.imageWrapEl = void 0
            }
            v.imageEl && v.imageWrapEl && (u.params.cssMode && (u.wrapperEl.style.overflow = "",
            u.wrapperEl.style.touchAction = ""),
            e.scale = 1,
            h = 1,
            v.imageWrapEl.style.transitionDuration = "300ms",
            v.imageWrapEl.style.transform = "translate3d(0,0,0)",
            v.imageEl.style.transitionDuration = "300ms",
            v.imageEl.style.transform = "translate3d(0,0,0) scale(1)",
            v.slideEl.classList.remove("" + t.zoomedSlideClass),
            v.slideEl = void 0,
            v.originX = 0,
            v.originY = 0)
        }
        function T(e) {
            var t = u.zoom;
            t.scale && 1 !== t.scale ? S() : x(e)
        }
        function M() {
            return {
                passiveListener: !!u.params.passiveListeners && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !u.params.passiveListeners || {
                    passive: !1,
                    capture: !0
                }
            }
        }
        function C() {
            var e = u.zoom;
            if (!e.enabled) {
                e.enabled = !0;
                const {passiveListener: t, activeListenerWithCapture: a} = M();
                u.wrapperEl.addEventListener("pointerdown", g, t),
                u.wrapperEl.addEventListener("pointermove", w, a),
                ["pointerup", "pointercancel", "pointerout"].forEach(e => {
                    u.wrapperEl.addEventListener(e, b, t)
                }
                ),
                u.wrapperEl.addEventListener("pointermove", y, a)
            }
        }
        function P() {
            var e = u.zoom;
            if (e.enabled) {
                e.enabled = !1;
                const {passiveListener: t, activeListenerWithCapture: a} = M();
                u.wrapperEl.removeEventListener("pointerdown", g, t),
                u.wrapperEl.removeEventListener("pointermove", w, a),
                ["pointerup", "pointercancel", "pointerout"].forEach(e => {
                    u.wrapperEl.removeEventListener(e, b, t)
                }
                ),
                u.wrapperEl.removeEventListener("pointermove", y, a)
            }
        }
        Object.defineProperty(u.zoom, "scale", {
            get() {
                return d
            },
            set(e) {
                var t, a;
                d !== e && (t = v.imageEl,
                a = v.slideEl,
                s("zoomChange", e, t, a)),
                d = e
            }
        }),
        a("init", () => {
            u.params.zoom.enabled && C()
        }
        ),
        a("destroy", () => {
            P()
        }
        ),
        a("touchStart", (e, t) => {
            var a;
            u.zoom.enabled && (t = t,
            a = u.device,
            v.imageEl) && !f.isTouched && (a.android && t.cancelable && t.preventDefault(),
            f.isTouched = !0,
            a = 0 < n.length ? n[0] : t,
            f.touchesStart.x = a.pageX,
            f.touchesStart.y = a.pageY)
        }
        ),
        a("touchEnd", (e, t) => {
            if (u.zoom.enabled) {
                var a = u.zoom;
                if (v.imageEl)
                    if (f.isTouched && f.isMoved) {
                        f.isTouched = !1,
                        f.isMoved = !1;
                        let e = 300
                          , t = 300;
                        var s = o.x * e
                          , s = f.currentX + s
                          , r = o.y * t
                          , r = f.currentY + r
                          , i = (0 !== o.x && (e = Math.abs((s - f.currentX) / o.x)),
                        0 !== o.y && (t = Math.abs((r - f.currentY) / o.y)),
                        Math.max(e, t))
                          , s = (f.currentX = s,
                        f.currentY = r,
                        f.width * a.scale)
                          , r = f.height * a.scale;
                        f.minX = Math.min(v.slideWidth / 2 - s / 2, 0),
                        f.maxX = -f.minX,
                        f.minY = Math.min(v.slideHeight / 2 - r / 2, 0),
                        f.maxY = -f.minY,
                        f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX),
                        f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY),
                        v.imageWrapEl.style.transitionDuration = i + "ms",
                        v.imageWrapEl.style.transform = `translate3d(${f.currentX}px, ${f.currentY}px,0)`
                    } else
                        f.isTouched = !1,
                        f.isMoved = !1
            }
        }
        ),
        a("doubleTap", (e, t) => {
            !u.animating && u.params.zoom.enabled && u.zoom.enabled && u.params.zoom.toggle && T(t)
        }
        ),
        a("transitionEnd", () => {
            u.zoom.enabled && u.params.zoom.enabled && E()
        }
        ),
        a("slideChange", () => {
            u.zoom.enabled && u.params.zoom.enabled && u.params.cssMode && E()
        }
        ),
        Object.assign(u.zoom, {
            enable: C,
            disable: P,
            in: x,
            out: S,
            toggle: T
        })
    }
    , function(e) {
        let {swiper: n, extendParams: t, on: a} = e;
        function o(e, t) {
            const a = function() {
                let a, s, r;
                return (e, t) => {
                    for (s = -1,
                    a = e.length; 1 < a - s; )
                        e[r = a + s >> 1] <= t ? s = r : a = r;
                    return a
                }
            }();
            this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1;
            let s, r;
            return this.interpolate = function(e) {
                return e ? (r = a(this.x, e),
                s = r - 1,
                (e - this.x[s]) * (this.y[r] - this.y[s]) / (this.x[r] - this.x[s]) + this.y[s]) : 0
            }
            ,
            this
        }
        function s() {
            n.controller.control && n.controller.spline && (n.controller.spline = void 0,
            delete n.controller.spline)
        }
        t({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }),
        n.controller = {
            control: void 0
        },
        a("beforeInit", () => {
            if ("undefined" != typeof window && ("string" == typeof n.params.controller.control || n.params.controller.control instanceof HTMLElement)) {
                const t = document.querySelector(n.params.controller.control);
                if (t && t.swiper)
                    n.controller.control = t.swiper;
                else if (t) {
                    const a = e => {
                        n.controller.control = e.detail[0],
                        n.update(),
                        t.removeEventListener("init", a)
                    }
                    ;
                    t.addEventListener("init", a)
                }
            } else
                n.controller.control = n.params.controller.control
        }
        ),
        a("update", () => {
            s()
        }
        ),
        a("resize", () => {
            s()
        }
        ),
        a("observerUpdate", () => {
            s()
        }
        ),
        a("setTranslate", (e, t, a) => {
            n.controller.control && !n.controller.control.destroyed && n.controller.setTranslate(t, a)
        }
        ),
        a("setTransition", (e, t, a) => {
            n.controller.control && !n.controller.control.destroyed && n.controller.setTransition(t, a)
        }
        ),
        Object.assign(n.controller, {
            setTranslate: function(e, t) {
                var a = n.controller.control;
                let s, r;
                var i = n.constructor;
                function l(e) {
                    var t, a;
                    e.destroyed || (t = n.rtlTranslate ? -n.translate : n.translate,
                    "slide" === n.params.controller.by && (a = e,
                    n.controller.spline = n.params.loop ? new o(n.slidesGrid,a.slidesGrid) : new o(n.snapGrid,a.snapGrid),
                    r = -n.controller.spline.interpolate(-t)),
                    r && "container" !== n.params.controller.by || (s = (e.maxTranslate() - e.minTranslate()) / (n.maxTranslate() - n.minTranslate()),
                    !Number.isNaN(s) && Number.isFinite(s) || (s = 1),
                    r = (t - n.minTranslate()) * s + e.minTranslate()),
                    n.params.controller.inverse && (r = e.maxTranslate() - r),
                    e.updateProgress(r),
                    e.setTranslate(r, n),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses())
                }
                if (Array.isArray(a))
                    for (let e = 0; e < a.length; e += 1)
                        a[e] !== t && a[e]instanceof i && l(a[e]);
                else
                    a instanceof i && t !== a && l(a)
            },
            setTransition: function(t, e) {
                var a = n.constructor;
                const s = n.controller.control;
                let r;
                function i(e) {
                    e.destroyed || (e.setTransition(t, n),
                    0 !== t && (e.transitionStart(),
                    e.params.autoHeight && T( () => {
                        e.updateAutoHeight()
                    }
                    ),
                    f(e.wrapperEl, () => {
                        s && e.transitionEnd()
                    }
                    )))
                }
                if (Array.isArray(s))
                    for (r = 0; r < s.length; r += 1)
                        s[r] !== e && s[r]instanceof a && i(s[r]);
                else
                    s instanceof a && e !== s && i(s)
            }
        })
    }
    , function(e) {
        let {swiper: n, extendParams: t, on: a} = e
          , o = (t({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null
            }
        }),
        n.a11y = {
            clicked: !1
        },
        null);
        function s(e) {
            var t = o;
            0 !== t.length && (t.innerHTML = "",
            t.innerHTML = e)
        }
        const d = e => (Array.isArray(e) ? e : [e]).filter(e => !!e);
        function r(e) {
            (e = d(e)).forEach(e => {
                e.setAttribute("tabIndex", "0")
            }
            )
        }
        function i(e) {
            (e = d(e)).forEach(e => {
                e.setAttribute("tabIndex", "-1")
            }
            )
        }
        function l(e, t) {
            (e = d(e)).forEach(e => {
                e.setAttribute("role", t)
            }
            )
        }
        function p(e, t) {
            (e = d(e)).forEach(e => {
                e.setAttribute("aria-roledescription", t)
            }
            )
        }
        function c(e, t) {
            (e = d(e)).forEach(e => {
                e.setAttribute("aria-label", t)
            }
            )
        }
        function u(e) {
            (e = d(e)).forEach(e => {
                e.setAttribute("aria-disabled", !0)
            }
            )
        }
        function m(e) {
            (e = d(e)).forEach(e => {
                e.setAttribute("aria-disabled", !1)
            }
            )
        }
        function h(e) {
            var t, a;
            13 !== e.keyCode && 32 !== e.keyCode || (t = n.params.a11y,
            a = e.target,
            n.pagination && n.pagination.el && (a === n.pagination.el || n.pagination.el.contains(e.target)) && !e.target.matches(O(n.params.pagination.bulletClass))) || (n.navigation && n.navigation.nextEl && a === n.navigation.nextEl && (n.isEnd && !n.params.loop || n.slideNext(),
            n.isEnd ? s(t.lastSlideMessage) : s(t.nextSlideMessage)),
            n.navigation && n.navigation.prevEl && a === n.navigation.prevEl && (n.isBeginning && !n.params.loop || n.slidePrev(),
            n.isBeginning ? s(t.firstSlideMessage) : s(t.prevSlideMessage)),
            n.pagination && a.matches(O(n.params.pagination.bulletClass)) && a.click())
        }
        function v() {
            return n.pagination && n.pagination.bullets && n.pagination.bullets.length
        }
        function f() {
            return v() && n.params.pagination.clickable
        }
        const g = (e, t, a) => {
            var s;
            r(e),
            "BUTTON" !== e.tagName && (l(e, "button"),
            e.addEventListener("keydown", h)),
            c(e, a),
            a = e,
            s = t,
            (a = d(a)).forEach(e => {
                e.setAttribute("aria-controls", s)
            }
            )
        }
          , w = () => {
            n.a11y.clicked = !0
        }
          , b = () => {
            requestAnimationFrame( () => {
                requestAnimationFrame( () => {
                    n.destroyed || (n.a11y.clicked = !1)
                }
                )
            }
            )
        }
          , y = e => {
            var t, a, s;
            n.a11y.clicked || (t = e.target.closest(`.${n.params.slideClass}, swiper-slide`)) && n.slides.includes(t) && (a = n.slides.indexOf(t) === n.activeIndex,
            s = n.params.watchSlidesProgress && n.visibleSlides && n.visibleSlides.includes(t),
            a || s || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (n.isHorizontal() ? n.el.scrollLeft = 0 : n.el.scrollTop = 0,
            n.slideTo(n.slides.indexOf(t), 0)))
        }
          , E = () => {
            const a = n.params.a11y
              , s = (a.itemRoleDescriptionMessage && p(n.slides, a.itemRoleDescriptionMessage),
            a.slideRole && l(n.slides, a.slideRole),
            n.slides.length);
            a.slideLabelMessage && n.slides.forEach( (e, t) => {
                t = n.params.loop ? parseInt(e.getAttribute("data-swiper-slide-index"), 10) : t;
                c(e, a.slideLabelMessage.replace(/\{\{index\}\}/, t + 1).replace(/\{\{slidesLength\}\}/, s))
            }
            )
        }
          , x = () => {
            const t = n.params.a11y;
            n.el.append(o);
            var e = n.el
              , e = (t.containerRoleDescriptionMessage && p(e, t.containerRoleDescriptionMessage),
            t.containerMessage && c(e, t.containerMessage),
            n.wrapperEl);
            const a = t.id || e.getAttribute("id") || "swiper-wrapper-" + "x".repeat(i = void 0 === (i = 16) ? 16 : i).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
            var s, r, i = n.params.autoplay && n.params.autoplay.enabled ? "off" : "polite", {nextEl: e, prevEl: l} = (l = e,
            s = a,
            (l = d(l)).forEach(e => {
                e.setAttribute("id", s)
            }
            ),
            l = e,
            r = i,
            (l = d(l)).forEach(e => {
                e.setAttribute("aria-live", r)
            }
            ),
            E(),
            n.navigation || {}), e = d(e), l = d(l);
            e && e.forEach(e => g(e, a, t.nextSlideMessage)),
            l && l.forEach(e => g(e, a, t.prevSlideMessage)),
            f() && (Array.isArray(n.pagination.el) ? n.pagination.el : [n.pagination.el]).forEach(e => {
                e.addEventListener("keydown", h)
            }
            ),
            n.el.addEventListener("focus", y, !0),
            n.el.addEventListener("pointerdown", w, !0),
            n.el.addEventListener("pointerup", b, !0)
        }
        ;
        a("beforeInit", () => {
            (o = M("span", n.params.a11y.notificationClass)).setAttribute("aria-live", "assertive"),
            o.setAttribute("aria-atomic", "true")
        }
        ),
        a("afterInit", () => {
            n.params.a11y.enabled && x()
        }
        ),
        a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
            n.params.a11y.enabled && E()
        }
        ),
        a("fromEdge toEdge afterInit lock unlock", () => {
            var e, t;
            n.params.a11y.enabled && !n.params.loop && !n.params.rewind && n.navigation && ({nextEl: e, prevEl: t} = n.navigation,
            t && (n.isBeginning ? (u(t),
            i) : (m(t),
            r))(t),
            e) && (n.isEnd ? (u(e),
            i) : (m(e),
            r))(e)
        }
        ),
        a("paginationUpdate", () => {
            if (n.params.a11y.enabled) {
                const t = n.params.a11y;
                v() && n.pagination.bullets.forEach(e => {
                    n.params.pagination.clickable && (r(e),
                    n.params.pagination.renderBullet || (l(e, "button"),
                    c(e, t.paginationBulletMessage.replace(/\{\{index\}\}/, C(e) + 1)))),
                    e.matches(O(n.params.pagination.bulletActiveClass)) ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current")
                }
                )
            }
        }
        ),
        a("destroy", () => {
            var e, t;
            n.params.a11y.enabled && (o && o.remove(),
            {nextEl: e, prevEl: t} = n.navigation || {},
            e = d(e),
            t = d(t),
            e && e.forEach(e => e.removeEventListener("keydown", h)),
            t && t.forEach(e => e.removeEventListener("keydown", h)),
            f() && (Array.isArray(n.pagination.el) ? n.pagination.el : [n.pagination.el]).forEach(e => {
                e.removeEventListener("keydown", h)
            }
            ),
            n.el.removeEventListener("focus", y, !0),
            n.el.removeEventListener("pointerdown", w, !0),
            n.el.removeEventListener("pointerup", b, !0))
        }
        )
    }
    , function(e) {
        let {swiper: l, extendParams: t, on: a} = e
          , i = (t({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides",
                keepQuery: !1
            }
        }),
        !1)
          , s = {};
        const n = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
          , r = e => {
            var t = L();
            let a;
            e = (a = e ? new URL(e) : t.location).pathname.slice(1).split("/").filter(e => "" !== e),
            t = e.length;
            return {
                key: e[t - 2],
                value: e[t - 1]
            }
        }
          , o = (a, s) => {
            var r = L();
            if (i && l.params.history.enabled) {
                let e;
                e = l.params.url ? new URL(l.params.url) : r.location;
                s = l.slides[s];
                let t = n(s.getAttribute("data-history"));
                if (0 < l.params.history.root.length) {
                    let e = l.params.history.root;
                    "/" === e[e.length - 1] && (e = e.slice(0, e.length - 1)),
                    t = e + "/" + (a ? a + "/" : "") + t
                } else
                    e.pathname.includes(a) || (t = (a ? a + "/" : "") + t);
                l.params.history.keepQuery && (t += e.search);
                s = r.history.state;
                s && s.value === t || (l.params.history.replaceState ? r.history.replaceState({
                    value: t
                }, null, t) : r.history.pushState({
                    value: t
                }, null, t))
            }
        }
          , d = (a, s, r) => {
            if (s)
                for (let e = 0, t = l.slides.length; e < t; e += 1) {
                    var i = l.slides[e];
                    n(i.getAttribute("data-history")) === s && (i = l.getSlideIndex(i),
                    l.slideTo(i, a, r))
                }
            else
                l.slideTo(0, a, r)
        }
          , p = () => {
            s = r(l.params.url),
            d(l.params.speed, s.value, !1)
        }
        ;
        a("init", () => {
            var e;
            l.params.history.enabled && (e = L(),
            l.params.history) && (e.history && e.history.pushState ? (i = !0,
            ((s = r(l.params.url)).key || s.value) && d(0, s.value, l.params.runCallbacksOnInit),
            l.params.history.replaceState || e.addEventListener("popstate", p)) : (l.params.history.enabled = !1,
            l.params.hashNavigation.enabled = !0))
        }
        ),
        a("destroy", () => {
            var e;
            l.params.history.enabled && (e = L(),
            l.params.history.replaceState || e.removeEventListener("popstate", p))
        }
        ),
        a("transitionEnd _freeModeNoMomentumRelease", () => {
            i && o(l.params.history.key, l.activeIndex)
        }
        ),
        a("slideChange", () => {
            i && l.params.cssMode && o(l.params.history.key, l.activeIndex)
        }
        )
    }
    , function(e) {
        let {swiper: s, extendParams: t, emit: a, on: r} = e
          , i = !1;
        const l = A()
          , n = L()
          , o = (t({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1,
                getSlideIndex(e, t) {
                    var a;
                    return s.virtual && s.params.virtual.enabled ? (a = s.slides.filter(e => e.getAttribute("data-hash") === t)[0]) ? parseInt(a.getAttribute("data-swiper-slide-index"), 10) : 0 : s.getSlideIndex(F(s.slidesEl, `.${s.params.slideClass}[data-hash="${t}"], swiper-slide[data-hash="${t}"]`)[0])
                }
            }
        }),
        () => {
            a("hashChange");
            var e = l.location.hash.replace("#", "")
              , t = s.virtual && s.params.virtual.enabled ? s.slidesEl.querySelector(`[data-swiper-slide-index="${s.activeIndex}"]`) : s.slides[s.activeIndex];
            e === (t ? t.getAttribute("data-hash") : "") || void 0 === (t = s.params.hashNavigation.getSlideIndex(s, e)) || Number.isNaN(t) || s.slideTo(t)
        }
        )
          , d = () => {
            var e;
            i && s.params.hashNavigation.enabled && (e = (e = s.virtual && s.params.virtual.enabled ? s.slidesEl.querySelector(`[data-swiper-slide-index="${s.activeIndex}"]`) : s.slides[s.activeIndex]) ? e.getAttribute("data-hash") || e.getAttribute("data-history") : "",
            s.params.hashNavigation.replaceState && n.history && n.history.replaceState ? n.history.replaceState(null, null, "#" + e || "") : l.location.hash = e || "",
            a("hashSet"))
        }
        ;
        r("init", () => {
            var e;
            !s.params.hashNavigation.enabled || !s.params.hashNavigation.enabled || s.params.history && s.params.history.enabled || (i = !0,
            (e = l.location.hash.replace("#", "")) && (e = s.params.hashNavigation.getSlideIndex(s, e),
            s.slideTo(e || 0, 0, s.params.runCallbacksOnInit, !0)),
            s.params.hashNavigation.watchState && n.addEventListener("hashchange", o))
        }
        ),
        r("destroy", () => {
            s.params.hashNavigation.enabled && s.params.hashNavigation.watchState && n.removeEventListener("hashchange", o)
        }
        ),
        r("transitionEnd _freeModeNoMomentumRelease", () => {
            i && d()
        }
        ),
        r("slideChange", () => {
            i && s.params.cssMode && d()
        }
        )
    }
    , function(e) {
        let {swiper: i, extendParams: t, on: a, emit: l, params: s} = e;
        i.autoplay = {
            running: !1,
            paused: !1,
            timeLeft: 0
        },
        t({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        });
        let n, o, d = s && s.autoplay ? s.autoplay.delay : 3e3, p = s && s.autoplay ? s.autoplay.delay : 3e3, c, u = (new Date).getTime, r, m, h, v, f, g;
        function w(e) {
            i && !i.destroyed && i.wrapperEl && e.target === i.wrapperEl && (i.wrapperEl.removeEventListener("transitionend", w),
            M())
        }
        const b = () => {
            var e;
            !i.destroyed && i.autoplay.running && (i.autoplay.paused ? r = !0 : r && (p = c,
            r = !1),
            e = i.autoplay.paused ? c : u + p - (new Date).getTime(),
            i.autoplay.timeLeft = e,
            l("autoplayTimeLeft", e, e / d),
            o = requestAnimationFrame( () => {
                b()
            }
            ))
        }
          , y = () => {
            let e;
            if (e = i.virtual && i.params.virtual.enabled ? i.slides.filter(e => e.classList.contains("swiper-slide-active"))[0] : i.slides[i.activeIndex])
                return parseInt(e.getAttribute("data-swiper-autoplay"), 10)
        }
          , E = t => {
            if (!i.destroyed && i.autoplay.running) {
                cancelAnimationFrame(o),
                b();
                let e = void 0 === t ? i.params.autoplay.delay : t;
                d = i.params.autoplay.delay,
                p = i.params.autoplay.delay;
                var a = y();
                !Number.isNaN(a) && 0 < a && void 0 === t && (e = a,
                d = a,
                p = a),
                c = e;
                const s = i.params.speed
                  , r = () => {
                    i && !i.destroyed && (i.params.autoplay.reverseDirection ? !i.isBeginning || i.params.loop || i.params.rewind ? (i.slidePrev(s, !0, !0),
                    l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(i.slides.length - 1, s, !0, !0),
                    l("autoplay")) : !i.isEnd || i.params.loop || i.params.rewind ? (i.slideNext(s, !0, !0),
                    l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(0, s, !0, !0),
                    l("autoplay")),
                    i.params.cssMode) && (u = (new Date).getTime(),
                    requestAnimationFrame( () => {
                        E()
                    }
                    ))
                }
                ;
                return 0 < e ? (clearTimeout(n),
                n = setTimeout( () => {
                    r()
                }
                , e)) : requestAnimationFrame( () => {
                    r()
                }
                ),
                e
            }
        }
          , x = () => {
            i.autoplay.running = !0,
            E(),
            l("autoplayStart")
        }
          , S = () => {
            i.autoplay.running = !1,
            clearTimeout(n),
            cancelAnimationFrame(o),
            l("autoplayStop")
        }
          , T = (e, t) => {
            !i.destroyed && i.autoplay.running && (clearTimeout(n),
            e || (g = !0),
            e = () => {
                l("autoplayPause"),
                i.params.autoplay.waitForTransition ? i.wrapperEl.addEventListener("transitionend", w) : M()
            }
            ,
            i.autoplay.paused = !0,
            t ? (f && (c = i.params.autoplay.delay),
            f = !1,
            e()) : (t = c || i.params.autoplay.delay,
            c = t - ((new Date).getTime() - u),
            i.isEnd && c < 0 && !i.params.loop || (c < 0 && (c = 0),
            e())))
        }
          , M = () => {
            i.isEnd && c < 0 && !i.params.loop || i.destroyed || !i.autoplay.running || (u = (new Date).getTime(),
            g ? (g = !1,
            E(c)) : E(),
            i.autoplay.paused = !1,
            l("autoplayResume"))
        }
          , C = () => {
            var e;
            !i.destroyed && i.autoplay.running && ("hidden" === (e = A()).visibilityState && (g = !0,
            T(!0)),
            "visible" === e.visibilityState) && M()
        }
          , P = e => {
            "mouse" !== e.pointerType || (g = !0,
            i.animating) || i.autoplay.paused || T(!0)
        }
          , L = e => {
            "mouse" === e.pointerType && i.autoplay.paused && M()
        }
        ;
        a("init", () => {
            i.params.autoplay.enabled && (i.params.autoplay.pauseOnMouseEnter && (i.el.addEventListener("pointerenter", P),
            i.el.addEventListener("pointerleave", L)),
            A().addEventListener("visibilitychange", C),
            u = (new Date).getTime(),
            x())
        }
        ),
        a("destroy", () => {
            i.el.removeEventListener("pointerenter", P),
            i.el.removeEventListener("pointerleave", L),
            A().removeEventListener("visibilitychange", C),
            i.autoplay.running && S()
        }
        ),
        a("beforeTransitionStart", (e, t, a) => {
            !i.destroyed && i.autoplay.running && (a || !i.params.autoplay.disableOnInteraction ? T(!0, !0) : S())
        }
        ),
        a("sliderFirstMove", () => {
            !i.destroyed && i.autoplay.running && (i.params.autoplay.disableOnInteraction ? S() : (m = !0,
            h = !1,
            g = !1,
            v = setTimeout( () => {
                g = !0,
                h = !0,
                T(!0)
            }
            , 200)))
        }
        ),
        a("touchEnd", () => {
            !i.destroyed && i.autoplay.running && m && (clearTimeout(v),
            clearTimeout(n),
            m = (h = (i.params.autoplay.disableOnInteraction || h && i.params.cssMode && M(),
            !1),
            !1))
        }
        ),
        a("slideChange", () => {
            !i.destroyed && i.autoplay.running && (f = !0)
        }
        ),
        Object.assign(i.autoplay, {
            start: x,
            stop: S,
            pause: T,
            resume: M
        })
    }
    , function(e) {
        let {swiper: p, extendParams: t, on: a} = e
          , s = (t({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        }),
        !1)
          , r = !1;
        function i() {
            var t = p.thumbs.swiper;
            if (t && !t.destroyed) {
                var a = t.clickedIndex
                  , e = t.clickedSlide;
                if (!(e && e.classList.contains(p.params.thumbs.slideThumbActiveClass) || null == a)) {
                    let e;
                    e = t.params.loop ? parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : a,
                    p.params.loop ? p.slideToLoop(e) : p.slideTo(e)
                }
            }
        }
        function l() {
            var e = p.params["thumbs"];
            if (s)
                return !1;
            s = !0;
            var t = p.constructor;
            return e.swiper instanceof t ? (p.thumbs.swiper = e.swiper,
            Object.assign(p.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            Object.assign(p.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            p.thumbs.swiper.update()) : o(e.swiper) && (e = Object.assign({}, e.swiper),
            Object.assign(e, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            p.thumbs.swiper = new t(e),
            r = !0),
            p.thumbs.swiper.el.classList.add(p.params.thumbs.thumbsContainerClass),
            p.thumbs.swiper.on("tap", i),
            !0
        }
        function n(a) {
            var s = p.thumbs.swiper;
            if (s && !s.destroyed) {
                var r = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
                let t = 1;
                const d = p.params.thumbs.slideThumbActiveClass;
                if (1 < p.params.slidesPerView && !p.params.centeredSlides && (t = p.params.slidesPerView),
                p.params.thumbs.multipleActiveThumbs || (t = 1),
                t = Math.floor(t),
                s.slides.forEach(e => e.classList.remove(d)),
                s.params.loop || s.params.virtual && s.params.virtual.enabled)
                    for (let e = 0; e < t; e += 1)
                        F(s.slidesEl, `[data-swiper-slide-index="${p.realIndex + e}"]`).forEach(e => {
                            e.classList.add(d)
                        }
                        );
                else
                    for (let e = 0; e < t; e += 1)
                        s.slides[p.realIndex + e] && s.slides[p.realIndex + e].classList.add(d);
                var i = p.params.thumbs.autoScrollOffset
                  , l = i && !s.params.loop;
                if (p.realIndex !== s.realIndex || l) {
                    var n, o = s.activeIndex;
                    let e, t;
                    t = s.params.loop ? (n = s.slides.filter(e => e.getAttribute("data-swiper-slide-index") === "" + p.realIndex)[0],
                    e = s.slides.indexOf(n),
                    p.activeIndex > p.previousIndex ? "next" : "prev") : (e = p.realIndex) > p.previousIndex ? "next" : "prev",
                    l && (e += "next" === t ? i : -1 * i),
                    s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(e) < 0 && (s.params.centeredSlides ? e = e > o ? e - Math.floor(r / 2) + 1 : e + Math.floor(r / 2) - 1 : e > o && s.params.slidesPerGroup,
                    s.slideTo(e, a ? 0 : void 0))
                }
            }
        }
        p.thumbs = {
            swiper: null
        },
        a("beforeInit", () => {
            const s = p.params["thumbs"];
            if (s && s.swiper)
                if ("string" == typeof s.swiper || s.swiper instanceof HTMLElement) {
                    const e = A()
                      , t = () => {
                        const t = "string" == typeof s.swiper ? e.querySelector(s.swiper) : s.swiper;
                        if (t && t.swiper)
                            s.swiper = t.swiper,
                            l(),
                            n(!0);
                        else if (t) {
                            const a = e => {
                                s.swiper = e.detail[0],
                                t.removeEventListener("init", a),
                                l(),
                                n(!0),
                                s.swiper.update(),
                                p.update()
                            }
                            ;
                            t.addEventListener("init", a)
                        }
                        return t
                    }
                      , a = () => {
                        p.destroyed || t() || requestAnimationFrame(a)
                    }
                    ;
                    requestAnimationFrame(a)
                } else
                    l(),
                    n(!0)
        }
        ),
        a("slideChange update resize observerUpdate", () => {
            n()
        }
        ),
        a("setTransition", (e, t) => {
            var a = p.thumbs.swiper;
            a && !a.destroyed && a.setTransition(t)
        }
        ),
        a("beforeDestroy", () => {
            var e = p.thumbs.swiper;
            e && !e.destroyed && r && e.destroy()
        }
        ),
        Object.assign(p.thumbs, {
            init: l,
            update: n
        })
    }
    , function(e) {
        let {swiper: m, extendParams: t, emit: h, once: v} = e;
        t({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }),
        Object.assign(m, {
            freeMode: {
                onTouchStart: function() {
                    var e;
                    m.params.cssMode || (e = m.getTranslate(),
                    m.setTranslate(e),
                    m.setTransition(0),
                    m.touchEventsData.velocities.length = 0,
                    m.freeMode.onTouchEnd({
                        currentPos: m.rtl ? m.translate : -m.translate
                    }))
                },
                onTouchMove: function() {
                    var e, t;
                    m.params.cssMode || ({touchEventsData: e, touches: t} = m,
                    0 === e.velocities.length && e.velocities.push({
                        position: t[m.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime
                    }),
                    e.velocities.push({
                        position: t[m.isHorizontal() ? "currentX" : "currentY"],
                        time: g()
                    }))
                },
                onTouchEnd: function(i) {
                    if (i = i.currentPos,
                    !m.params.cssMode) {
                        const {params: o, wrapperEl: d, rtlTranslate: p, snapGrid: c, touchEventsData: u} = m;
                        var e = g() - u.touchStartTime;
                        if (i < -m.minTranslate())
                            m.slideTo(m.activeIndex);
                        else if (i > -m.maxTranslate())
                            m.slides.length < c.length ? m.slideTo(c.length - 1) : m.slideTo(m.slides.length - 1);
                        else {
                            if (o.freeMode.momentum) {
                                (!(1 < u.velocities.length) || (i = u.velocities.pop(),
                                n = u.velocities.pop(),
                                l = i.position - n.position,
                                n = i.time - n.time,
                                m.velocity = l / n,
                                m.velocity /= 2,
                                Math.abs(m.velocity) < o.freeMode.minimumVelocity && (m.velocity = 0),
                                150 < n) || 300 < g() - i.time) && (m.velocity = 0),
                                m.velocity *= o.freeMode.momentumVelocityRatio,
                                u.velocities.length = 0;
                                let e = 1e3 * o.freeMode.momentumRatio;
                                var l = m.velocity * e;
                                let a = m.translate + l, t = (p && (a = -a),
                                !1), s;
                                var n = 20 * Math.abs(m.velocity) * o.freeMode.momentumBounceRatio;
                                let r;
                                if (a < m.maxTranslate())
                                    o.freeMode.momentumBounce ? (a + m.maxTranslate() < -n && (a = m.maxTranslate() - n),
                                    s = m.maxTranslate(),
                                    t = !0,
                                    u.allowMomentumBounce = !0) : a = m.maxTranslate(),
                                    o.loop && o.centeredSlides && (r = !0);
                                else if (a > m.minTranslate())
                                    o.freeMode.momentumBounce ? (a - m.minTranslate() > n && (a = m.minTranslate() + n),
                                    s = m.minTranslate(),
                                    t = !0,
                                    u.allowMomentumBounce = !0) : a = m.minTranslate(),
                                    o.loop && o.centeredSlides && (r = !0);
                                else if (o.freeMode.sticky) {
                                    let t;
                                    for (let e = 0; e < c.length; e += 1)
                                        if (c[e] > -a) {
                                            t = e;
                                            break
                                        }
                                    a = -(a = Math.abs(c[t] - a) < Math.abs(c[t - 1] - a) || "next" === m.swipeDirection ? c[t] : c[t - 1])
                                }
                                if (r && v("transitionEnd", () => {
                                    m.loopFix()
                                }
                                ),
                                0 !== m.velocity)
                                    e = p ? Math.abs((-a - m.translate) / m.velocity) : Math.abs((a - m.translate) / m.velocity),
                                    o.freeMode.sticky && (i = Math.abs((p ? -a : a) - m.translate),
                                    l = m.slidesSizesGrid[m.activeIndex],
                                    e = i < l ? o.speed : i < 2 * l ? 1.5 * o.speed : 2.5 * o.speed);
                                else if (o.freeMode.sticky)
                                    return void m.slideToClosest();
                                o.freeMode.momentumBounce && t ? (m.updateProgress(s),
                                m.setTransition(e),
                                m.setTranslate(a),
                                m.transitionStart(!0, m.swipeDirection),
                                m.animating = !0,
                                f(d, () => {
                                    m && !m.destroyed && u.allowMomentumBounce && (h("momentumBounce"),
                                    m.setTransition(o.speed),
                                    setTimeout( () => {
                                        m.setTranslate(s),
                                        f(d, () => {
                                            m && !m.destroyed && m.transitionEnd()
                                        }
                                        )
                                    }
                                    , 0))
                                }
                                )) : m.velocity ? (h("_freeModeNoMomentumRelease"),
                                m.updateProgress(a),
                                m.setTransition(e),
                                m.setTranslate(a),
                                m.transitionStart(!0, m.swipeDirection),
                                m.animating || (m.animating = !0,
                                f(d, () => {
                                    m && !m.destroyed && m.transitionEnd()
                                }
                                ))) : m.updateProgress(a),
                                m.updateActiveIndex(),
                                m.updateSlidesClasses()
                            } else {
                                if (o.freeMode.sticky)
                                    return void m.slideToClosest();
                                o.freeMode && h("_freeModeNoMomentumRelease")
                            }
                            (!o.freeMode.momentum || e >= o.longSwipesMs) && (m.updateProgress(),
                            m.updateActiveIndex(),
                            m.updateSlidesClasses())
                        }
                    }
                }
            }
        })
    }
    , function(e) {
        let {swiper: u, extendParams: t, on: a} = e;
        t({
            grid: {
                rows: 1,
                fill: "column"
            }
        });
        let m, h, v, s;
        const f = () => {
            let e = u.params.spaceBetween;
            return "string" == typeof e && 0 <= e.indexOf("%") ? e = parseFloat(e.replace("%", "")) / 100 * u.size : "string" == typeof e && (e = parseFloat(e)),
            e
        }
        ;
        a("init", () => {
            s = u.params.grid && 1 < u.params.grid.rows
        }
        ),
        a("update", () => {
            var {params: e, el: t} = u
              , a = e.grid && 1 < e.grid.rows;
            s && !a ? (t.classList.remove(e.containerModifierClass + "grid", e.containerModifierClass + "grid-column"),
            v = 1,
            u.emitContainerClasses()) : !s && a && (t.classList.add(e.containerModifierClass + "grid"),
            "column" === e.grid.fill && t.classList.add(e.containerModifierClass + "grid-column"),
            u.emitContainerClasses()),
            s = a
        }
        ),
        u.grid = {
            initSlides: e => {
                var t = u.params["slidesPerView"]
                  , {rows: a, fill: s} = u.params.grid;
                v = Math.floor(e / a),
                m = Math.floor(e / a) === e / a ? e : Math.ceil(e / a) * a,
                "auto" !== t && "row" === s && (m = Math.max(m, t * a)),
                h = m / a
            }
            ,
            updateSlide: (e, t, a, s) => {
                var r, i, l = u.params["slidesPerGroup"], n = f(), {rows: o, fill: d} = u.params.grid;
                let p, c;
                "row" === d && 1 < l ? (i = e - o * l * (r = Math.floor(e / (l * o))),
                a = 0 === r ? l : Math.min(Math.ceil((a - r * o * l) / o), l),
                c = Math.floor(i / a),
                i = (p = i - c * a + r * l) + c * m / o,
                t.style.order = i) : "column" === d ? (p = Math.floor(e / o),
                c = e - p * o,
                (p > v || p === v && c === o - 1) && (c += 1) >= o && (c = 0,
                p += 1)) : (c = Math.floor(e / h),
                p = e - c * h),
                t.row = c,
                t.column = p,
                t.style[s("margin-top")] = 0 !== c ? n && n + "px" : ""
            }
            ,
            updateWrapperSize: (e, a, t) => {
                var {centeredSlides: s, roundLengths: r} = u.params
                  , i = f()
                  , l = u.params.grid["rows"];
                if (u.virtualSize = (e + i) * m,
                u.virtualSize = Math.ceil(u.virtualSize / l) - i,
                u.wrapperEl.style[t("width")] = u.virtualSize + i + "px",
                s) {
                    var n = [];
                    for (let t = 0; t < a.length; t += 1) {
                        let e = a[t];
                        r && (e = Math.floor(e)),
                        a[t] < u.virtualSize + a[0] && n.push(e)
                    }
                    a.splice(0, a.length),
                    a.push(...n)
                }
            }
        }
    }
    , function(e) {
        e = e.swiper,
        Object.assign(e, {
            appendSlide: function(t) {
                var e = this;
                const {params: a, slidesEl: s} = e;
                a.loop && e.loopDestroy();
                var r = e => {
                    var t;
                    "string" == typeof e ? ((t = document.createElement("div")).innerHTML = e,
                    s.append(t.children[0]),
                    t.innerHTML = "") : s.append(e)
                }
                ;
                if ("object" == typeof t && "length"in t)
                    for (let e = 0; e < t.length; e += 1)
                        t[e] && r(t[e]);
                else
                    r(t);
                e.recalcSlides(),
                a.loop && e.loopCreate(),
                a.observer && !e.isElement || e.update()
            }
            .bind(e),
            prependSlide: function(t) {
                var e = this;
                const {params: a, activeIndex: s, slidesEl: r} = e;
                a.loop && e.loopDestroy();
                let i = s + 1;
                var l = e => {
                    var t;
                    "string" == typeof e ? ((t = document.createElement("div")).innerHTML = e,
                    r.prepend(t.children[0]),
                    t.innerHTML = "") : r.prepend(e)
                }
                ;
                if ("object" == typeof t && "length"in t) {
                    for (let e = 0; e < t.length; e += 1)
                        t[e] && l(t[e]);
                    i = s + t.length
                } else
                    l(t);
                e.recalcSlides(),
                a.loop && e.loopCreate(),
                a.observer && !e.isElement || e.update(),
                e.slideTo(i, 0, !1)
            }
            .bind(e),
            addSlide: function(t, a) {
                var s = this
                  , {params: r, activeIndex: i, slidesEl: l} = s;
                let n = i;
                if (r.loop && (n -= s.loopedSlides,
                s.loopDestroy(),
                s.recalcSlides()),
                i = s.slides.length,
                t <= 0)
                    s.prependSlide(a);
                else if (i <= t)
                    s.appendSlide(a);
                else {
                    let e = n > t ? n + 1 : n;
                    var o = [];
                    for (let e = i - 1; e >= t; --e) {
                        var d = s.slides[e];
                        d.remove(),
                        o.unshift(d)
                    }
                    if ("object" == typeof a && "length"in a) {
                        for (let e = 0; e < a.length; e += 1)
                            a[e] && l.append(a[e]);
                        e = n > t ? n + a.length : n
                    } else
                        l.append(a);
                    for (let e = 0; e < o.length; e += 1)
                        l.append(o[e]);
                    s.recalcSlides(),
                    r.loop && s.loopCreate(),
                    r.observer && !s.isElement || s.update(),
                    r.loop ? s.slideTo(e + s.loopedSlides, 0, !1) : s.slideTo(e, 0, !1)
                }
            }
            .bind(e),
            removeSlide: function(t) {
                var a = this
                  , {params: e, activeIndex: s} = a;
                let r = s, i = (e.loop && (r -= a.loopedSlides,
                a.loopDestroy()),
                r), l;
                if ("object" == typeof t && "length"in t)
                    for (let e = 0; e < t.length; e += 1)
                        l = t[e],
                        a.slides[l] && a.slides[l].remove(),
                        l < i && --i;
                else
                    l = t,
                    a.slides[l] && a.slides[l].remove(),
                    l < i && --i;
                i = Math.max(i, 0),
                a.recalcSlides(),
                e.loop && a.loopCreate(),
                e.observer && !a.isElement || a.update(),
                e.loop ? a.slideTo(i + a.loopedSlides, 0, !1) : a.slideTo(i, 0, !1)
            }
            .bind(e),
            removeAllSlides: function() {
                var t = [];
                for (let e = 0; e < this.slides.length; e += 1)
                    t.push(e);
                this.removeSlide(t)
            }
            .bind(e)
        })
    }
    , function(e) {
        let {swiper: i, extendParams: t, on: a} = e;
        t({
            fadeEffect: {
                crossFade: !1
            }
        }),
        b({
            effect: "fade",
            swiper: i,
            on: a,
            setTranslate: () => {
                var e = i["slides"];
                i.params.fadeEffect;
                for (let a = 0; a < e.length; a += 1) {
                    var s = i.slides[a];
                    let e = -s.swiperSlideOffset
                      , t = (i.params.virtualTranslate || (e -= i.translate),
                    0);
                    i.isHorizontal() || (t = e,
                    e = 0);
                    var r = i.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(s.progress), 0) : 1 + Math.min(Math.max(s.progress, -1), 0)
                      , s = E(0, s);
                    s.style.opacity = r,
                    s.style.transform = `translate3d(${e}px, ${t}px, 0px)`
                }
            }
            ,
            setTransition: t => {
                var e = i.slides.map(e => l(e));
                e.forEach(e => {
                    e.style.transitionDuration = t + "ms"
                }
                ),
                w({
                    swiper: i,
                    duration: t,
                    transformElements: e,
                    allSlides: !0
                })
            }
            ,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !i.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: g, extendParams: t, on: a} = e;
        t({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        });
        const w = (e, t, a) => {
            let s = a ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
              , r = a ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
            s || (s = M("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (a ? "left" : "top")).split(" ")),
            e.append(s)),
            r || (r = M("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (a ? "right" : "bottom")).split(" ")),
            e.append(r)),
            s && (s.style.opacity = Math.max(-t, 0)),
            r && (r.style.opacity = Math.max(t, 0))
        }
        ;
        b({
            effect: "cube",
            swiper: g,
            on: a,
            setTranslate: () => {
                var e, {el: t, wrapperEl: a, slides: n, width: s, height: r, rtlTranslate: o, size: d, browser: i} = g, p = g.params.cubeEffect, c = g.isHorizontal(), u = g.virtual && g.params.virtual.enabled;
                let m = 0, l;
                p.shadow && (c ? ((l = g.wrapperEl.querySelector(".swiper-cube-shadow")) || (l = M("div", "swiper-cube-shadow"),
                g.wrapperEl.append(l)),
                l.style.height = s + "px") : (l = t.querySelector(".swiper-cube-shadow")) || (l = M("div", "swiper-cube-shadow"),
                t.append(l)));
                for (let l = 0; l < n.length; l += 1) {
                    var h = n[l];
                    let e = l
                      , t = 90 * (e = u ? parseInt(h.getAttribute("data-swiper-slide-index"), 10) : e)
                      , a = Math.floor(t / 360);
                    o && (t = -t,
                    a = Math.floor(-t / 360));
                    var v = Math.max(Math.min(h.progress, 1), -1);
                    let s = 0
                      , r = 0
                      , i = 0;
                    e % 4 == 0 ? (s = 4 * -a * d,
                    i = 0) : (e - 1) % 4 == 0 ? (s = 0,
                    i = 4 * -a * d) : (e - 2) % 4 == 0 ? (s = d + 4 * a * d,
                    i = d) : (e - 3) % 4 == 0 && (s = -d,
                    i = 3 * d + 4 * d * a),
                    o && (s = -s),
                    c || (r = s,
                    s = 0);
                    var f = `rotateX(${c ? 0 : -t}deg) rotateY(${c ? t : 0}deg) translate3d(${s}px, ${r}px, ${i}px)`;
                    v <= 1 && -1 < v && (m = 90 * e + 90 * v,
                    o) && (m = 90 * -e - 90 * v),
                    h.style.transform = f,
                    p.slideShadows && w(h, v, c)
                }
                a.style.transformOrigin = `50% 50% -${d / 2}px`,
                a.style["-webkit-transform-origin"] = `50% 50% -${d / 2}px`,
                p.shadow && (c ? l.style.transform = `translate3d(0px, ${s / 2 + p.shadowOffset}px, ${-s / 2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})` : (t = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                s = 1.5 - (Math.sin(2 * t * Math.PI / 360) / 2 + Math.cos(2 * t * Math.PI / 360) / 2),
                t = p.shadowScale,
                s = p.shadowScale / s,
                e = p.shadowOffset,
                l.style.transform = `scale3d(${t}, 1, ${s}) translate3d(0px, ${r / 2 + e}px, ${-r / 2 / s}px) rotateX(-90deg)`));
                t = (i.isSafari || i.isWebView) && i.needPerspectiveFix ? -d / 2 : 0;
                a.style.transform = `translate3d(0px,0,${t}px) rotateX(${g.isHorizontal() ? 0 : m}deg) rotateY(${g.isHorizontal() ? -m : 0}deg)`,
                a.style.setProperty("--swiper-cube-translate-z", t + "px")
            }
            ,
            setTransition: t => {
                var {el: e, slides: a} = g;
                a.forEach(e => {
                    e.style.transitionDuration = t + "ms",
                    e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => {
                        e.style.transitionDuration = t + "ms"
                    }
                    )
                }
                ),
                g.params.cubeEffect.shadow && !g.isHorizontal() && (a = e.querySelector(".swiper-cube-shadow")) && (a.style.transitionDuration = t + "ms")
            }
            ,
            recreateShadows: () => {
                const a = g.isHorizontal();
                g.slides.forEach(e => {
                    var t = Math.max(Math.min(e.progress, 1), -1);
                    w(e, t, a)
                }
                )
            }
            ,
            getEffectParams: () => g.params.cubeEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }
    , function(e) {
        let {swiper: c, extendParams: t, on: a} = e;
        t({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        });
        const u = (e, t) => {
            let a = c.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
              , s = c.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
            a = a || x("flip", e, c.isHorizontal() ? "left" : "top"),
            s = s || x("flip", e, c.isHorizontal() ? "right" : "bottom"),
            a && (a.style.opacity = Math.max(-t, 0)),
            s && (s.style.opacity = Math.max(t, 0))
        }
        ;
        b({
            effect: "flip",
            swiper: c,
            on: a,
            setTranslate: () => {
                var {slides: l, rtlTranslate: n} = c
                  , o = c.params.flipEffect;
                for (let i = 0; i < l.length; i += 1) {
                    var d = l[i];
                    let e = d.progress;
                    c.params.flipEffect.limitRotation && (e = Math.max(Math.min(d.progress, 1), -1));
                    var p = d.swiperSlideOffset;
                    let t = -180 * e
                      , a = 0
                      , s = c.params.cssMode ? -p - c.translate : -p
                      , r = 0;
                    c.isHorizontal() ? n && (t = -t) : (r = s,
                    s = 0,
                    a = -t,
                    t = 0),
                    d.style.zIndex = -Math.abs(Math.round(e)) + l.length,
                    o.slideShadows && u(d, e);
                    p = `translate3d(${s}px, ${r}px, 0px) rotateX(${a}deg) rotateY(${t}deg)`;
                    E(0, d).style.transform = p
                }
            }
            ,
            setTransition: t => {
                var e = c.slides.map(e => l(e));
                e.forEach(e => {
                    e.style.transitionDuration = t + "ms",
                    e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => {
                        e.style.transitionDuration = t + "ms"
                    }
                    )
                }
                ),
                w({
                    swiper: c,
                    duration: t,
                    transformElements: e
                })
            }
            ,
            recreateShadows: () => {
                c.params.flipEffect,
                c.slides.forEach(e => {
                    let t = e.progress;
                    c.params.flipEffect.limitRotation && (t = Math.max(Math.min(e.progress, 1), -1)),
                    u(e, t)
                }
                )
            }
            ,
            getEffectParams: () => c.params.flipEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !c.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: s, extendParams: t, on: a} = e;
        t({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0
            }
        }),
        b({
            effect: "coverflow",
            swiper: s,
            on: a,
            setTranslate: () => {
                var {width: e, height: t, slides: o, slidesSizesGrid: d} = s
                  , p = s.params.coverflowEffect
                  , c = s.isHorizontal()
                  , a = s.translate
                  , u = c ? e / 2 - a : t / 2 - a
                  , m = c ? p.rotate : -p.rotate
                  , h = p.depth;
                for (let n = 0, e = o.length; n < e; n += 1) {
                    var v = o[n]
                      , f = d[n]
                      , g = (u - v.swiperSlideOffset - f / 2) / f
                      , g = "function" == typeof p.modifier ? p.modifier(g) : g * p.modifier;
                    let e = c ? m * g : 0
                      , t = c ? 0 : m * g
                      , a = -h * Math.abs(g)
                      , s = p.stretch
                      , r = ("string" == typeof s && -1 !== s.indexOf("%") && (s = parseFloat(p.stretch) / 100 * f),
                    c ? 0 : s * g)
                      , i = c ? s * g : 0
                      , l = 1 - (1 - p.scale) * Math.abs(g);
                    Math.abs(i) < .001 && (i = 0),
                    Math.abs(r) < .001 && (r = 0),
                    Math.abs(a) < .001 && (a = 0),
                    Math.abs(e) < .001 && (e = 0),
                    Math.abs(t) < .001 && (t = 0),
                    Math.abs(l) < .001 && (l = 0);
                    f = `translate3d(${i}px,${r}px,${a}px)  rotateX(${t}deg) rotateY(${e}deg) scale(${l})`;
                    if (E(0, v).style.transform = f,
                    v.style.zIndex = 1 - Math.abs(Math.round(g)),
                    p.slideShadows) {
                        let e = c ? v.querySelector(".swiper-slide-shadow-left") : v.querySelector(".swiper-slide-shadow-top")
                          , t = c ? v.querySelector(".swiper-slide-shadow-right") : v.querySelector(".swiper-slide-shadow-bottom");
                        e = e || x("coverflow", v, c ? "left" : "top"),
                        t = t || x("coverflow", v, c ? "right" : "bottom"),
                        e && (e.style.opacity = 0 < g ? g : 0),
                        t && (t.style.opacity = 0 < -g ? -g : 0)
                    }
                }
            }
            ,
            setTransition: t => {
                s.slides.map(e => l(e)).forEach(e => {
                    e.style.transitionDuration = t + "ms",
                    e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => {
                        e.style.transitionDuration = t + "ms"
                    }
                    )
                }
                )
            }
            ,
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0
            })
        })
    }
    , function(e) {
        let {swiper: f, extendParams: t, on: a} = e;
        t({
            creativeEffect: {
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        }),
        b({
            effect: "creative",
            swiper: f,
            on: a,
            setTranslate: () => {
                var {slides: r, wrapperEl: e, slidesSizesGrid: t} = f
                  , i = f.params.creativeEffect;
                const l = i["progressMultiplier"];
                var n = f.params.centeredSlides;
                n && (t = t[0] / 2 - f.params.slidesOffsetBefore || 0,
                e.style.transform = `translateX(calc(50% - ${t}px))`);
                for (let s = 0; s < r.length; s += 1) {
                    var o = r[s]
                      , d = o.progress;
                    const m = Math.min(Math.max(o.progress, -i.limitProgress), i.limitProgress);
                    let e = m;
                    n || (e = Math.min(Math.max(o.originalProgress, -i.limitProgress), i.limitProgress));
                    var p = o.swiperSlideOffset;
                    const h = [f.params.cssMode ? -p - f.translate : -p, 0, 0]
                      , v = [0, 0, 0];
                    let t = !1
                      , a = (f.isHorizontal() || (h[1] = h[0],
                    h[0] = 0),
                    {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    });
                    m < 0 ? (a = i.next,
                    t = !0) : 0 < m && (a = i.prev,
                    t = !0),
                    h.forEach( (e, t) => {
                        h[t] = `calc(${e}px + (${e = a.translate[t],
                        "string" == typeof e ? e : e + "px"} * ${Math.abs(m * l)}))`
                    }
                    ),
                    v.forEach( (e, t) => {
                        v[t] = a.rotate[t] * Math.abs(m * l)
                    }
                    ),
                    o.style.zIndex = -Math.abs(Math.round(d)) + r.length;
                    var p = h.join(", ")
                      , d = `rotateX(${v[0]}deg) rotateY(${v[1]}deg) rotateZ(${v[2]}deg)`
                      , c = e < 0 ? `scale(${1 + (1 - a.scale) * e * l})` : `scale(${1 - (1 - a.scale) * e * l})`
                      , u = e < 0 ? 1 + (1 - a.opacity) * e * l : 1 - (1 - a.opacity) * e * l
                      , p = `translate3d(${p}) ${d} ` + c;
                    if (t && a.shadow || !t) {
                        let e = o.querySelector(".swiper-slide-shadow");
                        (e = !e && a.shadow ? x("creative", o) : e) && (d = i.shadowPerProgress ? m * (1 / i.limitProgress) : m,
                        e.style.opacity = Math.min(Math.max(Math.abs(d), 0), 1))
                    }
                    c = E(0, o);
                    c.style.transform = p,
                    c.style.opacity = u,
                    a.origin && (c.style.transformOrigin = a.origin)
                }
            }
            ,
            setTransition: t => {
                var e = f.slides.map(e => l(e));
                e.forEach(e => {
                    e.style.transitionDuration = t + "ms",
                    e.querySelectorAll(".swiper-slide-shadow").forEach(e => {
                        e.style.transitionDuration = t + "ms"
                    }
                    )
                }
                ),
                w({
                    swiper: f,
                    duration: t,
                    transformElements: e,
                    allSlides: !0
                })
            }
            ,
            perspective: () => f.params.creativeEffect.perspective,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !f.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: y, extendParams: t, on: a} = e;
        t({
            cardsEffect: {
                slideShadows: !0,
                rotate: !0,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        }),
        b({
            effect: "cards",
            swiper: y,
            on: a,
            setTranslate: () => {
                var {slides: n, activeIndex: o, rtlTranslate: d} = y
                  , p = y.params.cardsEffect
                  , {startTranslate: c, isTouched: u} = y.touchEventsData
                  , m = d ? -y.translate : y.translate;
                for (let l = 0; l < n.length; l += 1) {
                    var h = n[l]
                      , v = h.progress
                      , f = Math.min(Math.max(v, -4), 4);
                    let e = h.swiperSlideOffset
                      , t = (y.params.centeredSlides && !y.params.cssMode && (y.wrapperEl.style.transform = `translateX(${y.minTranslate()}px)`),
                    y.params.centeredSlides && y.params.cssMode && (e -= n[0].swiperSlideOffset),
                    y.params.cssMode ? -e - y.translate : -e)
                      , a = 0;
                    var g = -100 * Math.abs(f);
                    let s = 1
                      , r = -p.perSlideRotate * f
                      , i = p.perSlideOffset - .75 * Math.abs(f);
                    var w = y.virtual && y.params.virtual.enabled ? y.virtual.from + l : l
                      , b = (w === o || w === o - 1) && 0 < f && f < 1 && (u || y.params.cssMode) && m < c
                      , w = (w === o || w === o + 1) && f < 0 && -1 < f && (u || y.params.cssMode) && c < m
                      , b = ((b || w) && (b = (1 - Math.abs((Math.abs(f) - .5) / .5)) ** .5,
                    r += -28 * f * b,
                    s += -.5 * b,
                    i += 96 * b,
                    a = -25 * b * Math.abs(f) + "%"),
                    f < 0 ? t = `calc(${t}px ${d ? "-" : "+"} (${i * Math.abs(f)}%))` : 0 < f ? t = `calc(${t}px ${d ? "-" : "+"} (-${i * Math.abs(f)}%))` : t += "px",
                    y.isHorizontal() || (w = a,
                    a = t,
                    t = w),
                    f < 0 ? "" + (1 + (1 - s) * f) : "" + (1 - (1 - s) * f))
                      , w = `
        translate3d(${t}, ${a}, ${g}px)
        rotateZ(${p.rotate ? d ? -r : r : 0}deg)
        scale(${b})
      `;
                    if (p.slideShadows) {
                        let e = h.querySelector(".swiper-slide-shadow");
                        (e = e || x("cards", h)) && (e.style.opacity = Math.min(Math.max((Math.abs(f) - .5) / .5, 0), 1))
                    }
                    h.style.zIndex = -Math.abs(Math.round(v)) + n.length,
                    E(0, h).style.transform = w
                }
            }
            ,
            setTransition: t => {
                var e = y.slides.map(e => l(e));
                e.forEach(e => {
                    e.style.transitionDuration = t + "ms",
                    e.querySelectorAll(".swiper-slide-shadow").forEach(e => {
                        e.style.transitionDuration = t + "ms"
                    }
                    )
                }
                ),
                w({
                    swiper: y,
                    duration: t,
                    transformElements: e
                })
            }
            ,
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !y.params.cssMode
            })
        })
    }
    ]),
    v
}();
