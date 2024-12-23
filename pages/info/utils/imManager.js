import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';
import infoApi from '../../../Api/info.js';
class ImObserver {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(item => item !== observer);
    }
}

export default class ImManager extends ImObserver {
    constructor() {
        if (ImManager.instance) {
            return ImManager.instance;
        }
        super();
        ImManager.instance = this;
    }

    static getInstance() {
        if (!ImManager.instance) {
            new ImManager();
        }
        return ImManager.instance;
    }

    async init({SDKAppID, userID}) {
        if (!SDKAppID) {
            console.error("SDKAppID不能为空");
            return;
        }
        if (!userID) {
            console.error("userID不能为空");
            return;
        }
        this.chat = TencentCloudChat.create({
            SDKAppID
        });
        this.userID = userID;
        this.SDKAppID = SDKAppID;
    	this.chat.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
        this.chat.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
        const userSig = await this.genUserSig(userID);
        await this.chat.login({
            userID,
            userSig
        });
        this.chat.on(TencentCloudChat.EVENT.SDK_READY, () => {
            // SDK 准备就绪
            console.log('SDK 准备就绪');
            this.onConversationList();
            this.onMessage();
        });
    }

    // 发送消息
    onMessage() {
        this.chat.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, (event) => {
			// 收到新消息
			console.log("收到新消息");
			console.log(event.name); // 请参考即时通信 IM 文档获取详细说明
			console.log(event.data); // 请参考即时通信 IM 文档获取详细说明
            this.observers.forEach(observer => {
                observer.onMessage && observer.onMessage(event)
            });
		});
    }
    // 会话列表
    onConversationList() {
        this.chat.on(TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED, (event) => {
            // 会话列表有更新
            console.log("会话列表有更新");
            console.log(event.name); // 请参考即时通信 IM 文档获取详细说明
            console.log(event.data); // 请参考即时通信 IM 文档获取详细说明
            this.observers.forEach(observer => observer.onConversationList(event));
        });
    }

    async getConversationList() {
        const res = await this.chat.getConversationList();
        if(res.code === 0) {
            return res.data.conversationList
        } else {
            return []
        }
    }

    async getMessageList(conversationID, nextReqMessageID) {
        if(!conversationID) {
            console.error("conversationID不能为空");
            return;
        }
        const imResponse = await this.chat.getMessageList({ conversationID, nextReqMessageID });
        console.log({imResponse});
        return imResponse.data;
        // promise.then((imResponse) => {
        //     const messageList = imResponse.data.messageList; // 消息列表。
        //     const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        //     const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
        // });
    }

    async getUserStatus(userID) {
        // userID - 用户 ID
        // statusType - 用户状态，枚举值及说明如下：
        // TencentCloudChat.TYPES.USER_STATUS_UNKNOWN - 未知
        // TencentCloudChat.TYPES.USER_STATUS_ONLINE - 在线
        // TencentCloudChat.TYPES.USER_STATUS_OFFLINE - 离线
        // TencentCloudChat.TYPES.USER_STATUS_UNLOGINED - 未登录
        // customStatus - 用户自定义状态
        return await this.chat.getUserStatus({userIDList: [`${userID}`]});
    }

    async createTextMessage(to, text) {
        if(!to) {
            console.error("to不能为空");
            return;
        }
        if(!text) {
            console.error("text不能为空");
            return;
        }
        let message = this.chat.createTextMessage({
            to,
            conversationType: TencentCloudChat.TYPES.CONV_C2C,
            payload: {
                text
            },
        });
        return await this.chat.sendMessage(message);
    }

    async createLocationMessage(to, payload) {
        console.log(to, payload);
        let message = this.chat.createLocationMessage({
            to,
            conversationType: TencentCloudChat.TYPES.CONV_C2C,
            payload: {
                ...payload,
                longitude: this.toFixed(payload.longitude),
                latitude: this.toFixed(payload.latitude),

            }
        });
        return await this.chat.sendMessage(message);
    }

    toFixed(num) {
        let multiplier = Math.pow(10, 10);
        let rounded = Math.round(num * multiplier);
        let result = rounded / multiplier;
        return result;
    }

    async createImageMessage(to, file) {
        let message = this.chat.createImageMessage({
            to,
            conversationType: TencentCloudChat.TYPES.CONV_C2C,
            payload: {
                file,
            },
            onProgress: (event) => { console.log('file uploading:', event) }
        });
        return await this.chat.sendMessage(message);
    }

    async createPrivateMessage(to, text) {
        let message = this.chat.createCustomMessage({
            to,
            conversationType: TencentCloudChat.TYPES.CONV_C2C,
            payload: {
                data: 'privateMessage', // 用于标识该消息是骰子类型消息
                description: text, // 获取骰子点数
                extension: to
            }
        });
        const res = await this.chat.sendMessage(message);
        console.log("createPrivateMessage", res);
        // 发送私信后，需要默认添加对方为好友
        this.addFriend(to, text);
        return res;
    }


    async createVideoMessage(to, file) {
        let message = this.chat.createVideoMessage({
            to,
            conversationType: TencentCloudChat.TYPES.CONV_C2C,
            payload: {
                file,
            },
            onProgress: (event) => { console.log('file uploading:', event) }
        });
        return await this.chat.sendMessage(message);
    }

    async setMessageRead(conversationID) {
        return await this.chat.setMessageRead({ conversationID });
    }
    
    // 获取userSig
    async genUserSig(userID) {
        const res = await infoApi.getUserSig(userID);
        return res.data.user_sig;
    }

    userID2UserInfoMap = {}

    async setUserID2UserInfoMap(id_list) {
        if(id_list && id_list.length > 0) {
            const res = await infoApi.getUserList(id_list);
            console.log("res", res);
            const data = res.data;
            data.forEach(item => {
                this.userID2UserInfoMap[item.id] = {
                    ...item,
                    nick_name: '未命名-' + item.id,
                };
            });
        }
        return this.userID2UserInfoMap;
    }

    async addFriend(to, wording, type) {
        await this.chat.addFriend({
            to,
            source: 'AddSource_Type_Web',
            wording,
            type: type || TencentCloudChat.TYPES.SNS_ADD_TYPE_SINGLE,
        });
    }

    async checkFriend(id) {
        const imResponse = await this.chat.checkFriend({
            userIDList: [id],
            type: TencentCloudChat.TYPES.SNS_CHECK_TYPE_BOTH,
        });
        console.log({imResponse});
        const { successUserIDList, failureUserIDList } = imResponse.data;
        let isFriend = false;
        // 校验成功的 userIDList
        successUserIDList.forEach((item) => {
            const { userID, code, relation } = item; // 此时 code 始终为0
            // 单向校验好友关系时可能的结果有：
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_NO_RELATION A 的好友表中没有 B，但无法确定 B 的好友表中是否有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_A_WITH_B A 的好友表中有 B，但无法确定 B 的好友表中是否有 A
            // 双向校验好友关系时可能的结果有：
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_NO_RELATION A 的好友表中没有 B，B 的好友表中也没有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_A_WITH_B A 的好友表中有 B，但 B 的好友表中没有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_B_WITH_A A 的好友表中没有 B，但 B 的好友表中有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_BOTH_WAY A 的好友表中有 B，B 的好友表中也有 A
            if(relation === TencentCloudChat.TYPES.SNS_TYPE_BOTH_WAY) {
                // 双向校验好友关系成功，此时 A 和 B 互为好友
                isFriend = true;
            }
        });
        return isFriend;
    }

    async acceptFriendApplication(userID) {
        await this.chat.acceptFriendApplication({
            userID,
            remark: '',
            type: TencentCloudChat.TYPES.SNS_APPLICATION_AGREE_AND_ADD
        });
    }


}