(function (global, factory) {
  // تعريف الوحدة
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = { exports: {} };
    factory(mod, mod.exports);
    global.WOW = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  // فحص إذا كان العنصر في المصفوفة
  function isIn(needle, haystack) {
    return haystack.indexOf(needle) >= 0;
  }

  // دمج كائنات
  function extend(custom, defaults) {
    for (var key in defaults) {
      if (custom[key] == null) {
        custom[key] = defaults[key];
      }
    }
    return custom;
  }

  // تعريف دالة WOW
  var WOW = function () {
    function WOW(options) {
      // إعدادات افتراضية
      this.defaults = {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
      };
      this.config = extend(options || {}, this.defaults);
      this.boxes = [];
      this.scrolled = true;
    }

    // تهيئة المكتبة
    WOW.prototype.init = function () {
      this.boxes = [].slice.call(document.querySelectorAll('.' + this.config.boxClass));
      this.start();
    };

    // بدء تطبيق الرسوم المتحركة
    WOW.prototype.start = function () {
      if (!this.disabled()) {
        window.addEventListener('scroll', this.scrollHandler.bind(this));
        this.scrollCallback();
      }
    };

    // فحص إذا كان العنصر مرئي
    WOW.prototype.isVisible = function (box) {
      var offset = box.getAttribute('data-wow-offset') || this.config.offset;
      var viewTop = window.pageYOffset;
      var viewBottom = viewTop + window.innerHeight - offset;
      var top = box.getBoundingClientRect().top + viewTop;
      var bottom = top + box.clientHeight;

      return top <= viewBottom && bottom >= viewTop;
    };

    // تطبيق الرسوم المتحركة
    WOW.prototype.show = function (box) {
      box.classList.add(this.config.animateClass);
    };

    // معالج التمرير
    WOW.prototype.scrollCallback = function () {
      for (var i = 0; i < this.boxes.length; i++) {
        var box = this.boxes[i];
        if (this.isVisible(box)) {
          this.show(box);
          this.boxes.splice(i, 1);
          i--;
        }
      }
    };

    // التحقق من تفعيل الرسوم المتحركة على الأجهزة المحمولة
    WOW.prototype.disabled = function () {
      return !this.config.mobile && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    return WOW;
  }();

  exports.default = WOW;
  module.exports = exports['default'];
});