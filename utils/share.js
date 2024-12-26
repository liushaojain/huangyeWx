export default {
	onShareAppMessage(res) { //发送给朋友
		return {
			title: "实名脱单交友平台、真实、靠谱，在此牵手吧~",
			// imageUrl: "https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/icon/share.png",
			path: "/pages/home/index"
		}
	},
	onShareTimeline(res) {//分享到朋友圈
		return {
			title: "实名脱单交友平台、真实、靠谱，在此牵手吧~",
			// imageUrl: "https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/icon/share.png",
			path: "/pages/home/index"
		}
	}    
}