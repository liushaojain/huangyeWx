<template>
    <view class="container" :style="pageHeight">
        <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="nav-bar" :style="[navbarInnerStyle]">
            <view class="arrow-left" @tap="goBack">
                <u-icon name="arrow-left" color="#8B8B8B" size="18"></u-icon>
            </view>
            <view>{{toId}}</view>
        </view>
        <view class="box-1">
            <scroll-view scroll-y refresher-background="transparent" style="height: 100%;"
                @refresherrefresh="refresherrefresh" :refresher-enabled="true" :scroll-with-animation="false"
                :refresher-triggered="scrollView.refresherTriggered" :scroll-into-view="scrollView.intoView">
                <view class="talk-list">
                    <view v-for="(item, index) in talkListForShow" :key="item.ID" :id="'msg-' + item.ID">
                        <view class="item flex-col" :class="item.flow == 'out' ? 'push' : 'pull'">
                            <image :src="item.pic" mode="aspectFill" class="pic"></image>
                            <view class="content">
                                <template v-if="item.type === 'TIMImageElem'">
                                    <image :src="item.payload.imageInfoArray[0].url" mode="widthFix" @tap="openImage(item.payload.imageInfoArray[0].url)" style="width: 400rpx;"></image>
                                </template>
                                <template v-else-if="item.type === 'TIMVideoFileElem'">
                                    <view @tap="openVideo(item.payload.remoteVideoUrl)">
                                        <video style="width: 400rpx;" :controls="false" :enable-progress-gesture="false" :show-center-play-btn="false" :src="item.payload.remoteVideoUrl"></video>
                                    </view>
                                </template>
                                <template v-else-if="item.type === 'TIMLocationElem'">
                                    <view class="location" style="color: #4789f3;" @tap="openLocation(item.payload)">
                                        <image style="width: 40rpx;height: 40rpx;display: inline-block;vertical-align: middle;margin-right: 20rpx;" src="https://oss.derucci-smart.com/images/upload/local_1734766592898.png" mode="aspectFill"></image>
                                        {{ item.payload.description }}
                                    </view>
                                </template>
                                <template v-else>
                                    {{ item.payload.text }}
                                </template>
                            </view>
                        </view>
                    </view>
                    <view class="private-msg">
                        <view class="card">
                            <view class="hea">
                                <image class="img" src="https://oss.derucci-smart.com/images/upload/msg-icon_1734856784029.png" />
                                <view class="tit">私信</view>
                            </view>
                            <view class="msg-info">
                                接收信息开始聊天接收信息开始聊天接收信息开始聊天接收信息开始聊天
                            </view>
                            <view class="button">
                                接收信息开始聊天
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="box-2">
            <view class="flex-col">
                <view class="flex-grow" @tap="showOtherMsg = false">
                    <input type="text" class="content" v-model="content" placeholder="请输入聊天内容"
                        placeholder-style="color:#DDD;" :cursor-spacing="6">
                </view>
                <button class="send" v-if="content" @tap="handleSendClick">发送</button>
                <view @tap="showOtherMsg = !showOtherMsg" class="other-msg" v-else>
                    <image src="https://oss.derucci-smart.com/images/upload/1000010550_1734762034676.png" mode="aspectFill" class="img"></image>
                </view>
            </view>
            <view class="other-msg-box" v-if="showOtherMsg">
                <!-- <view class="other-msg-item" @tap="handleVideoClick">
                    <image src="https://oss.derucci-smart.com/images/upload/1000010547_1734762884136.png" class="icon" />
                    <view class="text">拍照/相册</view>
                </view> -->
                <view class="other-msg-item" @tap="handleVideoClick">
                    <image src="https://oss.derucci-smart.com/images/upload/1000010546_1734763455843.png" class="icon" />
                    <view class="text">拍摄/相册</view>
                </view>
                <view class="other-msg-item" @tap="handleLocationClick">
                    <image src="https://oss.derucci-smart.com/images/upload/1000010545_1734763519731.png" class="icon" />
                    <view class="text">位置</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getCurrentLocationAddress } from './utils/location.js'
import ImManager from './utils/imManager.js'

