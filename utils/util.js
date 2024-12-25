import $request from '@/utils/ajax.js'
import uesrApi from "../Api/uesr.js"

let basehost ="";
let diyHost ="";
if(process.env.NODE_ENV === 'development'){
	if(process.env.isformal=='1'){
		basehost="http://47.119.182.138:88/"
	}else if(process.env.isformal=='2'){
		basehost="http://47.119.182.138:88/"
	}else if(process.env.isformal=='3'){
		basehost="http://47.119.182.138:88/"
	}else{
		basehost="http://47.119.182.138:88/"
	}
}else{
	if(process.env.isformal=='3'){
		basehost="http://47.119.182.138:88/"
	}else{
		basehost = 'http://47.119.182.138:88/'		
	}
}

export {basehost}
export {diyHost}
export function moneyFormat(val) {
  if (!val) return '0.00'
  let value = val.toString()
  const i = Math.floor(value)
  const d = (value.split('.')[1] && (value.split('.')[1].length == 1 ? value.split('.')[1] + '0' : (value.split('.')[1].length > 2 ? value.split('.')[1].slice(0, 2) : value.split('.')[1]))) || '00'
  return i.toLocaleString('en-US') + '.' + d
}

export function getWeixinCode(){
	return new Promise((resolve, reject) => {
		uni.login({
		  provider: 'weixin',
		  success: (loginRes) => {
			  console.log(loginRes)
			resolve(loginRes.code)
		  },
		  fail(res) {
		  	console.log(res,111)
		  }
		});
	})
}


export function dateFormat(timestamp) {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month}-${day}`;
}
// 生成文件名随机字符串
export function random_string(len) {
　　const strLeng = len || 32;
　　const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　const maxPos = chars.length;
　　let pwd = '';
　　for (let i = 0; i < strLeng; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// 获取文件后缀
export function get_suffix(filename) {
    const pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

export function get_file_name(filename) {
    const pos = filename.lastIndexOf('/')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos+1)
    }
    return suffix;
}

export async function multipleUpload(fileList, storeList, dir='life_photo') {
	let lists = [].concat(fileList)
	for (let i = 0; i < lists.length; i++) {
		const result = await upload(lists[i].url, dir)
		if(result.success == true){
			storeList.push({
				status: 'success',
				message: '',
				url: result.data
			})
		}
	}
}

export async function upload(url, dir='life_photo'){
	let fileName = get_file_name(url);
	const sign = await uesrApi.getOss();
	return new Promise((resolve,reject) => {
		let key= `${dir}/` + fileName;
		uni.uploadFile({
			url: sign.data.host, // 仅为示例，非真实的接口地址
			filePath: url,
			name: 'file',
			formData: {
				name:fileName,
				key,
				policy:sign.data.policy,
				OSSAccessKeyId:sign.data.ossAccessKeyId,
				success_action_status: '200',
				signature:sign.data.signature
			},
			success: (res) => {
				if(res.statusCode==200){
					resolve({success: true, data: sign.data.host+'/'+key,iamgeUrl:key})
				}else{
					reject({success: false, data: '上传失败'})
				}
			},
			fail: () => {
			reject({success: false, data: '上传失败'})
			}
		});
	})
}

export function getZodiacFromDate(dateStr) {
	if (!dateStr) return '';
	const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month === 1 && day >= 20 || month === 2 && day <= 18) {
        return "水瓶座";
    }
    if (month === 2 && day >= 19 || month === 3 && day <= 20) {
        return "双鱼座";
    }
    if (month === 3 && day >= 21 || month === 4 && day <= 19) {
        return "白羊座";
    }
    if (month === 4 && day >= 20 || month === 5 && day <= 20) {
        return "金牛座";
    }
    if (month === 5 && day >= 21 || month === 6 && day <= 21) {
        return "双子座";
    }
    if (month === 6 && day >= 22 || month === 7 && day <= 22) {
        return "巨蟹座";
    }
    if (month === 7 && day >= 23 || month === 8 && day <= 22) {
        return "狮子座";
    }
    if (month === 8 && day >= 23 || month === 9 && day <= 22) {
        return "处女座";
    }
    if (month === 9 && day >= 23 || month === 10 && day <= 23) {
        return "天秤座";
    }
    if (month === 10 && day >= 24 || month === 11 && day <= 22) {
        return "天蝎座";
    }
    if (month === 11 && day >= 23 || month === 12 && day <= 21) {
        return "射手座";
    }
    if (month === 12 && day >= 22 || month === 1 && day <= 19) {
        return "摩羯座";
    }
    return "";
}

export function getGeneration(dateStr) {
	if (!dateStr) return '';
    const year = parseInt(dateStr.slice(0, 4));
    const generationConfigs = [
        {name: "20后", start: 2020, end: 2029},
        {name: "10后", start: 2010, end: 2019},
        {name: "00后", start: 2000, end: 2009},
        {name: "90后", start: 1990, end: 1999},
        {name: "80后", start: 1980, end: 1989},
        {name: "70后", start: 1970, end: 1979},
        {name: "60后", start: 1960, end: 1969},
    ];

    for (const config of generationConfigs) {
        if (year >= config.start && year <= config.end) {
            return config.name;
        }
    }

    return "";
}
