// 引入用于发送网络请求的模块，在uni-app中可以使用uni.request
const request = uni.request;

// 这里填写你在腾讯地图开放平台申请的key
const MAP_KEY = 'RWEBZ-3S3CI-VMZGO-5UDDA-JCXYE-MTBWZ';

// 封装获取当前位置信息并转换为详细地址的函数
export const getCurrentLocationAddress = () => {
    return new Promise((resolve, reject) => {
        // 获取当前用户的经纬度
        uni.getLocation({
            type: 'gcj02', // 国测局坐标，微信小程序推荐使用此类型
            success: async (res) => {
                const { latitude, longitude } = res;
                // 调用腾讯地图逆地理编码接口，将经纬度转换为详细地址
                const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${MAP_KEY}`;
                try {
                    const response = await request({
                        url: url,
                        method: 'GET'
                    });
                    const data = response[1].data;
                    if (data.status === 0) {
                        const address = data.result.address;
                        resolve({
                            description: address,
                            longitude, // 经度
                            latitude // 纬度
                        });
                    } else {
                        reject(new Error('获取详细地址失败'));
                    }
                } catch (error) {
                    reject(error);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};