let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
export default {
    data() {
        return {
            menuButtonInfo: menuButtonInfo,
			statusBarHeight: systemInfo.statusBarHeight,
            // 滚动容器
            scrollView: {
                refresherTriggered: false,
                intoView: "",
                safeAreaHeight: 0
            },
            // 聊天列表数据
            talkList: [],
            // 请求参数
            ajax: {
                flag: true,	// 请求开关
            },
            // 发送内容
            content: '',
            showOtherMsg: false,
            toId: '',
            nextReqMessageID: undefined,
            isCompleted: false,
            conversationID: ''
        }
    },
    computed: {
        talkListForShow() {
            const list = JSON.parse(JSON.stringify(this.talkList))
            return list.reverse();
        },
		navbarInnerStyle() {
			let style = {};
			style.height = this.navbarHeight + 'px';
			console.log(style);
			return style;
		},
		navbarHeight() {
			// #ifdef APP-PLUS || H5
			return this.height ? this.height : 44;
			// #endif
			// #ifdef MP
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			return this.height ? this.height : height;
			// #endif
		},
        // 页面高度
        pageHeight() {
            const safeAreaHeight = this.scrollView.safeAreaHeight;
            if (safeAreaHeight > 0) {
                return `height: calc(${safeAreaHeight}px - var(--window-top));`
            }
            return "";
        }
    },
    onLoad({conversationID}) {
        if(!conversationID) {
            console.error("缺少conversationID参数")
            return;
        }
        this.conversationID = conversationID;
        this.toId = conversationID.replace("C2C", '');
        // #ifdef H5
        this.scrollView.safeAreaHeight = uni.getSystemInfoSync().safeArea.height;
        // #endif
        this.getHistoryMsg(conversationID);
		ImManager.getInstance().addObserver(this);
        ImManager.getInstance().setMessageRead(conversationID);
    },
	beforeDestroy() {
		ImManager.getInstance().removeObserver(this);
	},
    methods: {
        onMessage(msg) {
            console.log(msg);
            this.talkList = this.talkList.concat(msg.data.filter(ao => ao.from === this.toId));
        },
        goBack() {
            uni.navigateBack();
        },
        // 下拉刷新
        refresherrefresh(e) {
            if (this.isCompleted) {
                this.scrollView.refresherTriggered = false;
                this.showToast("没有更多聊天记录了");
                return
            };
            this.getHistoryMsg(this.conversationID);
            this.scrollView.refresherTriggered = true;
        },
        async getHistoryMsg(conversationID) {
            if (!this.ajax.flag) {
                return;
            }
            const {isCompleted, messageList: data, nextReqMessageID} = await ImManager.getInstance().getMessageList(conversationID, this.nextReqMessageID);
            this.nextReqMessageID = nextReqMessageID;
            this.isCompleted = isCompleted;
            console.log("获取历史消息");
            console.log(data);
            data.forEach(item => {
                console.log(item.payload);
            });
            this.scrollView.refresherTriggered = false;

            // 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用。取当前消息数据的第一条信息元素
            const selector = `msg-${data?.[data.length - 1]?.ID}`;
            // 将获取到的消息数据合并到消息数组中
            this.talkList = data.concat(this.talkList);
            this.$nextTick(() => {
                // 设置当前滚动的位置
                this.scrollView.intoView = selector;
                this.ajax.flag = true;
            })
        },
        openImage(item) {
            uni.previewImage({
                current: 0,
                urls: [item]
            });
        },
        openVideo(item) {
            uni.navigateTo({
                url: '/pages/info/video-page?url=' + encodeURIComponent(item)
            })
        },
        openLocation(item) {
            // 打开定位
            const latitude = item.latitude
            const longitude = item.longitude
            uni.openLocation({
                latitude: latitude,
                longitude: longitude,
                scale: 16,
                name: "",
                address: item.description
            })
        },
        // 发送信息
        handleSendClick() {
            if (!this.content) {
                uni.showToast({
                    title: '请输入有效的内容',
                    icon: 'none'
                })
                return;
            }
            this.sendMessage(this.content, 'text');

            // 清空内容框中的内容
            this.content = '';
        },
        // 处理图片点击
        handleImageClick() {
            uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.sendMessage(res, 'image');
                }
            });
        },
        handleVideoClick() {
            uni.chooseMedia({
                count: 1,
                mediaType: ['image', 'video'],
                sourceType: ['album', 'camera'],
                maxDuration: 30,
                camera: 'back',
                success: (res) => {
                    this.sendMessage(res, res.type);
                }
            })
        },
        async handleLocationClick() {
            uni.showModal({
                title: '温馨提示',
                content: '是否向对方发送您所在的地理位置？',
                success: async (result) => {
                    if (result.confirm) {
                        try {
                            const res = await getCurrentLocationAddress();
                            // 发送位置信息
                            this.sendMessage(res, 'location');
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            });
        },
        async sendMessage(content, type = 'text') {
            let res = {};
            uni.showLoading({
                title: '发送中'
            });
            try {
                if(type === 'text') {
                    res = await ImManager.getInstance().createTextMessage(this.toId, content);
                }
                if(type === 'location') {
                    res = await ImManager.getInstance().createLocationMessage(this.toId, content);
                }
                if(type === 'image') {
                    res = await ImManager.getInstance().createImageMessage(this.toId, content);
                }
                if(type === 'video') {
                    res = await ImManager.getInstance().createVideoMessage(this.toId, content);
                }
                if (res.code === 0) {
                    this.talkList.push(res.data.message);
                }
            } catch (e) {
                uni.hideLoading();
            } finally {
                uni.hideLoading();
            }
        }
    }
}
</script>

<style lang="scss">
.private-msg {
    padding: 36rpx;
    .card {
        padding: 20rpx 40rpx;
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0,0,0,0.12);
        border-radius: 24rpx 24rpx 24rpx 24rpx;
        .hea {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .img {
                width: 80rpx;
                height: 80rpx;
            }
            .tit {
                font-weight: bold;
                font-size: 32rpx;
                color: #333333;
                padding-left: 16rpx;
            }
        }
        .msg-info {
            padding: 8rpx 0 28rpx;
        }
        .button {
            width: 598rpx;
            height: 68rpx;
            background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
            border-radius: 200rpx 200rpx 200rpx 200rpx;

            font-weight: bold;
            font-size: 28rpx;
            color: #FFFFFF;
            line-height: 68rpx;
            text-align: center;
        }
    }
}
.status-bar {
    width: 100%;
    background-color: #f7f6fb;
}

