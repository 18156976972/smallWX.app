const baseUrl ='http://localhost:3000'

async function request(url='',data={},method='GET',header={}){
	return await uni.request({
		url:baseUrl+url,
		data:data,
		method:method,
		header:header
	})
}

export {request,baseUrl}