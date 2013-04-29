var PLATFORM_ANDROID = (navigator.userAgent.match('Android') != null);
var PLATFORM_IOS = (navigator.userAgent.match('iPhone') != null) || (navigator.userAgent.match('iPod') != null) ||
        (navigator.userAgent.match('iPad') != null);
var PLATFORM_PC = !(PLATFORM_ANDROID || PLATFORM_IOS);

var DEBUG_VERSION = true;

ASSETS_ROOT = PLATFORM_ANDROID ? '/android_asset/Res/' : '../Res/';