.nav-bar {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f6fb;
    position: relative;
    .arrow-left {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10rpx;
    }
}
/* 设置常用元素尺寸规则 */
view,
textarea,
input,
label,
form,
button,
image {
    box-sizing: border-box;
}

/* 按钮样式处理 */
button {
    font-size: 28rpx;
}

/* 取消按钮默认的边框线效果 */
button:after {
    border: none;
}

/* 设置图片默认样式，取消默认尺寸 */
image {
    display: block;
    height: auto;
    width: auto;
}

/* 输入框默认字体大小 */
textarea,
input {
    font-size: 28rpx;
}

;

/* 列式弹性盒子 */
.flex-col {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
}

/* 行式弹性盒子 */
.flex-row {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
}

/* 弹性盒子弹性容器 */
.flex-col>view.flex-grow {
    width: 0;
    flex-grow: 1;
}

.flex-row>view.flex-grow {
    height: 0;
    flex-grow: 1;
}

/* 弹性盒子允许换行 */
.flex-col.flex-wrap {
    flex-wrap: wrap;
}

/* 弹性盒子居中对齐 */
.flex-col.flex-center,
.flex-row.flex-center {
    justify-content: center;
}

/* 列式弹性盒子两端对齐 */
.flex-col.flex-space {
    justify-content: space-between;
}

/* 弹性盒子快速分栏 ,这里非常郁闷 uniapp 居然不支持 * 选择器 */
.flex-col.flex-col-2>view {
    width: 50%;
}

.flex-col.flex-col-3>view {
    width: 33.33333%;
}

.flex-col.flex-col-4>view {
    width: 25%;
}

.flex-col.flex-col-5>view {
    width: 20%;
}

.flex-col.flex-col-6>view {
    width: 16.66666%;
}

/* 字体颜色 */
.color-333 {
    color: #333;
}

.color-666 {
    color: #666;
}

.color-999 {
    color: #999;
}

.color-ccc {
    color: #ccc;
}

.color-fff {
    color: #fff;
}

.color-6dc {
    color: #5ebd6a;
}

.color-d51 {
    color: #d51917;
}

.color-09f {
    color: #0099ff;
}

/* 背景色*/
.bg-fff {
    background-color: #ffffff;
}

