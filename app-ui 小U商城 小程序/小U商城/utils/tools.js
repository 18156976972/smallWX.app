const baseUrl ='http://localhost:3000'

async function myRequest(url='',data={},method='GET',header={}){
	return await uni.request({
		url:baseUrl+url,
		data:data,
		method:method,
		header:header
	})
}

export {myRequest,baseUrl}