
$.post("/wx/getSDKParams",{url:"http://www.bigwoods.cn"},function(res){
	res = res.data;
	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: res.appId, // 必填，公众号的唯一标识
	    timestamp: res.timestamp, // 必填，生成签名的时间戳
	    nonceStr: res.noncestr, // 必填，生成签名的随机串
	    signature: res.signature,// 必填，签名，见附录1
	    jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
});

//分享到朋友圈
wx.onMenuShareTimeline({
    title: '', // 分享标题
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});

wx.ready(function(){
	
});