/* 字体大小 */
.size-10 {
    font-size: 20rpx;
}

.size-12 {
    font-size: 24rpx;
}

.size-14 {
    font-size: 28rpx;
}

.size-16 {
    font-size: 32rpx;
}

.size-18 {
    font-size: 36rpx;
}

.size-20 {
    font-size: 40rpx;
}

/* 字体加粗 */
.font-b {
    font-weight: bold;
}

/* 对齐方式 */
.align-c {
    text-align: center;
}

.align-l {
    text-align: left;
}

.align-r {
    text-align: right;
}

/* 遮罩 */
.shade {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
}

/* 弹窗 */
.shade-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 101;
    min-width: 200rpx;
    min-height: 200rpx;
}

page {
    background-color: #F3F3F3;
    font-size: 28rpx;
}

.container {
    height: calc(100vh - var(--window-top));
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: stretch;
}

/* 加载数据提示 */
.tips {
    position: fixed;
    left: 0;
    top: var(--window-top);
    width: 100%;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.15);
    height: 72rpx;
    line-height: 72rpx;
    transform: translateY(-80rpx);
    transition: transform 0.3s ease-in-out 0s;

    &.show {
        transform: translateY(0);
    }
}

.box-1 {
    width: 100%;
    height: 0;
    flex: 1 0 auto;
    box-sizing: content-box;
    background-color: #ededf2;
}

.box-2 {
    height: auto;
    z-index: 2;
    border-top: #e5e5e5 solid 1px;
    box-sizing: content-box;
    background-color: #f6f6f6;

    /* 兼容iPhoneX */
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    >view {
        padding: 0 20rpx;
        height: 100rpx;
    }

    .content {
        background-color: #fff;
        height: 64rpx;
        padding: 0 20rpx;
        border-radius: 8rpx;
        font-size: 28rpx;
    }

    .send {
        background-color: #5ebd6a;
        color: #fff;
        height: 64rpx;
        margin-left: 20rpx;
        border-radius: 8rpx;
        padding: 0;
        width: 120rpx;
        line-height: 62rpx;

        &:active {
            background-color: #5ebd6a;
        }
    }
    .other-msg {
        margin-left: 20rpx;
        width: 44rpx;
        height: 44rpx;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .other-msg-box {
        height: 400rpx;
        background-color: #f6f6f6;
        display: flex;
        .other-msg-item {
            padding: 35rpx;
            .icon {
                width: 112rpx;
                height: 112rpx;
            }
            .text {
                text-align: center;
                margin-top: 8rpx;
                font-weight: 500;
                font-size: 24rpx;
                color: #999999;
            }
        }
    }
}

.talk-list {
    padding-bottom: 20rpx;
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: flex-end;
    align-items: stretch;

    // 添加弹性容器，让内容自动在顶部
    &::before {
        content: '.';
        display: inline;
        visibility: hidden;
        line-height: 0;
        font-size: 0;
        flex: 1 0 auto;
        height: 1px;
    }


    /* 消息项，基础类 */
    .item {
        padding: 20rpx 20rpx 0 20rpx;
        align-items: flex-start;
        align-content: flex-start;
        color: #333;

        .pic {
            width: 92rpx;
            height: 92rpx;
            border-radius: 50%;
            border: #fff solid 1px;
        }

        .content {
            padding: 20rpx;
            border-radius: 4px;
            max-width: 500rpx;
            word-break: break-all;
            line-height: 52rpx;
            position: relative;
        }

        /* 收到的消息 */
        &.pull {
            .content {
                margin-left: 32rpx;
                background-color: #fff;

                &::after {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    border-top: 16rpx solid transparent;
                    border-bottom: 16rpx solid transparent;
                    border-right: 20rpx solid #fff;
                    position: absolute;
                    top: 30rpx;
                    left: -18rpx;
                }
            }
        }

        /* 发出的消息 */
        &.push {
            /* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
            flex-direction: row-reverse;
            .content {
                margin-right: 32rpx;
                background-color: #ea7c92;
                color: #fff;
                &::after {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    border-top: 16rpx solid transparent;
                    border-bottom: 16rpx solid transparent;
                    border-left: 20rpx solid #ea7c92;
                    position: absolute;
                    top: 30rpx;
                    right: -18rpx;
                }
            }
        }
    }
}
</style>