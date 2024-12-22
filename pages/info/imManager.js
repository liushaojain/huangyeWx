import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';

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
    	this.chat.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
        this.chat.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
        await this.chat.login({
            userID,
            userSig: this.genUserSig(userID)
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

    async getMessageList(conversationID) {
        if(!conversationID) {
            console.error("conversationID不能为空");
            return;
        }
        const imResponse = await this.chat.getMessageList({ conversationID });
        return imResponse.data.messageList;
        // promise.then((imResponse) => {
        //     const messageList = imResponse.data.messageList; // 消息列表。
        //     const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        //     const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
        // });
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
        let message = this.chat.createLocationMessage({
            to,
            conversationType: TencentCloudChat.TYPES.CONV_C2C,
            payload
        });
        return await this.chat.sendMessage(message);
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
    genUserSig(userID) {
        const testMap = {
            lxj: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwjkVWVDh4pTsxIKCzBQlK0MzAwMDM3NDQ2OITGpFQWZRKlDc1NTUCCgFES3JzAWJmRubmFkYmhuZQU3JTAeamh5clBdglG-hm*SYHRQSbu4daZpbnhNhGemXk16qHeyXXuaYbplqbOHmWmyrVAsAsuEwoA__',
            lxj1: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwjkVWYZQ8eKU7MSCgswUJStDMwMDAzNzQ0NjiExqRUFmUSpQ3NTU1AgoBREtycwFiZkbm5ibmFkYQkWLM9OBxuZaekc4VsboewZmZzubRPp4lLiW5RWlFuSFGUf4OWcl*Zk4lcfo*5oVmDtmZdsq1QIANb8xcg__',
            lxj2: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwjkVWUZQ8eKU7MSCgswUJStDMwMDAzNzQ0NjiExqRUFmUSpQ3NTU1AgoBREtycwFiZkbm5hZGBmbQUWLM9OBxhqaBYSVeZq6Gqc5OmrH6HsYVJo5*2tbxugnB-qUWOYnmuUYJgWGFmjnpbrlG9gq1QIA-tMv5A__',
            lxj3: 'eJwtzEsOgjAUheG9dIohfTeQOAB14DMxsgGh1VwQJBW1wbh3KzA830n*D8p2p-BlLIoRDTGaDRu0aTq4wMA3V7LJH7o6ty1oFBOJMZaKEDY*xrVgjXchBPXXqB3Uf1OMKy5pJKcKXH12UbsgX9knHLPyvXFrfdj2e1ZUBnghdROIPjIiT9Jlep*j7w-nHTEY'
        }
        return testMap[userID];
    }

}